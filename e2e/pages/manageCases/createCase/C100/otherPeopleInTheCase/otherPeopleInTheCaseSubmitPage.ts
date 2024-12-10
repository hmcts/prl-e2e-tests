import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { OtherPeopleInTheCaseSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { OtherPeopleInTheCase1Content } from "../../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseRevised1Content.";
import { ApplicantGender } from "../../../../../common/types";

enum UniquesFields {
  last5yearsLocator = ".text-16 > ccd-field-read > div > ccd-field-read-label > div > ccd-read-text-area-field > span",
}

export class OtherPeopleInTheCaseSubmitPage {
  public static async otherPeopleInTheCaseSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoOtherPeopleInTheCase: boolean,
    otherPersonLivesInRefuge: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge,
      applicantGender,
    );
    await this.continue(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    yesNoOtherPeopleInTheCase: boolean,
    otherPersonLivesInRefuge: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await this.checkPageLoads(
      page,
      accessibilityTest,
      yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge,
      applicantGender,
    );
    await this.checkFilledData(
      page,
      yesNoOtherPeopleInTheCase,
      otherPersonLivesInRefuge,
      applicantGender,
    );
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    yesNoOtherPeopleInTheCase: boolean,
    otherPersonLivesInRefuge: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${OtherPeopleInTheCaseSubmitContent.h2}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukHeadingL}:text-is("${OtherPeopleInTheCaseSubmitContent.pageTitle}")`,
      1,
    );
    if (
      (yesNoOtherPeopleInTheCase && applicantGender === "male") ||
      (yesNoOtherPeopleInTheCase && applicantGender === "female")
    ) {
      if (otherPersonLivesInRefuge) {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCaseSubmitContent.uploadForm}")`,
          1,
        );
      }
      await Promise.all([
        Helpers.checkGroup(
          page,
          13,
          OtherPeopleInTheCaseSubmitContent,
          "text16",
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkGroup(
          page,
          12,
          OtherPeopleInTheCaseSubmitContent,
          "text16A",
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCaseSubmitContent.gender}")`,
          1,
        ),
      ]);
    } else if (yesNoOtherPeopleInTheCase && applicantGender === "other") {
      await Promise.all([
        Helpers.checkGroup(
          page,
          13,
          OtherPeopleInTheCaseSubmitContent,
          "text16",
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkGroup(
          page,
          12,
          OtherPeopleInTheCaseSubmitContent,
          "text16A",
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCaseSubmitContent.gender}")`,
          2,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkGroup(
          page,
          12,
          OtherPeopleInTheCaseSubmitContent,
          "text16",
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCaseSubmitContent.gender}")`,
          1,
        ),
      ]);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
  private static async checkFilledData(
    page: Page,
    yesNoOtherPeopleInTheCase: boolean,
    otherPersonLivesInRefuge: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.applicantFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.applicantLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.applicantPrevName}")`,
        1,
      ),
    ]);
    if (applicantGender === "male" || applicantGender === "female") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Helpers.capitalizeFirstPart(applicantGender)}")`,
        1,
      );
    } else if (applicantGender === "other") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCaseSubmitContent.preferredGender}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCaseSubmitContent.preferredGender}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.loremIpsum}")`,
          1,
        ),
      ]);
    }

    if (yesNoOtherPeopleInTheCase) {
      if (otherPersonLivesInRefuge) {
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${OtherPeopleInTheCase1Content.uploadedFile}")`,
          1,
        );
      }
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.formLabelYes}")`,
          otherPersonLivesInRefuge ? 10 : 9,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(OtherPeopleInTheCase1Content.day, OtherPeopleInTheCase1Content.month, OtherPeopleInTheCase1Content.year)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.buildingAndStreet}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.townOrCity}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.postcode}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.country}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${UniquesFields.last5yearsLocator}:text-is("${OtherPeopleInTheCase1Content.last5Years}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${OtherPeopleInTheCase1Content.applicantEmail}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.phoneNumber}")`,
          1,
        ),
      ]);
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherPeopleInTheCase1Content.formLabelNo}")`,
        otherPersonLivesInRefuge ? 7 : 6,
      );
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${OtherPeopleInTheCaseSubmitContent.continue}")`,
    );
  }
}
