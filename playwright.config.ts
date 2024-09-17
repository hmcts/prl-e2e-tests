import { defineConfig, devices } from "@playwright/test";

module.exports = defineConfig({
  testDir: "./e2e/tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 2, // Set the number of retries for all projects

  timeout: 4 * 60 * 1000,
  expect: {
    timeout: 5 * 30 * 1000,
  },
  reportSlowTests: null,

  /* Opt out of parallel tests on CI. */
  workers: process.env.FUNCTIONAL_TESTS_WORKERS ? 5 : 5,
  reporter: process.env.CI ? "html" : "list",
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/
    },
    {
      name: "chromium",
      dependencies: ['setup'],
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        trace: "on",
        javaScriptEnabled: true,
      },
    },
    {
      name: "firefox",
      dependencies: ['setup'],
      use: {
        ...devices["Desktop Firefox"],
        screenshot: "off",
        trace: "on",
        javaScriptEnabled: true,
      },
    },
    {
      name: "webkit",
      dependencies: ['setup'],
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
