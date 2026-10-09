// Computes the next release candidate version and branch.
//
// X.Y.Z is the manifest version on the open release-please PR against main. It fails if there
// is no such PR, or if it is stale (its head's parent is not the tip of main, i.e.
// release-please hasn't caught up yet). sha is that tip, so the candidate is cut from it.
//
// N is 1 + the highest N among tags vX.Y.Z-rc.N and branches rc/X.Y.Z/N (branches too, so an
// unreleased candidate still reserves its number); 1 when there are none.
//
// Step outputs: full=X.Y.Z-rc.N, branch=rc/X.Y.Z/N, sha=<tip of main>
//
// Usage: node next-version.mts rc
import { env, fail, github, manifestVersion, run, setOutputs } from './lib.mts';

interface Ref {
  ref: string;
  object: { sha: string };
}

run(async () => {
  const repo = env('GITHUB_REPOSITORY');
  if (process.argv[2] !== 'rc') fail('Usage: node next-version.mts rc', 'next-version');

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
    Math.max(0, ...(await numbers(`tags/v${version}-rc.`)), ...(await numbers(`heads/rc/${version}/`))) + 1;

  setOutputs({ full: `${version}-rc.${n}`, branch: `rc/${version}/${n}`, sha: tip });
});
