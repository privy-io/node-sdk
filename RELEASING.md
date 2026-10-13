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

## Hotfixes

Publishes fixes from `main` to an older line as `X.Y.(P+1)`, where `vX.Y.P` is the line's
latest release, on the npm `release-X.Y` dist-tag so `latest` doesn't move. `main` in
`node-sdk` doesn't move. `main` here and its release PR are unaffected. Only for an older
line: a hotfix of the line `main` is on would collide with its next release.

1. 👤 Merge the fixes into `main`.
2. 👤 Run the [prepare hotfix workflow](./.github/workflows/prepare-hotfix.yml) from `main` in
   `node-sdk-private`, with the line (`X.Y`) and the SHAs of the commits to backport, in
   order. It rejects `feat` and breaking commits, which would bump past `X.Y.(P+1)`.
3. 🤖 The workflow creates `release/X.Y` from `vX.Y.P` if it doesn't exist, cherry-picks the
   commits onto `hotfix/X.Y/<run id>` and opens a PR into `release/X.Y`. Its body overrides
   the squash commit message with the original ones, so the changelog keeps one entry per
   commit. If the commits don't apply cleanly, or change `.github/workflows/` (which the
   workflow's token can't push), open that PR yourself.
4. 👤 Close and reopen the PR to run CI (PRs opened by a workflow don't trigger it), then
   approve and merge it.
5. 🤖 On the push to `release/X.Y`, release-please opens its release PR
   (`release: X.Y.(P+1)`). CI adds the release proposal comment.
6. 👤 Approve and merge the release PR.
7. 🤖 CI runs the [release workflow](./.github/workflows/release-please.yml), which tags
   `vX.Y.(P+1)` and creates the GitHub Release in `node-sdk-private`.
8. 🤖 The release triggers the [promote workflow](./.github/workflows/stlc-promote.yml), which
   pushes only the tag to `node-sdk` and creates a GitHub Release there, not marked latest.
   That triggers the [publish npm workflow](./.github/workflows/publish-npm.yml), which
   publishes under the `release-X.Y` dist-tag.
9. 👤 Update the changelog in [our public docs](https://docs.privy.io).

Consumers install `@privy-io/node@X.Y.(P+1)` or `@privy-io/node@release-X.Y`.

Hotfixes run the workflows and `bin/publish-npm` as they are on `release/X.Y`, not on
`main`. A line whose `vX.Y.P` predates this flow (e.g. `v0.35.0`) has none of it, so first
merge a PR into `release/X.Y` that brings `.github/` and `bin/` up to date with `main`.

## Betas

Publishes a feature branch as `X.Y.Z-beta.N` on the npm `beta` dist-tag, before it is merged.
`main` in `node-sdk` doesn't move. `main` here and its release PR are unaffected.

1. 👤 Bring the feature branch up to date with `main`. Its `.github/`, `bin/` and
   `release-please-config.json` must match `main`'s, since the beta is released, promoted and
   published with them, and it should include the last release so the changelog only lists
   the feature's changes.
2. 👤 Run the [prepare beta workflow](./.github/workflows/prepare-beta.yml) from `main` in
   `node-sdk-private`, with the feature branch.
3. 🤖 The workflow creates `beta/X.Y.Z/N` from the tip of the feature branch, with one setup
   commit that pins the version, and release-please opens its release PR
   (`release: X.Y.Z-beta.N`). CI adds the release proposal comment. If no PR appears, run the
   release workflow on `beta/X.Y.Z/N` rather than preparing a new beta.
4. 👤 Get **two approvals** on the release PR, at least one from someone who didn't write the
   feature, then merge it. GitHub can't enforce the second part.
5. 🤖 CI runs the [release workflow](./.github/workflows/release-please.yml), which tags
   `vX.Y.Z-beta.N` and creates the GitHub Release in `node-sdk-private`.
6. 🤖 The release triggers the [promote workflow](./.github/workflows/stlc-promote.yml), which
   pushes only the tag to `node-sdk` and creates a GitHub prerelease there. That triggers the
   [publish npm workflow](./.github/workflows/publish-npm.yml), which publishes under the
   `beta` dist-tag.

Consumers install `@privy-io/node@beta` or pin `@privy-io/node@X.Y.Z-beta.N`. The `beta`
dist-tag is shared by every feature branch and points at whichever beta was published last,
so to test a specific feature, pin its exact version.

`X.Y.Z` is the version the `main` release PR proposes. `N` starts at 1 and increments with
each beta of the same `X.Y.Z`, whatever the feature branch. To ship a fix to a beta, push it
to the feature branch and prepare a new beta. Betas are never promoted to stable: the feature
ships in a stable release once it is merged into `main`.
