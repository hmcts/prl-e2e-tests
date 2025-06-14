import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { C100MiamPolicyUpgrade } from "../../../../journeys/manageCases/createCase/C100MiamPolicyUpgrade/C100MiamPolicyUpgrade.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case MIAM Tests", (): void => {
  test(`Complete the C100 Create case MIAM as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  MiamSelection is attended4MonthsPrior. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yes",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case MIAM as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to attended MIAM,
  MiamSelection is attended4MonthsPrior. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      C100MiamPolicyUpgrade1PageType: "yesAttendedMiam",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case MIAM as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to yesExemption
  miamSelection "attended4MonthsPrior"
  Saying Yes to all options. @regression`, async ({ page }): Promise<void> => {
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yesExemption",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case MIAM as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to yesExemption
  miamSelection "initiatedMIAMBeforeProceedings_MIAMCertificate"
  Saying no to all options. @regression`, async ({ page }): Promise<void> => {
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yesExemption",
      yesNoMiamPolicyUpgrade: false,
      miamSelection: "initiatedMIAMBeforeProceedings_MIAMCertificate",
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case MIAM as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to yesExemption
  miamSelection "initiatedMIAMBeforeProceedings_MIAMDetails"
  Saying no to all options. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: true,
      C100MiamPolicyUpgrade1PageType: "yesExemption",
      yesNoMiamPolicyUpgrade: false,
      miamSelection: "initiatedMIAMBeforeProceedings_MIAMDetails",
      subJourney: true,
    });
  });
  test(`Accessibility test the C100 Miam event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  C100MiamPolicyUpgrade1PageType is "yes"
  miamSelection is "initiatedMIAMBeforeProceedings_MIAMDetails". @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yes",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "initiatedMIAMBeforeProceedings_MIAMDetails",
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case MIAM as a solicitor with the following options:
  Accessibility testing,
  Error message testing,
  Saying yes to attended MIAM
  C100MiamPolicyUpgrade1PageType is "yesAttendedMiam"
  miamSelection is "attended4MonthsPrior". @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yesAttendedMiam",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
      subJourney: true,
    });
  });

  test(`Complete the C100 Create case MIAM as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Saying yes to yesExemption
  miamSelection "attended4MonthsPrior"
  Saying Yes to all options. @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: "solicitor",
      accessibilityTest: true,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yesExemption",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
      subJourney: true,
    });
  });
});
