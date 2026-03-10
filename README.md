# Privy's Node / Typescript SDK

[![NPM version](<https://img.shields.io/npm/v/@privy-io/node.svg?label=npm%20(stable)>)](https://npmjs.org/package/@privy-io/node) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@privy-io/node)

This library provides convenient access to the Privy REST API from server-side TypeScript or JavaScript.

The REST API documentation can be found on [docs.privy.io](https://docs.privy.io).

It is generated with [Stainless](https://www.stainless.com/).

## MCP Server

Use the Privy API MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40privy-io%2Fnode-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBwcml2eS1pby9ub2RlLW1jcCJdLCJlbnYiOnsiUFJJVllfQVBQX0lEIjoiTXkgQXBwIElEIiwiUFJJVllfQVBQX1NFQ1JFVCI6Ik15IEFwcCBTZWNyZXQifX0)
[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40privy-io%2Fnode-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40privy-io%2Fnode-mcp%22%5D%2C%22env%22%3A%7B%22PRIVY_APP_ID%22%3A%22My%20App%20ID%22%2C%22PRIVY_APP_SECRET%22%3A%22My%20App%20Secret%22%7D%7D)

> Note: You may need to set environment variables in your MCP client.

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

Our [changelog](https://docs.privy.io/changelogs/node) contains the latest information about new releases, including features, fixes, and upcoming changes.

We use [Semantic Versioning](https://semver.org/) to track breaking changes.
