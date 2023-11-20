module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/no-empty-function": 0,
        "prefer-const": 0,
        "no-async-promise-executor": 0,
        "@typescript-eslint/no-inferrable-types": 0,
        "@typescript-eslint/no-extra-semi": 0,
        "@typescript-eslint/ban-types": 0,
        "@typescript-eslint/prefer-as-const": 0,
        "@typescript-eslint/no-empty-interface": 0,
    }
}
