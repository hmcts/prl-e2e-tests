import { Page } from "@playwright/test";
import { ServiceOfDocuments1Page } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments1Page";
import { ServiceOfDocuments2Page } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments2Page";
import { ServiceOfDocuments3Page } from "../../../../pages/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments3Page";
import { yesNoNA } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import { Fl401AddCaseNumber1Page } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumber1Page";
import { Fl401AddCaseNumberSubmitPage } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumberSubmitPage";
import config from "../../../../config";
import { FL401SendToGateKeeper1Page } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeper1Page";
import { FL401SendToGateKeeperSubmitPage } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeperSubmitPage";
import { ReviewDocuments } from "../reviewDocuments/reviewDocuments";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";

interface ServiceOfDocumentsParams {
  page: Page;
  accessibilityTest: boolean;
  withCaseDoc: boolean;
  additionalDoc: boolean;
  personallyServed: yesNoNA;
  servedByPost: boolean;
  checkDocuments: boolean;
}

export class ServiceOfDocuments {
  public static async serviceOfDocuments({
    page,
    withCaseDoc,
    additionalDoc,
    personallyServed,
    servedByPost,
    accessibilityTest,
    checkDocuments,
  }: ServiceOfDocumentsParams): Promise<void> {
    const ccdRef: string = await createDaCitizenCourtNavCase(true, withCaseDoc);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Check Application",
      "Add Case Number",
    );
    await Fl401AddCaseNumber1Page.fl401AddCaseNumber1Page(
      page,
      accessibilityTest,
    );
    await Fl401AddCaseNumberSubmitPage.fl401AddCaseNumberSubmitPage(
      page,
      accessibilityTest,
    );
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Send to Gatekeeper",
      "Send to Gatekeeper",
    );
    await FL401SendToGateKeeper1Page.fl401SendToGateKeeper1Page({
      page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: false,
    });
    await FL401SendToGateKeeperSubmitPage.fl401SendToGateKeeperSubmitPage({
      page,
      accessibilityTest: false,
      yesNoSendToGateKeeper: false,
    });
    if (withCaseDoc) {
      await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
      await ReviewDocuments.reviewDocuments({
        page,
        accessibilityTest: false,
        yesNoNotSureRestrictDocs: "no",
      });
    }
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await Helpers.chooseEventFromDropdown(page, "Service of documents");
    await page.pause();
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
      servedByPost,
    });
    await ServiceOfDocuments3Page.serviceOfDocuments3Page({
      page,
      accessibilityTest,
      checkDocuments,
    });
  }
}
