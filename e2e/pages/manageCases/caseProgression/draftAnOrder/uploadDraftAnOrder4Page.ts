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
  uploadOrderC100Options?: uploadOrderC100Options;
  uploadOrderFL401Options?: uploadOrderFL401Options;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

enum radioIds2 {
  wasTheOrderApprovedAtHearing_Yes = "#wasTheOrderApprovedAtHearing_Yes",
  judgeOrMagistrateTitle_herHonourJudge = "#judgeOrMagistrateTitle-herHonourJudge",
  isTheOrderAboutAllChildren_Yes = "#isTheOrderAboutAllChildren_Yes",
}

//Locators are slightly different for DA in a few places
enum radioIds2DA {
  wasTheOrderApprovedAtHearing_Yes = "#wasTheOrderApprovedAtHearing_Yes",
  judgeOrMagistrateTitle_herHonourJudge = "#judgeOrMagistrateTitle-herHonourJudge",
  isTheOrderAboutAllChildren_Yes = "#isTheOrderAboutChildren_Yes",
  childOption1 = "#childOption_ac193d35-bcd1-4abf-8402-929295c9545c",
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
    });
    if (solicitorCaseCreateType === "C100") {
      await this.fillInFieldsCA({ page });
    } else {
      await this.fillInFieldsDA({ page });
    }
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
  }: Partial<UploadDraftAnOrder4PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await expect(
      page.locator(Selectors.GovukHeadingL, {
        hasText: UploadDraftAnOrder4Content.pageTitle,
      }),
    ).toBeVisible();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${UploadDraftAnOrder4Content.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        19,
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
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadDraftAnOrder4Content.hiddenLabel2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadDraftAnOrder4Content.hiddenLabel3}"):visible`,
        1,
      ),
    ]);
    if (solicitorCaseCreateType === "C100") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadDraftAnOrder4Content.CAchildren}"):visible`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${UploadDraftAnOrder4Content.DAchildren}"):visible`,
        1,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFieldsCA({
    page,
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

  private static async fillInFieldsDA({
    page,
  }: Partial<UploadDraftAnOrder4PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    for (const selector of Object.values(radioIds2DA)) {
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
