import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Submit1Content } from "../../../../../fixtures/manageCases/createCase/C100/submit/submit1Content";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";

interface Submit1PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  confidentialityDisclaimer = "#confidentialityDisclaimerSubmit_confidentialityChecksChecked-confidentialityChecksChecked",
  confidentialityChecksText = "#confidentialityChecksText",
}

export class Submit1Page {
  public static async submit1Page({
    page,
    accessibilityTest,
  }: Submit1PageOptions): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields(page);
    await Helpers.clickButton(page, Submit1Content.continue);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Submit1PageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${Submit1Content.h1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${Submit1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${Submit1Content.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${Submit1Content.formLabel}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        Submit1Content,
        "p",
        `${UniqueSelectors.confidentialityChecksText} ${Selectors.p}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        Submit1Content,
        "li",
        `${UniqueSelectors.confidentialityChecksText} ${Selectors.li}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(`${UniqueSelectors.confidentialityDisclaimer}`);
  }
}
