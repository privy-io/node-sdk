// This file is the public, types-only entry point for `@privy-io/node/resources`.
// It intentionally re-exports everything as types only (no runtime values), so
// consumers get resource type names (e.g. `Transaction`, `Wallet`) without any
// ability to import or instantiate the internal resource classes directly.
// Internal code should keep importing from `./resources` (see `src/resources.ts`),
// which re-exports the runtime classes as well.
export type * from './resources/index';
