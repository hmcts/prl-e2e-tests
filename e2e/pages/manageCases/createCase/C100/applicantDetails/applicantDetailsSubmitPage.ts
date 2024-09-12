import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ApplicantDetailsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetailsSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

export class ApplicantDetailsSubmitPage {
  public static async applicantDetailsSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    yesNoApplicantDetails: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest, yesNoApplicantDetails);
    await this.continue(page);
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
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ApplicantDetailsSubmitContent.continue}")`,
    );
  }
}
