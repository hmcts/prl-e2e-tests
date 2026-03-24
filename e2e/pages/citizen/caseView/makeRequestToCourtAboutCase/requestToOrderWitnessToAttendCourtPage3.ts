import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { RequestToOrderWitnessContent3 } from "../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/requestToOrderWitnessContent3.js";

export class RequestToOrderWitnessToAttendCourtPage3 {
  public static async helpWithFees(
    page: Page,
    needHelpWithFees: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, needHelpWithFees);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
      page.locator(".govuk-caption-l", {
        hasText: RequestToOrderWitnessContent3.caption,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: RequestToOrderWitnessContent3.heading,
      }),
    ).toBeVisible();
    await expect(
      page.getByText(RequestToOrderWitnessContent3.paragraph),
    ).toBeVisible();
    await expect(
      page.getByText(RequestToOrderWitnessContent3.radioLegend),
    ).toBeVisible();
    await expect(page.getByText("Yes")).toBeVisible();
    await expect(page.getByText("No")).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Cancel" })).toBeVisible();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    needHelpWithFees: boolean,
  ): Promise<void> {
    if (needHelpWithFees) {
      await page.getByRole("radio", { name: "Yes" }).check();
    } else {
      await page.getByRole("radio", { name: "No" }).check();
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.getByRole("button", { name: "Continue" }).click();
  }
}
