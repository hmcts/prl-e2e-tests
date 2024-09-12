import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SelectApplicationTypeSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationTypeSubmitContent";
import { SelectApplicationType1Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Content";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";

type typeOfChildArrangementOrder =
  | "Spend time with order"
  | "Live with order"
  | "Both live with and spend time with order";

type courtPermission =
  | "Yes"
  | "No, permission is not required"
  | "No, permission now sought";

export class selectApplicationTypeSubmitPage {
  public static async selectApplicationTypeSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    yesNo: boolean,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page, accessibilityTest, yesNo),
      this.checkFilledFields(page, true),
    ]);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    yesNo: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${SelectApplicationTypeSubmitContent.h2}")`,
    );

    let changeAbleFields: number = yesNo ? 8 : 5;
    await Promise.all([
      Helpers.checkGroup(
        page,
        changeAbleFields + 1,
        SelectApplicationTypeSubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SelectApplicationTypeSubmitContent.text16Change}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${SelectApplicationTypeSubmitContent.a}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${SelectApplicationTypeSubmitContent.h3}")`,
        changeAbleFields,
      ),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkFilledFields(
    page: Page,
    yesNo: boolean,
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
    await this.yesNoRadioButtons(page, true);
    await this.page3RadioButtons(page, "Yes");

    if (yesNo) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${SelectApplicationType1Content.loremIpsumText}")`,
        3,
      );
    }
  }

  private static async yesNoRadioButtons(
    page: Page,
    yesNo: boolean,
  ): Promise<void> {
    let yesOrNo: string = yesNo ? "yes" : "No";
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${yesOrNo}")`,
      4,
    );
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

  private static async page3RadioButtons(
    page: Page,
    p3SelectedRadio: courtPermission,
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${p3SelectedRadio}")`,
      1,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationTypeSubmitContent.saveAndContinue}")`,
    );
  }
}
