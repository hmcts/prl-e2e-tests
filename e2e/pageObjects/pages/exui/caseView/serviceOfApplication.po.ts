import { expect, Locator, Page } from "@playwright/test";
import { CaseAccessViewPage } from "./caseAccessView.po.js";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";
import config from "../../../../utils/config.utils.js";

export interface ServedDetails {
  whoServed: string;
  servedBy: string;
}

const commonPackDocuments: string[] = [
  "Annex 1 - Confidential contact details notice.pdf",
  "Annex 1 - Confidential contact details notice - welsh.pdf",
  "Privacy_Notice.pdf",
  "Privacy_Notice_Welsh.pdf",
  "mockFile.pdf",
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
  "Amended, discharged or varied order (FL404B)": [
    "amended_discharged_or_varied_order_fl404b_final.pdf",
    "welsh_amended_discharged_or_varied_order_fl404b_final.pdf",
  ],
};

export class ServiceOfApplicationPage extends CaseAccessViewPage {
  private readonly statementOfServiceTable: Locator = this.page.locator(
    "#case-viewer-field-read--stmtOfServiceForApplication",
  );
  private dateHelper: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page
      .getByRole("tab", { name: "Service of application" })
      .click();
  }

  async assertStatementOfServiceDetails(
    servedDetails: ServedDetails[],
  ): Promise<void> {
    for (let i = 0; i < servedDetails.length; i++) {
      const servedDetail: ServedDetails = servedDetails[i];
      const sosTable: Locator = this.statementOfServiceTable.getByRole("cell", {
        name: `Statement of Service ${i + 1}`,
      });
      const sosHeading: Locator = sosTable.getByText(
        `Statement of Service ${i + 1}`,
      );
      await expect(sosHeading).toBeVisible();
      await this.assertTableRow(
        sosTable,
        "Who was served?",
        servedDetail.whoServed,
      );
      await this.assertTableRow(
        sosTable,
        "When were they served?",
        this.dateHelper.todayDate() as string,
      );
      await this.assertTableRow(sosTable, "Served by", servedDetail.servedBy);

      // Statement of service document details
      const sosDocHeading: Locator = sosTable.getByText(
        "Statement of service document",
      );
      await expect(sosDocHeading).toBeVisible();
      await this.assertTableRow(
        sosTable,
        "Upload document(PDF, .doc)",
        config.testPdfFile.split("/").pop(),
      );
    }
  }

  async assertServicePacks(
    caseType: solicitorCaseCreateType,
    orderType: OrderTypes,
    personallyServed: boolean,
  ): Promise<void> {
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
          ]
        : [
            "FL401FinalDocument.pdf",
            "FL401FinalDocumentWelsh.pdf",
            ...expectedOrderDocuments,
          ];
    const applicantDocuments: string[] = [
      ...commonPackDocuments,
      ...applicationDocuments,
    ];
    const respondentDocuments: string[] = [
      ...applicantDocuments,
      ...(personallyServed
        ? ["cover_letter_re1.pdf", "cover_letter_welsh_re1.pdf"]
        : [
            "C1A_Blank.pdf",
            "C1A_Blank_Welsh.pdf",
            "Blank_C7.pdf",
            "cover_letter_re5.pdf",
            "cover_letter_welsh_re5.pdf",
          ]),
    ];

    const sectionHeadings: string[] =
      caseType === "C100"
        ? ["Unserved pack", "Cafcass cymru"]
        : ["Unserved pack"];
    for (const heading of sectionHeadings) {
      await expect(this.page.getByText(heading, { exact: true })).toBeVisible();
    }
    await this.assertPackDocuments("Applicants pack", applicantDocuments);
    await this.assertPackDocuments("Respondents pack", respondentDocuments);
  }

  private async assertPackDocuments(
    packName: string,
    documents: string[],
  ): Promise<void> {
    const pack: Locator = this.page.locator("ccd-read-complex-field-table", {
      hasText: packName,
    });
    await expect(pack).toBeVisible();
    for (const document of documents) {
      await expect(
        pack.getByRole("button", { name: document, exact: true }).first(),
      ).toBeVisible();
    }
  }

  private async assertTableRow(
    sosTable: Locator,
    label: string,
    value: string,
  ): Promise<void> {
    const labelLocator: Locator = sosTable
      .getByRole("rowheader", {
        name: label,
        exact: true,
      })
      .first();
    //const exactValue: boolean = !label.includes("When");
    const valueLocator: Locator = sosTable
      .getByRole("cell", {
        name: value,
        exact: false,
      })
      .first();
    await expect(labelLocator).toBeVisible();
    await expect(valueLocator).toBeVisible();
  }
}
