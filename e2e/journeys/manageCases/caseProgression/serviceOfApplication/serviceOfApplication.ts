import { Browser, expect, Page } from "@playwright/test";
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
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { CompleteTheOrder } from "../completeTheOrder/completeTheOrder.ts";
import { jsonDatas } from "../../../../common/caseHelpers/jsonDatas.ts";
import { C100ServiceOfApplication2Page } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/c100ServiceOfApplication2Page.js";
import { C100ServiceOfApplication4Page } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/c100ServiceOfApplication4Page.js";
import { C100ServiceOfApplicationSubmitPage } from "../../../../pages/manageCases/caseProgression/serviceOfApplication/C100ServiceOfApplicationSubmitPage.js";

interface FL401ServiceOfApplicationJourneyParams {
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

interface C100ServiceOfApplicationJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  personallyServed: boolean;
  isUploadOrder: boolean;
  checkOption: string;
  serveOrderNow: boolean;
  yesNoServiceOfApplication4: boolean;
  responsibleForServing: responsibleForServing;
  applicationSubmittedBy: applicationSubmittedBy;
  confidentialityCheck: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

export class ServiceOfApplication {
  public static async FL401FullServiceOfApplicationJourney({
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
  }: FL401ServiceOfApplicationJourneyParams): Promise<void> {
    await CompleteTheOrder.FL401completeTheOrder({
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

  public static async C100FullServiceOfApplicationJourney({
    page,
    accessibilityTest,
    personallyServed,
    solicitorCaseCreateType,
    yesNoServiceOfApplication4,
    responsibleForServing,
    applicationSubmittedBy,
    confidentialityCheck,
    isUploadOrder,
    serveOrderNow,
    checkOption,
  }: C100ServiceOfApplicationJourneyParams): Promise<void> {
    await CompleteTheOrder.C100completeTheOrder({
      page: page,
      accessibilityTest,
      personallyServed,
      solicitorCaseCreateType,
      isUploadOrder,
      serveOrderNow,
      checkOption,
      applicationSubmittedBy,
    });
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
      applicationSubmittedBy,
    });
    await C100ServiceOfApplicationSubmitPage.c100ServiceOfApplicationSubmitPage(
      {
        page,
        yesNoServiceOfApplication4,
        accessibilityTest,
        applicationSubmittedBy,
      },
    );
    // seems to complete without a confirmation page for some reason???
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

  public static async FL401ServiceOfApplicationJourney({
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

  private static async checkUnservedPacksWithinSOA(page: Page): Promise<void> {
    await expect(page.getByText("Unserved pack")).toBeVisible();
    await expect(page.getByText("Applicants pack")).toBeVisible();
    await expect(page.getByText("Respondents pack")).toBeVisible();
    await expect(page.getByText("Cafcass cymru")).toBeVisible();
  }
}
