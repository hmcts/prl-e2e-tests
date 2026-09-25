import { expect, Locator, Page } from "@playwright/test";
import { ApplicantGender } from "../../../../../common/types.ts";
import { EventPage } from "../../eventPage.po.ts";

export interface C100ApplicantDetailsData {
  firstName: string;
  lastName: string;
  previousName: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
    displayValue: string;
  };
  otherGender: string;
  placeOfBirth: string;
  address: {
    postcode: string;
    selection: string;
    buildingAndStreet: string;
    townOrCity: string;
    country: string;
  };
  previousAddresses: string;
  email: string;
  phoneNumber: string;
  representative: {
    firstName: string;
    lastName: string;
    email: string;
    reference: string;
    organisationSearch: string;
    dxNumber: string;
  };
}

interface FillInFieldsOptions {
  applicantDetails: C100ApplicantDetailsData;
  applicantGender: ApplicantGender;
  answerYesToAll: boolean;
}

export class C100ApplicantDetails1Page extends EventPage {
  private readonly introText: Locator = this.page.getByText(
    "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
    { exact: true },
  );
  private readonly applicantHeading: Locator = this.page.getByRole("heading", {
    name: "*Applicant",
    exact: true,
    level: 2,
  });
  private readonly solicitorDetailsHeading: Locator = this.page.getByText(
    "Solicitor's Details",
    { exact: true },
  );
  private readonly errorSummaryHeading: Locator = this.page.getByRole(
    "heading",
    { name: /There is a problem/ },
  );

  constructor(page: Page) {
    super(page, "Applicant details");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.introText).toBeVisible();
    await expect(this.applicantHeading).toBeVisible();
    await expect(this.solicitorDetailsHeading.first()).toBeVisible();

    const textboxLabels = [
      "*First name(s)",
      "*Last name",
      "Previous name (if any) (Optional)",
      "*Place of birth (town)",
      "*Contact Number",
      "*Representative's first name (Optional)",
      "*Representative's last name (Optional)",
      "*Email address (Optional)",
      "Solicitor reference (Optional)",
    ];
    for (const label of textboxLabels) {
      await expect(
        this.page.getByRole("textbox", { name: label, exact: true }).first(),
      ).toBeVisible();
    }

    const groupLabels = [
      "*Date of birth",
      "*Gender",
      "*Does the applicant currently live in a refuge?",
      "*Do you need to keep their address confidential?",
      "*Has applicant lived at this address for less than 5 years?",
      "*Can you provide their email address?",
      "*Do you need to keep their contact number confidential?",
    ];
    for (const label of groupLabels) {
      await expect(
        this.page.getByRole("group", { name: label }).first(),
      ).toBeVisible();
    }

    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async checkErrorMessages(shouldCheck: boolean): Promise<void> {
    if (!shouldCheck) {
      return;
    }
    await this.assertRequiredFieldErrors();
    await this.assertConditionalFieldErrors();
  }

  private async assertRequiredFieldErrors(): Promise<void> {
    await this.clickContinue();
    await expect(this.errorSummaryHeading).toBeVisible();

    const requiredErrors = new Map<string, number>([
      ["*First name(s) is required", 2],
      ["*Last name is required", 2],
      ["*Date of birth is required", 2],
      ["*Gender is required", 2],
      ["*Place of birth (town) is required", 2],
      ["*Does the applicant currently live in a refuge? is required", 2],
      ["An address is required", 1],
      ["*Do you need to keep their address confidential? is required", 2],
      ["*Has applicant lived at this address for less than 5 years? is required", 2],
      ["*Can you provide their email address? is required", 2],
      ["*Contact Number is required", 2],
      [
        "*Do you need to keep their contact number confidential? is required",
        2,
      ],
    ]);
    for (const [message, count] of requiredErrors) {
      await expect(this.page.getByText(message, { exact: true })).toHaveCount(
        count,
      );
    }
  }

  private async assertConditionalFieldErrors(): Promise<void> {
    await this.applicantField("liveInRefuge_Yes").check();
    await this.clickContinue();

    await this.applicantField("isAtAddressLessThan5Years_Yes").check();
    await this.clickContinue();
    await expect(
      this.page.getByText(
        "*Provide details of all previous addresses for the last 5 years below(if known, including the dates and starting with most recent) is required",
        { exact: true },
      ),
    ).toHaveCount(2);

    await this.applicantField("canYouProvideEmailAddress_Yes").check();
    await this.clickContinue();
    await expect(
      this.page.getByText("*Email address is required", { exact: true }),
    ).toHaveCount(2);
  }

  async fillInFields({
    applicantDetails,
    applicantGender,
    answerYesToAll,
  }: FillInFieldsOptions): Promise<void> {
    await this.applicantField("firstName").fill(applicantDetails.firstName);
    await this.applicantField("lastName").fill(applicantDetails.lastName);
    await this.applicantField("previousName").fill(
      applicantDetails.previousName,
    );
    await this.page
      .getByRole("textbox", { name: "Day", exact: true })
      .first()
      .fill(applicantDetails.dateOfBirth.day);
    await this.page
      .getByRole("textbox", { name: "Month", exact: true })
      .first()
      .fill(applicantDetails.dateOfBirth.month);
    await this.page
      .getByRole("textbox", { name: "Year", exact: true })
      .first()
      .fill(applicantDetails.dateOfBirth.year);

    const genderRadio = this.applicantField(`gender-${applicantGender}`);
    await genderRadio.click();
    await genderRadio.click();
    await expect(genderRadio).toBeChecked();
    if (applicantGender === "other") {
      await this.applicantField("otherGender").fill(
        applicantDetails.otherGender,
      );
    }
    await this.applicantField("placeOfBirth").fill(
      applicantDetails.placeOfBirth,
    );

    await this.findAndSelectAddress(
      "address_address",
      applicantDetails.address.postcode,
      applicantDetails.address.selection,
    );
    await this.findAndSelectAddress(
      "solicitorAddress_solicitorAddress",
      applicantDetails.address.postcode,
      applicantDetails.address.selection,
    );
    await this.assertSelectedAddress("address", applicantDetails);
    await this.assertSelectedAddress("solicitorAddress", applicantDetails);

    await this.selectYesNoAnswers(answerYesToAll, applicantDetails);
    await this.applicantField("phoneNumber").fill(applicantDetails.phoneNumber);
    await this.applicantField("representativeFirstName").fill(
      applicantDetails.representative.firstName,
    );
    await this.applicantField("representativeLastName").fill(
      applicantDetails.representative.lastName,
    );
    await this.applicantField("solicitorEmail").fill(
      applicantDetails.representative.email,
    );
    await this.applicantField("solicitorReference").fill(
      applicantDetails.representative.reference,
    );
    await this.page
      .locator("#search-org-text:visible")
      .first()
      .fill(applicantDetails.representative.organisationSearch);
    const selectOrganisationLink = this.page.getByRole("link", {
      name: "Select",
      exact: true,
    });
    await expect(selectOrganisationLink.first()).toBeVisible();
    await selectOrganisationLink.first().click();
    await this.applicantField("dxNumber").fill(
      applicantDetails.representative.dxNumber,
    );
  }

  private applicantField(suffix: string): Locator {
    return this.page.locator(`#applicants_0_${suffix}`);
  }

  private async findAndSelectAddress(
    fieldPrefix: string,
    postcode: string,
    addressSelection: string,
  ): Promise<void> {
    await this.applicantField(`${fieldPrefix}_postcodeInput`).fill(postcode);
    const addressResponsePromise = this.page.waitForResponse((response) =>
      response
        .url()
        .includes(`/api/addresses?postcode=${postcode.replaceAll(" ", "")}`),
    );
    await this.applicantField(`${fieldPrefix}_postcodeLookup`)
      .getByRole("button", { name: "Find address" })
      .click();
    const addressResponse = await addressResponsePromise;
    expect(
      addressResponse.ok(),
      `Address lookup failed for ${postcode} with HTTP ${addressResponse.status()}`,
    ).toBeTruthy();
    await this.applicantField(`${fieldPrefix}_addressList`).selectOption(
      addressSelection,
    );
  }

  private async assertSelectedAddress(
    addressPrefix: "address" | "solicitorAddress",
    applicantDetails: C100ApplicantDetailsData,
  ): Promise<void> {
    await expect(
      this.applicantField(`${addressPrefix}__detailAddressLine1`),
    ).toHaveValue(applicantDetails.address.buildingAndStreet);
    await expect(
      this.applicantField(`${addressPrefix}__detailPostTown`),
    ).toHaveValue(applicantDetails.address.townOrCity);
    await expect(
      this.applicantField(`${addressPrefix}__detailPostCode`),
    ).toHaveValue(applicantDetails.address.postcode);
    await expect(
      this.applicantField(`${addressPrefix}__detailCountry`),
    ).toHaveValue(applicantDetails.address.country);
  }

  private async selectYesNoAnswers(
    answerYesToAll: boolean,
    applicantDetails: C100ApplicantDetailsData,
  ): Promise<void> {
    const answer = answerYesToAll ? "Yes" : "No";
    await this.applicantField(`liveInRefuge_${answer}`).check();
    await this.applicantField(`isAddressConfidential_${answer}`).check();
    await this.applicantField(
      `isAtAddressLessThan5Years_${answer}`,
    ).check();
    await this.applicantField(
      `canYouProvideEmailAddress_${answer}`,
    ).check();
    await this.applicantField(
      `isPhoneNumberConfidential_${answer}`,
    ).check();

    if (answerYesToAll) {
      await this.applicantField("addressLivedLessThan5YearsDetails").fill(
        applicantDetails.previousAddresses,
      );
      await this.applicantField("email").fill(applicantDetails.email);
      await this.applicantField("isEmailAddressConfidential_Yes").check();
    }
  }
}
