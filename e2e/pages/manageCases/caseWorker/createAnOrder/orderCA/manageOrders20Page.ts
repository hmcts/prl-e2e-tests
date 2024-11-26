import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders20CAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders20CAContent";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Language } from "../../../../../common/types";

interface manageOrders20PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum ids {
  mvDownBtn = "#mvDownBtn",
  numPages = "#numPages",
}

export class ManageOrders20Page {
  public static async manageOrders20Page({
    page,
    accessibilityTest,
  }: manageOrders20PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<manageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders20CAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ManageOrders20CAContent.headingh3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders20CAContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders20CAContent.p}")`,
        1,
      ),
    ]);
    await this.checkEnglishPdf(page);
    await this.checkWelshPdf(page);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async openMediaViewer(page: Page, language: Language) {
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.click(
        `${Selectors.a}:text-is("${language === "English" ? ManageOrders20CAContent.englishLink : ManageOrders20CAContent.welshLink}")`,
      ),
    ]);
    await pdfPage.waitForLoadState();
    await this.scrollToBottom(pdfPage);

    return pdfPage;
  }

  private static async checkEnglishPdf(page: Page) {
    const pdfPage = await this.openMediaViewer(page, "English");
    await Helpers.checkGroup(
      pdfPage,
      44,
      ManageOrders20CAContent,
      "span",
      `${Selectors.Span}`,
    );
    await pdfPage.close();
  }

  private static async checkWelshPdf(page: Page) {
    const pdfPage = await this.openMediaViewer(page, "Welsh");
    await Promise.all([
      Helpers.checkGroup(
        pdfPage,
        49,
        ManageOrders20CAContent,
        "welshSpan",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${ManageOrders20CAContent.welshSpanRepeated}")`,
        3,
      ),
    ]);
    await pdfPage.close();
  }

  private static async scrollToBottom(page: Page) {
    const numOfPagesLocator = page.locator(ids.numPages);
    await expect(numOfPagesLocator).not.toHaveText(/0/); // Wait for number of pages not to be 0 (i.e., page has loaded)

    const numOfPageText = (await numOfPagesLocator.textContent()) || "";
    const numOfPages = parseInt(numOfPageText.replace("/", "").trim(), 10); // numOfPageText is in format
    //                                                                       "/ 7", strip the '/' out and convert
    //                                                                       to int so can be used in loop
    for (let i = 0; i < numOfPages - 1; i++) {
      await page.click(ids.mvDownBtn);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<manageOrders20PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }

    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
