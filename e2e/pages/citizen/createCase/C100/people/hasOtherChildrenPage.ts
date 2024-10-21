import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { HasOtherChildrenContent } from "../../../../../fixtures/citizen/createCase/C100/people/hasOtherChildrenContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { yesNoDontKnow } from "../../../../../common/types";

interface HasOtherChildrenPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100PeopleYesNoDontKnow: yesNoDontKnow;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
}

export class HasOtherChildrenPage {
  public static async hasOtherChildrenPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
  }: HasOtherChildrenPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
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
