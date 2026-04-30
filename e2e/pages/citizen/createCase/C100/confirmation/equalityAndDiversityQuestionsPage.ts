import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";

enum content {
  button = "I don't want to answer these questions",
}

interface EqualityAndDiversityPageOptions {
  page: Page;
}

export class EqualityAndDiversityPage {
  public static async equalityAndDiversityPage({
    page,
  }: EqualityAndDiversityPageOptions): Promise<void> {
    // Sometimes this service seems to be flaky so refresh the page if it is down and then fail the test if still not working
    await expect
      .poll(
        async () => {
          const serviceProblemVisible = await page
            .getByRole("heading", {
              name: "Sorry, there is a problem with the service",
            })
            .isVisible();

          if (serviceProblemVisible) {
            await page.reload();
          }
          return serviceProblemVisible;
        },
        {
          // Retry every 5 seconds
          intervals: [5_000],
          // Timeout after 15 seconds
          timeout: 15_000,
        },
      )
      .toBeFalsy();
    await page.click(`${Selectors.GovukButton}:text-is("${content.button}")`);
  }
}
