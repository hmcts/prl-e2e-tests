import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantDetailsSubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/applicantDetails/applicantDetailsSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/typeOfApplication/submitContent";
import { ApplicantGender } from "../../../../../common/types";

export class ApplicantDetailsSubmitPage {
  public static async applicantDetailsSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoFL401ApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      yesNoFL401ApplicantDetails,
      applicantGender,
    );
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    yesNoFL401ApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page, yesNoFL401ApplicantDetails, applicantGender),
      this.checkFilledInData(page, yesNoFL401ApplicantDetails, applicantGender),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); TODO: Disabled pending ticket EXUI-2717
    }
  }

  private static async checkPageLoads(
    page: Page,
    yesNoFL401ApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ApplicantDetailsSubmitContent.pageTitle}")`,
    );
    const text16Count: number = yesNoFL401ApplicantDetails ? 20 : 18;
    const emailCount: number = yesNoFL401ApplicantDetails ? 2 : 1;
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
        text16Count,
        ApplicantDetailsSubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.emailAddress}")`,
        emailCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.textChange}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.addressLine1_2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.addressLine2_2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.addressLine3_2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.addressLine4_2}")`,
        2,
      ),
    ]);
    if (applicantGender === "other") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.applicantGenderOtherLabel}")`,
        1,
      );
    }
  }

  private static async checkFilledInData(
    page: Page,
    yesNoFl401ApplicantDetails: boolean,
    applicantGender: ApplicantGender,
  ): Promise<void> {
    let gender: string;
    let yesNoCount: number;
    let yesNoKey: keyof typeof ApplicantDetailsSubmitContent;
    if (yesNoFl401ApplicantDetails) {
      yesNoCount = 5;
      yesNoKey = "radioYes";
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ApplicantDetailsSubmitContent.applicantEmailAddress}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.uploadC8Form}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ApplicantDetailsSubmitContent.uploadedFile}")`,
        1,
      );
    } else {
      yesNoCount = 4;
      yesNoKey = "radioNo";
    }
    switch (applicantGender) {
      case "male":
        gender = ApplicantDetailsSubmitContent.applicantGenderMale;
        break;
      case "female":
        gender = ApplicantDetailsSubmitContent.applicantGenderFemale;
        break;
      case "other":
        gender = ApplicantDetailsSubmitContent.applicantGenderOtherInput;
        break;
      default:
        if (process.env.PWDEBUG) {
          console.log("Unexpected input for applicantGender: ", applicantGender);
        }
        gender = "null";
        break;
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent[yesNoKey]}")`,
        yesNoCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.applicantFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.applicantLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.applicantPreviousName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.applicantBirthday}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.applicantPhoneNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.solicitorFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.solicitorLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ApplicantDetailsSubmitContent.solicitorEmailAddress}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.solicitorReference}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.solicitorPhoneNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.dxNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${gender}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.bpBuildingAndStreet}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.bpCity}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.bpPostalCode}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetailsSubmitContent.bpBuildingAndStreet}")`,
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
