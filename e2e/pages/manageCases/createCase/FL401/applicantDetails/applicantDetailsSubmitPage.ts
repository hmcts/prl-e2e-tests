import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantDetailsSubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetailsSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/typeOfApplication/submitContent";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import {
  applicantDetails1Content,
  ApplicantDetails1Content,
  ApplicantDetails1Content,
} from "./applicantDetails1Page";

export class ApplicantDetailsSubmitPage {
  public static async applicantDetailsSubmitPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageContent(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page),
      this.checkFilledInData(page),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); TODO: Disabled pending ticket FPET-1135
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ApplicantDetailsSubmitContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ApplicantDetailsSubmitContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.applicantText16_2}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        20,
        ApplicantDetailsSubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.emailAddress_2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.textChange}")`,
        1,
      ),
      ...Array.from({ length: 4 }, (_, i) => {
        let addressLineKey =
          `addressLine${i + 1}_2` as keyof typeof ApplicantDetailsSubmitContent;
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent[addressLineKey]}")`,
          2,
        );
      }),
    ]);
  }

  private static async checkFilledInData(page: Page): Promise<void> {
    const applicantDoB: string = Helpers.dayAbbreviatedMonthYear(
      ApplicantDetails1Content.applicantBirthDay,
      ApplicantDetails1Content.applicantBirthMonth,
      ApplicantDetails1Content.applicantBirthYear,
    );
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
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.applicantPreviousName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${applicantDoB}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.applicantPhoneNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.solicitorFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.solicitorLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ApplicantDetails1Content.solicitorEmailAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.solicitorReference}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.solicitorPhoneNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.dxNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ApplicantDetails1Content.applicantEmailAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.applicantGenderOtherInput}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${applicantDetails1Content.bpBuildingAndStreet}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${applicantDetails1Content.bpCity}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${applicantDetails1Content.bpPostalCode}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${applicantDetails1Content.bpBuildingAndStreet}")`,
        2,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
    );
  }
}
