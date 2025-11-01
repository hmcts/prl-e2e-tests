import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

interface ApplicantName {
  firstname: string;
  surname: string;
}

export class ApplicationPage extends CaseAccessViewPage {
  private readonly fl401LegalRepresentativeDetailsHeading: Locator =
    this.page.locator(Selectors.h2, {
      hasText: "Legal representative's details",
    });
  private readonly fl401SolicitorDetailsTable: Locator = this.page.locator(
    "#case-viewer-field-read--fl401SolicitorDetailsTable",
  );

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
}
