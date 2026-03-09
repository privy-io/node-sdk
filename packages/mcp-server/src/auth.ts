// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { IncomingMessage } from 'node:http';
import { ClientOptions } from '@privy-io/node';
import { McpOptions } from './options';

export const parseClientAuthHeaders = (req: IncomingMessage, required?: boolean): Partial<ClientOptions> => {
  if (req.headers.authorization) {
    const scheme = req.headers.authorization.split(' ')[0]!;
    const value = req.headers.authorization.slice(scheme.length + 1);
    switch (scheme) {
      case 'Basic':
        const rawValue = Buffer.from(value, 'base64').toString();
        return {
          appID: rawValue.slice(0, rawValue.search(':')),
          appSecret: rawValue.slice(rawValue.search(':') + 1),
        };
      default:
        throw new Error(
          'Unsupported authorization scheme. Expected the "Authorization" header to be a supported scheme (Basic).',
        );
    }
  } else if (required) {
    throw new Error('Missing required Authorization header; see WWW-Authenticate header for details.');
  }

  const appID =
    Array.isArray(req.headers['x-privy-app-id']) ?
      req.headers['x-privy-app-id'][0]
    : req.headers['x-privy-app-id'];
  const appSecret =
    Array.isArray(req.headers['x-privy-app-secret']) ?
      req.headers['x-privy-app-secret'][0]
    : req.headers['x-privy-app-secret'];
  return { appID, appSecret };
};

export const getStainlessApiKey = (req: IncomingMessage, mcpOptions: McpOptions): string | undefined => {
  // Try to get the key from the x-stainless-api-key header
  const headerKey =
    Array.isArray(req.headers['x-stainless-api-key']) ?
      req.headers['x-stainless-api-key'][0]
    : req.headers['x-stainless-api-key'];
  if (headerKey && typeof headerKey === 'string') {
    return headerKey;
  }

  // Fall back to value set in the mcpOptions (e.g. from environment variable), if provided
  return mcpOptions.stainlessApiKey;
};
