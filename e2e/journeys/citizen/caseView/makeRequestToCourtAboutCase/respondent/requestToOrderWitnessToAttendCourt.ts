import { Browser, Page } from "@playwright/test";
import { ListOfApplications1Page } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/applicant/listOfApplications1Page.ts";
import { ListOfApplications2Page } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/applicant/listOfApplications2Page.ts";
import { ActivateCase, CaseUser } from "../../../activateCase/activateCase.ts";
import { applicationSubmittedBy } from "../../../../../common/types.ts";
import { RequestToOrderWitnessToAttendCourtPage1 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage1.ts";
import { RequestToOrderWitnessToAttendCourtPage2 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage2.ts";
import { RequestToOrderWitnessToAttendCourtPage3 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage3.ts";
import { RequestToOrderWitnessToAttendCourtPage4 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage4.ts";
import { RequestToOrderWitnessToAttendCourtPage5 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage5.ts";
import { RequestToOrderWitnessToAttendCourtPage6 } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtPage6.ts";
import { RequestToOrderWitnessToAttendCourtCYA } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/respondent/requestToOrderWitnessToAttendCourtCYA.ts";

interface requestToOrderWitnessToAttendCourtParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  isApplicant: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
  alreadyCompletedFP25: boolean;
  haveSupportingDocumentsUpload: boolean;
  reasonForUrgency: boolean;
}

enum UniqueSelectors {
  requestToCourtAboutYourCase = "#requestToCourtAboutYourCase",
}

export class RequestToOrderWitnessToAttendCourt {
  public static async requestToOrderWitnessToAttendCourt({
    page,
    browser,
    caseRef,
    accessibilityTest,
    isApplicant,
    applicationSubmittedBy,
    alreadyCompletedFP25,
    haveSupportingDocumentsUpload,
    reasonForUrgency,
  }: requestToOrderWitnessToAttendCourtParams): Promise<void> {
    const caseUser: CaseUser = isApplicant ? "applicant" : "respondent";
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: caseUser,
      accessibilityTest: accessibilityTest,
      applicationSubmittedBy: applicationSubmittedBy,
      isManualSOA: false,
    });
    await page.click(UniqueSelectors.requestToCourtAboutYourCase);
    await ListOfApplications1Page.listOfApplications1Page(
      page,
      accessibilityTest,
    );
    await ListOfApplications2Page.listOfApplications2Page(
      page,
      accessibilityTest,
    );
    await page.locator("text=Apply to the court using form FP25").click();
    await RequestToOrderWitnessToAttendCourtPage1.requestToOrderWitnessToAttendCourtPage1(
      page,
      accessibilityTest,
    );
    await RequestToOrderWitnessToAttendCourtPage2.requestToOrderWitnessToAttendCourtPage2(
      page,
      accessibilityTest,
      alreadyCompletedFP25,
    );
    await RequestToOrderWitnessToAttendCourtPage3.uploadFP25page({
      page,
      accessibilityTest,
    });
    await RequestToOrderWitnessToAttendCourtPage4.requestToOrderWitnessToAttendCourtPage4(
      page,
      accessibilityTest,
      haveSupportingDocumentsUpload,
    );
    await RequestToOrderWitnessToAttendCourtPage5.uploadSupportingDocumentsPage(
      {
        page,
        accessibilityTest,
      },
    );
    console.log("Navigating to RequestToOrderWitnessToAttendCourtPage6...");
    await RequestToOrderWitnessToAttendCourtPage6.requestToOrderWitnessToAttendCourtPage6(
      page,
      accessibilityTest,
      reasonForUrgency,
    );
    console.log("Arrived at Page 6!");
    await RequestToOrderWitnessToAttendCourtCYA.requestToOrderWitnessToAttendCourtCYA(
      page,
      accessibilityTest,
    );
  }
}
