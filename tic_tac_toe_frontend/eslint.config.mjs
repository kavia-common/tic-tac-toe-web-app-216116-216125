import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/**
 * ESLint Flat Config for React + Prettier
 * - Uses ESLint recommended rules
 * - React rules with JSX runtime
 * - Disables rules conflicting with Prettier (via "prettier" rule turn-offs)
 */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        // testing globals
        test: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      // Core
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: 'React|App' }],
      'no-console': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'off', // using PropTypes explicitly in components; turn off if noisy

      // Formatting handled by Prettier
      'arrow-parens': 'off',
      'max-len': 'off',
      'object-curly-newline': 'off',
    },
  },
  pluginJs.configs.recommended,
];
