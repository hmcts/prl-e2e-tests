import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ChildrenAndRespondentsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondentsSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { C100RespondentDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/respondentDetails/c100RespondentDetails1Content";
import { ChildDetailsRevised1Content } from "../../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsRevised1Content";
import { ChildrenAndRespondents1Content } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondents1Content";

export class ChildrenAndRespondentsSubmitPage {
  public static async childrenAndRespondentsSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoChildrenAndRespondents: boolean,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      yesNoChildrenAndRespondents,
    );
    await this.continue(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    yesNoChildrenAndRespondents: boolean,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page, accessibilityTest, yesNoChildrenAndRespondents),
      this.checkFilledData(page, yesNoChildrenAndRespondents),
    ]);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    yesNoChildrenAndRespondents: boolean,
  ): Promise<void> {
    let changeAbleFields: number = yesNoChildrenAndRespondents ? 7 : 8;
    await Promise.all([
      Helpers.checkGroup(
        page,
        changeAbleFields,
        ChildrenAndRespondentsSubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildrenAndRespondentsSubmitContent.text16Change}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); #TODO Disabled pending ticket FPET-1142
    }
  }

  private static async checkFilledData(
    page: Page,
    yesNoChildrenAndRespondents: boolean,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.respondentFirstName} ${C100RespondentDetails1Content.respondentLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildDetailsRevised1Content.childFirstName} ${ChildDetailsRevised1Content.childLastName}")`,
        1,
      ),
    ]);
    if (yesNoChildrenAndRespondents) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildrenAndRespondentsSubmitContent.mother}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildrenAndRespondentsSubmitContent.text16Yes}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildrenAndRespondentsSubmitContent.other}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildrenAndRespondents1Content.loremIpsum}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildrenAndRespondentsSubmitContent.text16No}")`,
          1,
        ),
      ]);
    }
  }
  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndRespondentsSubmitContent.continue}")`,
    );
  }
}
