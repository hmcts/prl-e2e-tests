import { expect, Locator, Page } from "@playwright/test";
import { RespondentResponseEventPage } from "../respondentResponseEventPage.po.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

export const LivesInRefuge = {
  yes: "Yes",
  no: "No",
  dontKnow: "IDontKnow",
} as const;

export interface EditContactDetailsAddress {
  postcode: string;
  /** Option shown in the address list after Find address */
  selection: string;
  buildingAndStreet: string;
  townOrCity: string;
  country: string;
}

export interface EditContactDetailsParams {
  firstName: string;
  lastName: string;
  previousName?: string;
  dateOfBirth: { day: string; month: string; year: string };
  placeOfBirth: string;
  livesInRefuge: (typeof LivesInRefuge)[keyof typeof LivesInRefuge];
  address: EditContactDetailsAddress;
  livedAtAddressMoreThan5Years: boolean;
  phoneNumber: string;
  email: string;
}

// Respondent solicitor C7 response - "Edit contact details", first page
// (c100ResSolConfirmOrEditContactDetailsA1).
export class EditContactDetails1Page extends RespondentResponseEventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);
  private readonly fieldId = "#resSolConfirmEditContactDetails";

  private readonly headings: string[] = [
    "Respondent's name and date of birth",
    "*Respondent's address (Optional)",
    "Contact Details",
  ];
  private readonly labels: string[] = [
    "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
    "*First name (Optional)",
    "*Last name (Optional)",
    "Previous names, if any (Optional)",
    "*Date of birth (Optional)",
    "*Place of birth (Optional)",
    "*Does the respondent currently live in a refuge?",
    "Enter a UK postcode",
    "*Has the respondent lived at this address for more than 5 years? (Optional)",
    "*Telephone number (Optional)",
    "*Email address (Optional)",
  ];

  private readonly firstName: Locator = this.page.locator(
    `${this.fieldId}_firstName`,
  );
  private readonly lastName: Locator = this.page.locator(
    `${this.fieldId}_lastName`,
  );
  private readonly previousName: Locator = this.page.locator(
    `${this.fieldId}_previousName`,
  );
  private readonly dobDay: Locator = this.page.locator("#dateOfBirth-day");
  private readonly dobMonth: Locator = this.page.locator("#dateOfBirth-month");
  private readonly dobYear: Locator = this.page.locator("#dateOfBirth-year");
  private readonly placeOfBirth: Locator = this.page.locator(
    `${this.fieldId}_placeOfBirth`,
  );
  private readonly postcodeInput: Locator = this.page.locator(
    `${this.fieldId}_address_address_postcodeInput`,
  );
  private readonly findAddressButton: Locator = this.page
    .locator(`${this.fieldId}_address_address_postcodeLookup`)
    .getByRole("button", { name: "Find address" });
  private readonly addressList: Locator = this.page.locator(
    `${this.fieldId}_address_address_addressList`,
  );
  private readonly buildingAndStreet: Locator = this.page.locator(
    `${this.fieldId}_address__detailAddressLine1`,
  );
  private readonly townOrCity: Locator = this.page.locator(
    `${this.fieldId}_address__detailPostTown`,
  );
  private readonly postcode: Locator = this.page.locator(
    `${this.fieldId}_address__detailPostCode`,
  );
  private readonly country: Locator = this.page.locator(
    `${this.fieldId}_address__detailCountry`,
  );
  private readonly phoneNumber: Locator = this.page.locator(
    `${this.fieldId}_contact_phoneNumber`,
  );
  private readonly email: Locator = this.page.locator(
    `${this.fieldId}_contact_email`,
  );

  constructor(page: Page) {
    super(page, "Edit contact details");
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await expect(this.page).toHaveURL(
      /\/c100ResSolConfirmOrEditContactDetailsA1$/,
    );
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("heading", {
        level: 3,
        name: `Respondent name: ${respondentName}`,
      }),
    ).toBeVisible();
    for (const heading of this.headings) {
      await expect(
        this.page.getByRole("heading", { name: heading, exact: true }),
      ).toBeVisible();
    }
    await this.pageUtils.assertStrings(this.labels);
    await expect(
      this.page.getByRole("button", { name: "Find address" }),
    ).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  /** Fills in every answer, finding the address by its postcode. */
  async fillInFields(params: EditContactDetailsParams): Promise<void> {
    await this.firstName.fill(params.firstName);
    await this.lastName.fill(params.lastName);
    await this.previousName.fill(params.previousName ?? "");
    await this.placeOfBirth.fill(params.placeOfBirth);

    await this.page
      .locator(`${this.fieldId}_liveInRefuge-${params.livesInRefuge}`)
      .check();

    await this.findAndSelectAddress(params.address);

    // the field is named "isAtAddressLessThan5Years" but its question asks "more than 5 years"
    await this.page
      .locator(
        `${this.fieldId}_addressHistory_isAtAddressLessThan5Years_${params.livedAtAddressMoreThan5Years ? "Yes" : "No"}`,
      )
      .check();

    await this.phoneNumber.fill(params.phoneNumber);
    await this.email.fill(params.email);

    // date last: CCD redraws the form after a date, which can swallow the next click
    await this.dobDay.fill(params.dateOfBirth.day);
    await this.dobMonth.fill(params.dateOfBirth.month);
    await this.dobYear.fill(params.dateOfBirth.year);
  }

  private async findAndSelectAddress(
    address: EditContactDetailsAddress,
  ): Promise<void> {
    await this.postcodeInput.fill(address.postcode);
    const addressResponse = this.page.waitForResponse((response) =>
      response
        .url()
        .includes(
          `/api/addresses?postcode=${address.postcode.replaceAll(" ", "")}`,
        ),
    );
    await this.findAddressButton.click();
    const response = await addressResponse;
    expect(
      response.ok(),
      `Address lookup failed for ${address.postcode} with HTTP ${response.status()}`,
    ).toBeTruthy();
    await this.addressList.selectOption(address.selection);

    await expect(this.buildingAndStreet).toHaveValue(address.buildingAndStreet);
    await expect(this.townOrCity).toHaveValue(address.townOrCity);
    await expect(this.postcode).toHaveValue(address.postcode);
    await expect(this.country).toHaveValue(address.country);
  }
}
