/**
 * Pattern for `lowerCamelCase` things with a `lowerCamelCase` namespace.
 */
const LOWER_CAMEL_CASE_WITH_NAMESPACE_PATTERN =
  /^[a-z][a-zA-Z0-9]+[.][a-z][a-zA-Z0-9]+$/;

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-prettier/recommended',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  customSyntax: 'postcss-scss',
  rules: {
    'prettier/prettier': true,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'function-no-unknown': null,
    'function-name-case': [
      'lower',
      {
        ignoreFunctions: [LOWER_CAMEL_CASE_WITH_NAMESPACE_PATTERN],
      },
    ],
  },
};
