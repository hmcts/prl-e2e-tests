import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Page } from "@playwright/test";
import { ManageOrders30Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders30Content";

interface ManageOrders30PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
}

enum UniqueSelectors {
  directionsToAdmin = "#judgeDirectionsToAdmin",
  yes = "#isOrderCompleteToServe_Yes",
  no = "#isOrderCompleteToServe_No",
}

export class ManageOrders30Page {
  public static async manageOrders30Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
  }: ManageOrders30PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, yesNoManageOrders });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders30PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ManageOrders30Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${ManageOrders30Content.formHint}")`,
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
    yesNoManageOrders,
  }: Partial<ManageOrders30PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.fill(
      UniqueSelectors.directionsToAdmin,
      ManageOrders30Content.loremIpsum,
    );
    if (yesNoManageOrders) {
      await page.click(UniqueSelectors.yes);
    } else {
      await page.click(UniqueSelectors.no);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
