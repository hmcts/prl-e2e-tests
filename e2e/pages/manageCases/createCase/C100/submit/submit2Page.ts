import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Submit2Content } from "../../../../../fixtures/manageCases/createCase/C100/submit/submit2Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Submit1Content } from "../../../../../fixtures/manageCases/createCase/C100/submit/submit1Content";

interface Submit2PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  payAgreeStatementAgree = "#submitAgreeStatement-agree",
}

export class Submit2Page {
  public static async submit2Page({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Submit2PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields(page);
    await Helpers.clickButton(page, Submit2Content.submit);
    await expect(
      page.locator(
        `${Selectors.alertMessage}:has-text("${Submit2Content.confirmationMessage}")`,
      ),
    ).toBeVisible();
  }

  private static async checkPageLoads({
    page: page,
  }: Submit2PageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h3}:text-is("${Submit2Content.h3}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Submit1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${Submit2Content.formLabelAgreeWithStatement}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${Submit2Content.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${Submit2Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${Submit2Content.p21}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${Submit2Content.p22}")`,
        1,
      ),
    ]);
    await AccessibilityTestHelper.run(page);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(`${UniqueSelectors.payAgreeStatementAgree}`);
  }
}
