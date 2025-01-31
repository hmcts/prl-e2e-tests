import { Selectors } from "../../../../common/selectors.ts";
import {
  ConfidentialityCheck1Content
} from "../../../../fixtures/manageCases/caseProgression/confidentialityCheck/confidentialityCheck1Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { Page } from "@playwright/test";
import {
  ConfidentialityCheckSubmitContent
} from "../../../../fixtures/manageCases/caseProgression/confidentialityCheck/confidentialityCheckSubmitContent.ts";

interface ConfidentialityCheck1PageParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoConfidentialityCheck: boolean;
}

export class ConfidenitalityCheckSubmitPage {
  public static async confidentialityCheckSubmitPage({
                                              page,
                                              accessibilityTest,
                                              yesNoConfidentialityCheck,
                                            }: ConfidentialityCheck1PageParams): Promise<void> {
    await this.checkPageLoads({page, accessibilityTest});
    await this.fillInFields({page, yesNoConfidentialityCheck});
  }

  private static async checkPageLoads({page, accessibilityTest, yesNoConfidentialityCheck}: Partial<ConfidentialityCheck1PageParams>): Promise<void> {
    if (!page) {
      throw new Error("No page specified");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ConfidentialityCheck1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h2}:text-is("${ConfidentialityCheckSubmitContent.h2}")`,
      1,
    )
    if (yesNoConfidentialityCheck) {
      await Helpers.checkGroup(
        page,
        4,
        ConfidentialityCheckSubmitContent,
        "yesText16",
        Selectors.GovukText16
      );
    } else {
      await Promise.all([
        Helpers.checkGroup(
          page,
          5,
          ConfidentialityCheckSubmitContent,
          "noText16",
          Selectors.GovukText16
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukLabel}:text-is("${ConfidentialityCheckSubmitContent.yesText164}")`,
          2,
        )
      ]);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({ page }: Partial<ConfidentialityCheck1PageParams>): Promise<void> {
    if (!page) {
      throw new Error("No page specified");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}