import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { OtherPeopleInTheCaseSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import { ApplicantGender } from "../applicantDetails/applicantDetails1Page";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { OtherPeopleInTheCase1Content } from "../../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseRevised1Content.";

export class OtherPeopleInTheCaseSubmitPage {
  public static async otherPeopleInTheCaseSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoOtherPeopleInTheCase: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      yesNoOtherPeopleInTheCase,
      applicantGender,
    );
    await this.continue(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    yesNoOtherPeopleInTheCase: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      accessibilityTest,
      yesNoOtherPeopleInTheCase,
    );
    await this.checkFilledData(
      page,
      yesNoOtherPeopleInTheCase,
      applicantGender,
    );
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    yesNoOtherPeopleInTheCase: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${OtherPeopleInTheCaseSubmitContent.h2}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukHeadingL}:text-is("${OtherPeopleInTheCaseSubmitContent.pageTitle}",)`,
      1
    );
    if (yesNoOtherPeopleInTheCase) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          13,
          OtherPeopleInTheCaseSubmitContent,
          "text16",
          `${Selectors.GovukText16}`
        ),
        Helpers.checkGroup(
          page,
          12,
          OtherPeopleInTheCaseSubmitContent,
          "text16A",
          `${Selectors.GovukText16}`
        ),
      ]);
    } else {
      await Helpers.checkGroup(
        page,
        13,
        OtherPeopleInTheCaseSubmitContent,
        "text16",
        `${Selectors.GovukText16}`
      )
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
  private static async checkFilledData(
    page: Page,
    yesNoOtherPeopleInTheCase: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.applicantFirstName}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.applicantLastName}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.applicantPrevName}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${applicantGender}")`,
        1
      ),
    ]);

    if (yesNoOtherPeopleInTheCase) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.formLabelYes}")`,
          9
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(OtherPeopleInTheCase1Content.day, OtherPeopleInTheCase1Content.month, OtherPeopleInTheCase1Content.year)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.placeOfBirth}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.buildingAndStreet}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.townOrCity}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.postcode}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.country}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.last5Years}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${OtherPeopleInTheCase1Content.applicantEmail}")`,
          1
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.phoneNumber}")`,
          1
        ),
      ])
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.formLabelNo}")`,
        6
      )
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${OtherPeopleInTheCaseSubmitContent.continue}")`,
    );
  }
}
