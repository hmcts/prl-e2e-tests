import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { OtherPeopleInTheCase1Content } from "../../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseRevised1Content.";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ApplicantGender } from "../applicantDetails/applicantDetails1Page";


enum pageLoadFields {

}

enum UniqueSelectors {

}

enum ApplicantAddressFields {
  line1 = "#",
  line2 = "#",
  line3 = "#",
  town = "#",
  county = "#",
  postcode = "#",
  country = "#",
}


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
    yesNoOtherPeopleInTheCase: boolean,
    applicantGender: ApplicantGender, // type ApplicantGender = "female" | "male" | "other";
  ): Promise<void> {}
}
