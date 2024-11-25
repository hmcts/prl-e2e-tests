import { Page } from "@playwright/test";
import { ManageOrders24DAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders24DAContent";
import { Selectors } from "../../../../common/selectors";
import { Fl401SendToGateKeeper1Content } from "../../../../fixtures/manageCases/caseProgression/sendToGateKepper/fl401SendToGateKeeper1Content";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";

interface FL401SendToGateKeeper1Options {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
}

enum UniqueSelectors {
  isSpecificGateKeeperNeeded_Yes = "#isSpecificGateKeeperNeeded_Yes",
  isSpecificGateKeeperNeeded_No = "#isSpecificGateKeeperNeeded_No",
  judge = "#isJudgeOrLegalAdviserGatekeeping-judge",
  legalAdvisor = "#isJudgeOrLegalAdviserGatekeeping-legalAdviser",
  nameOfJudge = "#judgeName",
  judgeName = ".mat-option-text",
}

export class FL401SendToGateKeeper1Page {
  public static async fl401SendToGateKeeper1Page({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
  }: FL401SendToGateKeeper1Options): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, yesNoSendToGateKeeper });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<FL401SendToGateKeeper1Options>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${Fl401SendToGateKeeper1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${Fl401SendToGateKeeper1Content.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${Fl401SendToGateKeeper1Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${Fl401SendToGateKeeper1Content.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}"):visible`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    yesNoSendToGateKeeper,
  }: Partial<FL401SendToGateKeeper1Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (yesNoSendToGateKeeper) {
      await page.check(UniqueSelectors.isSpecificGateKeeperNeeded_Yes);
      await page.click(UniqueSelectors.judge);
      await page.fill(
        `${UniqueSelectors.nameOfJudge}`,
        ManageOrders24DAContent.judgeName,
      );
      await page.click(
        `${UniqueSelectors.judgeName}:text-is("${ManageOrders24DAContent.JudgeNameToSelect}")`,
      );
    } else {
      await page.check(UniqueSelectors.isSpecificGateKeeperNeeded_No);
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}