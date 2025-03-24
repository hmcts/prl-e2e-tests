import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { HowLongWillTheOrderBeInForce } from "../../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";
import { NonMolestationOrder20Content } from "../../../../../fixtures/manageCases/caseWorker/draftAnOrder/nonMolestationOrder/nonMolestationOrder20Content";
import {
  clippingCoords,
  ExuiMediaViewerPage,
} from "../../../exuiMediaViewer.po.ts";

export class NonMolestationOrder20Page {
  public static async checkPdfLinks(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${NonMolestationOrder20Content.welshPdfLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${NonMolestationOrder20Content.pdfLink}")`,
        1,
      ),
    ]);
  }

  public static async checkPdfContent(
    page: Page,
    yesToAll: boolean,
    howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce,
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
            ? NonMolestationOrder20Content.welshPdfLink
            : NonMolestationOrder20Content.pdfLink,
        exact: true,
      }),
    );
    await pdfPage.waitForLoadState("domcontentloaded");
    const mediaViewerPage = new ExuiMediaViewerPage(pdfPage);
    await mediaViewerPage.runVisualTestOnAllPages(
      pdfPage,
      clippingCoords.centeredOrderPdfWithoutToolbar,
      regionalPdfName,
    );
  }
}
