import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ApplicantsFamilyContent } from "../../../../../fixtures/manageCases/createCase/FL401/applicantsFamily/applicantsFamilyContent";

enum radioIds {
  doesApplicantHaveChildren_Yes = "#applicantFamilyDetails_doesApplicantHaveChildren_Yes",
  doesApplicantHaveChildren_No = "#applicantFamilyDetails_doesApplicantHaveChildren_No",
  applicantRespondentShareParental_Yes = "#applicantChildDetails_0_applicantRespondentShareParental_Yes",
  applicantRespondentShareParental_No = "#applicantChildDetails_0_applicantRespondentShareParental_No",
}

enum inputIds {
  fullName = "#applicantChildDetails_0_fullName",
  dateOfBirth_day = "#dateOfBirth-day",
  dateOfBirth_month = "#dateOfBirth-month",
  dateOfBirth_year = "#dateOfBirth-year",
  applicantChildRelationship = "#applicantChildDetails_0_applicantChildRelationship",
  respondentChildRelationship = "#applicantChildDetails_0_respondentChildRelationship",
}

export class ApplicantsFamilyPage {
  public static async applicantsFamilyPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    applicantHasChildren: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, accessibilityTest, applicantHasChildren);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ApplicantsFamilyContent.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ApplicantsFamilyContent.textOnPage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ApplicantsFamilyContent.questionLabel}")`,
        1,
      ),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {}

  private static async fillInFields(
    page: Page,
    accessibilityTest: boolean,
    applicantHasChildren: boolean,
  ): Promise<void> {
    if (applicantHasChildren) {
      await page.click(radioIds.doesApplicantHaveChildren_Yes);
      await page.click(
        `${Selectors.button}:text-is("${ApplicantsFamilyContent.addNew}")`,
      );
      await page.click(radioIds.applicantRespondentShareParental_Yes);
      await this.checkFormLoads(page, accessibilityTest);

      await page.fill(
        `${inputIds.fullName}`,
        ApplicantsFamilyContent.exampleFullName,
      );
      await page.fill(
        `${inputIds.dateOfBirth_day}`,
        ApplicantsFamilyContent.exampleDay,
      );
      await page.fill(
        `${inputIds.dateOfBirth_month}`,
        ApplicantsFamilyContent.exampleMonth,
      );
      await page.fill(
        `${inputIds.dateOfBirth_year}`,
        ApplicantsFamilyContent.exampleYear,
      );
      await page.fill(
        `${inputIds.applicantChildRelationship}`,
        ApplicantsFamilyContent.exampleApplicantsRelationshipToChild,
      );
      await page.fill(
        `${inputIds.respondentChildRelationship}`,
        ApplicantsFamilyContent.exampleRespondentsRelationshipToChild,
      );
    } else {
    }
  }

  private static async checkFormLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Helpers.checkGroup(
      page,
      8,
      ApplicantsFamilyContent,
      "formLabel",
      `${Selectors.GovukFormLabel}`,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
