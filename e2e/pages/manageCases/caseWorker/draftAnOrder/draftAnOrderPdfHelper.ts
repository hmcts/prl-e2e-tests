import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { NonMolestationOrder20Content } from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/nonMolestationOrder/nonMolestationOrder20Content";
import { OrderType } from "../../../../common/types";
import {
  ParentalResponsibilityOrder20Content
} from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/parentalResponsibilityOrder/parentalResponsibilityOrder20Content";

enum ids {
  mvDownBtn = "#mvDownBtn",
  numPages = "#numPages",
}

export class DraftAnOrderPdfHelper {
  public static async openMediaViewer(page: Page, orderType: OrderType, language: string) {
    let englishPdfLink: string = '';
    let welshPdfLink: string = '';
    switch (orderType) {
      case "nonMolestation":
        englishPdfLink = NonMolestationOrder20Content.pdfLink
        welshPdfLink = NonMolestationOrder20Content.welshPdfLink
        break;
      case "parentalResponsibility":
        englishPdfLink = ParentalResponsibilityOrder20Content.pdfLink
        welshPdfLink = ParentalResponsibilityOrder20Content.welshPdfLink
        break;
      default:
        console.error("An invalid order type was given");
        break;
    }
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      page.click(
        `${Selectors.a}:text-is("${language === "English" ? englishPdfLink : welshPdfLink}")`,
      ),
    ]);
    await pdfPage.waitForLoadState();
    await this.scrollToBottom(pdfPage);
    return pdfPage;
  }

  private static async scrollToBottom(page: Page) {
    const numOfPagesLocator = page.locator(ids.numPages);
    await expect(numOfPagesLocator).not.toHaveText(/0/); // <- Wait for number of pages not to be 0 (i.e., page has loaded)

    const numOfPageText = await numOfPagesLocator.textContent();
    if (numOfPageText) {
      const numOfPages = parseInt(numOfPageText?.replace("/", "").trim(), 10); // <- numOfPageText is in format "/ 7", strip
      //                                                                             the '/' out and convert to int so can
      //                                                                             be used in loop
      for (let i = 0; i < numOfPages - 1; i++) {
        await page.click(ids.mvDownBtn);
      }
    }
  }
}
