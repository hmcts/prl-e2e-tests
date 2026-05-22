import { expect, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../../common/commonStaticText.js";

interface RespondentStayingInRefugePageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  respondentStayingInRefuge: boolean;
}

export class RespondentStayingInRefugePage {
  public static async respondentStayingInRefugePage({
    page,
    accessibilityTest,
    respondentStayingInRefuge,
  }: RespondentStayingInRefugePageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, respondentStayingInRefuge);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await expect(
      page.getByRole("heading", { name: "Staying in a refuge" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported.",
      ),
    ).toBeVisible();
    await expect(
      page.getByText("Find out more about refuges at Citizen's Advice (opens in a new tab)."),
    ).toBeVisible();
    await expect(
      page.getByText(/Does .* currently live in a refuge\?/),
    ).toBeVisible();
    await expect(page.getByText("Yes", { exact: true })).toBeVisible();
    await expect(page.getByText("No", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("button", { name: CommonStaticText.continue }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: CommonStaticText.saveAndComeBackLater }),
    ).toBeVisible();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    respondentStayingInRefuge: boolean,
  ): Promise<void> {
    await page
      .getByRole("radio", { name: respondentStayingInRefuge ? "Yes" : "No" })
      .check();
    await page.getByRole("button", { name: CommonStaticText.continue }).click();
  }
}
