import { Page, expect } from "@playwright/test";
import { FileUploadComponent } from "../../../components/exui/uploadFile.component.ts";
import { EventPage } from "../eventPage.po.ts";

export class AmendApplicantDetails1Page extends EventPage {
  readonly firstName = this.page.locator("#applicantsC100_firstName");
  readonly lastName = this.page.locator("#applicantsC100_lastName");
  readonly previousName = this.page.locator("#applicantsC100_previousName");

  readonly genderFemale = this.page.locator("#applicantsC100_gender-female");
  readonly genderMale = this.page.locator("#applicantsC100_gender-male");
  readonly genderOther = this.page.locator("#applicantsC100_gender-other");
  readonly genderOtherInput = this.page.locator("#applicantsC100_otherGender");

  readonly dobDay = this.page.getByRole("textbox", { name: "Day" });
  readonly dobMonth = this.page.getByRole("textbox", { name: "Month" });
  readonly dobYear = this.page.getByRole("textbox", { name: "Year" });

  readonly refugeYes = this.page.locator("#applicantsC100_liveInRefuge_Yes");
  readonly c8FormUpload = "#applicantsC100_refugeConfidentialityC8Form";

  readonly confidentialAddressYes = this.page.locator(
    "#applicantsC100_isAddressConfidential_Yes",
  );
  readonly emailField = this.page.locator("#applicantsC100_email");
  readonly confidentialEmailYes = this.page.locator(
    "#applicantsC100_isEmailAddressConfidential_Yes",
  );
  readonly confidentialPhoneYes = this.page.locator(
    "#applicantsC100_isPhoneNumberConfidential_Yes",
  );

  readonly solicitorFirstName = this.page.locator(
    "#applicantsC100_representativeFirstName",
  );
  readonly solicitorLastName = this.page.locator(
    "#applicantsC100_representativeLastName",
  );
  readonly solicitorEmail = this.page.locator(
    "#applicantsC100_solicitorEmail",
  );
  readonly solicitorPhone = this.page.locator(
    "#applicantsC100_solicitorTelephone",
  );
  readonly solicitorReference = this.page.locator(
    "#applicantsC100_solicitorReference",
  );
  readonly solicitorPostcode = this.page.locator(
    "#applicantsC100_solicitorAddress_solicitorAddress_postcodeInput",
  );
  readonly solicitorLookup = this.page.locator(
    "#applicantsC100_solicitorAddress_solicitorAddress_postcodeLookup",
  );
  readonly solicitorSelectAddress = this.page.locator(
    "#applicantsC100_solicitorAddress_solicitorAddress_addressList",
  );
  constructor(page: Page) {
    super(page, "Amend applicant details");
  }

  async checkPageLoaded() {
    await expect(this.pageHeading).toBeVisible();
  }

  async enterApplicantName(first: string, last: string, previous: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.previousName.fill(previous);
  }

  async enterDateOfBirth(day: string, month: string, year: string) {
    await this.dobDay.fill(day);
    await this.dobMonth.fill(month);
    await this.dobYear.fill(year);
  }

  async selectGender(gender: string) {
    if (gender === "female") await this.genderFemale.click();
    if (gender === "male") await this.genderMale.click();
    if (gender === "other") {
      await this.genderOther.click();
      await this.genderOtherInput.fill("NonBinary");
    }
  }

  async selectRefugeAndUpload() {
    await this.refugeYes.click();
    const fileUpload = new FileUploadComponent(this.page, {
      uploadLabelText: "*Upload a C8 form with the refuge address",
      downloadParagraphText:
        "You can download the form from www.gov.uk. The address, email address and contact number entered for this party will be kept confidential.",
      chooseFileLocatorID: this.c8FormUpload,
    });
    await fileUpload.completeUpload();
  }

  async setConfidentialDetails(email: string) {
    await this.confidentialAddressYes.click();
    await this.emailField.fill(email);
    await this.confidentialEmailYes.click();
    await this.confidentialPhoneYes.click();
  }

  async fillSolicitorDetails(
    first: string,
    last: string,
    email: string,
    phone: string,
    reference: string,
    postcode: string,
  ) {
    await this.solicitorFirstName.fill(first);
    await this.solicitorLastName.fill(last);
    await this.solicitorEmail.fill(email);
    await this.solicitorPhone.fill(phone);
    await this.solicitorReference.fill(reference);
    await this.solicitorPostcode.fill(postcode);
    await this.solicitorLookup.click();
    await this.solicitorSelectAddress.waitFor({ state: 'visible' });
    try {
      await this.solicitorSelectAddress.selectOption({ index: 1 });
    } catch (error) {
      console.log('Could not select address, logging options');
      const options = await this.solicitorSelectAddress.evaluate((node: HTMLSelectElement) => Array.from(node.options).map(o => o.value));
      console.log(options);
      throw error;
    }
  }
}