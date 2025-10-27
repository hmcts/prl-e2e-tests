import { Page, expect } from "@playwright/test";
import { FileUploadComponent } from "../../../components/exui/uploadFile.component.ts";
import { EventPage } from "../eventPage.po.ts";

export class AmendApplicantDetails1Page extends EventPage {
  readonly firstName = this.page.locator("#applicants_0_firstName");
  readonly lastName = this.page.locator("#applicants_0_lastName");
  readonly previousName = this.page.locator("#applicants_0_previousName");

  readonly genderFemale = this.page.locator("#applicants_0_gender-female");
  readonly genderMale = this.page.locator("#applicants_0_gender-male");
  readonly genderOther = this.page.locator("#applicants_0_gender-other");
  readonly genderOtherInput = this.page.locator("#applicants_0_otherGender");

  readonly dobDay = this.page.locator("#dateOfBirth-day"); 
  readonly dobMonth = this.page.locator("#dateOfBirth-month");
  readonly dobYear = this.page.locator("#dateOfBirth-year");

  readonly refugeYes = this.page.locator("#applicants_0_liveInRefuge_Yes");
  readonly c8FormUpload = "#applicants_0_refugeConfidentialityC8Form";

  readonly confidentialAddressYes = this.page.locator(
    "#applicants_0_isAddressConfidential_Yes",
  );
  readonly emailField = this.page.locator("#applicants_0_email");
  readonly confidentialEmailYes = this.page.locator(
    "#applicants_0_isEmailAddressConfidential_Yes",
  );
  readonly confidentialPhoneYes = this.page.locator(
    "#applicants_0_isPhoneNumberConfidential_Yes",
  );

  readonly solicitorFirstName = this.page.locator(
    "#applicants_0_representativeFirstName",
  );
  readonly solicitorLastName = this.page.locator(
    "#applicants_0_representativeLastName",
  );
  readonly solicitorEmail = this.page.locator(
    "#applicants_0_solicitorEmail",
  );
  readonly solicitorPhone = this.page.locator(
    "#applicants_0_solicitorTelephone",
  );
  readonly solicitorReference = this.page.locator(
    "#applicants_0_solicitorReference",
  );
  readonly solicitorPostcode = this.page.locator(
    "#applicants_0_solicitorAddress_solicitorAddress_postcodeInput",
  );
  readonly solicitorLookup = this.page.locator(
    "#applicants_0_solicitorAddress_solicitorAddress_postcodeLookup",
  );
  readonly solicitorSelectAddress = this.page.locator(
    "#applicants_0_solicitorAddress_solicitorAddress_addressList",
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
    const genderId = `#applicants_0_gender-${gender.toLowerCase()}`;
    
    if (gender.toLowerCase() === "other") {
      await this.genderOther.click();
      await this.genderOtherInput.fill("NonBinary");
    } else {
      await this.page.locator(genderId).click();
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
    await this.solicitorSelectAddress.selectOption({ index: 1 });
  }
}