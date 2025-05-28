import { LintingConfig } from "@hmcts/playwright-common";
import tseslint from "typescript-eslint";

export default tseslint.config(
  LintingConfig.tseslintRecommended,
  LintingConfig.ignored,
  {
    ...LintingConfig.tseslintPlugin,
    rules: { "@typescript-eslint/no-duplicate-enum-values": "off" },
  },
  {
    ...LintingConfig.playwright,
    files: ["e2e/**/*.ts"],
    ignores: ["e2e/common/helpers.ts"],
  },
);
