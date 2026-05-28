import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { c100AmendApplicantDetailsSubmitContent } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendApplicantDetails/c100AmendApplicantDetailsSubmitContent.js";
import { CheckYourAnswersPage } from "../../../../../pageObjects/pages/exui/checkYourAnswers.po.js";

interface C100AmendApplicantDetailsSubmitOptions {
  page: Page;
  accessibilityTest: boolean;
  nameChange: boolean;
  dobChange: boolean;
  pobChange: boolean;
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

export class C100AmendApplicantDetailsSubmitPage {
  public static async c100AmendApplicantDetailsSubmitPage({
    page,
    accessibilityTest,
    snapshotPath,
    snapshotName,
  }: C100AmendApplicantDetailsSubmitOptions): Promise<void> {
    const cyaPage: CheckYourAnswersPage = new CheckYourAnswersPage(
      page,
      c100AmendApplicantDetailsSubmitContent.pageTitle,
      CommonStaticText.saveAndContinue,
    );
    await cyaPage.assertPageContents(snapshotPath, snapshotName);

    if (accessibilityTest) {
      // await cyaPage.verifyAccessibility(); #TODO run accessibility test once EXUI-2726 ticket is fixed
    }
    await cyaPage.clickSaveAndContinue();

    await expect(
      page.locator(
        `${Selectors.alertMessage}:has-text("${c100AmendApplicantDetailsSubmitContent.confirmationMessage}")`,
      ),
    ).toBeVisible();
  }
}
