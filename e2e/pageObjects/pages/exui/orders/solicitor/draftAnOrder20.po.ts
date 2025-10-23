import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { OrderTypes } from "../../../../../common/types.js";
import { Helpers } from "../../../../../common/helpers.js";
import {
  clippingCoords,
  ExuiMediaViewerPage,
} from "../../exuiMediaViewer.po.js";
import { NavigationUtils } from "../../../../../utils/navigation.utils.js";

export class DraftAnOrder20Page extends EventPage {
  private readonly previewOrderHeading: Locator = this.page.locator(
    Selectors.h2,
    { hasText: "Preview the order" },
  );
  private readonly paragraph: Locator = this.page.locator(Selectors.p, {
    hasText:
      "If you want to make further changes, go back to the previous screen.",
  });
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly previousButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.previous,
    },
  );
  private readonly navigationUtils: NavigationUtils = new NavigationUtils(
    this.page,
  );
  private welshPdfLink: string;
  private englishPdfLink: string;

  constructor(page: Page) {
    super(page, "Draft an order");
  }

  async assertPageContents(
    orderType: OrderTypes,
    caseNumber: string,
    pdfName: string,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.locator(Selectors.headingH3, { hasText: orderType }),
    ).toBeVisible();
    await expect(this.previewOrderHeading).toBeVisible();
    await expect(
      this.page.getByRole("link", {
        name: this.getOrderNameFromOrderType(orderType, true),
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      this.page.getByRole("link", {
        name: this.getOrderNameFromOrderType(orderType, false),
        exact: true,
      }),
    ).toBeVisible();
    // assert draft orders in media viewer
    await this.assertPdfContents(caseNumber, true, pdfName);
    await this.assertPdfContents(caseNumber, false, pdfName);
    await expect(this.paragraph).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  private getOrderNameFromOrderType(
    orderType: OrderTypes,
    isWelsh: boolean,
  ): string {
    // add more orders when required
    switch (orderType) {
      case "Non-molestation order (FL404A)":
        this.welshPdfLink = "welsh_non_molestation_order_fl404a_draft.pdf";
        this.englishPdfLink = "non_molestation_order_fl404a_draft.pdf";
        return isWelsh ? this.welshPdfLink : this.englishPdfLink;
      default:
        throw new Error(`Unexpected order type ${orderType}`);
    }
  }

  private async assertPdfContents(
    caseNumber: string,
    isWelsh: boolean,
    pdfName: string,
  ): Promise<void> {
    const draftOrderLink: Locator = this.page.getByRole("link", {
      name: isWelsh ? this.welshPdfLink : this.englishPdfLink,
      exact: true,
    });
    const pdfPage: Page = await this.navigationUtils.openPdfLink(
      this.page,
      draftOrderLink,
    );
    const regionalPdfName = pdfName + (isWelsh ? "-welsh" : "-english");
    // locators to mask in screenshot
    const caseRefLocator: Locator = pdfPage.getByText(caseNumber);
    const dateLocator: Locator = pdfPage.getByText(
      Helpers.todayDate(true) as string,
    );
    const mediaViewerPage = new ExuiMediaViewerPage(pdfPage);
    await mediaViewerPage.runVisualTestOnAllPages(
      pdfPage,
      ["caseWorker", "nonMolestationOrder", regionalPdfName],
      clippingCoords.centeredPageWithoutToolbar,
      [caseRefLocator, dateLocator],
    );
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
