import { expect, Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ApplicantGender } from "../../../../../common/types.ts";
import config from "../../../../../config.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { AmendApplicantDetails2Content } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendApplicantDetails/AmendApplicantDetails2Content.ts";

interface AmendApplicantDetails2Options {
  page: Page;
  accessibilityTest: boolean;
  nameChange: boolean;
  dobChange: boolean;
  dobChangeDay: string;
  dobChangeMonth: string;
  dobChangeYear: string;
  genderChange: boolean;
  gender: ApplicantGender;
  liveInRefuge: boolean;
  changeApplicantAddress: boolean;
  keepDetailsConfidential: boolean;
  solicitorDetailsChange: boolean;
}

enum uniqueSelectors {
  applicantFirstName = "#applicantsFL401_firstName",
  applicantLastName = "#applicantsFL401_lastName",
  applicantPreviousName = "#applicantsFL401_previousName",
  applicantGenderFemale = "#applicantsFL401_gender-female",
  applicantGenderMale = "#applicantsFL401_gender-male",
  applicantGenderOther = "#applicantsFL401_gender-other",
  applicantGenderOtherInput = "#applicantsFL401_otherGender",
  applicantLiveInRefugeRadio = "#applicantsFL401_liveInRefuge_radio",
  applicantInRefugeYes = "#applicantsFL401_liveInRefuge_Yes",
  applicantInRefugeNo = "#applicantsFL401_liveInRefuge_No",
  applicantPostcodeInput = "#applicantsFL401_address_address_postcodeInput",
  c8FormFileUpload = "#applicantsFL401_refugeConfidentialityC8Form",
  applicantEmailAddress = "#applicantsFL401_email",
  confidentialAddressRadio = "#applicantsFL401_isAddressConfidential_radio",
  confidentialAddressYes = "#applicantsFL401_isAddressConfidential_Yes",
  confidentialAddressNo = "#applicantsFL401_isAddressConfidential_No",
  canProvideEmailAddressRadio = "#applicantsFL401_canYouProvideEmailAddress_radio",
  canProvideEmailAddressYes = "#applicantsFL401_canYouProvideEmailAddress_Yes",
  canProvideEmailAddressNo = "#applicantsFL401_canYouProvideEmailAddress_No",
  confidentialEmailYes = "#applicantsFL401_isEmailAddressConfidential_Yes",
  confidentialEmailNo = "#applicantsFL401_isEmailAddressConfidential_No",
  phoneNumberConfidentialRadio = "#applicantsFL401_isPhoneNumberConfidential_radio",
  confidentialPhoneNumberYes = "#applicantsFL401_isPhoneNumberConfidential_Yes",
  confidentialPhoneNumberNo = "#applicantsFL401_isPhoneNumberConfidential_No",
  applicantAddressGroup = "#applicantsFL401_address__detailaddress",
  solicitorAddressGroup = "#applicantsFL401_solicitorAddress__detailsolicitorAddress",
  applicantPostcodeLookup = "#applicantsFL401_address_address_postcodeLookup",
  solicitorPostcodeLookup = "#applicantsFL401_solicitorAddress_solicitorAddress_postcodeLookup",
  solicitorFirstName = "#applicantsFL401_representativeFirstName",
  solicitorLastName = "#applicantsFL401_representativeLastName",
  solicitorEmail = "#applicantsFL401_solicitorEmail",
  solicitorPhoneNumber = "#applicantsFL401_solicitorTelephone",
  solicitorReference = "#applicantsFL401_solicitorReference",
  dxNumber = "#applicantsFL401_dxNumber",
  solicitorPostcodeInput = "#applicantsFL401_solicitorAddress_solicitorAddress_postcodeInput",
  solicitorSelectAddress = "#applicantsFL401_solicitorAddress_solicitorAddress_addressList",
  searchOrg = "#search-org-text",
  searchOrgHint = "#search-org-hint",
  selectOrg = ".td-select > a",
  inputEmailSelector = "ccd-write-email-field",
  cannotFindOrg = "#content-why-can-not-find-organisation",
  cannotFindOrgReason = "#content-reason-can-not-find-organisation",
}

export class AmendApplicantDetails2Page {
  public static async amendApplicantDetails2Page(
    options: AmendApplicantDetails2Options,
  ): Promise<void> {
    const { page, accessibilityTest } = options;
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(options);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${AmendApplicantDetails2Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        21,
        AmendApplicantDetails2Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        AmendApplicantDetails2Content,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        AmendApplicantDetails2Content,
        "dateOfBirthFormLabel",
        `${Selectors.GovukFormLabel}:visible`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${AmendApplicantDetails2Content.formHint1}")`,
        1,
      ),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantLiveInRefugeRadio)
            .getByText(CommonStaticText.yes),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantLiveInRefugeRadio)
            .getByText(CommonStaticText.no),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.confidentialAddressRadio)
            .getByText(CommonStaticText.yes),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.confidentialAddressRadio)
            .getByText(CommonStaticText.no),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.canProvideEmailAddressRadio)
            .getByText(CommonStaticText.yes),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.canProvideEmailAddressRadio)
            .getByText(CommonStaticText.no),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.phoneNumberConfidentialRadio)
            .getByText(CommonStaticText.yes),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.phoneNumberConfidentialRadio)
            .getByText(CommonStaticText.no),
        )
        .toBeVisible(),
    ]);
    const headings = [
      AmendApplicantDetails2Content.h21,
      AmendApplicantDetails2Content.h22,
      AmendApplicantDetails2Content.h23,
    ];
    await Promise.all(
      headings.map((heading) =>
        expect
          .soft(page.getByRole("heading", { name: heading, exact: true }))
          .toBeVisible(),
      ),
    );
    await Promise.all([
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress1),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress2),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress3),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress4),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress5),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress6),
        )
        .toBeVisible(),
      expect
        .soft(page.getByText(AmendApplicantDetails2Content.pSolicitorDetails))
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.inputEmailSelector)
            .filter({ hasText: AmendApplicantDetails2Content.formLabelEmail })
            .filter({ hasNotText: "Optional" })
            .locator("span"),
        )
        .toBeVisible(),
      expect.soft(page.locator(uniqueSelectors.searchOrg)).toBeVisible(),
      expect.soft(page.locator(uniqueSelectors.cannotFindOrg)).toBeVisible(),
    ]);
    await page.locator(uniqueSelectors.cannotFindOrg).click();
    await expect
      .soft(page.locator(uniqueSelectors.cannotFindOrgReason))
      .toBeVisible();
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    options: AmendApplicantDetails2Options,
  ): Promise<void> {
    const {
      page,
      nameChange,
      dobChange,
      genderChange,
      gender,
      liveInRefuge,
      changeApplicantAddress,
      keepDetailsConfidential,
      solicitorDetailsChange,
    } = options;
    if (nameChange) {
      await this.nameChangeFillFields(page);
    }
    if (dobChange) {
      await this.dobChangeFillFields(page);
    }
    if (genderChange) {
      await this.genderChangeFillFields(page, gender);
    }
    if (liveInRefuge) {
      await this.liveInRefugeFillFields(page);
    }
    if (changeApplicantAddress) {
      await this.changeApplicantAddressFillFields(page);
    }
    if (keepDetailsConfidential) {
      await this.keepDetailsConfidentialFillFields(page);
    }
    if (solicitorDetailsChange) {
      await this.solicitorDetailsFillFields(page);
    }
    await this.continue(page);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async nameChangeFillFields(page: Page): Promise<void> {
    await page.fill(
      uniqueSelectors.applicantFirstName,
      AmendApplicantDetails2Content.firstNameInput,
    );
    await page.fill(
      uniqueSelectors.applicantLastName,
      AmendApplicantDetails2Content.lastNameInput,
    );
    await page.fill(
      uniqueSelectors.applicantPreviousName,
      AmendApplicantDetails2Content.previousNameInput,
    );
  }

  private static async dobChangeFillFields(page: Page): Promise<void> {
    const [day, month, year] = Helpers.generateDOB(false);
    await page.getByRole("textbox", { name: "Day" }).fill(day);
    await page.getByRole("textbox", { name: "Month" }).fill(month);
    await page.getByRole("textbox", { name: "Year" }).fill(year);
  }

  private static async genderChangeFillFields(
    page: Page,
    gender: ApplicantGender,
  ): Promise<void> {
    switch (gender) {
      case "female":
        await page.click(uniqueSelectors.applicantGenderFemale);
        break;
      case "male":
        await page.click(uniqueSelectors.applicantGenderMale);
        break;
      case "other":
        await page.click(uniqueSelectors.applicantGenderOther);
        await page.fill(
          uniqueSelectors.applicantGenderOtherInput,
          AmendApplicantDetails2Content.applicantGenderOtherInput,
        );
        break;
    }
  }

  private static async liveInRefugeFillFields(page: Page): Promise<void> {
    await page.click(uniqueSelectors.applicantInRefugeYes);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.p}:text-is("${AmendApplicantDetails2Content.pDownloadC8Form}"):visible`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${AmendApplicantDetails2Content.formLabelUploadC8Refuge}"):visible`,
      1,
    );
    const fileInput = page.locator(uniqueSelectors.c8FormFileUpload);
    await fileInput.setInputFiles(config.testPdfFile);
  }

  private static async changeApplicantAddressFillFields(
    page: Page,
  ): Promise<void> {
    await page
      .locator(uniqueSelectors.applicantPostcodeInput)
      .fill(AmendApplicantDetails2Content.postcodeInput1);
    await page
      .locator(uniqueSelectors.applicantPostcodeLookup)
      .getByRole("button", {
        name: AmendApplicantDetails2Content.findAddressButtonText,
      })
      .click();
    await page
      .getByLabel(AmendApplicantDetails2Content.formLabelSelectAddress)
      .selectOption("1: Object");
  }

  private static async keepDetailsConfidentialFillFields(
    page: Page,
  ): Promise<void> {
    await page.click(uniqueSelectors.confidentialAddressYes);
    await page.click(uniqueSelectors.canProvideEmailAddressYes);
    await page.fill(
      uniqueSelectors.applicantEmailAddress,
      AmendApplicantDetails2Content.applicantEmailAddressInput,
    );
    await page.click(uniqueSelectors.confidentialEmailYes);
    await page.click(uniqueSelectors.confidentialPhoneNumberYes);
  }

  private static async solicitorDetailsFillFields(page: Page): Promise<void> {
    await Promise.all([
      page.fill(
        uniqueSelectors.solicitorFirstName,
        AmendApplicantDetails2Content.solicitorFirstNameInput,
      ),
      page.fill(
        uniqueSelectors.solicitorLastName,
        AmendApplicantDetails2Content.solicitorLastNameInput,
      ),
      page.fill(
        uniqueSelectors.solicitorReference,
        AmendApplicantDetails2Content.solicitorReferenceInput,
      ),
    ]);
    await page.fill(
      uniqueSelectors.solicitorPhoneNumber,
      AmendApplicantDetails2Content.solicitorPhoneNumberInput,
    );
    await page.fill(
      uniqueSelectors.solicitorEmail,
      AmendApplicantDetails2Content.solicitorEmailInput,
    );
    await page.fill(
      uniqueSelectors.searchOrg,
      AmendApplicantDetails2Content.searchOrgInputTest,
    );
    await page.locator(uniqueSelectors.selectOrg).first().click();
    await page.fill(
      uniqueSelectors.solicitorPostcodeInput,
      AmendApplicantDetails2Content.postcodeInput2,
    );
    await page
      .locator(uniqueSelectors.solicitorPostcodeLookup)
      .getByRole("button", {
        name: AmendApplicantDetails2Content.findAddressButtonText,
      })
      .click();
    await page
      .locator(uniqueSelectors.solicitorSelectAddress)
      .selectOption("1: Object");
    await Promise.all([
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress1),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress2),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress3),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress4),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress5),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails2Content.formLabelAddress6),
        )
        .toBeVisible(),
    ]);
  }
}
