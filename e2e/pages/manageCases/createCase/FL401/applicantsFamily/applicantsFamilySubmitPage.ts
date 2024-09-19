import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/applicantsFamily/submitContent";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ApplicantsFamilyContent } from "../../../../../fixtures/manageCases/createCase/FL401/applicantsFamily/applicantsFamilyContent";

export class ApplicantsFamilySubmitPage {
  public static async applicantsFamilySubmitPage(
    page: Page,
    accessibilityTest: boolean,
    applicantHasChildren: boolean,
  ): Promise<void> {
    await this.checkPageContent(page, accessibilityTest, applicantHasChildren);
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    applicantHasChildren: boolean,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page, applicantHasChildren),
      this.checkFilledInData(page, applicantHasChildren),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkPageLoads(
    page: Page,
    applicantHasChildren: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${SubmitContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${SubmitContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.checkInfoLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.change}")`,
        applicantHasChildren ? 2 : 1,
      ),
    ]);
  }

  private static async checkFilledInData(
    page: Page,
    applicantHasChildren: boolean,
  ): Promise<void> {
    if (applicantHasChildren) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          6,
          SubmitContent,
          "text16",
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${SubmitContent.yes}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ApplicantsFamilyContent.exampleFullName}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(ApplicantsFamilyContent.exampleDay, ApplicantsFamilyContent.exampleMonth, ApplicantsFamilyContent.exampleYear)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ApplicantsFamilyContent.exampleApplicantsRelationshipToChild}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ApplicantsFamilyContent.exampleRespondentsRelationshipToChild}")`,
          1,
        ),
      ]);
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.text161}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.no}")`,
        1,
      );
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
    );
  }
}
