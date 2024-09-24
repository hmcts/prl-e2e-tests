import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { OtherProceedingsContent } from "../../../../../fixtures/manageCases/createCase/FL401/otherProceedings/otherProceedingsContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { otherProceedingsRadios } from "../../../../../journeys/manageCases/createCase/FL401";
import config from "../../../../../config";

enum radioIds {
  yes = "#fl401OtherProceedingDetails_hasPrevOrOngoingOtherProceeding-yes",
  no = "#fl401OtherProceedingDetails_hasPrevOrOngoingOtherProceeding-no",
  dontKnow = "#fl401OtherProceedingDetails_hasPrevOrOngoingOtherProceeding-dontKnow",
}

enum inputIds {
  nameOfCourt = "#fl401OtherProceedingDetails_fl401OtherProceedings_0_nameOfCourt",
  caseNumber = "#fl401OtherProceedingDetails_fl401OtherProceedings_0_caseNumber",
  typeOfCase = "#fl401OtherProceedingDetails_fl401OtherProceedings_0_typeOfCase",
  anyOtherDetails = "#fl401OtherProceedingDetails_fl401OtherProceedings_0_anyOtherDetails",
  uploadRelevantOrder = "#fl401OtherProceedingDetails_fl401OtherProceedings_0_uploadRelevantOrder",
}

export class OtherProceedingsPage {
  public static async otherProceedingsPage(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    otherProceedingsRadios: otherProceedingsRadios,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, otherProceedingsRadios, errorMessaging);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${OtherProceedingsContent.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${OtherProceedingsContent.textOnPage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherProceedingsContent.questionLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherProceedingsContent.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherProceedingsContent.no}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OtherProceedingsContent.dontKnow}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${OtherProceedingsContent.continue}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorSummaryTitle}:text-is("${OtherProceedingsContent.errorBanner}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorValidation}:text-is("${OtherProceedingsContent.errorMessage}")`,
      1,
    );
    await page.click(radioIds.yes);
    await page.click(
      `${Selectors.button}:text-is("${OtherProceedingsContent.addNew}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${OtherProceedingsContent.continue}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorMessage}:text-is("${OtherProceedingsContent.errorTypeOfCase}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorMessage}:text-is("${OtherProceedingsContent.errorOtherDetails}")`,
      1,
    );
  }

  private static async fillInFields(
    page: Page,
    otherProceedingsRadios: otherProceedingsRadios,
    errorMessaging: boolean,
  ): Promise<void> {
    switch (otherProceedingsRadios) {
      case "Yes":
        if (!errorMessaging) {
          await page.click(radioIds.yes);
          await page.click(
            `${Selectors.button}:text-is("${OtherProceedingsContent.addNew}")`,
          );
        }
        await this.checkFormLoads(page);
        await page.fill(
          `${inputIds.nameOfCourt}`,
          OtherProceedingsContent.exampleNameOfCourt,
        );
        await page.fill(
          `${inputIds.caseNumber}`,
          OtherProceedingsContent.exampleCaseNumber,
        );
        await page.fill(
          `${inputIds.typeOfCase}`,
          OtherProceedingsContent.exampleTypeOfCase,
        );
        await page.fill(
          `${inputIds.anyOtherDetails}`,
          OtherProceedingsContent.exampleOtherDetails,
        );
        const fileInput = page.locator(`${inputIds.uploadRelevantOrder}`);
        await fileInput.setInputFiles(config.testPdfFile);
        await page.waitForSelector(
          `${Selectors.GovukErrorMessage}:text-is("${OtherProceedingsContent.uploading}")`,
          { state: "hidden" },
        );
        await page.click(
          `${Selectors.button}:text-is("${OtherProceedingsContent.continue}")`,
        );
        break;
      case "No":
        await page.click(radioIds.no);
        await page.click(
          `${Selectors.button}:text-is("${OtherProceedingsContent.continue}")`,
        );
        break;
      case "Don't know":
        await page.click(radioIds.dontKnow);
        await page.click(
          `${Selectors.button}:text-is("${OtherProceedingsContent.continue}")`,
        );
        break;
      default:
        console.log(
          "Unexpected input for otherProceedingsRadios: ",
          otherProceedingsRadios,
        );
        await page.click(radioIds.dontKnow);
        await page.click(
          `${Selectors.button}:text-is("${OtherProceedingsContent.continue}")`,
        );
        break;
    }
  }

  private static async checkFormLoads(page: Page): Promise<void> {
    await Helpers.checkGroup(
      page,
      5,
      OtherProceedingsContent,
      "formLabel",
      `${Selectors.GovukFormLabel}`,
    );
  }
}
