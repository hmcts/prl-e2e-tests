import { Selectors } from "../../../../common/selectors.ts";
import { ConfidentialityCheck1Content } from "../../../../fixtures/manageCases/caseProgression/confidentialityCheck/confidentialityCheck1Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { ConfidentialityCheckSubmitContent } from "../../../../fixtures/manageCases/caseProgression/confidentialityCheck/confidentialityCheckSubmitContent.ts";

interface ConfidentialityCheckSubmitPageParams {
  page: Page;
  accessibilityTest: boolean;
  isApplicationServedAfterConfidentialityCheck: boolean;
}

export class ConfidentialityCheckSubmitPage {
  public static async confidentialityCheckSubmitPage({
    page,
    accessibilityTest,
    isApplicationServedAfterConfidentialityCheck,
  }: ConfidentialityCheckSubmitPageParams): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      isApplicationServedAfterConfidentialityCheck,
    });
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    isApplicationServedAfterConfidentialityCheck,
  }: ConfidentialityCheckSubmitPageParams): Promise<void> {
    await page
      .locator(
        `${Selectors.GovukHeadingL}:text-is("${ConfidentialityCheck1Content.pageTitle}")`,
      )
      .waitFor();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h2}:text-is("${ConfidentialityCheckSubmitContent.h2}")`,
      1,
    );
    if (isApplicationServedAfterConfidentialityCheck) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          3,
          ConfidentialityCheckSubmitContent,
          "yesText16",
          Selectors.GovukText16,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.change}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkGroup(
          page,
          5,
          ConfidentialityCheckSubmitContent,
          "noText16",
          Selectors.GovukText16,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonStaticText.change}")`,
          2,
        ),
      ]);
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
