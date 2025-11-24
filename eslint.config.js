import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['dist', 'node_modules', 'build', '*.config.js'] },
  {
    files: ['**/*.{js,jsx}'],
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
      },
    },
    rules: {
      // Console and debugger warnings
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',

      // Import/Export rules
      'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
      'import/named': 'error',
      'no-undef': 'error',
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-absolute-path': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/no-self-import': 'error',
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'warn',
      'import/order': ['warn', {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true
        }
      }],
      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',
      'import/first': 'warn',
      'import/no-mutable-exports': 'warn',
    },
  },
]
