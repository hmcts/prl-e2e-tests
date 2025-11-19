import { Locator, Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ParentalResponsibilityOrder20Content } from "../../../../../fixtures/manageCases/caseWorker/draftAnOrder/parentalResponsibilityOrder/parentalResponsibilityOrder20Content.ts";
import {
  clippingCoords,
  ExuiMediaViewerPage,
} from "../../../../../pageObjects/pages/exui/exuiMediaViewer.po.ts";

export class ParentalResponsibilityOrder20Page {
  public static async checkPdfLinks(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovLink}:text-is("${ParentalResponsibilityOrder20Content.welshPdfLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovLink}:text-is("${ParentalResponsibilityOrder20Content.pdfLink}")`,
        1,
      ),
    ]);
  }

  public static async checkPdfContent(
    page: Page,
    yesNoToAll: boolean,
    caseRef: string,
  ): Promise<void> {
    let pdfName = "parental-responsibility-";
    // if statements based on the parameters passed into the tests from draftAnOrderParentalResponsibility.spec.ts
    if (yesNoToAll) {
      pdfName += "yes-to-all";
    } else {
      pdfName += "no-to-all";
    }
    await this.checkContent(page, pdfName, "welsh", caseRef);
    await this.checkContent(page, pdfName, "english", caseRef);
  }

  private static async checkContent(
    page: Page,
    pdfName: string,
    language: string,
    caseRef: string,
  ): Promise<void> {
    const regionalPdfName = `${language}-${pdfName}`;

    const pdfPage: Page = await Helpers.openPdfLink(
      page,
      page.getByRole("button", {
        name:
          language === "welsh"
            ? ParentalResponsibilityOrder20Content.welshPdfLink
            : ParentalResponsibilityOrder20Content.pdfLink,
        exact: true,
      }),
    );
    await pdfPage.waitForLoadState("domcontentloaded");
    const mediaViewerPage = new ExuiMediaViewerPage(pdfPage);
    // locators to mask in screenshot
    const caseRefLocator: Locator = pdfPage.getByText(caseRef);
    const dateLocator: Locator = pdfPage.getByText(
      Helpers.todayDate(true) as string,
    );
    await mediaViewerPage.runVisualTestOnAllPages(
      pdfPage,
      [
        "caseProgression",
        "solicitor",
        "parentalResponsibilityOrder",
        regionalPdfName,
      ],
      clippingCoords.centeredPageWithoutToolbar,
      [caseRefLocator, dateLocator],
    );
  }
}
