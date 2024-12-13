import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { yesNoDontKnow } from "../../../../../common/types";
import { HasOtherChildrenContent } from "../../../../../fixtures/citizen/createCase/C100/people/hasOtherChildrenContent";

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
  c100PeopleYesNoDontKnow: yesNoDontKnow;
}

enum radioIds {
  hasOtherChildren = "#ocd_hasOtherChildren",
  hasOtherChildren_2 = "#ocd_hasOtherChildren-2",
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
      c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${HasOtherChildrenContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await page.waitForSelector(
      `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${HasOtherChildrenContent.errorLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${HasOtherChildrenContent.errorLink}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
  }: fillInFieldsOptions): Promise<void> {
    if (c100PeopleYesNoDontKnow === "yes") {
      await page.click(radioIds.hasOtherChildren);
    } else {
      await page.click(radioIds.hasOtherChildren_2);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
