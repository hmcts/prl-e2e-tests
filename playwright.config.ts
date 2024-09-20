import { defineConfig, devices } from "@playwright/test";
import * as process from "node:process";

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
    timeout: 5 * 60 * 1000,
  },
  reportSlowTests: null,

  /* Opt out of parallel tests on CI. */
  workers: process.env.FUNCTIONAL_TESTS_WORKERS
    ? parseInt(process.env.FUNCTIONAL_TESTS_WORKERS)
    : 1,
  reporter: process.env.CI ? [["html"], ["list"]] : [["list"]],
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        trace: "on",
        javaScriptEnabled: true,
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        screenshot: "off",
        trace: "on",
        javaScriptEnabled: true,
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        screenshot: "off",
        trace: "on",
        javaScriptEnabled: true,
      },
    },
    {
      name: "MobileChrome",
      use: {
        ...devices["Pixel 5"],
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
    {
      name: "MobileSafari",
      use: {
        ...devices["iPhone 12"],
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
    {
      name: "MicrosoftEdge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
  ],
});
