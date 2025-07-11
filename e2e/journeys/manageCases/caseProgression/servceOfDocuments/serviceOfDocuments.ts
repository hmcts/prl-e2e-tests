import { Page } from "@playwright/test";
import { ServiceOfDocuments1Page } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments1Page.ts";
import { ServiceOfDocuments2Page } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments2Page.ts";
import { ServiceOfDocuments3Page } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments3Page.ts";
import { yesNoNA } from "../../../../common/types.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { ReviewDocuments } from "../reviewDocuments/reviewDocuments.ts";
import createDaCitizenCourtNavCase from "../../../../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { ServiceOfDocumentsSubmitPage } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocumentsSubmitPage.ts";
import { completeCheckApplicationAndSendToGatekeeper } from "../../../../common/caseHelpers/caseEventsHelper.ts";

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
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    // Handle review documents if case documents are included in case creation
    if (withCaseDoc) {
      await Helpers.goToCase(
        page,
        config.manageCasesBaseURLCase,
        ccdRef,
        "tasks",
      );
      await ReviewDocuments.reviewDocuments({
        page,
        accessibilityTest: false,
        yesNoNotSureRestrictDocs: "no",
        partyUploadedDocument: "CourtNav",
        documentType: "Applicant's statements",
      });
      await Helpers.goToCase(
        page,
        config.manageCasesBaseURLCase,
        ccdRef,
        "tasks",
      );
    }
    await completeCheckApplicationAndSendToGatekeeper(page, ccdRef);
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
    await page.reload();
    await page.waitForTimeout(500);
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
