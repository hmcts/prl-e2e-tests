import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";

export default tseslint.config(
  tseslint.configs.recommended,
  { ignores: [".yarn/**", "eslint.config.mjs", ".pnp.cjs", ".pnp.loader.mjs"] },
  {
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
      // This rule should be enabled when enums are converted
      "@typescript-eslint/no-duplicate-enum-values": "off",
    },
  },
  {
    ...playwright.configs["flat/recommended"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "playwright/expect-expect": "off",
      // This should be enabled when waitForSelector calls are changed to locator.waitFor()
      "playwright/no-wait-for-selector": "off",
      // This should be enabled when waitForTimeout calls are changed to explicit waits (where possible)
      "playwright/no-wait-for-timeout": "off",
    },
    ignores: ["e2e/common/helpers.ts"],
    files: ["e2e/**/*.ts"],
  },
);
