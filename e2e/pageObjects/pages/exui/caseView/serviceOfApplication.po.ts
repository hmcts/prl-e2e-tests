import { expect, Locator, Page } from "@playwright/test";
import { CaseAccessViewPage } from "./caseAccessView.po.js";
import {
  applicationSubmittedBy,
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
  private readonly unservedLabel: Locator =
    this.page.locator("#unServedPackLabel");
  private readonly servedLabel: Locator = this.page.locator("#servedPackLabel");
  private readonly unservedRespondentPack: Locator = this.page.locator(
    "#case-viewer-field-read--unServedRespondentPack",
  );
  private readonly notificationsSection: Locator = this.page.locator(
    "#case-viewer-field-read--finalServedApplicationDetailsList",
  );

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page
      .getByRole("tab", { name: "Service of application" })
      .click();
  }

  //This assertion is for Confidentiality Check journey
  async assertConfidentialCheckDetails(
    caseType: solicitorCaseCreateType,
    orderType: OrderTypes,
  ): Promise<void> {
    //Unserved Pack Checks
    await this.assertUnservedRespondentPackDetails(caseType, orderType);

    await expect(this.page.getByText("Cafcass cymru")).toBeVisible();

    //Served Pack Details
    await this.assertServedPackDetails(caseType, orderType);
  }

  async assertUnservedRespondentPackDetails(
    caseType: solicitorCaseCreateType,
    orderType: OrderTypes,
  ) {
    await expect(this.unservedLabel).toContainText("Unserved pack");

    //Respondent Pack Assertion
    await expect(this.unservedRespondentPack).toBeVisible();
    await expect(this.unservedRespondentPack).toContainText("Respondents pack");
    await expect(this.unservedRespondentPack).toContainText("Document");

    const expectedOrderDocuments: string[] | undefined =
      orderDocuments[orderType];
    if (!expectedOrderDocuments) {
      throw new Error(`No service pack documents configured for ${orderType}`);
    }

    const updatedCommonPackDocuments = commonPackDocuments.filter(
      (document) => document !== "mockFile.pdf",
    );

    const expectedRespondentDocuments: string[] =
      caseType === "C100"
        ? [
            "cover_letter_re5.pdf",
            "cover_letter_welsh_re5.pdf",
            ...updatedCommonPackDocuments,
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
            ...updatedCommonPackDocuments,
            "cover_letter_re1.pdf",
            "cover_letter_welsh_re1.pdf",
            "FL401FinalDocument.pdf",
            "FL401FinalDocumentWelsh.pdf",
            ...expectedOrderDocuments,
            "Safety Letter.docx",
          ];

    await this.assertPackDocuments(
      "Respondents pack",
      expectedRespondentDocuments,
    );

    // Served by value
    const servedBy =
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? "PRL Demo Swansea HCTL"
        : "PRL Court admin";

    await expect(this.unservedRespondentPack).toContainText("Served by");
    await expect(this.unservedRespondentPack).toContainText(servedBy);
    await expect(this.unservedRespondentPack).toContainText(
      "Pack created date",
    );
    await expect(this.unservedRespondentPack).toContainText(
      this.dateHelper.todayDate(),
    );
  }

  async assertServedPackDetails(
    caseType: solicitorCaseCreateType,
    orderType: OrderTypes,
  ) {
    await expect(this.servedLabel).toContainText("Served pack");
    await expect(
      this.page
        .getByText("Print and email notifications", { exact: true })
        .first(),
    ).toBeVisible();
    await expect(this.notificationsSection).toBeVisible();

    const servedBy =
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? "PRL Demo Swansea HCTL"
        : "PRL Swansea Case Manager";
    await expect(this.notificationsSection).toContainText(servedBy);

    await expect(this.notificationsSection).toContainText("By email");
    await expect(this.notificationsSection).toContainText(
      "Court - court admin",
    );

    await this.notificationsSection.locator("img.accordion-image").click();
    await this.notificationsSection.getByText("Print details").isVisible();

    const expectedOrderDocuments: string[] | undefined =
      orderDocuments[orderType];
    if (!expectedOrderDocuments) {
      throw new Error(`No service pack documents configured for ${orderType}`);
    }

    const updatedCommonPackDocuments = commonPackDocuments.filter(
      (document) => document !== "mockFile.pdf",
    );

    const expectedServedDocuments: string[] =
      caseType === "C100"
        ? [
            ...updatedCommonPackDocuments,
            ...expectedOrderDocuments,
            "C100FinalDocument.pdf",
            "C100FinalDocumentWelsh.pdf",
            "C1A_Document.pdf",
            "C1A_Document_Welsh.pdf",
            "Family Presidents letter to parties.pdf",
            "Family Presidents letter to parties - Welsh.pdf",
            "C9_personal_service.pdf",
            "Special arrangements letter.docx",
          ]
        : [
            ...updatedCommonPackDocuments,
            "FL401FinalDocument.pdf",
            "FL401FinalDocumentWelsh.pdf",
            ...expectedOrderDocuments,
            "Safety Letter.docx",
          ];

    //asserting served docs
    await this.validateEmailNotificationDocuments(
      "Email notification details 1",
      expectedServedDocuments,
    );
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

  //This assertion is for Service of application journey
  async assertServicePacks(
    caseType: solicitorCaseCreateType,
    orderType: OrderTypes,
    serviceOptions: ServiceOptions,
    submittedBy: applicationSubmittedBy = "Solicitor",
  ): Promise<void> {
    await expect(
      this.page.getByText("Unserved pack", { exact: true }),
    ).toBeVisible();

    const expectedOrderDocuments: string[] | undefined =
      orderDocuments[orderType];
    if (!expectedOrderDocuments) {
      throw new Error(`No service pack documents configured for ${orderType}`);
    }

    if (submittedBy === "Citizen") {
      await this.assertCitizenServicePacks(
        expectedOrderDocuments[0],
        serviceOptions.personallyServed === "yes",
      );
      return;
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

  private async assertCitizenServicePacks(
    orderDocument: string,
    personallyServed: boolean,
  ): Promise<void> {
    const commonDocuments: string[] = [
      "FL401FinalDocument.pdf",
      "Privacy_Notice.pdf",
      orderDocument,
      "mockFile.pdf",
    ];
    const applicantDocuments: string[] = [
      "cover_letter_ap2.pdf",
      "coversheet.pdf",
      ...commonDocuments,
    ];
    const respondentDocuments: string[] = [
      personallyServed ? "cover_letter_re1.pdf" : "cover_letter_re5.pdf",
      ...commonDocuments,
    ];

    await expect(
      this.page.getByText("Served pack", { exact: true }),
    ).toBeVisible();
    if (personallyServed) {
      await expect(
        this.page.getByText("Unserved pack", { exact: true }),
      ).toBeVisible();
    }

    await this.expandServedPackDetails();
    await this.assertServedPackDocuments("Applicant", applicantDocuments);
    if (personallyServed) {
      await this.assertPackDocuments("Respondents pack", respondentDocuments);
    } else {
      await this.assertServedPackDocuments("Respondent", respondentDocuments);
    }
  }

  private async expandServedPackDetails(): Promise<void> {
    const expanders: Locator = this.page.getByRole("link", {
      name: "accordion-img",
    });
    for (let index = 0; index < (await expanders.count()); index++) {
      await expanders.nth(index).click();
    }
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

  private async assertServedPackDocuments(
    servedParty: "Applicant" | "Respondent",
    documents: string[],
  ): Promise<void> {
    const servedPack: Locator = this.page
      .locator("ccd-read-complex-field-table", {
        hasText: `Served party${servedParty}`,
      })
      .first();
    await expect(servedPack).toBeVisible();
    for (const document of documents) {
      await expect(servedPack).toContainText(document);
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

  private async validateEmailNotificationDocuments(
    panelName: string,
    expectedDocuments: string[],
  ): Promise<void> {
    const panel = this.page.locator(".complex-panel").filter({
      has: this.page.getByText(panelName, { exact: true }),
    });

    const documentsRow = panel.locator("tr").filter({
      has: this.page.getByText("Documents", { exact: true }),
    });

    for (const document of expectedDocuments) {
      await expect(
        documentsRow
          .locator("button")
          .filter({
            hasText: document,
          })
          .first(),
      ).toBeVisible();
    }
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
