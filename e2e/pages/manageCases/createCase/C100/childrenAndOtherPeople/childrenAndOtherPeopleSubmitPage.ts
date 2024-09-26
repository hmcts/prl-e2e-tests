import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ChildrenAndRespondentsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondentsSubmitContent";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ChildrenAndOtherPeople1Content } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndOtherPeople/childrenAndOtherPeople1Content";
import { ChildrenAndOtherPeopleSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndOtherPeople/childrenAndOtherPeopleSubmitContent";

export class ChildrenAndOtherPeopleSubmitPage {
  public static async childrenAndOtherPeopleSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoChildrenAndOtherPeople: boolean,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      yesNoChildrenAndOtherPeople,
    );
    console.log("stop");
    await this.continue(page);
  }

  public static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    yesNoChildrenAndOtherPeople: boolean,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      accessibilityTest,
      yesNoChildrenAndOtherPeople,
    );
    await this.checkFilledData(page, yesNoChildrenAndOtherPeople);
  }

  public static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    yesNoChildrenAndOtherPeople: boolean,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ChildrenAndOtherPeopleSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ChildrenAndRespondentsSubmitContent.h2}")`,
        1,
      ),
    ]);
    if (yesNoChildrenAndOtherPeople) {
      await Helpers.checkGroup(
        page,
        8,
        ChildrenAndOtherPeopleSubmitContent,
        "text161",
        `${Selectors.GovukText16}`,
      );
    } else {
      await Helpers.checkGroup(
        page,
        8,
        ChildrenAndOtherPeopleSubmitContent,
        "text162",
        `${Selectors.GovukText16}`,
      );
    }
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page);
    }
  }

  public static async checkFilledData(
    page: Page,
    yesNoChildrenAndOtherPeople: boolean,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ChildrenAndOtherPeople1Content,
        "text16",
        Selectors.GovukText16,
      ),
    ]);
    if (yesNoChildrenAndOtherPeople) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildrenAndOtherPeople1Content.selectionForFatherRelationship}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildrenAndOtherPeople1Content.formLabelYes}")`,
          2,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildrenAndOtherPeople1Content.selectionForOtherRelationship}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildrenAndOtherPeople1Content.loremIpsum}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildrenAndOtherPeople1Content.formLabelNo}")`,
          1,
        ),
      ]);
    }
  }

  public static async continue(page: Page): Promise<void> {
    await page
      .locator(
        `${Selectors.button}:text-is("${ChildrenAndOtherPeopleSubmitContent.continue}")`,
      )
      .waitFor({
        state: "visible",
      });
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndOtherPeopleSubmitContent.continue}")`,
    );
  }
}
