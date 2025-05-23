import { Page } from "@playwright/test";
import { AdditionalApplicationType } from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers.ts";
import { UploadAdditionalApplications4Content } from "../../../../fixtures/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications4Content.ts";
import { CommonContent } from "../../../../fixtures/manageCases/commonContent.ts";

enum UniqueSelectors {
  noHelpWithFeesRadio = "#additionalApplicationsHelpWithFees_No",
}

// only reach this page for a C100 case
export class UploadAdditionalApplications4Page {
  public static async uploadAdditionalApplications4Page(
    page: Page,
    additionalApplicationType: AdditionalApplicationType,
    withNotice: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      additionalApplicationType,
      withNotice,
      accessibilityTest,
    );
    await this.fillInFields(page);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    additionalApplicationType: AdditionalApplicationType,
    withNotice: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.h3, {
        hasText: UploadAdditionalApplications4Content.nextStepH3,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${UploadAdditionalApplications4Content.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${UploadAdditionalApplications4Content.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        UploadAdditionalApplications4Content,
        `h3`,
        Selectors.h3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadAdditionalApplications4Content.formLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${UploadAdditionalApplications4Content.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}"):visible`,
        1,
      ),
    ]);
    if (additionalApplicationType === "c2") {
      if (withNotice) {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${UploadAdditionalApplications4Content.withNoticeFee}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${UploadAdditionalApplications4Content.withoutNoticeFee}")`,
          1,
        );
      }
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CommonContent.c100Fee}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    // always click no for help with fees
    await page.check(UniqueSelectors.noHelpWithFeesRadio);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
