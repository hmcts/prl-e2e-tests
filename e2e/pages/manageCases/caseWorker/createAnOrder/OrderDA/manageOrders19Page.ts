import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Content";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders19Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders19Content";

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
      `${Selectors.h1}:text-is("${ManageOrders1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrders19Content.span}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders19Content.h2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders19Content.p}"):visible`,
        1,
      ),
      Helpers.checkGroup(page, 2, ManageOrders19Content, "h3", Selectors.h3),
      Helpers.checkGroup(
        page,
        2,
        ManageOrders19Content,
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
      ManageOrders19Content.judgement,
    );
    await page.click(UniqueSelectors.dateToBeFixed);
    await this.hiddenFormLabels(page);
    await page.fill(
      UniqueSelectors.ordersHearingDetails_0_additionalDetailsForHearingDateOptions,
      ManageOrders19Content.lorem,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async hiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ManageOrders19Content.strong}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${ManageOrders19Content.HiddenFormHint}"):visible`,
        1,
      ),
    ]);
  }
}
