import { Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { HowLongWillTheOrderBeInForce } from "../../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";
import { NonMolestationOrder20Content } from "../../../../../fixtures/manageCases/caseWorker/draftAnOrder/nonMolestationOrder/nonMolestationOrder20Content";
import {
  clippingCoords,
  ExuiMediaViewerPage,
} from "../../../../../pageObjects/pages/exui/exuiMediaViewer.po";

export class NonMolestationOrder20Page {
  public static async checkPdfLinks(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovLink}:text-is("${NonMolestationOrder20Content.welshPdfLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovLink}:text-is("${NonMolestationOrder20Content.pdfLink}")`,
        1,
      ),
    ]);
  }

  public static async checkPdfContent(
    page: Page,
    yesToAll: boolean,
    howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce,
    caseRef: string,
  ): Promise<void> {
    let pdfName = "non-molestation-";
    // if statements based on the parameters passed into the tests from draftAnOrderNonMolestation.spec.ts
    if (yesToAll) {
      pdfName += "yes-to-all";
    } else if (howLongWillOrderBeInForce === "noEndDate") {
      pdfName += "no-to-all-no-end-date";
    } else {
      pdfName += "no-to-all-specified-date-and-time";
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
            ? NonMolestationOrder20Content.welshPdfLink
            : NonMolestationOrder20Content.pdfLink,
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
      ["caseWorker", "nonMolestationOrder", regionalPdfName],
      clippingCoords.centeredPageWithoutToolbar,
      [caseRefLocator, dateLocator],
    );
  }
}
