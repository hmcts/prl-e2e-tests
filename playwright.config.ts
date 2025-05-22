import { CommonConfig, ProjectsConfig } from "@hmcts/playwright-common";
import { defineConfig } from "@playwright/test";

module.exports = defineConfig({
  testDir: "./e2e/tests",
  ...CommonConfig.recommended,

  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      ...ProjectsConfig.chrome,
      dependencies: ["setup"],
    },
    {
      ...ProjectsConfig.firefox,
      dependencies: ["setup"],
    },
    {
      ...ProjectsConfig.webkit,
      dependencies: ["setup"],
    },
    {
      ...ProjectsConfig.chromium,
      dependencies: ["setup"],
    },
    {
      ...ProjectsConfig.edge,
      dependencies: ["setup"],
    },
    {
      ...ProjectsConfig.tabletChrome,
      dependencies: ["setup"],
    },
    {
      ...ProjectsConfig.tabletWebkit,
      dependencies: ["setup"],
    },
  ],
});
