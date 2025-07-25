import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { SelectApplicationType1Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

export type typeOfChildArrangementOrderID =
  | "Spend time with order"
  | "Live with order"
  | "Both live with and spend time with order";

enum PageIDs {
  spend = "#typeOfChildArrangementsOrder-spendTimeWithOrder",
  live = "#typeOfChildArrangementsOrder-liveWithOrder",
  both = "#typeOfChildArrangementsOrder-bothLiveWithAndSpendTimeWithOrder",

  textarea = "#natureOfOrder",
}

enum SelectButtonIDs {
  childArrangementsOrder = "#ordersApplyingFor-childArrangementsOrder",
  prohibitedStepsOrder = "#ordersApplyingFor-prohibitedStepsOrder",
  specificIssueOrder = "#ordersApplyingFor-specificIssueOrder",
}

export class selectApplicationType1Page {
  public static async selectApplicationType1Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    typeOfChildArrangementOrder: typeOfChildArrangementOrderID,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page, typeOfChildArrangementOrder);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.formLabel0}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SelectApplicationType1Content.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SelectApplicationType1Content.p1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        SelectApplicationType1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SelectApplicationType1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${SelectApplicationType1Content.errorMessageOrdersApplyingFor}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${SelectApplicationType1Content.errorMessageOrdersApplyingFor}")`,
        1,
      ),
    ]);

    await page.click(`${SelectButtonIDs.childArrangementsOrder}`);

    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        SelectApplicationType1Content,
        "additionalFormLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);

    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType1Content.continue}")`,
    );

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${SelectApplicationType1Content.errorMessageSelectChildArrangementOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${SelectApplicationType1Content.errorMessageSelectChildArrangementOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${SelectApplicationType1Content.errorMessageProvideMoreInfo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${SelectApplicationType1Content.errorMessageProvideMoreInfo}")`,
        1,
      ),
    ]);
    await page.click(`${SelectButtonIDs.childArrangementsOrder}`);
  }

  private static async fillInFields(
    page: Page,
    typeOfChildArrangementOrder: typeOfChildArrangementOrderID,
  ): Promise<void> {
    for (const selectButton of Object.values(SelectButtonIDs)) {
      const buttonSelector = `${selectButton}`;

      await page.click(buttonSelector);
    }
    switch (typeOfChildArrangementOrder) {
      case "Spend time with order":
        await page.click(`${PageIDs.spend}`);
        break;
      case "Live with order":
        await page.click(`${PageIDs.live}`);
        break;
      case "Both live with and spend time with order":
        await page.click(`${PageIDs.both}`);
        break;
    }
    await page.fill(
      `${PageIDs.textarea}`,
      `${SelectApplicationType1Content.loremIpsumText}`,
    );
    await this.childArrangementOrderContent(page);
    await this.provideMoreInfoContent(page);
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType1Content.continue}")`,
    );
  }

  private static async childArrangementOrderContent(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.additionalFormLabel1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        SelectApplicationType1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
  }

  private static async provideMoreInfoContent(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType1Content.additionalFormLabel4}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${SelectApplicationType1Content.p2}")`,
        1,
      ),
    ]);
  }
}
