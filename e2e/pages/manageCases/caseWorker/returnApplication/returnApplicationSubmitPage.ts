import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ReturnApplicationSubmitContent } from "../../../../fixtures/manageCases/caseWorker/returnApplication/returnApplicationSubmitContent";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { solicitorCaseCreateType } from "../../../../common/types";

interface ReturnApplicationSubmitPageOptions {
  page: Page;
  caseType: solicitorCaseCreateType;
  accessibilityTest: boolean;
}

export class ReturnApplicationSubmitPage {
  public static async returnApplicationSubmitPage({
    page,
    caseType,
    accessibilityTest,
  }: ReturnApplicationSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({ page, caseType, accessibilityTest });
    await Helpers.clickButton(page, CommonStaticText.saveAndContinue);
    await expect(
      page.locator(
        `${Selectors.alertMessage}:has-text("${ReturnApplicationSubmitContent.confirmationMessage}")`,
      ),
    ).toBeVisible();
  }

  private static async checkPageLoads({
    page,
    caseType,
    accessibilityTest,
  }: Partial<ReturnApplicationSubmitPageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ReturnApplicationSubmitContent.govUkHeadingL}")`,
    );
    await pageTitle.waitFor({ state: "visible" });
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h2}:text-is("${ReturnApplicationSubmitContent.headingH2}")`,
      1,
    );
    await Helpers.checkGroup(
      page,
      2,
      ReturnApplicationSubmitContent,
      "h3",
      Selectors.h3,
    );
    await Helpers.checkGroup(
      page,
      2,
      ReturnApplicationSubmitContent,
      "text16",
      Selectors.GovukText16,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${ReturnApplicationSubmitContent.returnReason}")`,
      1,
    );
    if (caseType == "C100") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:has-text("${ReturnApplicationSubmitContent.c100ReturnMessageContent}")`,
        1,
      );
    }
    if (caseType == "FL401") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:has-text("${ReturnApplicationSubmitContent.fl401ReturnMessageContent}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
