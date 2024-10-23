import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantRelationshipToChildContent } from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicantRelationshipToChildContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Relationship } from "../../../../../common/types";
import {
  ApplicantPersonalDetailsContent
} from "../../../../../fixtures/citizen/createCase/C100/casePartyDetails/applicantPersonalDetailsContent";

interface applicantPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  relationship: Relationship;
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
  mother = '#relationshipType',
  father = '#relationshipType-2',
  guardian = '#relationshipType-3',
  specialGuardian = '#relationshipType-4',
  grandparent = '#relationshipType-5',
  other = '#relationshipType-6',
}

export class ApplicantRelationshipToChildPage {
  public static async applicantRelationshipToChildPage({
                                      page,
                                      accessibilityTest,
                                      errorMessaging,
                                      relationship,
                                    }: applicantPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      relationship,
    });
  }

  private static async checkPageLoads({
                                        page,
                                        accessibilityTest,
                                      }: checkPageLoadsOptions): Promise<void> {
    await Promise.all([ //wait for two parts of the title to load, split by dynamic content
      page.waitForSelector(`${Selectors.GovukHeadingXL}:has-text("${ApplicantRelationshipToChildContent.pageTitle1}")`),
      page.waitForSelector(`${Selectors.GovukHeadingXL}:has-text("${ApplicantRelationshipToChildContent.pageTitle2}")`)
    ]);

    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        ApplicantPersonalDetailsContent,
        "label",
        Selectors.GovukLabel
      ),
      Helpers.checkGroup(
        page,
        2,
        ApplicantPersonalDetailsContent,
        "hint",
        Selectors.GovukHint
      ),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`
    );

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList}:text-is("${ApplicantRelationshipToChildContent.errorMessage}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ApplicantRelationshipToChildContent.errorMessage}")`,
        1
      ),
    ]);
  }

  private static async fillInFields({
                                      page,
                                      relationship,
                                    }: fillInFieldsOptions): Promise<void> {
    if (!(relationship in Object.keys(inputIds))) {
      throw new Error(
        `The value 'relationship' must be one of 'mother', 'father', 'guardian', 'specialGuardian', 'grandparent', 'other'. You used ${relationship}.`
      );
    }
    let inputKey = relationship as keyof typeof inputIds;
    await page.click(inputIds[inputKey]);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.paddedContinue}")`
    );
  }
}
