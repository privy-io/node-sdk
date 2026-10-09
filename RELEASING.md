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

## Release candidates

Publishes the pending stable release early as `X.Y.Z-rc.N` on the npm `rc` dist-tag
(`npm install @privy-io/node@rc`). `main` in `node-sdk` doesn't move. `main` here and its
release PR are unaffected.

1. 👤 Run the [prepare release candidate workflow](./.github/workflows/prepare-release-candidate.yml)
   from `main` in `node-sdk-private`. It takes no inputs: a candidate is always cut from the
   tip of `main`.
2. 🤖 The workflow creates `rc/X.Y.Z/N` from that commit, with one setup commit that pins
   the version, and release-please opens its release PR (`release: X.Y.Z-rc.N`).
   If no PR appears, run the release workflow on `rc/X.Y.Z/N` rather than cutting a new RC.
3. 👤 Approve and merge the release PR.
4. 🤖 CI runs the [release workflow](./.github/workflows/release-please.yml), which tags
   `vX.Y.Z-rc.N` and creates the GitHub Release in `node-sdk-private`.
5. 🤖 The release triggers the [promote workflow](./.github/workflows/stlc-promote.yml), which
   pushes only the tag to `node-sdk` and creates a GitHub prerelease there. That triggers the
   [publish npm workflow](./.github/workflows/publish-npm.yml), which publishes under the `rc`
   dist-tag.

`X.Y.Z` is the version the `main` release PR proposes. `N` starts at 1 and increments with
each RC of the same `X.Y.Z`. To ship a fix to a candidate, merge it to `main` and cut a new
RC.

## Coming soon

- **Hotfixes** (`release/X.Y` publishing `X.Y.(P+1)` for an older line without moving
  `latest`).
- **Betas** (`beta/X.Y.Z/N` from a feature branch, publishing `X.Y.Z-beta.N` to the npm
  `beta` dist-tag, with a second approval from someone who didn't write the code).

The workflows that create these branches are not added yet.
