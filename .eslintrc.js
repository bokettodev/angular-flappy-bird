module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          { type: 'attribute', prefix: 'fb', style: 'camelCase' },
        ],
        '@angular-eslint/component-selector': [
          'error',
          { type: 'element', prefix: 'fb', style: 'kebab-case' },
        ],
        'import/prefer-default-export': 'off',
        'no-console': ['warn', { allow: ['error'] }],
        'no-void': ['error', { allowAsStatement: true }],
        'no-unused-vars': 'off',
        'no-unused-private-class-members': 'error',
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
        '@typescript-eslint/no-floating-promises': [
          'error',
          { ignoreVoid: true },
        ],
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          { allowTypedFunctionExpressions: true },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'all',
            ignoreRestSiblings: false,
            caughtErrors: 'all',
            argsIgnorePattern: '^_+$',
            caughtErrorsIgnorePattern: '^_+$',
          },
        ],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
    },
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: { 'prettier/prettier': ['error', { parser: 'angular' }] },
    },
  ],
};
