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

interface ConfidentilityCheckParams {
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
}

export class ConfidentilityCheck {
  public static async confidentilityCheck({
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
  }: ConfidentilityCheckParams): Promise<void> {
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
  }
}
