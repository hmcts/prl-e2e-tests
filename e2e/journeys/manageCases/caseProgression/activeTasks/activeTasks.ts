import { Page } from "@playwright/test";
import { Fl401AddCaseNumber1Page } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumber1Page";
import { Helpers } from "../../../../common/helpers";
import { Fl401AddCaseNumberSubmitPage } from "../../../../pages/manageCases/caseProgression/checkApplication/fl401AddCaseNumberSubmitPage";
import { FL401SendToGateKeeper1Page } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeper1Page";
import { FL401SendToGateKeeperSubmitPage } from "../../../../pages/manageCases/caseProgression/sendToGateKeeper/fl401SendToGateKeeperSubmitPage";
import { FL401ReviewDocuments1Page } from "../../../../pages/manageCases/caseProgression/reviewDocuments/fl401ReviewDocuments1Page";
import { FL401ReviewDocuments2Page } from "../../../../pages/manageCases/caseProgression/reviewDocuments/fl401ReviewDocuments2Page";
import { FL401ReviewDocumentsSubmitPage } from "../../../../pages/manageCases/caseProgression/reviewDocuments/fl401ReviewDocumentsSubmitPage";
import config from "../../../../config";
import { yesNoDontKnow } from "../../../../common/types";

interface ActiveTasksParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  yesNoNotSureReviewDocs: yesNoDontKnow;
  ccdRef: string;
}

export class ActiveTasks {
  public static async activeTasks({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
    yesNoNotSureReviewDocs,
    ccdRef,
  }: ActiveTasksParams): Promise<void> {
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
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      page,
      "Review Documents",
      "Review Documents",
    );
    await FL401ReviewDocuments1Page.fl401ReviewDocuments1Page({
      page,
      accessibilityTest,
    });
    await FL401ReviewDocuments2Page.fl401ReviewDocuments2Page({
      page,
      accessibilityTest,
      yesNoNotSureReviewDocs,
    });
    await FL401ReviewDocumentsSubmitPage.fl401ReviewDocumentsSubmitPage({
      page,
      accessibilityTest,
      yesNoNotSureReviewDocs,
    });
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  }
}
