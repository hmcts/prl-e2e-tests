import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SelectApplicationType3Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType3Content";

type radioButtons =
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

  // @ts-ignore
  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType3Content.p1}")`,
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
      await AccessibilityTestHelper.run(page);
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
    if (selection === "Yes") {
      await page.click(`${PageIDs.yes}`);
      await this.permissionFormContent(page);
      await page.fill(
        `${PageIDs.textbox}`,
        `${SelectApplicationType3Content.loremIpsumText}`,
      );
    } else if (selection === "No, permission is not required") {
      await page.click(`${PageIDs.noPermissionNotRequired}`);
    } else if (selection === "No, permission now sought") {
      await page.click(`${PageIDs.noPermissionSought}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType3Content.continue}")`,
    );
  }


  private static async permissionFormContent(
    page: Page,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType3Content.formLabel5}")`,
        1,
      ),
    ]);
  }


}
