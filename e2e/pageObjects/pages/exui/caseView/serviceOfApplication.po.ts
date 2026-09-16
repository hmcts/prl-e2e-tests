import { expect, Locator, Page } from "@playwright/test";
import { CaseAccessViewPage } from "./caseAccessView.po.js";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";
import config from "../../../../utils/config.utils.js";
import { ServiceOptions } from "../serviceOfApplication/serviceOfApplication4.po.js";

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
  "Parental responsibility order (C45A)": [
    "Parental_Responsibility_Order_C45A.pdf",
    "Welsh_Parental_Responsibility_Order_C45A.pdf",
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
    serviceOptions: ServiceOptions,
  ): Promise<void> {
    await expect(
      this.page.getByText("Unserved pack", { exact: true }),
    ).toBeVisible();

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

    if (serviceOptions.personallyServed !== "notApplicable") {
      const applicantDocuments: string[] = [
        ...commonPackDocuments,
        ...applicationDocuments,
        ...this.addApplicantSpecificDocuments(caseType, serviceOptions),
      ];

      const respondentDocuments: string[] = [
        ...commonPackDocuments,
        ...applicationDocuments,
        ...this.addRespondentSpecificDocuments(caseType, serviceOptions),
      ];

      await this.assertPackDocuments("Applicants pack", applicantDocuments);

      await this.assertPackDocuments("Respondents pack", respondentDocuments);
    }

    if (serviceOptions.serveCafcass) {
      // Cafcass cymru are not directly served any documents
      await this.assertPackDocuments("Cafcass cymru", []);
    }

    if (serviceOptions.serveLocalAuthority) {
      await this.assertLocalAuthorityPack();
    }
  }

  private addApplicantSpecificDocuments(
    caseType: string,
    serviceOptions: ServiceOptions,
  ): string[] {
    const applicantsDocuments: string[] = [];
    if (caseType === "C100") {
      if (serviceOptions.personallyServed === "yes") {
        applicantsDocuments.push("C9_personal_service.pdf");
      }
    } else {
      if (
        serviceOptions.personallyServed === "yes" &&
        serviceOptions.servedBy === "applicantsSolicitor"
      ) {
        applicantsDocuments.push("FL415.pdf");
      }
    }

    // TODO: assert that Served by is correct - currently waiting on ticket ... to implement this check

    return applicantsDocuments;
  }

  private addRespondentSpecificDocuments(
    caseType: string,
    serviceOptions: ServiceOptions,
  ): string[] {
    const respondentsDocuments: string[] = [];

    if (caseType === "C100") {
      // documents that all C100 respondent packs have
      respondentsDocuments.push("Blank_C7.pdf");
      respondentsDocuments.push("C1A_Blank.pdf");
      respondentsDocuments.push("C1A_Blank_Welsh.pdf");

      if (
        serviceOptions.personallyServed === "yes" &&
        serviceOptions.servedBy === "applicantsSolicitor"
      ) {
        // repeated 3 times because of three respondents on the case
        respondentsDocuments.push(
          "cover_letter_re6.pdf",
          "cover_letter_welsh_re6.pdf",
          "cover_letter_re6.pdf",
          "cover_letter_welsh_re6.pdf",
          "cover_letter_re6.pdf",
          "cover_letter_welsh_re6.pdf",
        );
      } else {
        // repeated 3 times because of three respondents on the case
        respondentsDocuments.push(
          "cover_letter_re5.pdf",
          "cover_letter_welsh_re5.pdf",
          "cover_letter_re5.pdf",
          "cover_letter_welsh_re5.pdf",
          "cover_letter_re5.pdf",
          "cover_letter_welsh_re5.pdf",
        );
      }
    } else {
      if (
        serviceOptions.personallyServed === "yes" &&
        serviceOptions.servedBy === "applicantsSolicitor"
      ) {
        respondentsDocuments.push(
          "cover_letter_re3.pdf",
          "cover_letter_welsh_re3.pdf",
        );
      } else {
        respondentsDocuments.push(
          "cover_letter_re1.pdf",
          "cover_letter_welsh_re1.pdf",
        );
      }
    }

    return respondentsDocuments;
  }

  private async assertPackDocuments(
    packName: string,
    documents: string[],
  ): Promise<void> {
    const pack: Locator = this.page.locator("ccd-read-complex-field-table", {
      hasText: packName,
    });
    await expect(pack).toBeVisible();
    await expect(pack.getByRole("button")).toHaveCount(documents.length);
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

  private async assertLocalAuthorityPack(): Promise<void> {
    const pack: Locator = this.page.locator("ccd-read-complex-field-table", {
      hasText: "Local Authority pack",
    });
    await expect(pack).toBeVisible();
    await expect(pack.getByRole("button")).toHaveCount(3);
    await expect(
      pack
        .getByRole("button", {
          name: "Draft_C100_application.pdf",
          exact: true,
        })
        .first(),
    ).toBeVisible();
    await expect(
      pack
        .getByRole("button", {
          name: /^Confidential_C8.*(?<! Welsh)\.pdf$/,
          exact: true,
        })
        .first(),
    ).toBeVisible();
    await expect(
      pack
        .getByRole("button", {
          name: /^Confidential_C8.* Welsh\.pdf$/,
          exact: true,
        })
        .first(),
    ).toBeVisible();
  }
}
