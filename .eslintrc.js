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
    "plugin:react/recommended",
    "@react-native-community",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-multiple-empty-lines": ["error", {"max": 2}],
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "indent": ["error", 2],
    "comma-dangle": ["error", "only-multiline"],
    "jsx-quotes": ["error", "prefer-single"],
    "object-curly-spacing": ["error", "always"],
  }
}
