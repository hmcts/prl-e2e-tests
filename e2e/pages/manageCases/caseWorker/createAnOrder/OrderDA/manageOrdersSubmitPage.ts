import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1Content";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrdersSubmitContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrdersSubmitContent";

interface ManageOrders20PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
}

export class ManageOrdersSubmitPage {
  public static async manageOrdersSubmitPage({
    page,
    accessibilityTest,
    yesNoManageOrders,
  }: ManageOrders20PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest, yesNoManageOrders });
    await this.fillInFields({
      page,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    yesNoManageOrders,
  }: Partial<ManageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        ManageOrdersSubmitContent,
        "h2",
        Selectors.h2,
      ),
      Helpers.checkGroup(page, 2, ManageOrdersSubmitContent, "p", Selectors.p),
      Helpers.checkGroup(page, 2, ManageOrdersSubmitContent, "a", Selectors.a),
      Helpers.checkGroup(
        page,
        2,
        ManageOrdersSubmitContent,
        "strong",
        Selectors.strong,
      ),
      Helpers.checkGroup(
        page,
        34,
        ManageOrdersSubmitContent,
        "sharedText16",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrdersSubmitContent.spanNonMolestation}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitContent.addFurtherDetails}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrdersSubmitContent.text16LoremIpsumExtended}")`,
        1,
      ),
    ]);
    if (yesNoManageOrders) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          3,
          ManageOrdersSubmitContent,
          "yesNoTrueText16",
          Selectors.GovukText16,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${ManageOrdersSubmitContent.text16JoeDoe}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${ManageOrdersSubmitContent.text16SimonAnderson}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitContent.text16WithNotice}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitContent.text16UntilNextHearing}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${ManageOrdersSubmitContent.text16LoremIpsum}")`,
          9,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.yes}"):visible`,
          4,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitContent.text16AddAddressOfProperty}"):visible`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitContent.text16WithoutNotice}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitContent.text16NoFixedDate}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${ManageOrdersSubmitContent.text16LoremIpsum}")`,
          8,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.no}"):visible`,
          4,
        ),
      ]);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<ManageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
