// @ignore no-undefined
const error = 'error';
const warn = 'warn';
const off = 'off';
const all = 'all';

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        'prettier',
        'plugin:@typescript-eslint/recommended',
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        /*
      Bug Fixes
     */
    // For Babel, see the next line
    'no-invalid-this': off,
    'babel/no-invalid-this': off,
    'react/react-in-jsx-scope': off,
    /*
      Our Rules
     */
    'prefer-spread': warn,
    'react/jsx-key': error,
    // 'prettier/prettier': off, //THIS has created a build time of 15mins
    'default-case': error,
    '@typescript-eslint/no-unused-vars': off,
    '@typescript-eslint/no-redeclare': off,
    'react/style-prop-object': error,
    'no-useless-concat': error,
    // TO strict when trying to move towards typescipt
    '@typescript-eslint/ban-ts-comment': off,
    // 'no-console': off,
    'no-alert': error,
    'no-template-curly-in-string': error,
    'require-atomic-updates': error,
    'no-const-assign': error,
    'no-var': error,
    'prefer-arrow-callback': error,
    'prefer-const': error,
    'prefer-template': warn,
    'no-unused-vars': off,
    'array-callback-return': warn,
    'no-eval': error,
    'no-case-declarations': warn,
    'no-fallthrough': warn,
    'no-implied-eval': error,
    'no-labels': error,
    'no-lone-blocks': error,
    'no-param-reassign': error,
    'require-await': error,
    '@typescript-eslint/explicit-module-boundary-types': off,
    'no-use-before-define': off,
    '@typescript-eslint/no-use-before-define': off,
    '@typescript-eslint/naming-convention': [
      off,
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'variable',
        format: ['PascalCase', 'camelCase', 'UPPER_CASE', 'snake_case'],
      },
      {
        selector: 'variable',
        format: ['PascalCase', 'camelCase', 'PascalCase'],
        types: ['function'],
      },
      {
        selector: 'parameter',
        format: ['camelCase', 'snake_case', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'property',
        format: ['PascalCase', 'camelCase', 'UPPER_CASE', 'snake_case'],
      },
      {
        selector: 'parameterProperty',
        format: ['UPPER_CASE'],
      },
    ],
    'react/prop-types': off,
    'security/detect-object-injection': off,
    'security/detect-non-literal-fs-filename': off,
    '@typescript-eslint/no-explicit-any': off,
    }
}
