// Opens a hotfix PR into release/X.Y that cherry-picks commits from main, from a full checkout
// of main (the current directory).
//
// release/X.Y is created at the highest stable tag vX.Y.P if it doesn't exist yet, so once the
// PR is merged release-please on the branch proposes X.Y.(P+1). Commits that would bump the
// minor or major are rejected: X.Y.(P+1) must stay a patch, or it would collide with main's line.
//
// The PR body has a BEGIN_COMMIT_OVERRIDE block with the original commit messages, so the
// squash-merged PR still gets one changelog entry per backported commit.
//
// Env: LINE=X.Y, COMMITS=space-separated SHAs, applied in order.
// Step outputs: url=<PR URL>
//
// Usage: node prepare-hotfix.mts
import { env, fail, git, github, remoteRefExists, run, setOutputs } from './lib.mts';

// Anything release-please would read as a feat or a breaking change, on any line, since it
// also splits a message into several conventional commits.
const NOT_A_PATCH = /^(feat(\(.*?\))?!?|\w+(\(.*?\))?!): |^BREAKING[ -]CHANGE: /m;

run(async () => {
  const repo = env('GITHUB_REPOSITORY');
  const line = env('LINE');
  const shas = env('COMMITS').trim().split(/\s+/);
  if (!/^\d+\.\d+$/.test(line) || !shas.every((sha) => /^[0-9a-f]{7,40}$/i.test(sha)))
    fail('LINE must be X.Y and COMMITS hex SHAs.', 'Bad input');
  const base = `release/${line}`;

  // --- Commits ----------------------------------------------------------------------------
  const messages = shas.map((sha) => git(['log', '-1', '--format=%B', sha]));
  const bumps = shas.filter((_, i) => NOT_A_PATCH.test(messages[i]));
  if (bumps.length) {
    fail(
      `${bumps.join(', ')} would bump the minor or major version. Only fixes can be hotfixed onto ${line}.`,
      'Not a patch',
    );
  }

  // --- release/X.Y ------------------------------------------------------------------------
  if (!remoteRefExists(`refs/heads/${base}`)) {
    const tag =
      git(['tag', '--list', '--sort=-v:refname', `v${line}.*`])
        .split('\n')
        .find((tag) => /^v\d+\.\d+\.\d+$/.test(tag)) ??
      fail(`No stable v${line}.P tag to create ${base} from.`, 'prepare-hotfix');
    await github(`repos/${repo}/git/refs`, {
      method: 'POST',
      body: { ref: `refs/heads/${base}`, sha: git(['rev-parse', `${tag}^{commit}`]) },
    });
    console.log(`Created ${base} at ${tag}.`);
  }

  // --- Hotfix branch ----------------------------------------------------------------------
  const branch = `hotfix/${line}/${env('GITHUB_RUN_ID')}`;
  git(['fetch', '--quiet', 'origin', base], { auth: true });
  git(['switch', '--quiet', '--create', branch, 'FETCH_HEAD']);
  // The original authors are kept; only the committer is the bot.
  git([
    '-c',
    'user.name=github-actions[bot]',
    '-c',
    'user.email=41898282+github-actions[bot]@users.noreply.github.com',
    'cherry-pick',
    '-x',
    ...shas,
  ]);
  git(['push', '--quiet', 'origin', `HEAD:refs/heads/${branch}`], { auth: true });

  // --- PR ---------------------------------------------------------------------------------
  const pr = await github<{ html_url: string }>(`repos/${repo}/pulls`, {
    method: 'POST',
    body: {
      title:
        shas.length === 1 ? messages[0].split('\n')[0] : `fix: backport ${shas.length} commits to ${line}`,
      body: ['BEGIN_COMMIT_OVERRIDE', messages.join('\n\n'), 'END_COMMIT_OVERRIDE'].join('\n'),
      head: branch,
      base,
    },
  });
  setOutputs({ url: pr.html_url });
});
