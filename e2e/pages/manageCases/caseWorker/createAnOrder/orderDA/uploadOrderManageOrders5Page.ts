import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1DAContent";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { UploadOrderManageOrders5Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/uploadOrderManageOrders5Content";
import config from "../../../../../config";
import { ManageOrders5CAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders5CAContent";

interface UploadOrderManageOrders5PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
}

enum UniqueSelectors {
  orderApprovedYes = "#wasTheOrderApprovedAtHearing_Yes",
  orderApprovedNo = "#wasTheOrderApprovedAtHearing_No",
  approvalDate_day = "#approvalDate-day",
  approvalDate_month = "#approvalDate-month",
  approvalDate_year = "#approvalDate-year",
  dateOrderDate_day = "#dateOrderMade-day",
  dateOrderDate_month = "#dateOrderMade-month",
  dateOrderDate_year = "#dateOrderMade-year",
  orderChildrenYes = "#isTheOrderAboutChildren_Yes",
  orderChildrenNo = "#isTheOrderAboutChildren_No",
  fileUpload = "#uploadOrderDoc",
}

enum radioId2 {
  judgeOrMagistrateTitle_herHonourJudge = "#judgeOrMagistrateTitle-herHonourJudge",
}

enum inputIds {
  judgeOrMagistratesLastName = "#judgeOrMagistratesLastName",
}

export class UploadOrderManageOrders5Page {
  public static async uploadOrderManageOrders5Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
  }: UploadOrderManageOrders5PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, yesNoManageOrders });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<UploadOrderManageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        UploadOrderManageOrders5Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.day}"):visible`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.month}"):visible`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.year}"):visible`,
        2,
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
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    yesNoManageOrders,
  }: Partial<UploadOrderManageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.fill(
      UniqueSelectors.approvalDate_day,
      UploadOrderManageOrders5Content.day,
    );
    await page.fill(
      UniqueSelectors.approvalDate_month,
      UploadOrderManageOrders5Content.month,
    );
    await page.fill(
      UniqueSelectors.approvalDate_year,
      UploadOrderManageOrders5Content.year,
    );
    if (yesNoManageOrders) {
      await page.click(UniqueSelectors.orderApprovedYes);
      await page.click(UniqueSelectors.orderChildrenYes);
    } else {
      await page.click(UniqueSelectors.orderApprovedNo);
      await page.click(UniqueSelectors.orderChildrenNo);
    }
    for (const selector of Object.values(radioId2)) {
      await page.click(selector);
    }
    await page.fill(
      inputIds.judgeOrMagistratesLastName,
      ManageOrders5CAContent.judgeFullName,
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
