import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ChildrenAndRespondents1Content } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondents1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum UniqueSelectors {
  respondentsRelationshipInput = "#buffChildAndRespondentRelations_0_childAndRespondentRelation",
  childLiveWithThisPersonYes = "#buffChildAndRespondentRelations_0_childLivesWith_Yes",
  childLiveWithThisPersonNo = "#buffChildAndRespondentRelations_0_childLivesWith_No",
}

enum dtAndDdTags {
  respondentsFullNameLabel = "#buffChildAndRespondentRelations_0_0 > fieldset > ccd-field-read > div > ccd-field-read-label > div > .case-field > dt", // this picks up both labels
  respondentsFullName = "",
  childNameLabel = "",
  childName = "",
}

export class ChildrenAndRespondents1Page {
  public static async childrenAndRespondents1Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    // if (errorMessaging) {
    //   await this.triggerErrorMessages(page);
    // }
    // await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${ChildrenAndRespondents1Content.h21}")`,
    );
    await Promise.all([
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ChildrenAndRespondents1Content.pageTitle}")`,
        1,
      ),
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ChildrenAndRespondents1Content.h22}")`,
        1,
      ),
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ChildrenAndRespondents1Content.h3}")`,
        1,
      ),
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ChildrenAndRespondents1Content.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildrenAndRespondents1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildrenAndRespondents1Content.formLabelYes}")`,
        1,
      ),
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildrenAndRespondents1Content.formLabelNo}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndRespondents1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ChildrenAndRespondents1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndRespondents1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndRespondents1Content.errorBanner}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {}
}
