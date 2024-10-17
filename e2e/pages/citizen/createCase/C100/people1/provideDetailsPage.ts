import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ProvideDetailsContent } from "../../../../../fixtures/citizen/createCase/C100/people1/provideDetailsContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ApplicantGender } from "../../../../../common/types";

interface ProvideDetailsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  gender: ApplicantGender;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
  gender: ApplicantGender;
}

interface fillInFieldsOptions {
  page: Page;
  gender: ApplicantGender;
}

export class ProvideDetailsPage {
  public static async provideDetailsPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    gender: gender,
  }: ProvideDetailsPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      gender: gender,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      gender: gender,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    gender: gender,
  }: checkPageLoadsOptions): Promise<void> {
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {}

  private static async fillInFields({
    page: page,
    gender: gender,
  }: fillInFieldsOptions): Promise<void> {}
}
