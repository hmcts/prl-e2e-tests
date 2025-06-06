import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { SolicitorCreate6Content } from "../../../../fixtures/manageCases/createCase/initialJourney/solicitorCreate6Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

export class SolicitorCreate6Page {
  public static async solicitorCreate6Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${SolicitorCreate6Content.subTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SolicitorCreate6Content.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${SolicitorCreate6Content.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        SolicitorCreate6Content,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkGroup(
        page,
        4,
        SolicitorCreate6Content,
        "li",
        `${Selectors.li}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SolicitorCreate6Content.formLabel}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate6Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SolicitorCreate6Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${SolicitorCreate6Content.errorText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SolicitorCreate6Content.errorText}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(Selectors.formControl);
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreate6Content.continue}")`,
    );
  }
}
