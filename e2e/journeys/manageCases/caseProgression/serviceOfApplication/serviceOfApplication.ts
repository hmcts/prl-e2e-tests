import { Page } from "@playwright/test";
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

interface FL401ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  createOrderFL401Options: createOrderFL401Options;
  yesNoServiceOfApplication4: boolean;
  responsibleForServing: responsibleForServing;
  applicationSubmittedBy: applicationSubmittedBy;
  confidentialityCheck: boolean;
}

export class ServiceOfApplication {
  public static async FL401FullServiceOfApplicationJourney({
    page,
    accessibilityTest,
    createOrderFL401Options,
    yesNoServiceOfApplication4,
    responsibleForServing,
    applicationSubmittedBy,
    confidentialityCheck,
  }: FL401ServiceOfApplicationJourneyParams): Promise<void> {
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
