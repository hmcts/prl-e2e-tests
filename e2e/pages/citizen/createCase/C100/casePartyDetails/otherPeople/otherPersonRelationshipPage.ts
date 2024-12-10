import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { Helpers } from "../../../../../../common/helpers";
import { Selectors } from "../../../../../../common/selectors";
import { Relationship } from "../../../../../../common/types";
import { OtherPersonRelationshipContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonRelationshipContent";

interface applicantPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100OtherPersonRelationship: Relationship;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  c100OtherPersonRelationship: Relationship;
}

enum inputIds {
  mother = "#relationshipType",
  father = "#relationshipType-2",
  guardian = "#relationshipType-3",
  specialGuardian = "#relationshipType-4",
  grandparent = "#relationshipType-5",
  other = "#relationshipType-6",
}

export class OtherPersonRelationshipPage {
  public static async otherPersonRelationshipPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100OtherPersonRelationship,
  }: applicantPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      c100OtherPersonRelationship: c100OtherPersonRelationship,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await Promise.all([
      //wait for two parts of the title to load, split by dynamic content
      page.waitForSelector(
        `${Selectors.GovukHeadingXL}:has-text("${OtherPersonRelationshipContent.pageTitle1}")`,
      ),
      page.waitForSelector(
        `${Selectors.GovukHeadingXL}:has-text("${OtherPersonRelationshipContent.pageTitle2}")`,
      ),
    ]);

    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        OtherPersonRelationshipContent,
        "formLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkGroup(
        page,
        2,
        OtherPersonRelationshipContent,
        "formHint",
        Selectors.GovukHint,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); Accessibility Issues: PRL-6589
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${OtherPersonRelationshipContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherPersonRelationshipContent.errorMessage}")`,
        1,
      ),
    ]);
    await page.click(inputIds.other);
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
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${OtherPersonRelationshipContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherPersonRelationshipContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    c100OtherPersonRelationship,
  }: fillInFieldsOptions): Promise<void> {
    if (!(c100OtherPersonRelationship in inputIds)) {
      throw new Error(
        `The value 'relationship' must be one of 'mother', 'father', 'guardian', 'specialGuardian', 'grandparent', 'other'. You used ${c100OtherPersonRelationship}.`,
      );
    }
    const inputKey = c100OtherPersonRelationship as keyof typeof inputIds;
    await page.click(inputIds[inputKey]);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
