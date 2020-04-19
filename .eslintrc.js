module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2019,
    sourceType: "module"
  },
  settings: {
    react: {
      "version": "detect"
    }
  },
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "prettier",
    "plugin:react/recommended",
    "@react-native-community",
  ],
  rules: {
    "prettier/prettier": "error",
    "no-multiple-empty-lines": ["error", {"max": 2}],
  }
}
