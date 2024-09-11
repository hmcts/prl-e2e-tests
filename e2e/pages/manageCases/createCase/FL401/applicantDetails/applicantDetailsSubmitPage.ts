import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantDetailsSubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetailsSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/typeOfApplication/submitContent";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { buckinghamPalace, topLevelInputFields, secondLevelInputFields } from "./applicantDetails1Page";

export class ApplicantDetailsSubmitPage {
  public static async applicantDetailsSubmitPage(
    page: Page,
    accessibilityTest: boolean
  ): Promise<void> {
    await this.checkPageContent(page, accessibilityTest);
    await this.fillInFields(page)
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
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ApplicantDetailsSubmitContent.pageTitle}")`,
    );
    console.log('Submit Page Loaded')
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ApplicantDetailsSubmitContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.applicantText16_2}")`,
        2
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
        2
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.textChange}")`,
        1,
      ),
      ...Array.from({ length: 4 }, (_, i) => {
          let addressLineKey = `addressLine${i+1}_2` as keyof typeof ApplicantDetailsSubmitContent;
          console.log(addressLineKey, ApplicantDetailsSubmitContent[addressLineKey])
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent[addressLineKey]}")`,
            2
          )
        })
    ]);
  }

  private static async checkFilledInData(
    page: Page
  ): Promise<void> {
    const applicantDoB: string = Helpers.dayAbbreviatedMonthYear(
      topLevelInputFields.applicantBirthDay,
      topLevelInputFields.applicantBirthMonth,
      topLevelInputFields.applicantBirthYear
    )
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${topLevelInputFields.applicantFirstName}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${topLevelInputFields.applicantLastName}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${topLevelInputFields.applicantPreviousName}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${applicantDoB}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${topLevelInputFields.applicantPhoneNumber}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${topLevelInputFields.solicitorFirstName}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${topLevelInputFields.solicitorLastName}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${topLevelInputFields.solicitorEmailAddress}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${topLevelInputFields.solicitorReference}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${topLevelInputFields.solicitorPhoneNumber}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${topLevelInputFields.dxNumber}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${secondLevelInputFields.applicantEmailAddress}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${secondLevelInputFields.applicantGenderOtherInput}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${buckinghamPalace.bpBuildingAndStreet}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${buckinghamPalace.bpCity}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${buckinghamPalace.bpPostalCode}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${buckinghamPalace.bpBuildingAndStreet}")`,
          1
        ),
      ]
    )
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
    );
  }
}