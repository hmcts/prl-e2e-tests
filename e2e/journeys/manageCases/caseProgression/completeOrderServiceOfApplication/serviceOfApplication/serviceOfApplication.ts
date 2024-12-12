import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { ServiceOfApplication2Page } from "../../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Page.ts";
import {
  responsibleForServing,
  ServiceOfApplication4Page,
} from "../../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page.ts";
import { ServiceOfApplicationSubmitPage } from "../../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationSubmitPage.ts";
import { ServiceOfApplicationConfirmPage } from "../../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationConfirmPage.ts";
import { createOrderFL401Options } from "../../../../../common/types.ts";


interface ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoServiceOfApplication4: boolean;
  createOrderFL401Options: createOrderFL401Options;
  responsibleForServing: responsibleForServing;
}

export class ServiceOfApplicationJourney {
  public static async serviceOfApplicationJourney({
    page,
    accessibilityTest,
                                                    createOrderFL401Options,
    yesNoServiceOfApplication4,
    responsibleForServing,
  }: ServiceOfApplicationJourneyParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Service of application");
    await ServiceOfApplication2Page.serviceOfApplication2Page({
      page,
      accessibilityTest,
      createOrderFL401Options
    });
    await ServiceOfApplication4Page.serviceOfApplication4Page({
      page,
      accessibilityTest,
      yesNoServiceOfApplication4,
      responsibleForServing,
    });
    await ServiceOfApplicationSubmitPage.serviceOfApplicationSubmitPage({
      page,
      accessibilityTest,
    });
    await ServiceOfApplicationConfirmPage.serviceOfApplicationConfirmPage({
      page,
      accessibilityTest,
    });
  }
}
