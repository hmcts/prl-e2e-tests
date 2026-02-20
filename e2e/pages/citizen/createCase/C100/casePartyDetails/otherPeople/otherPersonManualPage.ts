import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { Helpers } from "../../../../../../common/helpers";
import { Selectors } from "../../../../../../common/selectors";
import { OtherPersonManualContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonManualContent";
import { AxeUtils } from "@hmcts/playwright-common";

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
        7,
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
      await new AxeUtils(page).audit();
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
