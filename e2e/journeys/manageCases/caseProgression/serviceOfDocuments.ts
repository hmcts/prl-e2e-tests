import { Page } from "@playwright/test";
import { ServiceOfDocuments1Page } from "../../../pages/manageCases/caseProgression/serviceOfDocments/serviceOfDocuments1Page";
import { ServiceOfDocuments2Page } from "../../../pages/manageCases/caseProgression/serviceOfDocments/serviceOfDocuments2Page";
import { ServiceOfDocuments3Page } from "../../../pages/manageCases/caseProgression/serviceOfDocments/serviceOfDocuments3Page";
import { yesNoNA } from "../../../common/types";
import { Helpers } from "../../../common/helpers";
import {
  Fl401AddCaseNumber1Page
} from "../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumber1Page";
import {
  Fl401AddCaseNumberSubmitPage
} from "../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumberSubmitPage";
import config from "../../../config";
import {
  FL401SendToGateKeeper1Page
} from "../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeper1Page";
import {
  FL401SendToGateKeeperSubmitPage
} from "../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeperSubmitPage";



interface ServiceOfDocumentsParams {
  page: Page;
  accessibilityTest: boolean;
  withDoc: boolean;
  personallyServed: yesNoNA;
  ccdRef: string;
  checkDocuments: boolean;
  yesNoSendToGateKeeper: boolean;
}

export class ServiceOfDocuments {
  public static async serviceOfDocuments({
    page,
    withDoc,
    personallyServed,
    accessibilityTest,
    ccdRef,
    checkDocuments,
    yesNoSendToGateKeeper,
  }: ServiceOfDocumentsParams): Promise<void> {

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
      accessibilityTest,
      yesNoSendToGateKeeper,
    });
    await FL401SendToGateKeeperSubmitPage.fl401SendToGateKeeperSubmitPage({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
    });
    await Helpers.chooseEventFromDropdown(page, "Service of Documents");
    await ServiceOfDocuments1Page.serviceOfDocuments1Page(
      page,
      accessibilityTest,
      withDoc,
    );
    await ServiceOfDocuments2Page.serviceOfDocuments2Page(
      page,
      accessibilityTest,
      personallyServed,
    );
    await ServiceOfDocuments3Page.serviceOfDocuments3Page(
      page,
      accessibilityTest,
      checkDocuments,
    );
  }
}
