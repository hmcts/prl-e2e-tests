import { expect, Page } from "@playwright/test";
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
import { C100ServiceOfApplication2Page } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/c100ServiceOfApplication2Page.ts";
import { C100ServiceOfApplication4Page } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/c100ServiceOfApplication4Page.ts";
import { C100ServiceOfApplicationSubmitPage } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/C100ServiceOfApplicationSubmitPage.ts";

interface FL401ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  createOrderFL401Options: createOrderFL401Options;
  yesNoServiceOfApplication4: boolean;
  responsibleForServing: responsibleForServing;
  applicationSubmittedBy: applicationSubmittedBy;
  confidentialityCheck: boolean;
}

interface C100ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
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

  public static async C100FullServiceOfApplicationJourney({
    page,
    accessibilityTest,
    yesNoServiceOfApplication4,
    responsibleForServing,
    applicationSubmittedBy,
    confidentialityCheck,
  }: C100ServiceOfApplicationJourneyParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Service of application");
    await C100ServiceOfApplication2Page.c100ServiceOfApplication2Page({
      page,
      accessibilityTest,
    });
    await C100ServiceOfApplication4Page.c100ServiceOfApplication4Page({
      page,
      accessibilityTest,
      yesNoServiceOfApplication4,
      responsibleForServing,
    });
    await C100ServiceOfApplicationSubmitPage.c100ServiceOfApplicationSubmitPage(
      {
        page,
        yesNoServiceOfApplication4,
        accessibilityTest,
        applicationSubmittedBy,
      },
    );
    await ServiceOfApplicationConfirmPage.serviceOfApplicationConfirmPage({
      page,
      yesNoServiceOfApplication4,
      accessibilityTest,
      confidentialityCheck,
      applicationSubmittedBy,
    });

    await Helpers.clickTab(page, "Service of application");
    //check unserved packs within SOA
    await this.checkUnservedPacksWithinSOA(page);
  }

  private static async checkUnservedPacksWithinSOA(page: Page): Promise<void> {
    await expect(page.getByText("Unserved pack")).toBeVisible();
    await expect(page.getByText("Applicants pack")).toBeVisible();
    await expect(page.getByText("Respondents pack")).toBeVisible();
    await expect(page.getByText("Cafcass cymru")).toBeVisible();
  }
}
