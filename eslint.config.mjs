import tseslint from "typescript-eslint";

export default tseslint.config(tseslint.configs.recommended, {
  ignores: [".yarn/**", "eslint.config.mjs"],
  files: ["**/*.ts"],
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: "./tsconfig.json",
    },
  },
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
  },
});
