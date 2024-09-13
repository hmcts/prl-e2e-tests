import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { OtherPeopleInTheCase1Content } from "../../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseRevised1Content.";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

export class OtherPeopleInTheCase1Page {
  public static async otherPeopleInTheCase1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    // await this.checkPageLoads(page, accessibilityTest);
    // if (errorMessaging) {
    //   await this.triggerErrorMessages(page);
    // }
    // await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {}

  private static async triggerErrorMessages(page: Page): Promise<void> {}

  private static async fillInFields(
    page: Page,
    yesNoApplicantDetails: boolean,
    // applicantGender: ApplicantGender,
  ): Promise<void> {}
}
