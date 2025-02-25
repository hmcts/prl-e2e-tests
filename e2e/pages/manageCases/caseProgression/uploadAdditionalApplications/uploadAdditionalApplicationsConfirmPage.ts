import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { UploadAdditionalApplicationsConfirmContent } from "../../../../fixtures/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplicationsConfirmContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

export class UploadAdditionalApplicationsConfirmPage {
  public static async uploadAdditionalApplicationsConfirmPage(
    page: Page,
    caseType: solicitorCaseCreateType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType, accessibilityTest);
    await this.closeAndReturnToCaseDetails(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.h3, {
        hasText: UploadAdditionalApplicationsConfirmContent.h3,
      })
      .waitFor();
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.headingH1}:text-is("${UploadAdditionalApplicationsConfirmContent.headingH1}")`,
      1,
    );
    if (caseType === "C100") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h1}:text-is("${UploadAdditionalApplicationsConfirmContent.c100H1}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          3,
          UploadAdditionalApplicationsConfirmContent,
          `c100P`,
          Selectors.p,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${UploadAdditionalApplicationsConfirmContent.c100Anchor}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h1}:text-is("${UploadAdditionalApplicationsConfirmContent.fl401H1}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          2,
          UploadAdditionalApplicationsConfirmContent,
          `fl401P`,
          Selectors.p,
        ),
      ]);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async closeAndReturnToCaseDetails(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.closeAndReturnToCaseDetails}")`,
    );
  }
}
