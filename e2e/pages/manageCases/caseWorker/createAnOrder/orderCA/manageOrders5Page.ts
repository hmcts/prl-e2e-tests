import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders5CAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders5CAContent";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import config from "../../../../../config.ts";
import {
  solicitorCaseCreateType,
  uploadOrderC100Options,
  uploadOrderFL401Options,
} from "../../../../../common/types.ts";

interface manageOrders5PageOptions {
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

export class ManageOrders5Page {
  public static async manageOrders5Page({
    page,
    accessibilityTest,
    isUploadOrder,
    uploadOrderC100Options,
    uploadOrderFL401Options,
    solicitorCaseCreateType,
  }: manageOrders5PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkCommonPageLoads({
      //Checking the common fields between Create Order and Upload Order journeys, as they both use this page
      page,
      accessibilityTest,
      solicitorCaseCreateType,
      uploadOrderC100Options,
      uploadOrderFL401Options,
      isUploadOrder,
    });
    if (isUploadOrder) {
      //Condition added to check the unique fields present in each of the journeys (Create Order and Upload Order)
      await this.checkUploadOrderPageContentLoads({ page });
    } else {
      await this.checkCreateOrderPageContentLoads({ page });
    }
    await this.fillInFields({ page, isUploadOrder });
  }

  private static async checkCommonPageLoads({
    page,
    accessibilityTest,
    uploadOrderC100Options,
    uploadOrderFL401Options,
    solicitorCaseCreateType,
    isUploadOrder,
  }: Partial<manageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders5CAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ManageOrders5CAContent.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        20,
        ManageOrders5CAContent,
        "label",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (!isUploadOrder) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${uploadOrderFL401Options}")`,
        1,
      );
    }
    else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${uploadOrderC100Options}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkUploadOrderPageContentLoads({
    page,
  }: Partial<manageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await Promise.all([
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
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.hiddenLabel2}"):visible`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.hiddenLabel3}"):visible`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.hiddenLabel4}"):visible`,
        2,
      ),
    ]);
  }

  private static async checkCreateOrderPageContentLoads({
    page,
  }: Partial<manageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders5CAContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}"):visible`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.hiddenLabel2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.hiddenLabel3}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.hiddenLabel4}"):visible`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ManageOrders5CAContent,
        "labelCreate",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    isUploadOrder,
  }: Partial<manageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    if (!isUploadOrder) {
      for (const selector of Object.values(radioIds)) {
        await page.click(selector);
      }
    }
    else {
      for (const selector of Object.values(radioIds2)) {
        await page.click(selector);
      }
    }
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${ManageOrders5CAContent.hiddenLabel1}")`,
      1,
    );
    await page.selectOption(
      inputIds.hearingsType,
      ManageOrders5CAContent.hearing,
    );
    await page.fill(
      inputIds.judgeOrMagistratesLastName,
      ManageOrders5CAContent.judgeFullName,
    );
    //IF you are on the 'Upload Order flow' this extra field will need to be populated, to upload a file
    if (isUploadOrder) {
      await page.waitForTimeout(5000);
      const fileInput = page.locator(`${UniqueSelectors.fileUpload}`);
      await fileInput.setInputFiles(config.testPdfFile);
      await page.waitForTimeout(5000);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
  }
