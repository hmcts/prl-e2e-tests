import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders19DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19DAContent";

interface ManageOrders19PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  Dropdown = "#ordersHearingDetails_0_hearingTypes",
  dateToBeFixed = "#ordersHearingDetails_0_hearingDateConfirmOptionEnum-dateToBeFixed",
  ordersHearingDetails_0_additionalDetailsForHearingDateOptions = "#ordersHearingDetails_0_additionalDetailsForHearingDateOptions",
}

export class ManageOrders19Page {
  public static async manageOrders19Page({
    page,
    accessibilityTest,
  }: ManageOrders19PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({
      page,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders19PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrders19DAContent.span}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders19DAContent.h2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders19DAContent.p}"):visible`,
        1,
      ),
      Helpers.checkGroup(page, 2, ManageOrders19DAContent, "h3", Selectors.h3),
      Helpers.checkGroup(
        page,
        2,
        ManageOrders19DAContent,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<ManageOrders19PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.selectOption(
      UniqueSelectors.Dropdown,
      ManageOrders19DAContent.judgement,
    );
    await page.click(UniqueSelectors.dateToBeFixed);
    await this.hiddenFormLabels(page);
    await page.fill(
      UniqueSelectors.ordersHearingDetails_0_additionalDetailsForHearingDateOptions,
      ManageOrders19DAContent.lorem,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async hiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ManageOrders19DAContent.strong}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${ManageOrders19DAContent.HiddenFormHint}"):visible`,
        1,
      ),
    ]);
  }
}
