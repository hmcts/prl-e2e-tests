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
import { ConfidentialityCheckConfirmPage } from "../../../../pages/manageCases/caseProgression/confidentialityCheck/confidentialityCheckConfirmPage.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

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
  browserName: string;
}

enum UniqueSelectors {
  tab = ".mat-tab-label",
  rightArrowTab = ".mat-tab-header-pagination-after",
  plusButtonOnSoaTabView = ".accordion-image",
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
    browserName,
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
      browserName: browserName,
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
    await ConfidentialityCheckConfirmPage.confidentialityCheckConfirmPage(
      caseManagerPage,
      accessibilityTest,
    );
    await this.checkServiceOfApplicationTab(caseManagerPage);
  }

  private static async checkServiceOfApplicationTab(page: Page): Promise<void> {
    // click service of application tab
    await page.click(UniqueSelectors.rightArrowTab);
    await page
      .locator(UniqueSelectors.tab, {
        hasText: "Service of application",
      })
      .click();
    // check there is a served pack
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h2}:text-is("Served pack")`,
      1,
    );
    // check served pack is served by prl case manager swansea
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Span}:text-is("prl case manager swansea")`,
      1,
    );
    await page.click(UniqueSelectors.plusButtonOnSoaTabView);
    // check confidential contact details notice is present
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("Annex 1 - Confidential contact details notice.pdf")`,
      2,
    );
  }

  // cut down version of the confidential details journey
  public static async confidentialityCheckLite(
    browser: Browser,
    caseRef: string,
  ): Promise<void> {
    // login as case manager & wait for confidential check task
    const caseManagerPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseManager",
    );
    await Helpers.goToCase(
      caseManagerPage,
      config.manageCasesBaseURL,
      caseRef,
      "tasks",
    );
    await Helpers.assignTaskToMeAndTriggerNextSteps(
      caseManagerPage,
      "C8 - Confidential details check",
      "Confidential Check",
    );
    // confidentialityCheck1Page
    await caseManagerPage.click("#applicationServedYesNo_Yes");
    await caseManagerPage.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    // confidentialityCheckSubmitPage
    await caseManagerPage.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
    // confidentialityCheckConfirmPage
    await caseManagerPage.click(
      `${Selectors.button}:text-is("${CommonStaticText.closeAndReturnToCaseDetails}")`,
    );
  }
}
