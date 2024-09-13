import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { OtherPeopleInTheCaseSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import { ApplicantGender } from "../applicantDetails/applicantDetails1Page";

export class OtherPeopleInTheCaseSubmitPage {
  public static async otherPeopleInTheCaseSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    // yesNoApplicantDetails: boolean,
    // applicantGender: ApplicantGender,
  ): Promise<void> {}

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    yesNoApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {}

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    yesNoApplicantDetails: boolean,
  ): Promise<void> {}

  private static async checkFilledData(
    page: Page,
    yesNoApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {}

  private static async continue(page: Page): Promise<void> {
    // await page.click(
    //   `${Selectors.button}:text-is("${ApplicantDetailsSubmitContent.continue}")`,
    // );
  }
}
