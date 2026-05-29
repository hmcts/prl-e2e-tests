import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { amendApplicantDetailsSubmitContent } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendApplicantDetails/amendApplicantDetailsSubmitContent.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { CheckYourAnswersPage } from "../../../../../pageObjects/pages/exui/checkYourAnswers.po.js";

interface AmendApplicantDetailsSubmitOptions {
  page: Page;
  accessibilityTest: boolean;
  nameChange: boolean;
  dobChange: boolean;
  dobChangeDay: string;
  dobChangeMonth: string;
  dobChangeYear: string;
  genderChange: boolean;
  gender: string;
  liveInRefuge: boolean;
  changeApplicantAddress: boolean;
  keepDetailsConfidential: boolean;
  solicitorDetailsChange: boolean;
  snapshotPath: string[];
  snapshotName: string;
}

export class AmendApplicantDetailsSubmitPage {
  public static async amendApplicantDetailsSubmitPage({
    page,
    accessibilityTest,
    snapshotPath,
    snapshotName,
  }: AmendApplicantDetailsSubmitOptions): Promise<void> {
    const cyaPage: CheckYourAnswersPage = new CheckYourAnswersPage(
      page,
      amendApplicantDetailsSubmitContent.pageTitle,
      CommonStaticText.saveAndContinue,
    );
    await cyaPage.assertPageContents(snapshotPath, snapshotName);

    if (accessibilityTest) {
      // await cyaPage.verifyAccessibility(); #TODO run accessibility test once EXUI-2726 ticket is fixed
    }
    await cyaPage.clickSaveAndContinue();

    await expect(
      page.locator(
        `${Selectors.alertMessage}:has-text("${amendApplicantDetailsSubmitContent.confirmationMessage}")`,
      ),
    ).toBeVisible();
  }
}
