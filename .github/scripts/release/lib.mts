// Shared helpers for the release scripts in this directory. The scripts here are shared by
// node-sdk-private and ios-headless-sdk; keep them in sync.
//
// The scripts are TypeScript run directly by Node 24 (`node script.mts`, no build step and no
// dependencies), so they only use erasable syntax and Node built-ins.

export const MANIFEST_PATH = '.release-please-manifest.json';

/** Reports a GitHub Actions error annotation and exits. */
export function fail(message: string, title = 'release'): never {
  console.error(`::error title=${title}::${message}`);
  process.exit(1);
}

/** Runs a script's main function, turning any thrown error into an error annotation. */
export function run(main: () => Promise<void>): void {
  main().catch((error: unknown) => fail(error instanceof Error ? error.message : String(error)));
}

export function env(name: string): string {
  const value = process.env[name];
  if (!value) fail(`${name} is not set.`);
  return value;
}

// --- GitHub API ---------------------------------------------------------------------------

export class GitHubError extends Error {
  status: number;
  constructor(method: string, url: string, status: number, body: string) {
    super(`GitHub API ${method} ${url} failed with ${status}: ${body}`);
    this.status = status;
  }
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  /** Defaults to $GH_TOKEN. */
  token?: string;
  accept?: string;
}

async function request(path: string, options: RequestOptions = {}): Promise<Response> {
  const method = options.method ?? 'GET';
  const url =
    path.startsWith('https://') ? path : (
      `${process.env['GITHUB_API_URL'] ?? 'https://api.github.com'}/${path}`
    );
  const response = await fetch(url, {
    method,
    headers: {
      accept: options.accept ?? 'application/vnd.github+json',
      authorization: `Bearer ${options.token ?? env('GH_TOKEN')}`,
      // Latest REST API version, pinned so response shapes can't change under us.
      'x-github-api-version': '2026-03-10',
      ...(options.body === undefined ? {} : { 'content-type': 'application/json' }),
    },
    ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
  });
  if (!response.ok) throw new GitHubError(method, url, response.status, await response.text());
  return response;
}

/** Calls the GitHub API, e.g. `github('repos/o/r/git/ref/heads/main')`, and returns its JSON. */
export async function github<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return (await (await request(path, options)).json()) as T;
}

/**
 * The version recorded in the release-please manifest at `ref` of this repo, read through the
 * contents API (no checkout needed). Undefined if there is no manifest or no "." entry.
 */
export async function manifestVersion(ref: string): Promise<string | undefined> {
  const repo = env('GITHUB_REPOSITORY');
  try {
    const response = await request(`repos/${repo}/contents/${MANIFEST_PATH}?ref=${ref}`, {
      accept: 'application/vnd.github.raw+json',
    });
    const manifest = JSON.parse(await response.text()) as Record<string, string | undefined>;
    return manifest['.'];
  } catch (error) {
    if (error instanceof GitHubError && error.status === 404) return undefined;
    throw error;
  }
}
