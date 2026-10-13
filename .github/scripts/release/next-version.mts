// Computes the next release candidate or beta version and branch.
//
// X.Y.Z is the manifest version on the open release-please PR against main. It fails if there
// is no such PR, or if it is stale (its head's parent is not the tip of main, i.e.
// release-please hasn't caught up yet). sha is the commit to cut from: the tip of main for a
// release candidate, the tip of <branch> for a beta.
//
// N is 1 + the highest N among tags vX.Y.Z-<channel>.N and branches <channel>/X.Y.Z/N
// (branches too, so an unreleased one still reserves its number); 1 when there are none.
//
// Step outputs: full=X.Y.Z-<channel>.N, branch=<channel>/X.Y.Z/N, sha=<commit to cut from>
//
// Usage: node next-version.mts rc | beta <branch>
import { env, fail, github, manifestVersion, run, setOutputs } from './lib.mts';

interface Ref {
  ref: string;
  object: { sha: string };
}

run(async () => {
  const repo = env('GITHUB_REPOSITORY');
  const [channel, source] = process.argv.slice(2);
  if (channel !== 'rc' && !(channel === 'beta' && source)) {
    fail('Usage: node next-version.mts rc | beta <branch>', 'next-version');
  }

  // --- X.Y.Z ------------------------------------------------------------------------------
  const head = 'privy-io:release-please--branches--main--components--node';
  const [pr] = await github<{ number: number; head: { sha: string } }[]>(
    `repos/${repo}/pulls?state=open&base=main&head=${head}`,
  );
  if (!pr) fail('No open release PR against main. Wait for release-please to open it.', 'next-version');

  const tip = (await github<Ref>(`repos/${repo}/git/ref/heads/main`)).object.sha;
  const parent =
    (await github<{ parents: { sha: string }[] }>(`repos/${repo}/commits/${pr.head.sha}`)).parents[0]?.sha ??
    '';
  if (parent !== tip) {
    fail(
      `Release PR #${pr.number} is based on ${parent.slice(0, 7)}, not main (${tip.slice(0, 7)}). ` +
        'Wait for release-please and retry.',
      'next-version',
    );
  }
  const version = await manifestVersion(pr.head.sha);
  if (!version || !/^\d+\.\d+\.\d+$/.test(version))
    fail(`Release PR #${pr.number} has no plain X.Y.Z version: '${version}'.`, 'next-version');

  // --- N ----------------------------------------------------------------------------------
  const numbers = async (prefix: string) =>
    (await github<Ref[]>(`repos/${repo}/git/matching-refs/${prefix}`))
      .map((ref) => ref.ref.slice(`refs/${prefix}`.length))
      .filter((n) => /^\d+$/.test(n))
      .map(Number);
  const n =
    Math.max(
      0,
      ...(await numbers(`tags/v${version}-${channel}.`)),
      ...(await numbers(`heads/${channel}/${version}/`)),
    ) + 1;

  const sha =
    channel === 'rc' ? tip : (await github<Ref>(`repos/${repo}/git/ref/heads/${source}`)).object.sha;
  setOutputs({ full: `${version}-${channel}.${n}`, branch: `${channel}/${version}/${n}`, sha });
});
