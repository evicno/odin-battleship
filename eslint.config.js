import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['webpack.*.js', 'eslint.config.js', 'babel.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: { globals: { ...globals.browser, ...globals.jest } },
  },

  {
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
]);
