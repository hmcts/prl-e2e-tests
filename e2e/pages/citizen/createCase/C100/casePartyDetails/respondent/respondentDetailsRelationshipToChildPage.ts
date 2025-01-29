import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { Relationship } from "../../../../../../common/types.ts";
import { RespondentDetailsRelationshipToChildContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/respondent/respondentDetailsRelationshipToChildContent.ts";
// import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface respondentDetailsRelationshipToChildPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  respondentRelationship: Relationship;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  relationship: Relationship;
}

enum inputIds {
  mother = "#relationshipType",
  father = "#relationshipType-2",
  guardian = "#relationshipType-3",
  specialGuardian = "#relationshipType-4",
  grandparent = "#relationshipType-5",
  other = "#relationshipType-6",
  otherDetails = "#otherRelationshipTypeDetails",
}

export class RespondentRelationshipToChildPage {
  public static async respondentRelationshipToChildPage({
    page,
    accessibilityTest,
    errorMessaging,
    respondentRelationship,
  }: respondentDetailsRelationshipToChildPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      relationship: respondentRelationship,
    });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await Promise.all([
      //wait for two parts of the title to load, split by dynamic content
      page.waitForSelector(
        `${Selectors.GovukHeadingXL}:has-text("${RespondentDetailsRelationshipToChildContent.pageTitle1}")`,
      ),
      page.waitForSelector(
        `${Selectors.GovukHeadingXL}:has-text("${RespondentDetailsRelationshipToChildContent.pageTitle2}")`,
      ),
    ]);
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        RespondentDetailsRelationshipToChildContent,
        "label",
        Selectors.GovukLabel,
      ),
      Helpers.checkGroup(
        page,
        2,
        RespondentDetailsRelationshipToChildContent,
        "hint",
        Selectors.GovukHint,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); //#TODO turn back on once Accessibility Issues: PRL-6588 has been fixed (rerun 20/01/25, issues still exists)
    }
  }
  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${RespondentDetailsRelationshipToChildContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${RespondentDetailsRelationshipToChildContent.errorMessage}")`,
        1,
      ),
    ]);
  }
  private static async fillInFields({
    page,
    relationship,
  }: fillInFieldsOptions): Promise<void> {
    if (!(relationship in inputIds)) {
      throw new Error(
        `The value 'relationship' must be one of 'mother', 'father', 'guardian', 'specialGuardian', 'grandparent', 'other'. You used ${relationship}.`,
      );
    }
    const inputKey = relationship as keyof typeof inputIds;
    await page.click(inputIds[inputKey]);
    if (inputKey == "other") {
      await page.waitForSelector(
        `${Selectors.GovukLabel}:text-is("${RespondentDetailsRelationshipToChildContent.hiddenLabel1}")`,
      );
      await page.fill(
        inputIds.otherDetails,
        RespondentDetailsRelationshipToChildContent.inputRelation,
      );
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
