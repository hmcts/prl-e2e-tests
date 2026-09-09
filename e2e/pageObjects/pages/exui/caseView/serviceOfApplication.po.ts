import { expect, Locator, Page } from "@playwright/test";
import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";
import config from "../../../../utils/config.utils.js";

export interface ServedDetails {
  whoServed: string;
  servedBy: string;
}

export class ServiceOfApplicationPage extends CaseAccessViewPage {
  private readonly statementOfServiceTable: Locator = this.page.locator(
    "#case-viewer-field-read--stmtOfServiceForApplication",
  );
  private dateHelper: DateHelperUtils = new DateHelperUtils();
  private readonly unservedLabel:Locator = this.page.locator(
    "#unServedPackLabel"
  );
  private readonly servedLabel:Locator = this.page.locator(
    "#servedPackLabel"
  );
  private readonly unservedRespondentPack:Locator = this.page.locator(
  "#case-viewer-field-read--unServedRespondentPack"
  );
  private readonly notificationsSection:Locator = this.page.locator(
    "#case-viewer-field-read--finalServedApplicationDetailsList"
  )

  private readonly expectedRespondentDocuments: string[] = [
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
  ];

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page
      .getByRole("tab", { name: "Service of application" })
      .click();
  }

  async assertServiceOfApplicationDetails(

  ): Promise<void> {

    await expect(this.unservedLabel).toContainText('Unserved pack');
    await expect(this.servedLabel).toContainText('Served pack');
    await expect(this.page.getByText('Print and email notifications', { exact: true }).first()).toBeVisible();

    await this.assertUnservedRespondentDetailsWithinServiceOfApplication();





  }

  async assertUnservedRespondentDetailsWithinServiceOfApplication(){

    //Respondent Pack Assertion
    await expect(this.unservedRespondentPack).toBeVisible();
    await expect(this.unservedRespondentPack).toContainText('Respondents pack');
    await expect(this.unservedRespondentPack).toContainText('Document');

    for (const document of this.expectedRespondentDocuments) {
      await expect(this.unservedRespondentPack).toContainText(document);
    }

    // Served by value
    const servedBy =
      process.env.MANAGE_CASES_TEST_ENV === "demo"
        ? "PRL Demo Swansea HCTL"
        : "PRL Court admin";

    await expect(this.unservedRespondentPack).toContainText('Served by');
    await expect(this.unservedRespondentPack).toContainText(servedBy);
    await expect(this.unservedRespondentPack).toContainText('Pack created date');
    await expect(this.unservedRespondentPack).toContainText(this.dateHelper.todayDate());
  }

  async assertServedPackDetails(){

    await expect(this.notificationsSection).toBeVisible();
    await expect(this.notificationsSection).toContainText('PRL Swansea Case Manager');
    await expect(this.notificationsSection).toContainText('By email');
    await expect(this.notificationsSection).toContainText('Court - court admin');

    

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
