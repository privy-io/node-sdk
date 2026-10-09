# Releasing

Releases are cut by [release-please](https://github.com/googleapis/release-please) in the
private `privy-io/node-sdk-private` repo, then promoted to the public
[`privy-io/node-sdk`](https://github.com/privy-io/node-sdk) repo, which publishes to npm.
Tags are `vX.Y.Z`.

Public `main` only moves when a release is promoted, so it always matches the latest stable
release.

## Stable releases (from `main`)

1. 👤 Merge changes into `main` in `node-sdk-private`.
2. 🤖 On every push to `main`, release-please opens or updates the release PR (`release: X.Y.Z`)
   in `node-sdk-private`.
3. 🤖 CI adds a **release proposal** comment to the release PR: the source commit and a
   compare link from the last published tag. Use it to review exactly what ships.
4. 👤 Approve and merge the release PR.
5. 🤖 CI runs the [release workflow](./.github/workflows/release-please.yml), which tags
   `vX.Y.Z` and creates the GitHub Release in `node-sdk-private`.
6. 🤖 The release triggers the [promote workflow](./.github/workflows/stlc-promote.yml), which:
   - fast-forwards `main` in `node-sdk` to the tag commit;
   - pushes the tag to `node-sdk`;
   - creates the matching GitHub Release in `node-sdk`, which triggers the
     [publish npm workflow](./.github/workflows/publish-npm.yml) there.
7. 👤 Update the changelog in [our public docs](https://docs.privy.io).

The public release notes link to `node-sdk` commits and leave out PR numbers, since those
refer to private PRs.

## Coming soon

- **Release candidates** (`rc/X.Y.Z/N` publishing `X.Y.Z-rc.N` to the npm `rc` dist-tag).
- **Hotfixes** (`release/X.Y` publishing `X.Y.(P+1)` for an older line without moving
  `latest`).
- **Betas** (`beta/X.Y.Z/N` from a feature branch, publishing `X.Y.Z-beta.N` to the npm
  `beta` dist-tag, with a second approval from someone who didn't write the code).

The workflows that create these branches are not added yet.
