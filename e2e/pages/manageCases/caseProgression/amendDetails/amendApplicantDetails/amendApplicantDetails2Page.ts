import { Page, expect } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ApplicantGender } from "../../../../../common/types.ts";
import { AmendApplicantDetails2Content } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendApplicantDetails/amendApplicantDetails2Content.ts";
import config from "../../../../../config.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface AmendApplicantDetails2Options {
  page: Page;
  accessibilityTest: boolean;
  nameChange: boolean;
  dobChange: boolean;
  genderChange: boolean;
  gender: ApplicantGender;
  liveInRefuge: boolean;
  keepDetailsConfidential: boolean;
}

enum uniqueSelectors {
  applicantFirstName = "#applicantsFL401_firstName",
  applicantLastName = "#applicantsFL401_lastName",
  applicantPreviousName = "#applicantsFL401_previousName",
  applicantGenderFemale = "#applicantsFL401_gender-female",
  applicantGenderMale = "#applicantsFL401_gender-male",
  applicantGenderOther = "#applicantsFL401_gender-other",
  applicantGenderOtherInput = "#applicantsFL401_otherGender",
  applicantInRefugeYes = "#applicantsFL401_liveInRefuge_Yes",
  applicantInRefugeNo = "#applicantsFL401_liveInRefuge_No",
  c8FormFileUpload = "#applicantsFL401_refugeConfidentialityC8Form",
  applicantEmailAddress = "#applicantsFL401_email",
  confidentialAddressYes = "#applicantsFL401_isAddressConfidential_Yes",
  confidentialAddressNo = "#applicantsFL401_isAddressConfidential_No",
  canProvideEmailAddressYes = "#applicantsFL401_canYouProvideEmailAddress_Yes",
  canProvideEmailAddressNo = "#applicantsFL401_canYouProvideEmailAddress_No",
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
        3,
        AmendApplicantDetails2Content,
        "h2",
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        40,
        AmendApplicantDetails2Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        AmendApplicantDetails2Content,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        AmendApplicantDetails2Content,
        "formHint",
        `${Selectors.GovukFormHint}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${AmendApplicantDetails2Content.a}")`,
        1,
      ),
      expect(
        page.locator("#applicantsFL401_liveInRefuge_radio").getByText("Yes"),
      ).toBeVisible(),
      expect(
        page.locator("#applicantsFL401_liveInRefuge_radio").getByText("No"),
      ).toBeVisible(),
      expect(
        page
          .locator("#applicantsFL401_isAddressConfidential_radio")
          .getByText("Yes"),
      ).toBeVisible(),
      expect(
        page
          .locator("#applicantsFL401_isAddressConfidential_radio")
          .getByText("No"),
      ).toBeVisible(),
      expect(
        page
          .locator("#applicantsFL401_canYouProvideEmailAddress_radio")
          .getByText("Yes"),
      ).toBeVisible(),
      expect(
        page
          .locator("#applicantsFL401_canYouProvideEmailAddress_radio")
          .getByText("No"),
      ).toBeVisible(),
      expect(
        page
          .locator("#applicantsFL401_isPhoneNumberConfidential_radio")
          .getByText("Yes"),
      ).toBeVisible(),
      expect(
        page
          .locator("#applicantsFL401_isPhoneNumberConfidential_radio")
          .getByText("No"),
      ).toBeVisible(),
    ]);
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
      keepDetailsConfidential,
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
      await this.liveInRefugeFillFields(page, liveInRefuge);
    }
    if (keepDetailsConfidential) {
      await this.keepDetailsConfidentialFillFields(
        page,
        keepDetailsConfidential,
      );
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
    await page.getByRole("textbox", { name: "Day Day" }).fill(day);
    await page.getByRole("textbox", { name: "Month Month" }).fill(month);
    await page.getByRole("textbox", { name: "Year Year" }).fill(year);
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

  private static async liveInRefugeFillFields(
    page: Page,
    liveInRefuge: boolean,
  ): Promise<void> {
    if (liveInRefuge) {
      await page.click(uniqueSelectors.applicantInRefugeYes);
      const fileInput = page.locator(uniqueSelectors.c8FormFileUpload);
      await fileInput.setInputFiles(config.testPdfFile);
    } else {
      await page.click(uniqueSelectors.applicantInRefugeNo);
    }
  }

  private static async keepDetailsConfidentialFillFields(
    page: Page,
    keepDetailsConfidential: boolean,
  ): Promise<void> {
    if (keepDetailsConfidential) {
      await page.click(uniqueSelectors.confidentialAddressYes);
      await page.click(uniqueSelectors.canProvideEmailAddressYes);
      await page.fill(
        uniqueSelectors.applicantEmailAddress,
        AmendApplicantDetails2Content.applicantEmailAddressInput,
      );
    } else {
      await page.click(uniqueSelectors.confidentialAddressNo);
      await page.click(uniqueSelectors.canProvideEmailAddressNo);
    }
  }
}
