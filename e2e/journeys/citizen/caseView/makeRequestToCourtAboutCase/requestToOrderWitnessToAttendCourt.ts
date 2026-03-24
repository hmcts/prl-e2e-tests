import { Page } from "@playwright/test";
import { ListOfApplications1Page } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/listOfApplications1Page.ts";
import { ListOfApplications2Page } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/listOfApplications2Page.ts";
import { RequestToOrderWitnessToAttendCourtPage1 } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/requestToOrderWitnessToAttendCourtPage1.ts";
import { RequestToOrderWitnessToAttendCourtPage2 } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/requestToOrderWitnessToAttendCourtPage2.ts";
import { RequestToOrderWitnessToAttendCourtPage4 } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/requestToOrderWitnessToAttendCourtPage4.ts";
import { RequestToOrderWitnessToAttendCourtPage6 } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/requestToOrderWitnessToAttendCourtPage6.ts";
import { RequestToOrderWitnessToAttendCourtPage7 } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/requestToOrderWitnessToAttendCourtPage7.ts";
import { RequestToOrderWitnessToAttendCourtCYA } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/requestToOrderWitnessToAttendCourtCYA.ts";
import { RequestToOrderWitnessToAttendCourtPage5 } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/requestToOrderWitnessToAttendCourtPage5.ts";
import { ListOfApplications3Page } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/listOfApplications3Page.ts";
import { RequestToOrderWitnessToAttendCourtPage3 } from "../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/requestToOrderWitnessToAttendCourtPage3.ts";

interface requestToOrderWitnessToAttendCourtParams {
  page: Page;
  accessibilityTest: boolean;
  alreadyCompletedFP25: boolean;
  haveSupportingDocumentsUpload: boolean;
  reasonForUrgency: boolean;
  helpWithFees: boolean;
}

enum UniqueSelectors {
  requestToCourtAboutYourCase = "#requestToCourtAboutYourCase",
}

export class RequestToOrderWitnessToAttendCourt {
  public static async requestToOrderWitnessToAttendCourt({
    page,
    accessibilityTest,
    alreadyCompletedFP25,
    haveSupportingDocumentsUpload,
    reasonForUrgency,
    helpWithFees,
  }: requestToOrderWitnessToAttendCourtParams): Promise<void> {
    await page.locator(UniqueSelectors.requestToCourtAboutYourCase).click();
    await ListOfApplications1Page.listOfApplications1Page(
      page,
      accessibilityTest,
    );
    await ListOfApplications2Page.listOfApplications2Page(
      page,
      accessibilityTest,
    );
    await ListOfApplications3Page.listOfApplications3Page(
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
    await RequestToOrderWitnessToAttendCourtPage3.helpWithFees(
      page,
      helpWithFees,
      accessibilityTest,
    );
    await RequestToOrderWitnessToAttendCourtPage4.uploadFP25page({
      page,
      accessibilityTest,
    });
    await RequestToOrderWitnessToAttendCourtPage5.requestToOrderWitnessToAttendCourtPage5(
      page,
      accessibilityTest,
      haveSupportingDocumentsUpload,
    );
    await RequestToOrderWitnessToAttendCourtPage6.uploadSupportingDocumentsPage(
      {
        page,
        accessibilityTest,
      },
    );
    await RequestToOrderWitnessToAttendCourtPage7.requestToOrderWitnessToAttendCourtPage7(
      page,
      accessibilityTest,
      reasonForUrgency,
    );
    await RequestToOrderWitnessToAttendCourtCYA.requestToOrderWitnessToAttendCourtCYA(
      page,
      accessibilityTest,
    );
  }
}
