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
  retries: process.env.CI ? 2 : 0,
  timeout: 6 * 60 * 1000,
  expect: { timeout: 60_000 },
  /* Report slow tests if they take longer than 5 mins */
  reportSlowTests: { max: 15, threshold: 5 * 60 * 1000 },
  workers: process.env.FUNCTIONAL_TESTS_WORKERS
    ? parseInt(process.env.FUNCTIONAL_TESTS_WORKERS)
    : 3,
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
        channel: "chromium",
        screenshot: "off",
        video: "off",
        trace: "on-all-retries",
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
        video: "off",
        trace: "on-first-retry",
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
        video: "off",
        trace: "on-first-retry",
        javaScriptEnabled: true,
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "MobileChrome",
      dependencies: ["setup"],
      use: {
        ...devices["Pixel 5"],
        trace: "on-first-retry",
      },
    },
    {
      name: "MobileSafari",
      dependencies: ["setup"],
      use: {
        ...devices["iPhone 12"],
        trace: "on-first-retry",
      },
    },
    {
      name: "MicrosoftEdge",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        trace: "on-first-retry",
      },
    },
  ],
});
