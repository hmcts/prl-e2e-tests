import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Submit2Content } from "../../../../../fixtures/manageCases/createCase/C100/submit/submit2Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Submit1Content } from "../../../../../fixtures/manageCases/createCase/C100/submit/submit1Content.ts";

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
    // added extra long timeout because timing for the event to complete it very temperamental
    await expect(
      page.locator(
        `${Selectors.alertMessage}:has-text("${Submit2Content.confirmationMessage}")`,
      ),
    ).toBeVisible({timeout: 30000});
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
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
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(`${UniqueSelectors.payAgreeStatementAgree}`);
  }
}
