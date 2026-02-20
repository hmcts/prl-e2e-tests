import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { SelectApplicationType3Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType3Content";

export type radioButtons =
  | "Yes"
  | "No, permission is not required"
  | "No, permission now sought";

enum PageIDs {
  yes = "#applicationPermissionRequired-yes",
  noPermissionNotRequired = "#applicationPermissionRequired-noNotRequired",
  noPermissionSought = "#applicationPermissionRequired-noNowSought",
  textbox = "#applicationPermissionRequiredReason",
}

export class selectApplicationType3Page {
  public static async selectApplicationType3Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    selection: radioButtons,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page, selection);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${SelectApplicationType3Content.p1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${SelectApplicationType3Content.title}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        SelectApplicationType3Content,
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
      `${Selectors.button}:text-is("${SelectApplicationType3Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${SelectApplicationType3Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${SelectApplicationType3Content.errorMessage1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SelectApplicationType3Content.errorMessage1}")`,
        1,
      ),
    ]);
    await page.click(`${PageIDs.yes}`);
    await page.waitForTimeout(3000);
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType3Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${SelectApplicationType3Content.errorMessage2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SelectApplicationType3Content.errorMessage2}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    selection: radioButtons,
  ): Promise<void> {
    switch (selection) {
      case "Yes":
        await page.click(`${PageIDs.yes}`);
        await this.permissionFormContent(page);
        await page.fill(
          `${PageIDs.textbox}`,
          `${SelectApplicationType3Content.loremIpsumText}`,
        );
        break;
      case "No, permission is not required":
        await page.click(`${PageIDs.noPermissionNotRequired}`);
        break;
      case "No, permission now sought":
        await page.click(`${PageIDs.noPermissionSought}`);
        break;
      default:
        throw new Error(`Unexpected selection: ${selection}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType3Content.continue}")`,
    );
  }

  private static async permissionFormContent(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType3Content.formLabel5}")`,
      1,
    );
  }
}
