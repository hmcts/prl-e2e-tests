import Config from "../../utils/config.utils";
import { EdgeCase } from "../../journeys/edgeCases/edgeCaseJourney";
import { test } from "@playwright/test";

//#TODO run in nightly pipeline once code has been deployed to AAT, currently only deployed to ITHC
test.describe("Create an edge case as a citizen", (): void => {
  test.beforeEach(async ({ page }) => {
    await page.goto(Config.edgeCasesBaseURL);
  });
  test("Create an Female Genital Mutilation (FGM) edge case as a citizen. @accessibility", async ({
    page,
  }) => {
    await EdgeCase.createDAEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "FGM",
      applyMyself: true,
      under18: true,
      manualAddress: true,
      additionalDocuments: true,
    });
  });
  test("Create an Forced Marriage Protection Order (FMPO) edge case on behalf of another citizen. @accessibility", async ({
    page,
  }) => {
    await EdgeCase.createDAEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "FMPO",
      applyMyself: false,
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
    });
  });
  test("Create a Special Guardianship edge case as a citizen - adding additional documents and HWF applied. @accessibility", async ({
    page,
  }) => {
    await EdgeCase.createCAEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "SpecialGuardianship",
      under18: true,
      manualAddress: true,
      additionalDocuments: true,
      helpWithFees: true,
    });
  });
  test("Create a Declaration of Parentage edge case as a citizen - no HWF.", async ({
    page,
  }) => {
    await EdgeCase.createCAEdgeCase({
      page,
      accessibilityTest: false,
      typeOfApplication: "DeclarationOfParentage",
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
      helpWithFees: false,
    });
  });
  test("Create a Parental Order edge case as a citizen - with HWF", async ({
    page,
  }) => {
    await EdgeCase.createCAEdgeCase({
      page,
      accessibilityTest: false,
      typeOfApplication: "ParentalOrder",
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
      helpWithFees: true,
    });
  });
  test("Create a Parental Responsibility edge case as a citizen - with HWF", async ({
    page,
  }) => {
    await EdgeCase.createCAEdgeCase({
      page,
      accessibilityTest: false,
      typeOfApplication: "ParentalResponsibility",
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
      helpWithFees: true,
    });
  });
  test("Create a Parental responsibility (second female parent) edge case as a citizen - with HWF", async ({
    page,
  }) => {
    await EdgeCase.createCAEdgeCase({
      page,
      accessibilityTest: false,
      typeOfApplication: "ParentalResponsibility_secondFemaleParent",
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
      helpWithFees: true,
    });
  });
  test("Create an Appointing a child’s guardian edge case as a citizen", async ({
    page,
  }) => {
    await EdgeCase.createCAEdgeCase({
      page,
      accessibilityTest: false,
      typeOfApplication: "AppointingChildGuardian",
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
      helpWithFees: true,
    });
  });
  test("Create a Change of child’s surname or removal from jurisdiction edge case as a citizen", async ({
    page,
  }) => {
    await EdgeCase.createCAEdgeCase({
      page,
      accessibilityTest: false,
      typeOfApplication: "ChangeOfChildSurname",
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
      helpWithFees: true,
    });
  });
});
