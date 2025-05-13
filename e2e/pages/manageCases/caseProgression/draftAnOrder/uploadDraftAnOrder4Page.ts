import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../common/commonStaticText";
import config from "../../../../config.ts";
import {
  solicitorCaseCreateType,
  uploadOrderC100Options,
  uploadOrderFL401Options,
} from "../../../../common/types.ts";
import { UploadDraftAnOrder4Content } from "../../../../fixtures/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrder4Content.ts";

interface UploadDraftAnOrder4PageOptions {
  page: Page;
  accessibilityTest: boolean;
  isUploadOrder: boolean;
  uploadOrderC100Options?: uploadOrderC100Options;
  uploadOrderFL401Options?: uploadOrderFL401Options;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

enum radioIds {
  isTheOrderByConsent_Yes = "#isTheOrderByConsent_Yes",
  wasTheOrderApprovedAtHearing_Yes = "#wasTheOrderApprovedAtHearing_Yes",
  judgeOrMagistrateTitle_herHonourJudge = "#judgeOrMagistrateTitle-herHonourJudge",
  isTheOrderAboutAllChildren_Yes = "#isTheOrderAboutAllChildren_Yes",
}

enum radioIds2 {
  wasTheOrderApprovedAtHearing_Yes = "#wasTheOrderApprovedAtHearing_Yes",
  judgeOrMagistrateTitle_herHonourJudge = "#judgeOrMagistrateTitle-herHonourJudge",
  isTheOrderAboutAllChildren_Yes = "#isTheOrderAboutAllChildren_Yes",
}

enum UniqueSelectors {
  fileUpload = "#uploadOrderDoc",
}

enum inputIds {
  hearingsType = "#hearingsType",
  judgeOrMagistratesLastName = "#judgeOrMagistratesLastName",
}

export class UploadDraftAnOrder4Page {
    public static async uploadDraftAnOrder4Page({
    page,
    accessibilityTest,
    isUploadOrder,
    uploadOrderC100Options,
    uploadOrderFL401Options,
    solicitorCaseCreateType,
    }: UploadDraftAnOrder4PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({
      page,
      accessibilityTest,
      solicitorCaseCreateType,
      uploadOrderC100Options,
      uploadOrderFL401Options,
      isUploadOrder,
    });
    await this.fillInFields({ page, isUploadOrder });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<UploadDraftAnOrder4PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }  
    await expect(
            page.locator(Selectors.GovukHeadingL, { hasText: UploadDraftAnOrder4Content.pageTitle }),
            ).toBeVisible();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${UploadDraftAnOrder4Content.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        20,
        UploadDraftAnOrder4Content,
        "label",
        `${Selectors.GovukFormLabel}`,
        ),
      Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
              2,
            ),
            Helpers.checkVisibleAndPresent(
              page,
              `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}"):visible`,
              2,
        ),
            Helpers.checkVisibleAndPresent(
                    page,
                `${Selectors.GovukFormLabel}:text-is("${UploadDraftAnOrder4Content.hiddenLabel1}"):visible`,
                    2,
                  ),
                  Helpers.checkVisibleAndPresent(
                    page,
                      `${Selectors.GovukFormLabel}:text-is("${UploadDraftAnOrder4Content.hiddenLabel2}"):visible`,
                    2,
                  ),
                  Helpers.checkVisibleAndPresent(
                    page,
                      `${Selectors.GovukFormLabel}:text-is("${UploadDraftAnOrder4Content.hiddenLabel3}"):visible`,
                    2,
                  ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    isUploadOrder,
  }: Partial<UploadDraftAnOrder4PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
      for (const selector of Object.values(radioIds2)) {
        await page.click(selector);
      }
    await page.selectOption(
      inputIds.hearingsType,
      UploadDraftAnOrder4Content.hearing,
    );
    await page.fill(
      inputIds.judgeOrMagistratesLastName,
      UploadDraftAnOrder4Content.judgeFullName,
    );
      await page.waitForTimeout(5000);
      const fileInput = page.locator(`${UniqueSelectors.fileUpload}`);
      await fileInput.setInputFiles(config.testPdfFile);
      await page.waitForTimeout(5000);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
