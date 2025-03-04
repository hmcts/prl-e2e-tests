import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { ServiceOfApplication2Page } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Page.ts";
import {
  responsibleForServing,
  ServiceOfApplication4Page,
} from "../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page.ts";
import { ServiceOfApplicationSubmitPage } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationSubmitPage.ts";
import { ServiceOfApplicationConfirmPage } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationConfirmPage.ts";
import {
  applicationSubmittedBy,
  createOrderFL401Options,
} from "../../../../common/types.ts";
import { CompleteTheOrder } from "../completeTheOrder/completeTheOrder.ts";
import { jsonDatas } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";

interface ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  createOrderFL401Options: createOrderFL401Options;
  browser: Browser;
  personallyServed: boolean;
  yesNoServiceOfApplication4: boolean;
  responsibleForServing: responsibleForServing;
  manageOrderData: typeof jsonDatas;
  applicationSubmittedBy: applicationSubmittedBy;
  confidentialityCheck: boolean;
}

export class ServiceOfApplication {
  public static async fullServiceOfApplicationJourney({
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
  }: ServiceOfApplicationJourneyParams): Promise<void> {
    await CompleteTheOrder.completeTheOrder({
      page: page,
      browser,
      accessibilityTest,
      ccdRef,
      createOrderFL401Options,
      personallyServed,
      manageOrderData,
      applicationSubmittedBy,
    });
    await Helpers.chooseEventFromDropdown(page, "Service of application");
    await ServiceOfApplication2Page.serviceOfApplication2Page({
      page,
      accessibilityTest,
      createOrderFL401Options,
    });
    await ServiceOfApplication4Page.serviceOfApplication4Page({
      page,
      accessibilityTest,
      yesNoServiceOfApplication4,
      responsibleForServing,
    });
    await ServiceOfApplicationSubmitPage.serviceOfApplicationSubmitPage({
      page,
      yesNoServiceOfApplication4,
      accessibilityTest,
      applicationSubmittedBy,
    });
    await ServiceOfApplicationConfirmPage.serviceOfApplicationConfirmPage({
      page,
      yesNoServiceOfApplication4,
      accessibilityTest,
      confidentialityCheck,
      applicationSubmittedBy,
    });
  }

  public static async serviceOfApplicationJourney({
    page,
    accessibilityTest,
    createOrderFL401Options,
    yesNoServiceOfApplication4,
    responsibleForServing,
    applicationSubmittedBy,
    confidentialityCheck,
  }: ServiceOfApplicationJourneyParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Service of application");
    await ServiceOfApplication2Page.serviceOfApplication2Page({
      page,
      accessibilityTest,
      createOrderFL401Options,
    });
    await ServiceOfApplication4Page.serviceOfApplication4Page({
      page,
      accessibilityTest,
      yesNoServiceOfApplication4,
      responsibleForServing,
    });
    await ServiceOfApplicationSubmitPage.serviceOfApplicationSubmitPage({
      page,
      yesNoServiceOfApplication4,
      accessibilityTest,
      applicationSubmittedBy,
    });
    await ServiceOfApplicationConfirmPage.serviceOfApplicationConfirmPage({
      page,
      yesNoServiceOfApplication4,
      accessibilityTest,
      confidentialityCheck,
      applicationSubmittedBy,
    });
  }
}
