# prl-e2e-tests

## Brief introduction

This application uses Playwright.ts as both a test runner, and framework, and node.js as a runtime environment. It makes use of axe-core accessibility tools, and does not require a SauceLabs tunnel or subscription to run in crossbrowser mode. The tests are set to run five concurrently, this can be altered in the Playwright.config.ts file, as well as timeouts, and other small changes.

We make use of TypeScript, and follow the strict type declarations, no .js files should appear in this repository as .js is disabled.

Should you wish to contribute, please reach out to the PRL team for permissions.

The project is structured in the following manner:

                        ┌──────────────────┐
                        │                  │
                        │      Tests       │
                        │                  │
                        └────────▲─────────┘
                                 │
                                 │
                        ┌──────────────────┐
                        │                  │
                        │     Journeys     │
                        │                  │
                        └────────▲─────────┘
                                 │
                                 │
                        ┌────────────────┐
                        │                │
                  ┌─────►      Pages     ◄─────┐
                  │     │                │     │
                  │     └────────────────┘     │
                  │                            │
          ┌───────┴───────────┐        ┌───────┴───────┐
          │                   │        │               │
          │     Selectors     │        │    Content    │
          │                   │        │               │
          └───────────────────┘        └───────────────┘

### Requirements

To run the application on your pc, please ensure you have the following:

Node.JS >v22.0.0

### Running the application on local environment

Please install the dependencies with the following cmd:

`yarn install`

`yarn configure`

You will also need the config.ts file from a current developer, which should be located in e2e/config.ts, this file should **NEVER** be committed.

### Running the application locally.

Should you wish to run a test locally, I recommend using Intellij Aqua, and you can press the green play button against any of the tests defined in \_\_\_.test.ts.
Should you wish to run in headed mode, you can select modify run configuration, and then change the playwright options, the following are recommended:
`--project chromium --headed`
This runs a test in Chrome, whilst headed.

### Our Jenkins configuration

Should you wish to run the pipeline, you can do so by accessing it in Jenkins, and if you wish to run it against a specific URL, for example a PR branch, the "Build with parameters" is configured to allow you to do so, as well as skip certain applications being tested.
