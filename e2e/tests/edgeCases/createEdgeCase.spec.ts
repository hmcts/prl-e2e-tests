import Config from "../../config.ts";
import { EdgeCase } from "../../journeys/edgeCases/edgeCaseJourney.ts";
import { test } from "@playwright/test";

test.describe("Create an FXXX edge case as a citizen", (): void => {
  test.beforeEach(async ({ page }) => {
    await page.goto(Config.edgeCasesBaseURL);
  });
  test("Create an Female Genital Mutilation (FGM) edge case as a citizen", async ({
    page,
  }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "FGM",
      applyMyself: true,
      under18: true,
      manualAddress: true,
      additionalDocuments: true,
    });
  });
  test("Create an Forced Marriage Protection Order (FMPO) edge case as a citizen", async ({
    page,
  }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "FMPO",
      applyMyself: true,
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
    });
  });
});

test.describe("Create an CXXX edge case as a citizen", (): void => {
  test.beforeEach(async ({ page }) => {
    await page.goto(Config.edgeCasesBaseURL);
  });
  test("Create a Special Guardianship edge case as a citizen", async ({
    page,
  }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "SpecialGuardianship",
      applyMyself: true,
      under18: true,
      manualAddress: true,
      additionalDocuments: true,
    });
  });
  test("Create a Declaration of Parentage edge case as a citizen", async ({
    page,
  }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: false,
      typeOfApplication: "DeclarationOfParentage",
      applyMyself: false,
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
    });
  });
  test("Create a Parental Order edge case as a citizen", async ({ page }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: false,
      typeOfApplication: "ParentalOrder",
      applyMyself: false,
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
    });
  });
  test("Create a Parental Responsibility edge case as a citizen", async ({
    page,
  }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: false,
      typeOfApplication: "ParentalResponsibility",
      applyMyself: false,
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
    });
  });
  test("Create a Parental responsibility (second female parent) edge case as a citizen", async ({
    page,
  }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: false,
      typeOfApplication: "ParentalResponsibility_secondFemaleParent",
      applyMyself: false,
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
    });
  });
  test("Create an Appointing a child’s guardian edge case as a citizen", async ({
    page,
  }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "AppointingChildGuardian",
      applyMyself: false,
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
    });
  });
  test("Create a Change of child’s surname or removal from jurisdiction edge case as a citizen", async ({
    page,
  }) => {
    await EdgeCase.createEdgeCase({
      page,
      accessibilityTest: true,
      typeOfApplication: "ChangeOfChildSurname",
      applyMyself: false,
      under18: false,
      manualAddress: false,
      additionalDocuments: false,
    });
  });
});
