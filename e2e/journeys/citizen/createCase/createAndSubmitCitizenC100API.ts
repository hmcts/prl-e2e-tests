import { Page } from "@playwright/test";
import IdamLoginHelper from "../../../utils/idamLoginHelper.utils.ts";
import { ApplicantPage } from "../../../pages/citizen/createCase/initialJourney/applicantPage.ts";
import { CitizenCACaseUtils } from "../../../utils/citizenCACase.utils.ts";
import { CaseDashboardPage } from "../../../pages/citizen/createCase/initialJourney/caseDashboardPage.ts";
import { CreateUserUtil } from "../../../utils/createUser.utils.ts";
import { C100Pay } from "./C100/subJourneys/C100Pay.ts";
import { EqualityAndDiversityPage } from "../../../pages/citizen/createCase/C100/confirmation/equalityAndDiversityQuestionsPage.ts";
import { ReviewPage } from "../../../pages/citizen/createCase/C100/reviewPages/reviewPage.ts";
import { ConfirmationPage } from "../../../pages/citizen/createCase/C100/confirmation/confirmationPage.ts";
import { IdamUtils, ServiceAuthUtils } from "@hmcts/playwright-common";

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
  }: CitizenC100ApiCaseOptions): Promise<string> {
    const token = process.env.CREATE_USER_BEARER_TOKEN as string;
    const userInfo = await CreateUserUtil.createUser(token, "citizen");

    const caCaseCreator = new CitizenCACaseUtils(
      new ServiceAuthUtils(),
      new IdamUtils(),
    );
    const ccdRef = await caCaseCreator.createDraftCase(userInfo);
    const idamLoginHelperInstance = new IdamLoginHelper();
    await idamLoginHelperInstance.signIn(
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

    await ReviewPage.checkCommonText({
      page,
      accessibilityTest: true,
    });
    await ReviewPage.fillInFields(page, false);
    await EqualityAndDiversityPage.equalityAndDiversityPage({ page });
    await C100Pay.c100Pay({ page, accessibilityTest, errorMessaging });
    await ConfirmationPage.confirmationPage({ page, accessibilityTest });
    return ccdRef;
  }
}
