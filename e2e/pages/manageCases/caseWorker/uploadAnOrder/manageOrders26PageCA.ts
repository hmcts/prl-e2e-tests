import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { Page } from "@playwright/test";
import { ManageOrders26CAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders26CAContent";

interface ManageOrders26PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  selectTypeOfOrder = "#selectTypeOfOrder",
}

enum radioIds {
  cafcassReport = "#cafcassOrCymruNeedToProvideReport_No",
  cafcassInvolvement = "#orderEndsInvolvementOfCafcassOrCymru_No",
  readyToServe = "#doYouWantToServeOrder_No",
  saveOrderAsDraft = "#whatDoWithOrder-saveAsDraft",
}

export class ManageOrders26PageCA {
  public static async manageOrders26PageCA({
    page,
    accessibilityTest,
  }: ManageOrders26PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders26PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders26CAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ManageOrders26CAContent,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${ManageOrders26CAContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<ManageOrders26PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    for (const selector of Object.values(radioIds)) {
      await page.click(selector);
    }
    await page.selectOption(
      UniqueSelectors.selectTypeOfOrder,
      ManageOrders26CAContent.orderType,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
