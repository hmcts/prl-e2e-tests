import { Page } from "@playwright/test";
import {
  AdditionalApplicationType,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { UploadAdditionalApplications1Content } from "../../../../fixtures/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications1Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

enum UniqueSelectors {
  additionalApplicantList = "#additionalApplicantsList",
  otherOrderRadio = "#additionalApplicationsApplyingFor-otherOrder",
  c2OrderRadio = "#additionalApplicationsApplyingFor-c2Order",
  c2WithNoticeRadio = "#typeOfC2Application-applicationWithNotice",
  c2WithoutNoticeRadio = "#typeOfC2Application-applicationWithoutNotice",
}

export class UploadAdditionalApplications1Page {
  public static async uploadAdditionalApplications1Page(
    page: Page,
    caseType: solicitorCaseCreateType,
    additionalApplicationType: AdditionalApplicationType,
    withNotice: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType, accessibilityTest);
    await this.fillInFields(page, additionalApplicationType, withNotice);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: UploadAdditionalApplications1Content.govUkHeadingL,
      })
      .waitFor();
    await Helpers.checkGroup(
      page,
      4,
      UploadAdditionalApplications1Content,
      `formLabel`,
      Selectors.GovukFormLabel,
    );
    if (caseType === "C100") {
      await Helpers.checkGroup(
        page,
        7,
        UploadAdditionalApplications1Content,
        `c100P`,
        Selectors.p,
      );
    } else {
      await Helpers.checkGroup(
        page,
        2,
        UploadAdditionalApplications1Content,
        `fl401P`,
        Selectors.p,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
    additionalApplicationType: AdditionalApplicationType,
    withNotice: boolean,
  ): Promise<void> {
    if (additionalApplicationType === "c2") {
      await page.check(UniqueSelectors.c2OrderRadio);
      // wait for with/without notice section to appear
      await Helpers.checkGroup(
        page,
        3,
        UploadAdditionalApplications1Content,
        `c2FormLabel`,
        Selectors.GovukFormLabel,
      );
      if (withNotice) {
        await page.check(UniqueSelectors.c2WithNoticeRadio);
      } else {
        await page.check(UniqueSelectors.c2WithoutNoticeRadio);
      }
    } else {
      await page.check(UniqueSelectors.otherOrderRadio);
    }
    // select all applicant checkboxes in the list
    await page
      .locator(
        `${UniqueSelectors.additionalApplicantList} input[type="checkbox"]`,
      )
      .check();
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
