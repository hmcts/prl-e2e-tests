import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ChildrenAndRespondents1Content } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondents1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum UniqueSelectors {
  respondentsRelationshipDropdown = "#buffChildAndRespondentRelations_0_childAndRespondentRelation",
  giveDetailsForOtherRelationshipInput = "#buffChildAndRespondentRelations_0_childAndRespondentRelationOtherDetails",
  childLiveWithThisPersonYes = "#buffChildAndRespondentRelations_0_childLivesWith_Yes",
  childLiveWithThisPersonNo = "#buffChildAndRespondentRelations_0_childLivesWith_No",
}

enum nameSelectors {
  nameSelector = ".case-field__label",
}

export class ChildrenAndRespondents1Page {
  public static async childrenAndRespondents1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNoChildrenAndRespondents: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page, yesNoChildrenAndRespondents);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${ChildrenAndRespondents1Content.h21}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ChildrenAndRespondents1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ChildrenAndRespondents1Content.h22}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ChildrenAndRespondents1Content.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
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
      Helpers.checkVisibleAndPresent(
        page,
        `${nameSelectors.nameSelector}:text-is("${ChildrenAndRespondents1Content.respondentsNameFormLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${nameSelectors.nameSelector}:text-is("${ChildrenAndRespondents1Content.childNameFormLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildrenAndRespondents1Content.fullNameRespondent}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildrenAndRespondents1Content.fullNameChild}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildrenAndRespondents1Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildrenAndRespondents1Content.formLabelNo}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page);
    }
  }
  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndRespondents1Content.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndRespondents1Content.continue}")`,
    );
    await page.waitForTimeout(1000);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ChildrenAndRespondents1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndRespondents1Content.errorMessageRespondentsRelationship}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndRespondents1Content.errorMessageRespondentsRelationship}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndRespondents1Content.errorMessageDoesChildLiveWithPerson}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndRespondents1Content.errorMessageDoesChildLiveWithPerson}")`,
        1,
      ),
    ]);
    await page.waitForTimeout(1000);
    await page.selectOption(
      `${UniqueSelectors.respondentsRelationshipDropdown}`,
      ChildrenAndRespondents1Content.selectionForOtherRelationship,
    );
    await page.waitForTimeout(1000);
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndRespondents1Content.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndRespondents1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndRespondents1Content.errorMessageDoesChildLiveWithPerson}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndRespondents1Content.errorMessageDoesChildLiveWithPerson}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndRespondents1Content.errorMessageRelationshipOtherGiveDetails}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndRespondents1Content.errorMessageRelationshipOtherGiveDetails}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    yesNoChildrenAndRespondents: boolean,
  ): Promise<void> {
    if (yesNoChildrenAndRespondents) {
      await page.selectOption(
        `${UniqueSelectors.respondentsRelationshipDropdown}`,
        ChildrenAndRespondents1Content.selectionForMotherRelationship,
      );
      await page.click(`${UniqueSelectors.childLiveWithThisPersonYes}`);
    } else {
      await page.selectOption(
        `${UniqueSelectors.respondentsRelationshipDropdown}`,
        ChildrenAndRespondents1Content.selectionForOtherRelationship,
      );
      await page.fill(
        `${UniqueSelectors.giveDetailsForOtherRelationshipInput}`,
        ChildrenAndRespondents1Content.loremIpsum,
      );
      await this.giveDetailsOtherRelationshipStaticText(page);
      await page.click(`${UniqueSelectors.childLiveWithThisPersonNo}`);
    }
    await page.waitForTimeout(1000);
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndRespondents1Content.continue}")`,
    );
  }

  private static async giveDetailsOtherRelationshipStaticText(
    page: Page,
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${ChildrenAndRespondents1Content.formLabelOtherRelationship}")`,
      1,
    );
  }
}
