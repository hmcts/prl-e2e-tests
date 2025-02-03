import {
  ApplicantGender,
  applicationSubmittedBy,
  createOrderFL401Options,
} from "../../../../common/types.ts";
import { Browser, Page } from "@playwright/test";
import { responsibleForServing } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page.ts";
import { jsonDatas } from "../../../../common/solicitorCaseCreatorHelper.ts";
import { CompleteTheOrder } from "../completeTheOrder/completeTheOrder.ts";
import { AmendApplicantDetails } from "../amendDetails/amendApplicantDetails.ts";
import { ServiceOfApplication } from "../serviceOfApplication/serviceOfApplication.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../config.ts";
import { ConfidentialityCheck1Page } from "../../../../pages/manageCases/caseProgression/confidentialityCheck/confidentialityCheck1Page.ts";
import { ConfidentialityCheckSubmitPage } from "../../../../pages/manageCases/caseProgression/confidentialityCheck/confidentialityCheckSubmitPage.ts";

interface ConfidentialityCheckParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  nameChange: boolean;
  dobChange: boolean;
  genderChange: boolean;
  gender: ApplicantGender;
  liveInRefuge: boolean;
  changeApplicantAddress: boolean;
  keepDetailsConfidential: boolean;
  solicitorDetailsChange: boolean;
  createOrderFL401Options: createOrderFL401Options;
  browser: Browser;
  personallyServed: boolean;
  yesNoServiceOfApplication4: boolean;
  responsibleForServing: responsibleForServing;
  manageOrderData: typeof jsonDatas;
  applicationSubmittedBy: applicationSubmittedBy;
  confidentialityCheck: boolean;
  isApplicationServedAfterConfidentialityCheck: boolean;
}

export class ConfidentialityCheck {
  public static async confidentialityCheck({
    page,
    accessibilityTest,
    ccdRef,
    nameChange,
    dobChange,
    genderChange,
    gender,
    liveInRefuge,
    changeApplicantAddress,
    keepDetailsConfidential,
    solicitorDetailsChange,
    createOrderFL401Options,
    browser,
    personallyServed,
    yesNoServiceOfApplication4,
    responsibleForServing,
    manageOrderData,
    applicationSubmittedBy,
    confidentialityCheck,
    isApplicationServedAfterConfidentialityCheck,
  }: ConfidentialityCheckParams): Promise<void> {
    await CompleteTheOrder.completeTheOrder({
      page,
      browser,
      accessibilityTest,
      ccdRef,
      createOrderFL401Options,
      personallyServed,
      manageOrderData,
      applicationSubmittedBy,
    });
    await AmendApplicantDetails.amendApplicantDetails({
      page,
      accessibilityTest,
      ccdRef,
      nameChange,
      dobChange,
      genderChange,
      gender,
      liveInRefuge,
      changeApplicantAddress,
      keepDetailsConfidential,
      solicitorDetailsChange,
    });
    await ServiceOfApplication.serviceOfApplicationJourney({
      page,
      accessibilityTest,
      ccdRef,
      createOrderFL401Options,
      browser,
      personallyServed,
      yesNoServiceOfApplication4,
      responsibleForServing,
      manageOrderData,
      applicationSubmittedBy,
      confidentialityCheck,
    });
    // login as case manager & wait for confidential check task
    const caseManagerPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseManager",
    );
    await Helpers.goToCase(
      caseManagerPage,
      config.manageCasesBaseURL,
      ccdRef,
      "tasks",
    );
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      caseManagerPage,
      "C8 - Confidential details check",
      "Confidential Check",
    );
    await ConfidentialityCheck1Page.confidentialityCheck1Page({
      page: caseManagerPage,
      accessibilityTest: accessibilityTest,
      isApplicationServedAfterConfidentialityCheck:
        isApplicationServedAfterConfidentialityCheck,
    });
    await ConfidentialityCheckSubmitPage.confidentialityCheckSubmitPage({
      page: caseManagerPage,
      accessibilityTest: accessibilityTest,
      isApplicationServedAfterConfidentialityCheck:
        isApplicationServedAfterConfidentialityCheck,
    });
    // TODO: check service of application tab??
  }
}
