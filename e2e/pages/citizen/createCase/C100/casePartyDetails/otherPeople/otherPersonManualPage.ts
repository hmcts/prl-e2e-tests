import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { Helpers } from "../../../../../../common/helpers";
import { Selectors } from "../../../../../../common/selectors";
import { OtherPersonManualContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonManualContent";
// import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper.ts";

interface otherPersonManualOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  errorMessaging: boolean;
}

export class OtherPersonManualPage {
  public static async otherPersonManualPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: otherPersonManualOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({
      page,
      errorMessaging,
    });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${OtherPersonManualContent.pageTitle} ${OtherPersonManualContent.firstNameLastName}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        OtherPersonManualContent,
        "govukLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${OtherPersonManualContent.govukHint}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); //#TODO turn back on once Accessibility Issues: PRL-6590 has been fixed (rerun 20/01/25, issue still exists)
    }
  }

  private static async fillInFields({
    page,
  }: fillInFieldsOptions): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
