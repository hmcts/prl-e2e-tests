import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantDetailsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetailsSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content";
// import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { ApplicantGender } from "../../../../../common/types";

export class ApplicantDetailsSubmitPage {
  public static async applicantDetailsSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      yesNoApplicantDetails,
      applicantGender,
    );
    await this.continue(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    yesNoApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page, accessibilityTest, yesNoApplicantDetails),
      this.checkFilledData(page, yesNoApplicantDetails, applicantGender),
    ]);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    yesNoApplicantDetails: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${ApplicantDetailsSubmitContent.h21}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ApplicantDetailsSubmitContent.h22}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        21,
        ApplicantDetailsSubmitContent,
        `text16`,
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ApplicantDetailsSubmitContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.text16A1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.text16A2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.text16A3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.text16A4}")`,
        2,
      ),
    ]);
    if (yesNoApplicantDetails) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          ApplicantDetailsSubmitContent,
          `text16E`,
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.text16B1}")`,
          2,
        ),
      ]);
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.text16B1}")`,
        1,
      );
    }
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); //TODO: Disabled pending ticket FPET-1135
    }
  }

  private static async checkFilledData(
    page: Page,
    yesNoApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.applicantFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.applicantLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(ApplicantDetails1Content.day, ApplicantDetails1Content.month, ApplicantDetails1Content.year)}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Helpers.capitalizeFirstPart(applicantGender)}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.placeOfBirth}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.buildingAndStreet}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.townOrCity}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.postcode}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.country}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.phoneNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.representativeFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.representativeLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ApplicantDetails1Content.representativeEmail}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.representativeRef}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.dxNumber}")`,
        1,
      ),
    ]);
    if (yesNoApplicantDetails) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.formLabelYes}")`,
          6,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${ApplicantDetails1Content.uploadedFile}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${ApplicantDetails1Content.applicantEmail}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${ApplicantDetails1Content.last5Years}")`,
          1,
        ),
      ]);
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.formLabelNo}")`,
        5,
      );
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetailsSubmitContent.continue}")`,
    );
  }
}
