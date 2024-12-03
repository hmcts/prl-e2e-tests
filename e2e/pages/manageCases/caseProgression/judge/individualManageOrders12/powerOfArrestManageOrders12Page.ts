import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { PowerOfArrestManageOrders12Content } from "../../../../../fixtures/manageCases/caseProgression/judge/individualManageOrders12/powerOfArrestManageOrders12Content";

interface PowerOfArrestManageOrders12PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
}

enum UniqueSelectors {
  fl404CustomFields_fl404bRiskOfSignificantHarm_Yes = "#fl404CustomFields_fl404bRiskOfSignificantHarm_Yes",
  fl404CustomFields_fl404bRiskOfSignificantHarm_No = "#fl404CustomFields_fl404bRiskOfSignificantHarm_No",
  textInput = "#fl404CustomFields_fl404bPowerOfArrestParagraph",
  inputSpecificDate = ".datepicker-container > .mat-datepicker-input:visible",
}

export class PowerOfArrestManageOrders12Page {
  public static async powerOfArrestManageOrders12Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
  }: PowerOfArrestManageOrders12PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      yesNoManageOrders,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<PowerOfArrestManageOrders12PageOptions>): Promise<void> {
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
        `${Selectors.Span}:text-is("${PowerOfArrestManageOrders12Content.span}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        PowerOfArrestManageOrders12Content,
        "formLabel",
        Selectors.GovukFormLabel,
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
    yesNoManageOrders,
  }: Partial<PowerOfArrestManageOrders12PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.fill(
      UniqueSelectors.textInput,
      PowerOfArrestManageOrders12Content.loremIpsum,
    );
    if (yesNoManageOrders) {
      await page.click(
        UniqueSelectors.fl404CustomFields_fl404bRiskOfSignificantHarm_Yes,
      );
    } else {
      await page.click(
        UniqueSelectors.fl404CustomFields_fl404bRiskOfSignificantHarm_No,
      );
    }
    await page.fill(
      UniqueSelectors.inputSpecificDate,
      PowerOfArrestManageOrders12Content.date,
    );
    await page.waitForTimeout(1000);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
