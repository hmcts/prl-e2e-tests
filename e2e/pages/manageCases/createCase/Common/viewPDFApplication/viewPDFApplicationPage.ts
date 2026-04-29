import { expect, Locator, Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { ViewPDFApplicationContent } from "../../../../../fixtures/manageCases/createCase/FL401/viewPDFApplication/viewPDFApplicationContent.ts";
import {
  clippingCoords,
  ExuiMediaViewerPage,
} from "../../../../../pageObjects/pages/exui/exuiMediaViewer.po.ts";
import { NavigationUtils } from "../../../../../utils/navigation.utils.ts";
import { solicitorCaseCreateType } from "../../../../../common/types.ts";

interface CheckPdfContentsParams {
  page: Page;
  navigationUtils: NavigationUtils;
  caseNumber: string;
  pdfLink: string;
  snapshotName: string;
  caseType: solicitorCaseCreateType;
}

export class ViewPDFApplicationPage {
  private static readonly fl401EnglishApplicationPdfName: string =
    "Draft_DA_application.pdf";
  private static readonly fl401WelshApplicationPdfName: string =
    "Draft_DA_Welsh_application.pdf";
  private static readonly c100EnglishApplicationPdfName: string =
    "Draft_C100_application.pdf";
  private static readonly c100WelshApplicationPdfName: string =
    "Draft_C100_application_welsh.pdf";
  private static readonly englishC1APdfName: string = "C1A_DocumentDraft.pdf";
  private static readonly welshC1APdfName: string =
    "C1A_Document_Draft_Welsh.pdf";

  public static async viewPDFApplicationPage(
    page: Page,
    navigationUtils: NavigationUtils,
    caseNumber: string,
    caseType: solicitorCaseCreateType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      navigationUtils,
      caseNumber,
      caseType,
      accessibilityTest,
    );
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    navigationUtils: NavigationUtils,
    caseNumber: string,
    caseType: solicitorCaseCreateType,
    accessibilityTest: boolean,
  ): Promise<void> {
    // check page layout
    await expect(
      page.getByRole("heading", { name: "View PDF application" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Download Application" }),
    ).toBeVisible();
    await expect(
      page.getByText("Use this link to download and check the application."),
    ).toBeVisible();
    await expect(
      page.getByText("Draft Document", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name:
          caseType === "C100"
            ? this.c100EnglishApplicationPdfName
            : this.fl401EnglishApplicationPdfName,
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByText("Draft Document (Welsh)", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name:
          caseType === "C100"
            ? this.c100WelshApplicationPdfName
            : this.fl401WelshApplicationPdfName,
        exact: true,
      }),
    ).toBeVisible();

    if (caseType === "C100") {
      await expect(
        page.getByText("C1A Draft Document", { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", {
          name: this.englishC1APdfName,
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page.getByText("C1A Draft Document (Welsh)", { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", {
          name: this.welshC1APdfName,
          exact: true,
        }),
      ).toBeVisible();
    }

    // check english application pdf
    await this.checkPdfContents({
      page,
      navigationUtils,
      caseNumber,
      pdfLink:
        caseType === "C100"
          ? this.c100EnglishApplicationPdfName
          : this.fl401EnglishApplicationPdfName,
      snapshotName: `${caseType}-draft-application-english`,
      caseType,
    });
    // check welsh application pdf
    await this.checkPdfContents({
      page,
      navigationUtils,
      caseNumber,
      pdfLink:
        caseType === "C100"
          ? this.c100WelshApplicationPdfName
          : this.fl401WelshApplicationPdfName,
      snapshotName: `${caseType}-draft-application-welsh`,
      caseType,
    });

    if (caseType === "C100") {
      // check english C1A pdf
      await this.checkPdfContents({
        page,
        navigationUtils,
        caseNumber,
        pdfLink: this.englishC1APdfName,
        snapshotName: `${caseType}-draft-c1a-english`,
        caseType,
      });
      // check welsh C1A pdf
      await this.checkPdfContents({
        page,
        navigationUtils,
        caseNumber,
        pdfLink: this.welshC1APdfName,
        snapshotName: `${caseType}-draft-c1a-welsh`,
        caseType,
      });
    }

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPdfContents({
    page,
    navigationUtils,
    caseNumber,
    pdfLink,
    snapshotName,
    caseType,
  }: CheckPdfContentsParams): Promise<void> {
    const draftDocumentLink: Locator = page.getByRole("button", {
      name: pdfLink,
      exact: true,
    });
    const pdfPage: Page = await navigationUtils.openPdfLink(
      page,
      draftDocumentLink,
    );
    // locators to mask in screenshot
    const caseRefLocator: Locator = pdfPage.getByText(caseNumber);
    const snapshotPath: string[] = ["createCase", caseType, snapshotName];
    const mediaViewerPage = new ExuiMediaViewerPage(pdfPage);
    await mediaViewerPage.runVisualTestOnAllPages(
      pdfPage,
      snapshotPath,
      clippingCoords.centeredPageWithoutToolbar,
      [caseRefLocator],
    );
    await pdfPage.close();
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page
      .getByRole("button", { name: ViewPDFApplicationContent.continue })
      .click();
  }
}
