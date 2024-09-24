import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ChildrenAndOtherPeople1Content } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndOtherPeople/childrenAndOtherPeople1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum UniqueSelectors {
  relationshipDropdown = "#buffChildAndOtherPeopleRelations_0_childAndOtherPeopleRelation",
  giveDetailsForOtherRelationshipInput = "#buffChildAndOtherPeopleRelations_0_childAndOtherPeopleRelationOtherDetails",
  childLiveWithThisPersonYes = "#buffChildAndOtherPeopleRelations_0_childLivesWith_Yes",
  childLiveWithThisPersonNo = "#buffChildAndOtherPeopleRelations_0_childLivesWith_No",
  identityConfidentialityYes = "#buffChildAndOtherPeopleRelations_0_isChildLivesWithPersonConfidential_Yes",
  identityConfidentialityNo = "#buffChildAndOtherPeopleRelations_0_isChildLivesWithPersonConfidential_No",
}

enum nameSelectors {
  nameSelector = ".case-field__label",
}

export class ChildrenAndOtherPeople1Page {
  public static async childrenAndOtherPeople1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNoChildrenAndOtherPeople: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page, yesNoChildrenAndOtherPeople);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${ChildrenAndOtherPeople1Content.h21}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ChildrenAndOtherPeople1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ChildrenAndOtherPeople1Content.h22}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ChildrenAndOtherPeople1Content.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ChildrenAndOtherPeople1Content.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildrenAndOtherPeople1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${nameSelectors.nameSelector}:text-is("${ChildrenAndOtherPeople1Content.formLabelOtherFullName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${nameSelectors.nameSelector}:text-is("${ChildrenAndOtherPeople1Content.formLabelChildName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildrenAndOtherPeople1Content.fullNameOther}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildrenAndOtherPeople1Content.fullNameChild}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildrenAndOtherPeople1Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildrenAndOtherPeople1Content.formLabelNo}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndOtherPeople1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ChildrenAndOtherPeople1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndOtherPeople1Content.errorMessageRespondentsRelationship}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndOtherPeople1Content.errorMessageRespondentsRelationship}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndOtherPeople1Content.errorMessageDoesChildLiveWithPerson}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndOtherPeople1Content.errorMessageDoesChildLiveWithPerson}")`,
        1,
      ),
    ]);
    await page.waitForTimeout(1000);
    await page.selectOption(
      `${UniqueSelectors.relationshipDropdown}`,
      ChildrenAndOtherPeople1Content.selectionForOtherRelationship,
    );
    await page.waitForTimeout(1000);
    await page.click(`${UniqueSelectors.childLiveWithThisPersonYes}`);
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndOtherPeople1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndOtherPeople1Content.errorMessageRelationshipOtherGiveDetails}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndOtherPeople1Content.errorMessageRelationshipOtherGiveDetails}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndOtherPeople1Content.errorMessageIdentityOfOtherConfidential}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndOtherPeople1Content.errorMessageIdentityOfOtherConfidential}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    yesNoChildrenAndOtherPeople: boolean,
  ): Promise<void> {}

  private static async giveDetailsOtherRelationshipStaticText(
    page: Page,
  ): Promise<void> {}

  private static async identityConfidentialityFormLabel(
    page: Page,
  ): Promise<void> {}
}
