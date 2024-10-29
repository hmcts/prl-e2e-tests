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

enum radioIds {
  yes = "#ocd_hasOtherChildren",
  no = "#ocd_hasOtherChildren-2",
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
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${OtherChildrenContent.pageTitle}")`,
    );
    console.log("Past other children")
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
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${OtherChildrenContent.errorLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${OtherChildrenContent.errorLink}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    c100PeopleOtherChildrenYes: c100PeopleOtherChildrenYes,
  }: fillInFieldsOptions): Promise<void> {
    await page.click(c100PeopleOtherChildrenYes ? radioIds.yes : radioIds.no);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    console.log("Past other children continue button");
  }
}
