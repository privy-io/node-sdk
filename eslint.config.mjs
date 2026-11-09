// @ts-check
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

const packageImport = {
  regex: '^@privy-io/node(/.*)?',
  message: 'Use a relative import, not a package import.',
};
const optionalPeerImport = {
  regex: '^(viem|@solana/[^/]+|@x402/[^/]+)(/.*)?$',
  message: 'Optional peers may only be imported from adapter entrypoints.',
};

export default tseslint.config(
  {
    ignores: ['dist/'],
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { sourceType: 'module' },
    },
    files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.js', '**/*.mjs', '**/*.cjs'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'no-restricted-imports': ['error', { patterns: [packageImport, optionalPeerImport] }],
    },
  },
  {
    files: [
      'src/viem.ts',
      'src/solana-kit.ts',
      'src/x402.ts',
      'src/internal/viem-tempo.ts',
      'src/internal/utils/viem.ts',
      'src/types/x402.d.ts',
    ],
    rules: { 'no-restricted-imports': ['error', { patterns: [packageImport] }] },
  },
  {
    files: ['tests/**', 'examples/**', 'typechecking/**'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
);
