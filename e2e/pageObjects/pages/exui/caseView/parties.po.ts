import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

interface ApplicantName {
  firstname: string;
  surname: string;
}

export class PartiesPage extends CaseAccessViewPage {
  private readonly fl401LegalRepresentativeDetailsHeading: Locator =
    this.page.locator(Selectors.h2, {
      hasText: "Legal representative's details",
    });
  private readonly fl401SolicitorDetailsTable: Locator = this.page.locator(
    "#case-viewer-field-read--fl401SolicitorDetailsTable",
  );
  private readonly barristerFirstName: Locator = this.page
    .locator("#allocatedBarrister_barristerFirstName")
    .first();
  private readonly barristerLastName: Locator = this.page
    .locator("#allocatedBarrister_barristerLastName")
    .first();
  private readonly barristerEmail: Locator = this.page
    .locator("#allocatedBarrister_barristerEmail")
    .first();
  private readonly barristerOrg: Locator = this.page
    .locator("#search-org-text")
    .first();

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Parties" }).click();
  }

  async assertC100BarristerDetailsPresent(
    firstnames: string,
    lastname: string,
    email: string,
    org: string,
  ): Promise<void> {
    await expect(
      this.page
        .locator("#barristerLabel", {
          hasText: "Applicant barrister",
        })
        .first(),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.Span, { hasText: firstnames }).first(),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.Span, { hasText: lastname }).first(),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.Span, { hasText: email }).first(),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.Span, { hasText: org }).first(),
    ).toBeVisible();
  }

  async assertC100BarristerDetailsRemoved(
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
        applicantTable
          .locator("#barristerLabel", {
            hasText: "Applicant barrister",
          })
          .first(),
      ).toBeHidden();
    }
  }

  async assertC100ApplicantsSolicitorsDetailsRemoved(
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
      ).toBeHidden();
    }
  }

  async assertFl401ApplicantSolicitorDetailsRemoved(): Promise<void> {
    // FL401 is a bit different only need to check the solicitor section is hidden once
    await expect(this.fl401LegalRepresentativeDetailsHeading).toBeHidden();
    await expect(this.fl401SolicitorDetailsTable).toBeHidden();
  }
}
