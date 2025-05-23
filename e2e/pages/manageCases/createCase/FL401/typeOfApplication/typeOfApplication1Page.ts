import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { TypeOfApplication1Content } from "../../../../../fixtures/manageCases/createCase/FL401/typeOfApplication/typeOfApplication1Content";

enum applicationOrderSelectionIds {
  nonMolestationOrder = "#typeOfApplicationOrders_orderType-nonMolestationOrder",
  occupationOrder = "#typeOfApplicationOrders_orderType-occupationOrder",
}

export class TypeOfApplication1Page {
  public static async typeOfApplication1Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
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
      `${Selectors.GovukHeadingL}:text-is("${TypeOfApplication1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${TypeOfApplication1Content.p1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        TypeOfApplication1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${TypeOfApplication1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${TypeOfApplication1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummary}:has-text("${TypeOfApplication1Content.errorText}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${TypeOfApplication1Content.errorText}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    for (const selector of Object.values(applicationOrderSelectionIds)) {
      const checkbox = page.locator(selector);
      await checkbox.check();
    }
    await page.click(
      `${Selectors.button}:text-is("${TypeOfApplication1Content.continue}")`,
    );
  }
}
