// @ts-check
const fs = require('fs');
const path = require('path');

const distDir =
  process.env['DIST_PATH'] ?
    path.resolve(process.env['DIST_PATH'])
  : path.resolve(__dirname, '..', '..', 'dist');

async function* walk(dir) {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

async function postprocess() {
  for await (const file of walk(distDir)) {
    if (!/(\.d)?[cm]?ts$/.test(file)) continue;

    const code = await fs.promises.readFile(file, 'utf8');

    // strip out lib="dom", types="node", and types="react" references; these
    // are needed at build time, but would pollute the user's TS environment
    let transformed = code.replace(
      /^ *\/\/\/ *<reference +(lib="dom"|types="(node|react)").*?\n/gm,
      // replace with same number of characters to avoid breaking source maps
      (match) => ' '.repeat(match.length - 1) + '\n',
    );

    // TypeScript's declaration emitter collapses /** @ts-ignore */ onto the same
    // line as the type declaration, which doesn't work. So we convert to // @ts-ignore
    // on its own line to properly suppresses errors.
    if (file.endsWith('.d.ts') || file.endsWith('.d.mts') || file.endsWith('.d.cts')) {
      transformed = transformed.replace(/\/\*\* @ts-ignore\b[^*]*\*\/ /gm, '// @ts-ignore\n');
    }

    if (transformed !== code) {
      console.error(`wrote ${path.relative(process.cwd(), file)}`);
      await fs.promises.writeFile(file, transformed, 'utf8');
    }
  }

  const newExports = {
    '.': {
      require: {
        types: './index.d.ts',
        default: './index.js',
      },
      types: './index.d.mts',
      default: './index.mjs',
    },
    './resources': {
      require: {
        types: './resources-types.d.ts',
        default: './resources-types.js',
      },
      types: './resources-types.d.mts',
      default: './resources-types.mjs',
    },
    './viem': {
      require: {
        types: './viem.d.ts',
        default: './viem.js',
      },
      types: './viem.d.mts',
      default: './viem.mjs',
    },
    './solana-kit': {
      require: {
        types: './solana-kit.d.ts',
        default: './solana-kit.js',
      },
      types: './solana-kit.d.mts',
      default: './solana-kit.mjs',
    },
    './x402': {
      require: {
        types: './x402.d.ts',
        default: './x402.js',
      },
      types: './x402.d.mts',
      default: './x402.mjs',
    },
  };

  await fs.promises.writeFile(
    'dist/package.json',
    JSON.stringify(
      Object.assign(
        /** @type {Record<String, unknown>} */ (
          JSON.parse(await fs.promises.readFile('dist/package.json', 'utf-8'))
        ),
        {
          exports: newExports,
        },
      ),
      null,
      2,
    ),
  );
}
postprocess();
