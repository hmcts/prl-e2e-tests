import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { SolicitorCreate3Content } from "../../../../fixtures/manageCases/createCase/initialJourney/solicitorCreate3Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

enum checkbox {
  checkboxID = "#confidentialityStatementDisclaimer-confidentialityStatementUnderstood",
}

export class SolicitorCreate3Page {
  public static async solicitorCreate3Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${SolicitorCreate3Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SolicitorCreate3Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        SolicitorCreate3Content,
        "strong",
        `${Selectors.strong}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        SolicitorCreate3Content,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${SolicitorCreate3Content.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        SolicitorCreate3Content,
        "li",
        `${Selectors.li}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SolicitorCreate3Content.formLabel}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate3Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SolicitorCreate3Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${SolicitorCreate3Content.errorText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SolicitorCreate3Content.errorText}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(checkbox.checkboxID);
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate3Content.continue}")`,
    );
  }
}
