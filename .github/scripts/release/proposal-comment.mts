// Prints the markdown body of the sticky `release-proposal` comment for a release PR: the
// source SHA release-please ran on, the last published tag, and a compare link between them.
//
// Read-only: everything comes from the GitHub API, so no full clone is needed. The caller
// posts the output (e.g. marocchino/sticky-pull-request-comment with header
// `release-proposal`).
//
// Runs in the release-please workflow: the source SHA is $GITHUB_SHA, and GH_TOKEN needs
// read access to contents.
//
// Usage: node proposal-comment.mts > body.md
import { MANIFEST_PATH, env, manifestVersion, run } from './lib.mts';

run(async () => {
  const repoUrl = `${env('GITHUB_SERVER_URL')}/${env('GITHUB_REPOSITORY')}`;
  const sha = env('GITHUB_SHA');
  const shortSha = sha.slice(0, 7);

  // A missing manifest or an API error is shown in the comment rather than failing the job.
  const lastVersion = await manifestVersion(sha).catch(() => undefined);
  const lastTag = lastVersion === undefined ? undefined : `v${lastVersion}`;
  const lastTagCell =
    lastTag ? `[\`${lastTag}\`](${repoUrl}/releases/tag/${lastTag})` : `_none found in ${MANIFEST_PATH}_`;
  const changesCell =
    lastTag ? `[\`${lastTag}...${shortSha}\`](${repoUrl}/compare/${lastTag}...${sha})` : '_n/a_';

  const lines = [
    '### Release proposal',
    '',
    '| | |',
    '|---|---|',
    `| Source SHA | [\`${shortSha}\`](${repoUrl}/commit/${sha}) |`,
    `| Last published tag | ${lastTagCell} |`,
    `| Changes | ${changesCell} |`,
  ];
  const runId = process.env['GITHUB_RUN_ID'];
  if (runId) {
    lines.push('', `<sub>Updated by [release-please run ${runId}](${repoUrl}/actions/runs/${runId}).</sub>`);
  }
  console.log(lines.join('\n'));
});
