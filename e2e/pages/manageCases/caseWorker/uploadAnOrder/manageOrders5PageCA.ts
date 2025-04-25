import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
//import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { ManageOrders5CAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders5CAContent";
import { CommonStaticText } from "../../../../common/commonStaticText";
import config from "../../../../config.ts";

interface manageOrders5PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum radioIds {
  // isTheOrderByConsent_Yes = "#isTheOrderByConsent_Yes",
  wasTheOrderApprovedAtHearing_Yes = "#wasTheOrderApprovedAtHearing_Yes",
  judgeOrMagistrateTitle_herHonourJudge = "#judgeOrMagistrateTitle-herHonourJudge",
  isTheOrderAboutAllChildren_Yes = "#isTheOrderAboutAllChildren_Yes",
}

enum inputIds {
  hearingsType = "#hearingsType",
  judgeOrMagistratesLastName = "#judgeOrMagistratesLastName",
}

enum UniqueSelectors {
  fileUpload = "#uploadOrderDoc",
}

export class ManageOrders5PageCA {
  public static async manageOrders5PageCA({
                                          page,
                                          //accessibilityTest,
                                        }: manageOrders5PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    //await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  // private static async checkPageLoads({
  //                                       page,
  //                                       accessibilityTest,
  //                                     }: Partial<manageOrders5PageOptions>): Promise<void> {
  //   if (!page) {
  //     throw new Error("Page is not defined");
  //   }
  //   const pageTitle = page.locator(
  //     `${Selectors.GovukHeadingL}:text-is("${ManageOrders5CAContent.pageTitle}")`,
  //   );
  //   await pageTitle.waitFor();
  //   await Promise.all([
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.headingH3}:text-is("${ManageOrders5CAContent.headingh3}")`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.p}:text-is("${ManageOrders5CAContent.p}")`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.strong}:text-is("${ManageOrders5CAContent.strong}")`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.hiddenLabel2}"):visible`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.hiddenLabel3}"):visible`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.hiddenLabel4}"):visible`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
  //       3,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}"):visible`,
  //       3,
  //     ),
  //     Helpers.checkGroup(
  //       page,
  //       22,
  //       ManageOrders5CAContent,
  //       "label",
  //       `${Selectors.GovukFormLabel}`,
  //     ),
  //   ]);
  //   if (accessibilityTest) {
  //     await AccessibilityTestHelper.run(page);
  //   }
  // }

  private static async fillInFields({
                                      page,
                                    }: Partial<manageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    for (const selector of Object.values(radioIds)) {
      await page.click(selector);
    }
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.approvedAtAHearing}")`,
      1,
    );
    await page.selectOption(
      inputIds.hearingsType,
      ManageOrders5CAContent.hearing,
    );
    await page.fill(
      inputIds.judgeOrMagistratesLastName,
      ManageOrders5CAContent.judgeFullName,
    );
    await page.waitForTimeout(5000);
    const fileInput = page.locator(`${UniqueSelectors.fileUpload}`);
    await fileInput.setInputFiles(config.testPdfFile);
    await page.waitForTimeout(5000);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
