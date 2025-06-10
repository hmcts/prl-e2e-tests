import { CommonConfig, ProjectsConfig } from "@hmcts/playwright-common";
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e/tests",
  ...CommonConfig.recommended,
  timeout: 6 * 60 * 1000,
  expect: {
    timeout: 20000
  },

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
