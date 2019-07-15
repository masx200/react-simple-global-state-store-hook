module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    worker: true,
    commonjs: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {}
};
