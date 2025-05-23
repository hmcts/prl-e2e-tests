import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { WithdrawApplicationEvent1Content } from "../../../../fixtures/manageCases/caseProgression/withdrawApplication/withdrawApplicationEvent1Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface WithdrawApplicationEvent1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  withdrawApplication: boolean;
}

enum UniqueSelectors {
  withdrawApplicationRadioYes = "#withDrawApplicationData_withDrawApplication_Yes",
  withdrawApplicationRadioNo = "#withDrawApplicationData_withDrawApplication_No",
  withdrawApplicationReason = "#withDrawApplicationData_withDrawApplicationReason",
}

export class WithdrawApplicationEvent1Page {
  public static async withdrawApplicationEvent1Page({
    page,
    accessibilityTest,
    withdrawApplication,
  }: WithdrawApplicationEvent1PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest, withdrawApplication });
    await this.fillInFields({ page, withdrawApplication });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: WithdrawApplicationEvent1PageOptions) {
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${WithdrawApplicationEvent1Content.govUkHeadingL}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${WithdrawApplicationEvent1Content.headingH2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${WithdrawApplicationEvent1Content.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        WithdrawApplicationEvent1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    withdrawApplication,
  }: Partial<WithdrawApplicationEvent1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (withdrawApplication) {
      await page.click(UniqueSelectors.withdrawApplicationRadioYes);
      await Promise.all([
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${WithdrawApplicationEvent1Content.formLabel3}")`,
          1,
        ),
        await page.fill(
          UniqueSelectors.withdrawApplicationReason,
          WithdrawApplicationEvent1Content.inputText,
        ),
      ]);
    } else {
      await page.click(UniqueSelectors.withdrawApplicationRadioNo);
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
