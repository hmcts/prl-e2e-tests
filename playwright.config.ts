import { defineConfig, devices } from "@playwright/test";
import * as process from "node:process";

const DEFAULT_VIEWPORT = { width: 1920, height: 1080 };

module.exports = defineConfig({
  testDir: "./e2e/tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 4, // Set the number of retries for all projects

  timeout: 6 * 60 * 1000,
  expect: {
    timeout: 5 * 10 * 1000,
  },
  reportSlowTests: null,

  /* Opt out of parallel tests on CI. */
  workers: process.env.FUNCTIONAL_TESTS_WORKERS
    ? parseInt(process.env.FUNCTIONAL_TESTS_WORKERS)
    : 1,
  reporter: process.env.CI ? [["html"], ["list"]] : [["list"]],
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "chromium",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        screenshot: "off",
        trace: "on",
        javaScriptEnabled: true,
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "firefox",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Firefox"],
        screenshot: "off",
        trace: "on",
        javaScriptEnabled: true,
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "webkit",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Safari"],
        screenshot: "off",
        trace: "on",
        javaScriptEnabled: true,
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "MobileChrome",
      dependencies: ["setup"],
      use: {
        ...devices["Pixel 5"],
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
    {
      name: "MobileSafari",
      dependencies: ["setup"],
      use: {
        ...devices["iPhone 12"],
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
    {
      name: "MicrosoftEdge",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
  ],
});
