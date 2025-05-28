import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { AddChildrenContent } from "../../../../../fixtures/citizen/createCase/C100/people/addChildrenContent";

interface AddChildrenPageOptions {
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
}

enum inputIds {
  firstName = "#c100TempFirstName",
  lastName = "#c100TempLastName",
}

export class AddChildrenPage {
  public static async addChildrenPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: AddChildrenPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await Promise.any([
      page.waitForSelector(
        `${Selectors.GovukHeadingXL}:text-is("${AddChildrenContent.pageTitle}")`,
      ),
      page.waitForSelector(
        `${Selectors.GovukHeadingXL}:text-is("${AddChildrenContent.pageTitle2}")`,
      ),
    ]);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${AddChildrenContent.legend}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${AddChildrenContent.hint}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        AddChildrenContent,
        "errorLink",
        `${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        AddChildrenContent,
        "errorLink",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
  }: fillInFieldsOptions): Promise<void> {
    for (const selector of Object.values(inputIds)) {
      await page.fill(`${selector}`, AddChildrenContent.exampleText);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
