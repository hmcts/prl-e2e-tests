import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../common/types.ts";

interface ApplicantName {
  firstname: string;
  surname: string;
}

export class ApplicationPage extends CaseAccessViewPage {
  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Application" }).click();
  }

  async assertC100ApplicantsSolicitorsDetailsPresent(
    applicants: ApplicantName[],
  ): Promise<void> {
    for (const applicant of applicants) {
      // get the applicant table by the applicant name and check each expected applicant has had legal representative removed
      const nameRegex = new RegExp(
        `${applicant.firstname}[\\s\\S]*${applicant.surname}`,
      );
      const applicantTable: Locator = this.page.locator(
        "ccd-read-complex-field-table",
        {
          hasText: nameRegex,
        },
      );
      await expect(
        applicantTable.locator("#applicantSolicitorLabel", {
          hasText: "Applicant Solicitor",
        }),
      ).toBeVisible();
    }
  }

  async assertNocSolicitorRepresentsParty(
    caseType: solicitorCaseCreateType,
    party: "applicant" | "respondent",
    solicitorEmail: string,
  ): Promise<void> {
    const partyTableSelector =
      caseType === "C100"
        ? party === "applicant"
          ? "#case-viewer-field-read--applicantTable"
          : "#case-viewer-field-read--respondentTable"
        : party === "applicant"
          ? "#case-viewer-field-read--fl401SolicitorDetailsTable"
          : "#case-viewer-field-read--fl401RespondentTable";

    await expect(
      this.page
        .locator(partyTableSelector)
        .getByRole("link", { name: solicitorEmail }),
    ).toBeVisible();
  }
}
