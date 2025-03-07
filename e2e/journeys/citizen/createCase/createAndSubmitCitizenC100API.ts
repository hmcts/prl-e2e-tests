import { Page } from "@playwright/test";
import IdamLoginHelper from "../../../common/userHelpers/idamLoginHelper.ts";
import { ApplicantPage } from "../../../pages/citizen/createCase/initialJourney/applicantPage.ts";
import { CitizenCACaseCreator } from "../../../common/caseHelpers/citizenCACaseCreateHelper.ts";
import { CaseDashboardPage } from "../../../pages/citizen/createCase/initialJourney/caseDashboardPage.ts";
import { setupUser } from "../../../common/userHelpers/idamCreateUserApiHelper.ts";
import { C100Pay } from "./C100/subJourneys/C100Pay.ts";
import { EqualityAndDiversityPage } from "../../../pages/citizen/createCase/C100/confirmation/equalityAndDiversityQuestionsPage.ts";
import { ReviewPage } from "../../../pages/citizen/createCase/C100/reviewPages/reviewPage.ts";
import { ConfirmationPage } from "../../../pages/citizen/createCase/C100/confirmation/confirmationPage.ts";

interface CitizenC100ApiCaseOptions {
  page: Page;
  accessibilityTest: boolean;
  application: string;
  errorMessaging: boolean;
}

export class CitizenC100ApiCase {
  public static async createAndSubmitDraftCase({
    page,
    accessibilityTest,
    application,
    errorMessaging,
  }: CitizenC100ApiCaseOptions): Promise<void> {
    const token = process.env.CITIZEN_CREATE_USER_BEARER_TOKEN as string;
    const userInfo = await setupUser(token, "citizen"); // Create citizen user
    // create the C100 case
    const ccdRef = await CitizenCACaseCreator.createDraftCitizenCACase(
      page,
      application,
      userInfo,
    );
    // log into citizen portal
    await IdamLoginHelper.signIn(
      page,
      userInfo.email,
      userInfo.password,
      application,
      "citizen",
    );
    await CaseDashboardPage.selectDraftCase({
      page,
      accessibilityTest,
      ccdRef,
    });
    await ApplicantPage.applicantPageDraftCase({ page, accessibilityTest });
    //check non-dynamic content of check your answers
    await ReviewPage.checkCommonText({
      page,
      accessibilityTest: true,
    });
    await ReviewPage.fillInFields(page, false);
    await EqualityAndDiversityPage.equalityAndDiversityPage({ page });
    await C100Pay.c100Pay({ page, accessibilityTest, errorMessaging });
    await ConfirmationPage.confirmationPage({ page, accessibilityTest });
  }
}
