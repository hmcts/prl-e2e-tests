import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { ServiceOfApplication2Page } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Page";
import {
  responsibleForServing,
  ServiceOfApplication4Page,
} from "../../../../pages/manageCases/caseProgression/serviceOfApplication/ServiceOfApplication4Page";
import { ServiceOfApplicationSubmitPage } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationSubmitPage";
import { ServiceOfApplicationConfirmPage } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationConfirmPage";

interface ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoServiceOfApplication4: boolean;
  responsibleForServing: responsibleForServing;
}

export class ServiceOfApplicationJourney {
  public static async serviceOfApplicationJourney({
    page,
    accessibilityTest,
    yesNoServiceOfApplication4,
    responsibleForServing,
  }: ServiceOfApplicationJourneyParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Service of application");
    await ServiceOfApplication2Page.serviceOfApplication2Page({
      page,
      accessibilityTest,
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
