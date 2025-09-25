import { expect, Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ApplicantGender } from "../../../../../common/types.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { FileUploadComponent } from "../../../../../pageObjects/components/exui/uploadFile.component.ts";
import { AmendApplicantDetails1Content } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendApplicantDetails/AmendApplicantDetails1Content.js";

interface AmendApplicantDetails1Options {
  page: Page;
  accessibilityTest: boolean;
  nameChange: boolean;
  dobChange: boolean;
  pobChange: boolean;
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
  applicantFirstName = "#applicants_0_firstName",
  applicantLastName = "#applicants_0_lastName",
  applicantPreviousName = "#applicants_0_previousName",
  applicantGenderFemale = "#applicants_0_gender-female",
  applicantGenderMale = "#applicants_0_gender-male",
  applicantGenderOther = "#applicants_0_gender-other",
  applicantGenderOtherInput = "#applicants_0_otherGender",
  applicantPlaceOfBirth = "#applicants_0_placeOfBirth",
  applicantLiveInRefugeRadio = "#applicants_0_liveInRefuge_radio",
  applicantInRefugeYes = "#applicants_0_liveInRefuge_Yes",
  applicantInRefugeNo = "#applicants_0_liveInRefuge_No",
  applicantPostcodeInput = "#applicants_0_address_address_postcodeInput",
  c8FormFileUpload = "#applicants_0_refugeConfidentialityC8Form",
  confidentialAddressRadio = "#applicants_0_isAddressConfidential_radio",
  confidentialAddressYes = "#applicants_0_isAddressConfidential_Yes",
  confidentialAddressNo = "#applicants_0_isAddressConfidential_No",

  past5YearsAddressRadio = "#applicants_0_isAtAddressLessThan5Years_radio",
  past5YearsAddressYes = "#applicants_0_isAtAddressLessThan5Years_Yes",
  past5YearsAddressInput = "#applicants_0_addressLivedLessThan5YearsDetails",
  past5YearsAddressNo = "#applicants_0_isAtAddressLessThan5Years_No",

  canProvideEmailAddressRadio = "#applicants_0_canYouProvideEmailAddress_radio",
  canProvideEmailAddressYes = "#applicants_0_canYouProvideEmailAddress_Yes",
  canProvideEmailAddressNo = "#applicants_0_canYouProvideEmailAddress_No",
  applicantEmailAddress = "#applicants_0_email",
  confidentialEmailYes = "#applicants_0_isEmailAddressConfidential_Yes",
  confidentialEmailNo = "#applicants0_isEmailAddressConfidential_No",

  applicantPhoneNumber = "#applicants_0_phoneNumber",

  phoneNumberConfidentialRadio = "#applicants_0_isPhoneNumberConfidential_radio",
  confidentialPhoneNumberYes = "#applicants_0_isPhoneNumberConfidential_Yes",
  confidentialPhoneNumberNo = "#applicants_0_isPhoneNumberConfidential_No",
  applicantAddressGroup = "#applicants_0_address__detailaddress",
  solicitorAddressGroup = "#applicants_0_solicitorAddress__detailsolicitorAddress",
  applicantPostcodeLookup = "#applicants_0_address_address_postcodeLookup",
  solicitorPostcodeLookup = "#applicants_0_solicitorAddress_solicitorAddress_postcodeLookup",
  solicitorFirstName = "#applicants_0_representativeFirstName",
  solicitorLastName = "#applicants_0_representativeLastName",
  solicitorEmail = "#applicants_0_solicitorEmail",
  solicitorReference = "#applicants_0_solicitorReference",
  dxNumber = "#applicants_0_dxNumber",
  solicitorPostcodeInput = "#applicants_0_solicitorAddress_solicitorAddress_postcodeInput",
  solicitorSelectAddress = "#applicants_0_solicitorAddress_solicitorAddress_addressList",
  searchOrg = "#search-org-text",
  searchOrgHint = "#search-org-hint",
  selectOrg = ".td-select > a",
  inputEmailSelector = "ccd-write-email-field",
  cannotFindOrg = "#content-why-can-not-find-organisation",
  cannotFindOrgReason = "#content-reason-can-not-find-organisation",
}

export class AmendApplicantDetails1Page {
  public static async amendApplicantDetails1Page(
    options: AmendApplicantDetails1Options,
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
      `${Selectors.GovukHeadingL}:text-is("${AmendApplicantDetails1Content.pageTitle}")`,
    );

    const formLabels = Object.entries(AmendApplicantDetails1Content)
      .filter(([key]) => key.startsWith("formLabel_"))
      .map(([, value]) => value); // extract label text

    await Promise.all(
      formLabels.map(async (labelText) => {
        const locator = page.getByLabel(labelText, { exact: true });
        const count = await locator.count();

        await Promise.all(
          Array.from({ length: count }).map((_, i) =>
            expect.soft(locator.nth(i)).toBeVisible(),
          ),
        );
      }),
    );

    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AmendApplicantDetails1Content.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AmendApplicantDetails1Content.ConfP1}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AmendApplicantDetails1Content.dateOfBirthFormLabel1}"):visible`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AmendApplicantDetails1Content.dateOfBirthFormLabel2}"):visible`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AmendApplicantDetails1Content.dateOfBirthFormLabel3}"):visible`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${AmendApplicantDetails1Content.formHint1}")`,
        3,
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
      AmendApplicantDetails1Content.h21,
      AmendApplicantDetails1Content.h22,
      AmendApplicantDetails1Content.h23,
      AmendApplicantDetails1Content.h24,
      AmendApplicantDetails1Content.h31,
      AmendApplicantDetails1Content.h32,
      AmendApplicantDetails1Content.h33,
    ];

    await Promise.all(
      headings.map(async (heading) => {
        const locator = page.getByRole("heading", {
          name: heading,
          exact: true,
        });
        const count = await locator.count();

        await Promise.all(
          Array.from({ length: count }).map((_, i) =>
            expect.soft(locator.nth(i)).toBeVisible(),
          ),
        );
      }),
    );

    await Promise.all([
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .first()
            .getByText(AmendApplicantDetails1Content.formLabelAddress1),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .first()
            .getByText(AmendApplicantDetails1Content.formLabelAddress2),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .first()
            .getByText(AmendApplicantDetails1Content.formLabelAddress3),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .first()
            .getByText(AmendApplicantDetails1Content.formLabelAddress4),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .first()
            .getByText(AmendApplicantDetails1Content.formLabelAddress5),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .first()
            .getByText(AmendApplicantDetails1Content.formLabelAddress6),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.applicantAddressGroup)
            .first()
            .getByText(AmendApplicantDetails1Content.formLabelAddress7),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .getByText(AmendApplicantDetails1Content.pSolicitorDetails)
            .first(),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.inputEmailSelector)
            .filter({ hasText: AmendApplicantDetails1Content.formLabelEmail })
            .filter({ hasNotText: "Optional" })
            .locator("span")
            .first(),
        )
        .toBeVisible(),
    ]);
    const pageSearchOrg = page.locator(uniqueSelectors.searchOrg);
    await expect(pageSearchOrg.first()).toBeVisible();
    await expect(pageSearchOrg.last()).toBeHidden();
    await expect(pageSearchOrg).toHaveCount(6);
    const pageCannotFindOrg = page.locator(uniqueSelectors.cannotFindOrg);
    await expect(pageCannotFindOrg.first()).toBeVisible();
    await expect(pageCannotFindOrg.last()).toBeHidden();
    await expect(pageCannotFindOrg).toHaveCount(6);
    const pageCannotFindOrgReason = page.locator(
      uniqueSelectors.cannotFindOrgReason,
    );
    await expect(pageCannotFindOrgReason.first()).toBeHidden();
    await expect(pageCannotFindOrgReason.last()).toBeHidden();
    await expect(pageCannotFindOrgReason).toHaveCount(6);
    await page.locator(uniqueSelectors.cannotFindOrg).first().click();
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    options: AmendApplicantDetails1Options,
  ): Promise<void> {
    const {
      page,
      nameChange,
      dobChange,
      pobChange,
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
    if (pobChange) {
      await this.placeOfBirthField(page);
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
      AmendApplicantDetails1Content.firstNameInput,
    );
    await page.fill(
      uniqueSelectors.applicantLastName,
      AmendApplicantDetails1Content.lastNameInput,
    );
    await page.fill(
      uniqueSelectors.applicantPreviousName,
      AmendApplicantDetails1Content.previousNameInput,
    );
  }

  private static async dobChangeFillFields(page: Page): Promise<void> {
    const [day, month, year] = Helpers.generateDOB(false);
    await page.getByRole("textbox", { name: "Day" }).first().fill(day);
    await page.getByRole("textbox", { name: "Month" }).first().fill(month);
    await page.getByRole("textbox", { name: "Year" }).first().fill(year);
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
          AmendApplicantDetails1Content.applicantGenderOtherInput,
        );
        break;
    }
  }

  private static async placeOfBirthField(page: Page): Promise<void> {
    await page
      .locator(uniqueSelectors.applicantPlaceOfBirth)
      .fill(AmendApplicantDetails1Content.placeOfBirthInput);
  }

  private static async liveInRefugeFillFields(page: Page): Promise<void> {
    await page.click(uniqueSelectors.applicantInRefugeYes);
    const fileUpload = new FileUploadComponent(page, {
      uploadLabelText: AmendApplicantDetails1Content.formLabelUploadC8Refuge,
      downloadParagraphText: AmendApplicantDetails1Content.pDownloadC8Form,
      chooseFileLocatorID: uniqueSelectors.c8FormFileUpload,
    });
    await fileUpload.completeUpload();
  }

  private static async changeApplicantAddressFillFields(
    page: Page,
  ): Promise<void> {
    await page
      .locator(uniqueSelectors.applicantPostcodeInput)
      .fill(AmendApplicantDetails1Content.postcodeInput1);
    await page
      .locator(uniqueSelectors.applicantPostcodeLookup)
      .getByRole("button", {
        name: AmendApplicantDetails1Content.findAddressButtonText,
      })
      .click();
    await page
      .getByLabel(AmendApplicantDetails1Content.formLabelSelectAddress)
      .selectOption("1: Object");
  }

  private static async keepDetailsConfidentialFillFields(
    page: Page,
  ): Promise<void> {
    await page.click(uniqueSelectors.confidentialAddressYes);
    await page.click(uniqueSelectors.canProvideEmailAddressYes);
    await page.fill(
      uniqueSelectors.applicantEmailAddress,
      AmendApplicantDetails1Content.applicantEmailAddressInput,
    );
    await page.fill(
      uniqueSelectors.applicantPhoneNumber,
      AmendApplicantDetails1Content.applicantPhoneNumberInput,
    );
    await page.click(uniqueSelectors.confidentialEmailYes);
    await page.click(uniqueSelectors.confidentialPhoneNumberYes);
  }

  private static async solicitorDetailsFillFields(page: Page): Promise<void> {
    await Promise.all([
      page.fill(
        uniqueSelectors.solicitorFirstName,
        AmendApplicantDetails1Content.solicitorFirstNameInput,
      ),
      page.fill(
        uniqueSelectors.solicitorLastName,
        AmendApplicantDetails1Content.solicitorLastNameInput,
      ),
      page.fill(
        uniqueSelectors.solicitorReference,
        AmendApplicantDetails1Content.solicitorReferenceInput,
      ),
    ]);
    await page.fill(
      uniqueSelectors.solicitorEmail,
      AmendApplicantDetails1Content.solicitorEmailInput,
    );
    await page.fill(
      uniqueSelectors.solicitorPostcodeInput,
      AmendApplicantDetails1Content.postcodeInput2,
    );
    await page
      .locator(uniqueSelectors.solicitorPostcodeLookup)
      .getByRole("button", {
        name: AmendApplicantDetails1Content.findAddressButtonText,
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
            .getByText(AmendApplicantDetails1Content.formLabelAddress1),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails1Content.formLabelAddress2),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails1Content.formLabelAddress3),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails1Content.formLabelAddress4),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails1Content.formLabelAddress5),
        )
        .toBeVisible(),
      expect
        .soft(
          page
            .locator(uniqueSelectors.solicitorAddressGroup)
            .getByText(AmendApplicantDetails1Content.formLabelAddress6),
        )
        .toBeVisible(),
    ]);
  }
}
