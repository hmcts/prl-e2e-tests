import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { ListOfApplications2Content } from "../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/listOfApplications2Content.ts";

export class ListOfApplications3Page {
  public static async listOfApplications3Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
      page.getByRole("heading", {
        name: "Make a request to the court about your case",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Select a form to make an application in your court proceedings.",
      ),
    ).toBeVisible();
    await expect(
      page.locator(".govuk-accordion__section-heading-text-focus", {
        hasText:
          "Ask the court to prevent questioning in person when accusations of abuse have been made",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "If you have accused someone in the case of abuse and want the court to prevent in-person questioning, complete and submit form EX740.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText(
        "If someone has accused you, complete and submit form EX741.",
      ),
    ).toBeVisible();
    await expect(
      page.locator(".govuk-accordion__section-heading-text-focus", {
        hasText:
          "Ask for an order authorising search for, taking charge of and delivery of a child",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "If you want to ask for an order authorising search for, taking charge of and delivery of a child, you need to complete and submit the form C3.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Apply to the court using form C3" }),
    ).toBeVisible();
    await expect(
      page.locator(".govuk-accordion__section-heading-text-focus", {
        hasText: "Make a request to order a witness to attend court",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "You can ask the court to order a witness to attend or bring in documents by completing and submitting the form FP25.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: " Apply to the court using form FP25" }),
    ).toBeVisible();
    await expect(
      page.locator(".govuk-accordion__section-heading-text-focus", {
        hasText:
          "Request the court acts when someone in the case is disobeying a court order",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "If you believe someone is disobeying a court order or is unfairly influencing proceedings you can complete and submit form FC600 to request the court takes action. This is also known as 'contempt of court.'",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: " Apply to the court using form FC600" }),
    ).toBeVisible();
    await expect(
      page.locator(".govuk-pagination__link-title", {
        hasText: ListOfApplications2Content.paginationPrevious,
      }),
    ).toBeVisible();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
