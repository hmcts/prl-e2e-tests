import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { SelectApplicationTypeSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationTypeSubmitContent.ts";
import { SelectApplicationType1Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Content.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers.ts";
import config from "../../../../../utils/config.utils.ts";
import path from "path";
import { radioButtons } from "./selectApplicationType3Page.ts";

type typeOfChildArrangementOrder =
  | "Spend time with order"
  | "Live with order"
  | "Both live with and spend time with order";

export class selectApplicationTypeSubmitPage {
  public static async selectApplicationTypeSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    yesNo: boolean,
    permissionSelection: radioButtons,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page, accessibilityTest, yesNo, permissionSelection),
      this.checkFilledFields(page, yesNo, permissionSelection),
    ]);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    yesNo: boolean,
    permissionSelection: radioButtons,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${SelectApplicationTypeSubmitContent.h2}")`,
    );
    const changeAbleFields: number = yesNo ? 11 : 6;
    await Promise.all([
      Helpers.checkGroup(
        page,
        changeAbleFields,
        SelectApplicationTypeSubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${SelectApplicationTypeSubmitContent.h3}")`,
        1,
      ),
    ]);
    if (yesNo) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SelectApplicationTypeSubmitContent.text16Yes}")`,
        3,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovLink}:text-is("${path.basename(config.testPdfFile)}")`,
        2,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SelectApplicationTypeSubmitContent.text16Change}")`,
        11,
      );
    } else if (permissionSelection === "No, permission now sought") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SelectApplicationTypeSubmitContent.text16No}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SelectApplicationTypeSubmitContent.text16Change}")`,
        9,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SelectApplicationTypeSubmitContent.text16No}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SelectApplicationTypeSubmitContent.text16Change}")`,
        6,
      );
    }

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkFilledFields(
    page: Page,
    yesNo: boolean,
    permissionSelection: radioButtons,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        SelectApplicationTypeSubmitContent,
        "text16Answer",
        `${Selectors.GovukText16}`,
      ),
    ]);

    await this.page1RadioButtons(page, "Spend time with order");

    if (yesNo && permissionSelection === "Yes") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${SelectApplicationType1Content.loremIpsumText}")`,
        3,
      );
    } else if (
      (yesNo && permissionSelection === "No, permission now sought") ||
      (yesNo && permissionSelection === "No, permission is not required")
    ) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${SelectApplicationType1Content.loremIpsumText}")`,
        2,
      );
    }
    await this.continue(page);
  }

  private static async page1RadioButtons(
    page: Page,
    p1SelectedRadio: typeOfChildArrangementOrder,
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${p1SelectedRadio}")`,
      1,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationTypeSubmitContent.saveAndContinue}")`,
    );
  }
}
