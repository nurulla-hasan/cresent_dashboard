import js from '@eslint/js'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'

export default [
  { ignores: ['dist', 'node_modules', 'build', '*.config.js'] },
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      import: importPlugin,
      react: reactPlugin,
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.json']
        }
      },
      react: { version: 'detect' }
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'no-undef': 'error',

      'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-absolute-path': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'warn',

      // Minimal React rules to surface important JSX errors
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-vars': 'warn'
    }
  }
]