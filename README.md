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

### Running the application locally.

Please install the dependencies with the following cmd:

`yarn setup`

This will run this [custom script](https://github.com/hmcts/prl-e2e-tests/blob/master/package.json#L31) defined in the package.json.

Should you wish to run a test locally, I recommend using Intellij Aqua, and you can press the green play button against any of the tests defined in \_\_\_.test.ts.
Should you wish to run in headed mode, you can select modify run configuration, and then change the playwright options, the following are recommended:
`--project chromium --headed`
This runs a test in Chrome, whilst headed.

Should you need to change or create new azure secrets you can run the `get_secrets.sh` [script](https://github.com/hmcts/prl-e2e-tests/blob/master/scripts/get_secrets.sh) from your local prl-e2e-tests directory to generate a new .env file containing the new or updated secrets.

### Our Jenkins configuration

Should you wish to run the pipeline, you can do so by accessing it in Jenkins, and if you wish to run it against a specific URL, for example a PR branch, the "Build with parameters" is configured to allow you to do so, as well as skip certain applications being tested.

### Test Tagging Guidelines

We use the following test tags to categorise and manage our test suite:

- `@nightly`: For tests to be included in the nightly pipeline.
- `@smoke`: For tests to be included in the master pipeline.
- `@regression`: For tests that should only be run as part of major regression testing (e.g., releases or significant changes).
- `@accessibility`: For tests utilising axe-core to check accessibility.
- `@errorMessage`: For tests that trigger and verify error messages.

#### Tagging Rules

1. **General Tagging:**
   - Tag all tests with `@regression`, unless the test is specifically for accessibility.
2. **Nightly Pipeline Tests:**

   - Identify tests for `@nightly`.

3. **Accessibility Tests:**

   - Add accessibility tag `@accessibility` for tests that are run in nightly.

4. **Smoke Tests:**

   - For critical path tests that ensure key functionality is operational, tag them with `@smoke` for inclusion in the master pipeline.

5. **Error Message Validation:**
   - Tests designed to validate error messages should be tagged with `@errorMessage`. These typically would not be run as part of the nightly pipeline

### Notes

- Each test can have multiple tags if it fits into more than one category.
- Regularly review test tagging to maintain a well-organised and efficient test suite.

## Additional Documents:

- [How to use our helper functions](https://cjscommonplatform.sharepoint.com/sites/PrivateLawQA/SitePages/Helper-Functions.aspx)
- [Testing endpoints used in our repo](https://cjscommonplatform.sharepoint.com/sites/PrivateLawQA/SitePages/Testing-endpoints.aspx)
- [Using azure secrets](https://cjscommonplatform.sharepoint.com/sites/PrivateLawQA/SitePages/Using-azure-secrets.aspx)

## Visual Testing

Visual testing in playwright is the process of comparing an expected screenshot of the page with the actual screenshot of the page. However, there are a few things to consider when using visual tests.

### Recording snapshots

In order to match screenshots, they need to be the same. Therefore things like OS, Browser and viewport need to be consistent when creating the snapshots and when running the tests. This is also reflected in the way playwright names the screenshots (although you can choose your own names/rename the generated screenshots).
As a solution to this, it's recommended to use Docker to both create the snapshots and run the tests (locally and on CI). See the [`start_visual_container.sh` script](https://github.com/hmcts/prl-e2e-tests/blob/master/scripts/start_visual_container.sh).

You may also have some UI changes to your service, in which you will need to re-generate any snapshots. Playwright provides a `--update-snapshots` flag to do this.

### Which features to visual test?

Visual tests are better focused on features that are difficult to automate, where the UI is not consistently changing or where the UI is considered critical to the usage of the service.

### Handling dynamic data

Your feature may have dynamic data that could skew visual testing results, fortunately you can use the following options in `toHaveScreenshot()` to mitigate this.

- `clip` - This will choose a select area to screenshot. Useful if you do not want to test the whole page.
- `mask` - This will mask a given locator(s) and be exempt from the comparison test.
- `maxDiffPixelRatio` - This is the ratio of pixels that can be different, likewise `maxDiffPixels` can be used to provide a number of pixels rather than ratio.

See examples in the [tests](https://github.com/hmcts/tcoe-playwright-example/blob/master/playwright-e2e/tests/visual-tests.spec.ts) and the [playwright docs](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-2) for other options.
