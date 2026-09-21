import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";
import { Selectors } from "../../../../common/selectors.js";
import { clippingCoords, ExuiMediaViewerPage } from "../exuiMediaViewer.po.js";
import { NavigationUtils } from "../../../../utils/navigation.utils.js";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.js";

const commonPackDocuments: string[] = [
  "Annex 1 - Confidential contact details notice.pdf",
  "Annex 1 - Confidential contact details notice - welsh.pdf",
  "Privacy_Notice.pdf",
  "Privacy_Notice_Welsh.pdf",
];

const expectedC100CaseFieldLabels: string[] = [
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
  "Applicant 2 Refuge C8 Document",
  "Applicant 3 Refuge C8 Document",
  "Applicant 4 Refuge C8 Document",
  "Applicant 5 Refuge C8 Document",
  "Respondent 1 Refuge C8 Document",
  "Respondent 2 Refuge C8 Document",
  "Respondent 3 Refuge C8 Document",
  "Respondent 4 Refuge C8 Document",
  "Respondent 5 Refuge C8 Document",
  "Other Person 1 Refuge C8 Document",
  "Other Person 2 Refuge C8 Document",
  "Other Person 3 Refuge C8 Document",
  "Other Person 4 Refuge C8 Document",
  "Other Person 5 Refuge C8 Document",
];

const expectedFL401CaseFieldLabels: string[] = [
  "C8 Document",
  "C8 Document (Welsh)",
  "Respondent 1 English c8 Document",
  "Respondent 1 Welsh c8 Document",
  "Applicant 1 Refuge C8 Document",
  "Respondent 1 Refuge C8 Document",
];

const orderDocuments: Partial<Record<OrderTypes, string[]>> = {
  "Child arrangements, specific issue or prohibited steps order (C43)": [
    "ChildArrangements_Specific_Prohibited_Steps_C43.pdf",
    "Welsh_ChildArrangements_Specific_Prohibited_Steps_C43.pdf",
  ],
  "Power of arrest (FL406)": [
    "Power_of_arrest.pdf",
    "Welsh_Power_of_arrest.pdf",
  ],
};

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

  async assertPageContents(
    caseType: solicitorCaseCreateType,
    orderType: OrderTypes,
    snapshotsPath: string[],
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.warningText).toBeVisible();
    await this.pageUtils.assertStrings(this.confCheck1PageObjects);

    const expectedOrderDocuments: string[] | undefined =
      orderDocuments[orderType];
    if (!expectedOrderDocuments) {
      throw new Error(`No service pack documents configured for ${orderType}`);
    }

    const applicationDocuments: string[] =
      caseType === "C100"
        ? [
            "C100FinalDocument.pdf",
            "C100FinalDocumentWelsh.pdf",
            "C1A_Document.pdf",
            "C1A_Document_Welsh.pdf",
            "Family Presidents letter to parties.pdf",
            "Family Presidents letter to parties - Welsh.pdf",
            ...expectedOrderDocuments,
            "C9_personal_service.pdf",
            "Special arrangements letter.docx",
          ]
        : [
            "FL401FinalDocument.pdf",
            "FL401FinalDocumentWelsh.pdf",
            ...expectedOrderDocuments,
            "Safety Letter.docx",
          ];
    const applicantDocuments: string[] = [
      ...commonPackDocuments,
      ...applicationDocuments,
    ];
    const respondentDocuments: string[] =
      caseType === "C100"
        ? [
            "cover_letter_re5.pdf",
            "cover_letter_welsh_re5.pdf",
            ...commonPackDocuments,
            ...expectedOrderDocuments,
            "C100FinalDocument.pdf",
            "C100FinalDocumentWelsh.pdf",
            "C1A_Document.pdf",
            "C1A_Document_Welsh.pdf",
            "Family Presidents letter to parties.pdf",
            "Family Presidents letter to parties - Welsh.pdf",
            "Blank_C7.pdf",
            "C1A_Blank.pdf",
            "C1A_Blank_Welsh.pdf",
            "Special arrangements letter.docx",
          ]
        : [
            ...applicantDocuments,
            "cover_letter_re1.pdf",
            "cover_letter_welsh_re1.pdf",
          ];

    await this.assertPackDocuments("Applicants pack", applicantDocuments);
    await this.assertPackDocuments("Respondents pack", respondentDocuments);

    const expectedCaseFieldLabels: string[] =
      caseType === "C100"
        ? [...expectedC100CaseFieldLabels]
        : [...expectedFL401CaseFieldLabels];
    for (const label of expectedCaseFieldLabels) {
      await expect(
        this.page
          .locator(".case-field__label")
          .getByText(label, { exact: true }),
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
    await this.assertPdfContents(caseType, true, snapshotsPath);
    await this.assertPdfContents(caseType, false, snapshotsPath);
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

  private async assertPackDocuments(
    packName: string,
    documents: string[],
  ): Promise<void> {
    const pack: Locator = this.page.locator("ccd-read-complex-field-table", {
      hasText: packName,
    });
    await expect(pack.first()).toBeVisible();
    for (const document of documents) {
      await expect(
        pack.getByRole("button", { name: document, exact: true }).first(),
      ).toBeVisible();
    }

    await expect(pack.getByText("Document", { exact: true })).toBeVisible();

    // Served by label
    await expect(pack.getByText("Served by", { exact: true })).toBeVisible();

    // Served by value
    const servedBy = "PRL Court admin";

    await expect(pack.getByText(servedBy, { exact: true })).toBeVisible();

    // Pack created date label
    await expect(
      pack.getByText("Pack created date", { exact: true }),
    ).toBeVisible();
  }

  async assertPdfContents(
    caseType: solicitorCaseCreateType,
    isApplicant: boolean,
    snapshotsPath: string[],
  ): Promise<void> {
    const locatorText: string = isApplicant
      ? "Applicants pack"
      : "Respondents pack";
    const packLocator = this.page.locator("ccd-read-complex-field-table", {
      hasText: locatorText,
    });

    const pdfLocator = packLocator.locator(Selectors.GovLink, {
      hasText: "Annex 1 - Confidential contact details notice.pdf",
    });
    const pdfPage: Page = await this.navigationUtils.openPdfLink(
      this.page,
      pdfLocator,
    );
    const pdfName: string = `${caseType}-${isApplicant ? "applicant" : "respondent"}-confidential-contact-details-notice`;
    const snapshotPath: string[] = [...snapshotsPath, pdfName];
    const mediaViewerPage = new ExuiMediaViewerPage(pdfPage);
    await mediaViewerPage.runVisualTestOnAllPages(
      pdfPage,
      snapshotPath,
      clippingCoords.centeredPageWithoutToolbar,
    );
  }
}
