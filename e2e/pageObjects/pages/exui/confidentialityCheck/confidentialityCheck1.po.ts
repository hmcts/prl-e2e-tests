import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";
import { Selectors } from "../../../../common/selectors.js";
import { clippingCoords, ExuiMediaViewerPage } from "../exuiMediaViewer.po.js";
import { NavigationUtils } from "../../../../utils/navigation.utils.js";

export class ConfidentialityCheck1Page extends EventPage {
  private readonly navigationUtils: NavigationUtils = new NavigationUtils();
  private readonly warningText: Locator = this.page.getByText(
    "You need to check the confidential details tab and review the service packs in the service of application tab before continuing.",
  );

  private readonly confCheck1PageObjects: string[] = [
    "Applicants pack",
    "Local Authority pack",
    "Others pack",
    "Cafcass cymru",
  ];

  private readonly expectedCaseFieldLabels: string[] = [
    "C8 Document",
    "C8 Document (Welsh)",
    "Respondent 1 English c8 Document",
    "Respondent 1 Welsh c8 Document",
    "Respondent 2 English c8 Document",
    "Respondent 2 Welsh c8 Document",
    "Respondent 3 English c8 Document",
    "Respondent 3 Welsh c8 Document",
    "Respondent 4 English c8 Document",
    "Respondent 4 Welsh c8 Document",
    "Respondent 5 English c8 Document",
    "Respondent 5 Welsh c8 Document",
    "Applicant 1 Refuge C8 Document",
    "Applicant 1 Refuge C8 Document",
    "Applicant 1 Refuge C8 Document",
    "Applicant 1 Refuge C8 Document",
    "Applicant 1 Refuge C8 Document",
    "Respondent 1 Refuge C8 Document",
    "Respondent 1 Refuge C8 Document",
    "Respondent 1 Refuge C8 Document",
    "Respondent 1 Refuge C8 Document",
    "Respondent 1 Refuge C8 Document",
    "Other Person 1 Refuge C8 Document",
    "Other Person 1 Refuge C8 Document",
    "Other Person 1 Refuge C8 Document",
    "Other Person 1 Refuge C8 Document",
    "Other Person 1 Refuge C8 Document",
  ];
  private readonly formLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Can the application be served?",
    },
  );
  private readonly hiddenFormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Give reasons why the application cannot be served",
    },
  );
  private readonly yesAndNoLabels: string[] = ["Yes", "No"];
  private readonly reason: Locator = this.page.locator("#rejectionReason");

  constructor(page: Page) {
    super(page, "Confidentiality check");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(snapshotsPath: string[],): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.warningText).toBeVisible();
    await this.validatePackDocuments("Applicants pack", [
      "C100FinalDocument.pdf",
      "C100FinalDocumentWelsh.pdf",
      "C1A_Document.pdf",
      "C1A_Document_Welsh.pdf",
      "Privacy_Notice.pdf",
      "Privacy_Notice_Welsh.pdf",
      "Annex 1 - Confidential contact details notice.pdf",
      "Annex 1 - Confidential contact details notice - welsh.pdf",
      "Family Presidents letter to parties.pdf",
      "Family Presidents letter to parties - Welsh.pdf",
      "C9_personal_service.pdf",
      "ChildArrangements_Specific_Prohibited_Steps_C43.pdf",
      "Welsh_ChildArrangements_Specific_Prohibited_Steps_C43.pdf",
      "Special arrangements letter.docx",
    ]);

    await this.validatePackDocuments("Respondents pack", [
      "cover_letter_re5.pdf",
      "cover_letter_welsh_re5.pdf",
      "C100FinalDocument.pdf",
      "C100FinalDocumentWelsh.pdf",
      "C1A_Document.pdf",
      "C1A_Document_Welsh.pdf",
      "Privacy_Notice.pdf",
      "Privacy_Notice_Welsh.pdf",
      "Annex 1 - Confidential contact details notice.pdf",
      "Annex 1 - Confidential contact details notice - welsh.pdf",
      "Family Presidents letter to parties.pdf",
      "Family Presidents letter to parties - Welsh.pdf",
      "Blank_C7.pdf",
      "C1A_Blank.pdf",
      "C1A_Blank_Welsh.pdf",
      "ChildArrangements_Specific_Prohibited_Steps_C43.pdf",
      "Welsh_ChildArrangements_Specific_Prohibited_Steps_C43.pdf",
      "Special arrangements letter.docx",
    ]);
    await this.pageUtils.assertStrings(this.confCheck1PageObjects);

    for (const label of this.expectedCaseFieldLabels) {
      await expect(
        this.page.locator(".case-field__label").filter({
          hasText: label,
        }),
      ).toBeVisible();
    }
    await expect(
      this.page.locator(Selectors.GovLink).filter({
        hasText: /Confidential_C8 of.*\.pdf/,
      }),
    ).toHaveCount(2);

    await expect(this.formLabel).toBeVisible();
    await this.pageUtils.assertStrings(
      this.yesAndNoLabels,
      this.page.locator(
        `#applicationServedYesNo_radio ${Selectors.GovukFormLabel}`,
      ),
    );
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();

    // assert Confidential contact details notice in media viewer
    await this.assertPdfContents(true, snapshotsPath);
    await this.assertPdfContents(false, snapshotsPath);
  }

  async serveApplication(
    isApplicationServedAfterConfidentialityCheck: boolean,
  ) {
    await this.page
      .getByRole("group", { name: "Can the application be served?" })
      .getByLabel(isApplicationServedAfterConfidentialityCheck ? "Yes" : "No")
      .check();

    if (!isApplicationServedAfterConfidentialityCheck) {
      await expect(this.hiddenFormLabel).toBeVisible();
      await this.reason.fill("loremIpsum");
    }
  }

  private async validatePackDocuments(
    packName: string,
    documents: string[],
  ): Promise<void> {
    const pack = this.page
      .locator(".complex-panel")
      .filter({
        has: this.page.getByText(packName, { exact: true }),
      })
      .first();

    await expect(pack).toBeVisible();

    await expect(pack.getByText("Document", { exact: true })).toBeVisible();

    for (const document of documents) {
      await expect(
        pack.locator("button").first().filter({ hasText: document }),
      ).toBeVisible();
    }

    // Served by label
    await expect(pack.getByText("Served by", { exact: true })).toBeVisible();

    // Served by value
    const servedBy =
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? "PRL Demo Swansea HCTL"
        : "PRL Court admin";

    await expect(pack.getByText(servedBy, { exact: true })).toBeVisible();

    // Pack created date label
    await expect(
      pack.getByText("Pack created date", { exact: true }),
    ).toBeVisible();
  }

  async assertPdfContents(
    isApplicant: boolean,
    snapshotsPath: string[],
    ): Promise<void> {
    const locatorText: string = isApplicant
      ? "Applicants pack"
      : "Respondents pack";
    const packLocator = this.page.locator("ccd-read-complex-field-table", {
      hasText: locatorText,
    });

    const pdfLocator = packLocator.locator(
    Selectors.GovLink,
    {
      hasText: 'Annex 1 - Confidential contact details notice.pdf',
    }
  );
    const pdfPage: Page = await this.navigationUtils.openPdfLink(
      this.page,
      pdfLocator,
    );
    const pdfName: string = `${isApplicant ? "applicant" : "respondent"}-confidential-contact-details-notice`;
    const snapshotPath: string[] = [...snapshotsPath, pdfName];
    const mediaViewerPage = new ExuiMediaViewerPage(pdfPage);
    await mediaViewerPage.runVisualTestOnAllPages(
      pdfPage,
      snapshotPath,
      clippingCoords.centeredPageWithoutToolbar,
    );
  }
}
