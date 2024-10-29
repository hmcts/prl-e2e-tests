import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { OtherChildrenContent } from "../../../../../fixtures/citizen/createCase/C100/people/otherChildrenContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface OtherChildrenPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100PeopleOtherChildrenYes: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
  c100PeopleOtherChildrenYes: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  c100PeopleOtherChildrenYes: boolean;
}

export class OtherChildrenPage {
  public static async otherChildrenPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    c100PeopleOtherChildrenYes: c100PeopleOtherChildrenYes,
  }: OtherChildrenPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      c100PeopleOtherChildrenYes: c100PeopleOtherChildrenYes,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      c100PeopleOtherChildrenYes: c100PeopleOtherChildrenYes,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
  }: checkPageLoadsOptions): Promise<void> {
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {}

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {}
}
