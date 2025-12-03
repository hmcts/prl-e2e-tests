import { Page } from "@playwright/test";
import {
  AdditionalApplicationType,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { UploadAdditionalApplicationsSubmitContent } from "../../../../fixtures/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplicationsSubmitContent.ts";
import { Helpers } from "../../../../common/helpers.ts";

export class UploadAdditionalApplicationsSubmitPage {
  public static async uploadAdditionalApplicationsSubmitPage(
    page: Page,
    caseType: solicitorCaseCreateType,
    additionalApplicationType: AdditionalApplicationType,
    withNotice: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      caseType,
      additionalApplicationType,
      withNotice,
      accessibilityTest,
    );
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    additionalApplicationType: AdditionalApplicationType,
    withNotice: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.headingH2, {
        hasText: UploadAdditionalApplicationsSubmitContent.headingH2,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${UploadAdditionalApplicationsSubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        UploadAdditionalApplicationsSubmitContent,
        `text16`,
        Selectors.GovukText16,
      ),
    ]);
    if (caseType === "C100") {
      await Promise.all([
        Helpers.checkGroup(
          page,
          7,
          UploadAdditionalApplicationsSubmitContent,
          `c100PartyP`,
          Selectors.p,
        ),
        Helpers.checkGroup(
          page,
          2,
          UploadAdditionalApplicationsSubmitContent,
          `text16HelpWithFees`,
          Selectors.GovukText16,
        ),
      ]);
    } else {
      await Helpers.checkGroup(
        page,
        2,
        UploadAdditionalApplicationsSubmitContent,
        `Fl401PartyP`,
        Selectors.p,
      );
    }
    if (additionalApplicationType === "c2") {
      await Promise.all([
        Helpers.checkGroup(
          page,
          11,
          UploadAdditionalApplicationsSubmitContent,
          `c2Text16`,
          Selectors.GovukText16,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadAdditionalApplicationsSubmitContent.c2ApplicationText16}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovLink}:text-is("${UploadAdditionalApplicationsSubmitContent.c2ApplicationAnchor}")`,
          1,
        ),
      ]);
      if (withNotice) {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadAdditionalApplicationsSubmitContent.c2WithNoticeText16}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadAdditionalApplicationsSubmitContent.c2WithoutNoticeText16}")`,
          1,
        );
      }
    } else {
      await Promise.all([
        Helpers.checkGroup(
          page,
          7,
          UploadAdditionalApplicationsSubmitContent,
          `otherText16`,
          Selectors.GovukText16,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadAdditionalApplicationsSubmitContent.otherApplicationsText16}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${UploadAdditionalApplicationsSubmitContent.otherApplicationAnchor}")`,
          1,
        ),
      ]);
      if (caseType === "C100") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadAdditionalApplicationsSubmitContent.c100ApplicationsText16}")`,
          1,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadAdditionalApplicationsSubmitContent.fl401ApplicationsText16}")`,
          1,
        );
      }
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
