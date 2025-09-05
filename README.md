# Privy's Node / Typescript SDK

[![NPM version](<https://img.shields.io/npm/v/@privy-io/node.svg?label=npm%20(stable)>)](https://npmjs.org/package/@privy-io/node) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@privy-io/node)

This library provides convenient access to the Privy API REST API from server-side TypeScript or JavaScript.

The REST API documentation can be found on [docs.privy.io](https://docs.privy.io).

It is generated with [Stainless](https://www.stainless.com/).

## Installation

```sh
npm install @privy-io/node
```

## Usage

See Privy's [Node SDK guide](https://docs.privy.io/basics/nodeJS/setup) for setup and usage.

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

> [!WARNING]
> Web browser runtimes aren't supported. The SDK will throw an error if used in a browser environment.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.



## Changelog

Our [changelog](https://docs.privy.io/changelogs/nodeJS) contains the latest information about new releases, including features, fixes, and upcoming changes.

We use [Semantic Versioning](https://semver.org/) to track breaking changes.
