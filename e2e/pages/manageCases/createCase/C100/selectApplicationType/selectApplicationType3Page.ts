import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { SelectApplicationType3Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType3Content.ts";
import config from "../../../../../utils/config.utils.ts";

export type radioButtons =
  | "Yes"
  | "No, permission is not required"
  | "No, permission now sought";

enum PageIDs {
  yes = "#applicationPermissionRequired-yes",
  yesFollowingQuestion = "#orderInPlacePermissionRequired_Yes",
  yesTextbox1 = "#applicationPermissionRequiredReason",
  yesTextbox2 = "#orderDetailsForPermissions",
  noPermissionNotRequired = "#applicationPermissionRequired-noNotRequired",
  noPermissionSought = "#applicationPermissionRequired-noNowSought",
  fileInputButton = "#uploadOrderDocForPermission",
}

export class selectApplicationType3Page {
  public static async selectApplicationType3Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    permissionSelection: radioButtons,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page, permissionSelection);
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
        3,
        SelectApplicationType3Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    await expect(page.locator(`${Selectors.GovukFormLabel}:text-is("${SelectApplicationType3Content.yesFormLabel}")`).first()).toBeVisible();
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${SelectApplicationType3Content.errorMessage3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${SelectApplicationType3Content.errorMessage3}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    permissionSelection: radioButtons,
  ): Promise<void> {
    switch (permissionSelection) {
      case "Yes":
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType3Content.giveDetailsTextbox}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          3,
          SelectApplicationType3Content,
          "conditionalText",
          `${Selectors.GovukFormLabel}`,
        ),
        await page.click(`${PageIDs.yes}`);
        await page.fill(
          `${PageIDs.yesTextbox1}`,
          `${SelectApplicationType3Content.textbox1}`,
        );
        await page.click(`${PageIDs.yesFollowingQuestion}`);
        await page.fill(
          `${PageIDs.yesTextbox2}`,
          `${SelectApplicationType3Content.textbox2}`,
        );
        await this.fileUpload(page);
        break;
      case "No, permission is not required":
        await page.click(`${PageIDs.noPermissionNotRequired}`);
        break;
      case "No, permission now sought":
        await page.click(`${PageIDs.noPermissionSought}`);
        await page.click(`${PageIDs.yesFollowingQuestion}`);
        Helpers.checkGroup(
          page,
          3,
          SelectApplicationType3Content,
          "conditionalText",
          `${Selectors.GovukFormLabel}`,
        ),
        await page.fill(
          `${PageIDs.yesTextbox2}`,
          `${SelectApplicationType3Content.textbox2}`,
        );
        await this.fileUpload(page);
        break;
      default:
        throw new Error(`Unexpected permissionSelection: ${permissionSelection}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType3Content.continue}")`,
    );
  }

  private static async fileUpload(page: Page): Promise<void> {
    const fileInput = page.locator(`${PageIDs.fileInputButton}`);
    await fileInput.setInputFiles(config.testPdfFile);
    await page.waitForTimeout(3000);
  }
}
