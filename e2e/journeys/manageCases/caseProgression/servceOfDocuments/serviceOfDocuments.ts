import { Page } from "@playwright/test";
import { ServiceOfDocuments1Page } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments1Page";
import { ServiceOfDocuments2Page } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments2Page";
import { ServiceOfDocuments3Page } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments3Page";
import { yesNoNA } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { ReviewDocuments } from "../reviewDocuments/reviewDocuments";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { ApplicationJourneysCheckGatekeeper } from "../checkApplicationSendToGateKeeper/application-journeys-check-gatekeeper";
import { ServiceOfDocumentsSubmitPage } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocumentsSubmitPage";

interface ServiceOfDocumentsParams {
  page: Page;
  accessibilityTest: boolean;
  withCaseDoc: boolean;
  additionalDoc: boolean;
  personallyServed: yesNoNA;
  additionalRecipient: boolean;
  servedByPost: boolean;
  checkDocuments: boolean;
}

export class ServiceOfDocuments {
  public static async serviceOfDocumentsE2E({
    page,
    withCaseDoc,
    additionalDoc,
    personallyServed,
    additionalRecipient,
    servedByPost,
    accessibilityTest,
    checkDocuments,
  }: ServiceOfDocumentsParams): Promise<void> {
    const ccdRef: string = await createDaCitizenCourtNavCase(true, withCaseDoc);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await ApplicationJourneysCheckGatekeeper.applicationJourneysCheckGatekeeper(
      {
        page,
        accessibilityTest: false,

        yesNoSendToGateKeeper: false,
        ccdRef,
      },
    );
    // Handle review documents if case documents are included in case creation
    if (withCaseDoc) {
      await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
      await ReviewDocuments.reviewDocuments({
        page,
        accessibilityTest: false,
        yesNoNotSureRestrictDocs: "no",
      });
    }
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await this.serviceOfDocuments({
      page,
      withCaseDoc,
      additionalDoc,
      personallyServed,
      additionalRecipient,
      servedByPost,
      accessibilityTest,
      checkDocuments,
    });
  }

  public static async serviceOfDocuments({
    page,
    withCaseDoc,
    additionalDoc,
    personallyServed,
    additionalRecipient,
    servedByPost,
    accessibilityTest,
    checkDocuments,
  }: ServiceOfDocumentsParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Service of documents");
    await ServiceOfDocuments1Page.serviceOfDocuments1Page({
      page,
      accessibilityTest,
      additionalDoc,
      withCaseDoc,
    });
    await ServiceOfDocuments2Page.serviceOfDocuments2Page({
      page,
      accessibilityTest,
      personallyServed,
      additionalRecipient,
      servedByPost,
    });
    await ServiceOfDocuments3Page.serviceOfDocuments3Page({
      page,
      accessibilityTest,
      checkDocuments,
    });
    await ServiceOfDocumentsSubmitPage.serviceOfDocumentsSubmitPage({
      page,
      accessibilityTest,
      withCaseDoc,
      additionalDoc,
      additionalRecipient,
      personallyServed,
      servedByPost,
      checkDocuments,
    });
  }
}
