import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { SelectApplicationType3Content } from "../../../../../fixtures/manageCases/createCase/C100/selectApplicationType/selectApplicationType3Content";

type radioButtons = "Yes" | "No";

enum PageIDs {
  yes = "#",
  noPermissionNotRequired = "#",
  noPermissionSought = "#",
}

export class selectApplicationType2Page {
  public static async selectApplicationType2Page(
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType3Content.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType3Content.formLabel2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType3Content.formLabel3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${SelectApplicationType3Content.formLabel4}")`,
        1,
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
    await Promise.all([]);

    await page.click(`${PageIDs.yes}`),
      await page.click(
        `${Selectors.button}:text-is("${SelectApplicationType3Content.continue}")`,
      );
  }

  private static async fillInFields(
    page: Page,
    selection: radioButtons,
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SelectApplicationType3Content.continue}")`,
    );
  }
}
