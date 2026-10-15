import { expect, Locator, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import {
  ApplicantGender,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { EventPage } from "../eventPage.po.ts";

interface FillInFieldsOptions {
  caseType: solicitorCaseCreateType;
  gender: ApplicantGender;
}

export class AmendApplicantDetails1 extends EventPage {
  private readonly pageContent = {
    intro:
      "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
    solicitorDetailsHeading: "Solicitor's Details",
    commonTextboxLabels: [
      "*First name(s)",
      "*Last name",
      "Previous name (if any) (Optional)",
      "*Contact Number",
      "*Representative's first name (Optional)",
      "*Representative's last name (Optional)",
      "*Email address (Optional)",
      "Solicitor reference (Optional)",
    ],
    commonGroupLabels: [
      "*Date of birth",
      "*Gender",
      "*Does the applicant currently live in a refuge?",
    ],
    c100TextboxLabels: ["*Place of birth (town)"],
    c100GroupLabels: [
      "*Do you need to keep their address confidential?",
      "*Has applicant lived at this address for less than 5 years?",
      "*Can you provide their email address?",
      "*Do you need to keep their email address confidential?",
      "*Do you need to keep their contact number confidential?",
    ],
    addressLabels: {
      C100: [
        "Building and Street",
        "Address Line 2 (Optional)",
        "Address Line 3 (Optional)",
        "Town or City (Optional)",
        "County (Optional)",
        "Postcode/Zipcode (Optional)",
        "Country (Optional)",
      ],
      FL401: [
        "Building and Street",
        "Address Line 2 (Optional)",
        "Town or City (Optional)",
        "County (Optional)",
        "Postcode/Zipcode (Optional)",
        "Country (Optional)",
      ],
    },
    applicant: {
      C100: {
        firstName: "John",
        lastName: "Smith",
        previousName: "John Smith",
      },
      FL401: {
        firstName: "John",
        lastName: "Doe",
        previousName: "John Doe",
      },
    },
    otherGender: "NonBinary",
    placeOfBirth: "Swansea",
    applicantPostcode: "SA1 1AD",
    applicantEmail: "test@test.com",
    applicantPhoneNumber: "07123456781",
    solicitorFirstName: "Joe",
    solicitorLastName: "Bloggs",
    solicitorEmail: "test@test.com",
    solicitorPhoneNumber: "07123456789",
    solicitorReference: "123456",
    solicitorPostcode: "SA1 1DW",
  } as const;

  private readonly cannotFindOrganisationCheckboxes: Locator =
    this.page.locator("#content-why-can-not-find-organisation");

  private readonly applicantPrefix = (
    caseType: solicitorCaseCreateType,
  ): string => (caseType === "C100" ? "#applicants_0" : "#applicantsFL401");

  private applicantField(
    caseType: solicitorCaseCreateType,
    suffix: string,
  ): Locator {
    return this.page.locator(`${this.applicantPrefix(caseType)}_${suffix}`);
  }

  private applicantAddressGroup(caseType: solicitorCaseCreateType): Locator {
    return this.applicantField(caseType, "address__detailaddress");
  }

  constructor(page: Page) {
    super(page, "Amend applicant details");
  }

  async assertPageContents(caseType: solicitorCaseCreateType): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(this.pageContent.intro)).toBeVisible();
    await expect(
      this.page
        .getByRole("heading", {
          name: caseType === "C100" ? "*Applicant" : "Applicant",
          exact: true,
        })
        .first(),
    ).toBeVisible();
    await expect(
      this.page.getByText(this.pageContent.solicitorDetailsHeading).first(),
    ).toBeVisible();

    const textboxLabels = [
      ...this.pageContent.commonTextboxLabels,
      ...(caseType === "C100" ? this.pageContent.c100TextboxLabels : []),
    ];
    for (const label of textboxLabels) {
      await expect(
        this.page.getByRole("textbox", { name: label, exact: true }).first(),
      ).toBeVisible();
    }

    const groupLabels = [
      ...this.pageContent.commonGroupLabels,
      ...(caseType === "C100" ? this.pageContent.c100GroupLabels : []),
    ];
    for (const label of groupLabels) {
      await expect(
        this.page.getByRole("group", { name: label }).first(),
      ).toBeVisible();
    }

    await this.assertAddressLabels(
      this.applicantAddressGroup(caseType),
      caseType,
    );
    await expect(this.cannotFindOrganisationCheckboxes.first()).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectCannotFindOrganisation(): Promise<void> {
    await this.cannotFindOrganisationCheckboxes.first().click();
  }

  async fillInFields({ caseType, gender }: FillInFieldsOptions): Promise<void> {
    const applicant = this.pageContent.applicant[caseType];
    const [day, month, year] = Helpers.generateDOB(false);

    await this.applicantField(caseType, "firstName").fill(applicant.firstName);
    await this.applicantField(caseType, "lastName").fill(applicant.lastName);
    await this.applicantField(caseType, "previousName").fill(
      applicant.previousName,
    );
    await this.page.getByRole("textbox", { name: "Day" }).first().fill(day);
    await this.page.getByRole("textbox", { name: "Month" }).first().fill(month);
    await this.page.getByRole("textbox", { name: "Year" }).first().fill(year);

    await this.applicantField(caseType, `gender-${gender}`).check();
    if (gender === "other") {
      await this.applicantField(caseType, "otherGender").fill(
        this.pageContent.otherGender,
      );
    }

    if (caseType === "C100") {
      await this.applicantField(caseType, "placeOfBirth").fill(
        this.pageContent.placeOfBirth,
      );
    }

    await this.applicantField(caseType, "liveInRefuge_Yes").check();
    await this.fillApplicantAddress(caseType);
    await this.fillConfidentialContactDetails(caseType);
    await this.fillSolicitorDetails(caseType);
  }

  async c100updateApplicantsName(
    firstname: string,
    surname: string,
  ): Promise<void> {
    await this.applicantField("C100", "firstName").fill(firstname);
    await this.applicantField("C100", "lastName").fill(surname);
  }

  async fl401updateApplicantsName(
    firstname: string,
    surname: string,
  ): Promise<void> {
    await this.applicantField("FL401", "firstName").fill(firstname);
    await this.applicantField("FL401", "lastName").fill(surname);
  }

  private async fillApplicantAddress(
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.findAndSelectAddress(
      caseType,
      "address_address",
      this.pageContent.applicantPostcode,
    );
  }

  private async fillConfidentialContactDetails(
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.applicantField(caseType, "isAddressConfidential_Yes").check();
    await this.applicantField(
      caseType,
      "canYouProvideEmailAddress_Yes",
    ).check();
    await this.applicantField(caseType, "email").fill(
      this.pageContent.applicantEmail,
    );
    await this.applicantField(caseType, "phoneNumber").fill(
      this.pageContent.applicantPhoneNumber,
    );
    await this.applicantField(
      caseType,
      "isEmailAddressConfidential_Yes",
    ).check();
    await this.applicantField(
      caseType,
      "isPhoneNumberConfidential_Yes",
    ).check();
  }

  private async fillSolicitorDetails(
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.applicantField(caseType, "representativeFirstName").fill(
      this.pageContent.solicitorFirstName,
    );
    await this.applicantField(caseType, "representativeLastName").fill(
      this.pageContent.solicitorLastName,
    );
    await this.applicantField(caseType, "solicitorReference").fill(
      this.pageContent.solicitorReference,
    );
    if (caseType === "FL401") {
      await this.applicantField(caseType, "solicitorTelephone").fill(
        this.pageContent.solicitorPhoneNumber,
      );
    }
    await this.applicantField(caseType, "solicitorEmail").fill(
      this.pageContent.solicitorEmail,
    );
    await this.findAndSelectAddress(
      caseType,
      "solicitorAddress_solicitorAddress",
      this.pageContent.solicitorPostcode,
    );
    await this.assertSolicitorAddressFields(caseType);
  }

  private async findAndSelectAddress(
    caseType: solicitorCaseCreateType,
    fieldPrefix: string,
    postcode: string,
  ): Promise<void> {
    await this.applicantField(caseType, `${fieldPrefix}_postcodeInput`).fill(
      postcode,
    );
    const addressResponsePromise = this.page.waitForResponse((response) =>
      response
        .url()
        .includes(`/api/addresses?postcode=${postcode.replaceAll(" ", "")}`),
    );
    await this.applicantField(caseType, `${fieldPrefix}_postcodeLookup`)
      .getByRole("button", { name: "Find address" })
      .click();
    const addressResponse = await addressResponsePromise;
    expect(
      addressResponse.ok(),
      `Address lookup failed for ${postcode} with HTTP ${addressResponse.status()}`,
    ).toBeTruthy();

    const addressSelect = this.applicantField(
      caseType,
      `${fieldPrefix}_addressList`,
    );
    await expect(
      addressSelect.locator("option").nth(1),
      `No addresses were returned for ${postcode}`,
    ).toBeAttached();
    await addressSelect.selectOption({ index: 1 });
  }

  private async assertSolicitorAddressFields(
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    const addressFieldSuffixes = [
      "solicitorAddress__detailAddressLine1",
      "solicitorAddress__detailAddressLine2",
      "solicitorAddress__detailAddressLine3",
      "solicitorAddress__detailPostTown",
      "solicitorAddress__detailCounty",
      "solicitorAddress__detailPostCode",
      "solicitorAddress__detailCountry",
    ];
    for (const suffix of addressFieldSuffixes) {
      await expect(this.applicantField(caseType, suffix)).toBeVisible();
    }
  }

  private async assertAddressLabels(
    addressGroup: Locator,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    for (const label of this.pageContent.addressLabels[caseType]) {
      await expect(
        addressGroup.getByText(label, { exact: true }),
      ).toBeVisible();
    }
  }
}
