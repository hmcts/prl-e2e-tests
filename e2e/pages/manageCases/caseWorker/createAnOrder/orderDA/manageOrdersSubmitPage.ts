import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { AxeUtils } from "@hmcts/playwright-common";
import { ManageOrdersSubmitDAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrdersSubmitDAContent";
import { howLongWillOrderBeInForce } from "./manageOrders12Page";
import { ManageOrders12DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders12DAContent";
import { CommonContent } from "../../../../../fixtures/manageCases/commonContent";

interface ManageOrders20PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
}

export class ManageOrdersSubmitPage {
  public static async manageOrdersSubmitPage({
    page,
    accessibilityTest,
    yesNoManageOrders,
    howLongWillOrderBeInForce,
  }: ManageOrders20PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      yesNoManageOrders,
      howLongWillOrderBeInForce,
    });
    await this.fillInFields({
      page,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    yesNoManageOrders,
    howLongWillOrderBeInForce,
  }: Partial<ManageOrders20PageOptions>): Promise<void> {
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
        3,
        ManageOrdersSubmitDAContent,
        "h2",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        page,
        2,
        ManageOrdersSubmitDAContent,
        "p",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        2,
        ManageOrdersSubmitDAContent,
        "link",
        Selectors.GovLink,
      ),
      Helpers.checkGroup(
        page,
        2,
        ManageOrdersSubmitDAContent,
        "strong",
        Selectors.strong,
      ),
      Helpers.checkGroup(
        page,
        33,
        ManageOrdersSubmitDAContent,
        "sharedText16",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${CommonContent.judgeNameAndEmail}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ManageOrdersSubmitDAContent.spanNonMolestation}")`,
        4,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.addFurtherDetails}")`,
        4,
      ),
    ]);
    if (yesNoManageOrders && howLongWillOrderBeInForce === "untilNextHearing") {
      await Promise.all([
        Helpers.checkGroup(
          page,
          3,
          ManageOrdersSubmitDAContent,
          "yesNoTrueText16",
          Selectors.GovukText16,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${ManageOrdersSubmitDAContent.text16JoeDoe}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${ManageOrdersSubmitDAContent.text16SimonAnderson}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.text16WithNotice}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.text16UntilNextHearing}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${ManageOrdersSubmitDAContent.text16LoremIpsum}")`,
          9,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.yes}"):visible`,
          6,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.text16AddAddressOfProperty}"):visible`,
          1,
        ),
      ]);
    } else if (
      !yesNoManageOrders &&
      howLongWillOrderBeInForce === "noEndDate"
    ) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.text16WithoutNotice}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.text16NoFixedDate}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${ManageOrdersSubmitDAContent.text16LoremIpsum}")`,
          8,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.no}"):visible`,
          4,
        ),
      ]);
    } else if (
      yesNoManageOrders &&
      howLongWillOrderBeInForce === "specificDate"
    ) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          3,
          ManageOrdersSubmitDAContent,
          "yesNoTrueText16",
          Selectors.GovukText16,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${ManageOrdersSubmitDAContent.text16JoeDoe}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${ManageOrdersSubmitDAContent.text16SimonAnderson}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.text16WithNotice}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${ManageOrdersSubmitDAContent.text16LoremIpsum}")`,
          9,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.yes}"):visible`,
          6,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.text16AddAddressOfProperty}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.text16AddAddressOfProperty}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.text16AddAddressOfProperty}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders12DAContent.formLabel16}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrdersSubmitDAContent.specificDate}"):visible`,
          1,
        ),
      ]);
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
