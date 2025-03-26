import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ParentalResponsibilityOrder20Content } from "../../../../../fixtures/manageCases/caseWorker/draftAnOrder/parentalResponsibilityOrder/parentalResponsibilityOrder20Content";
import {
  clippingCoords,
  ExuiMediaViewerPage,
} from "../../../../../common/exuiMediaViewer.po.ts";

export class ParentalResponsibilityOrder20Page {
  public static async checkPdfLinks(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ParentalResponsibilityOrder20Content.welshPdfLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ParentalResponsibilityOrder20Content.pdfLink}")`,
        1,
      ),
    ]);
  }

  public static async checkPdfContent(
    page: Page,
    yesNoToAll: boolean,
  ): Promise<void> {
    let pdfName = "parental-responsibility-";
    // if statements based on the parameters passed into the tests from draftAnOrderParentalResponsibility.spec.ts
    if (yesNoToAll) {
      pdfName += "yes-to-all";
    } else {
      pdfName += "no-to-all";
    }
    await this.checkContent(page, pdfName, "welsh");
    await this.checkContent(page, pdfName, "english");
  }

  private static async checkContent(
    page: Page,
    pdfName: string,
    language: string,
  ): Promise<void> {
    const regionalPdfName = `${language}-${pdfName}`;

    const pdfPage: Page = await Helpers.openPdfLink(
      page,
      page.getByRole("link", {
        name:
          language === "welsh"
            ? ParentalResponsibilityOrder20Content.welshPdfLink
            : ParentalResponsibilityOrder20Content.pdfLink,
        exact: true,
      }),
    );
    await pdfPage.waitForLoadState("domcontentloaded");
    const mediaViewerPage = new ExuiMediaViewerPage(pdfPage);
    await mediaViewerPage.runVisualTestOnAllPages(
      pdfPage,
      regionalPdfName,
      clippingCoords.centeredPageWithoutToolbar,
    );
  }
}
