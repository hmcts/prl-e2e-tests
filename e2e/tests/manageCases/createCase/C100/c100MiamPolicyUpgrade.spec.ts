import { test } from "@playwright/test";
import { C100MiamPolicyUpgrade } from "../../../../journeys/manageCases/createCase/C100MiamPolicyUpgrade/C100MiamPolicyUpgrade";
import { SolicitorCreateInitial } from "../../../../journeys/manageCases/createCase/solicitorCreateInitial.ts";

test.describe("C100 Create case MIAM Tests", (): void => {
  test.beforeEach(async ({ page }) => {
    await SolicitorCreateInitial.createUserAndCase({
      page,
      solicitorCaseType: "C100",
    });
  });
  test(`Complete the C100 Create case MIAM as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Saying yes to all options,
  MiamSelection is attended4MonthsPrior. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yes",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
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
      accessibilityTest: false,
      errorMessaging: true,
      C100MiamPolicyUpgrade1PageType: "yesAttendedMiam",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
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
      accessibilityTest: false,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yesExemption",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
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
      accessibilityTest: false,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yesExemption",
      yesNoMiamPolicyUpgrade: false,
      miamSelection: "initiatedMIAMBeforeProceedings_MIAMCertificate",
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
      accessibilityTest: false,
      errorMessaging: true,
      C100MiamPolicyUpgrade1PageType: "yesExemption",
      yesNoMiamPolicyUpgrade: false,
      miamSelection: "initiatedMIAMBeforeProceedings_MIAMDetails",
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
      accessibilityTest: true,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yes",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "initiatedMIAMBeforeProceedings_MIAMDetails",
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
      accessibilityTest: true,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yesAttendedMiam",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
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
      accessibilityTest: true,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yesExemption",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
    });
  });
});
