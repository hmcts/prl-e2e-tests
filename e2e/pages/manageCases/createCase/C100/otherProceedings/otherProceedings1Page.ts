import { Page } from "@playwright/test";
import { otherProceedingsRadios } from "../../../../../common/types";
import { Selectors } from "../../../../../common/selectors";
import { OtherProceedingsContent } from "../../../../../fixtures/manageCases/createCase/C100/otherProceedings/otherProceedingsContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import Config from "../../../../../config";

const modalSelector: string =
  "#mat-dialog-0 > ccd-remove-dialog > div > div > ";

enum inputIDs {
  radioYes = "#previousOrOngoingProceedingsForChildren-yes",
  radioNo = "#previousOrOngoingProceedingsForChildren-no",
  radioDK = "#previousOrOngoingProceedingsForChildren-dontKnow",
  ongoingProceedings = "#existingProceedings_0_previousOrOngoingProceedings-ongoing",
  previousProceedings = "#existingProceedings_0_previousOrOngoingProceedings-previous",
  caseNumber = "#existingProceedings_0_caseNumber",
  startDateDay = "#dateStarted-day",
  startDateMonth = "#dateStarted-month",
  startDateYear = "#dateStarted-year",
  endDateDay = "#dateEnded-day",
  endDateMonth = "#dateEnded-month",
  endDateYear = "#dateEnded-year",
  judgeName = "#existingProceedings_0_nameOfJudge",
  courtName = "#existingProceedings_0_nameOfCourt",
  childrenInvolved = "#existingProceedings_0_nameOfChildrenInvolved",
  guardianName = "#existingProceedings_0_nameOfGuardian",
  cymruOfficer = "#existingProceedings_0_nameAndOffice",
  fileUpload = "#existingProceedings_0_uploadRelevantOrder",
  typeOfOrder = "#existingProceedings_0_otherTypeOfOrder",
}

enum checkboxIDs {
  emergencyProtectionOrder = "#existingProceedings_0_typeOfOrder-emergencyProtectionOrder",
  supervisionOrder = "#existingProceedings_0_typeOfOrder-supervisionOrder",
  careOrder = "#existingProceedings_0_typeOfOrder-careOrder",
  childAbduction = "#existingProceedings_0_typeOfOrder-childAbduction",
  familyLawAct1996Part4 = "#existingProceedings_0_typeOfOrder-familyLaw1996Part4",
  contactOrResidenceOrderDivorce = "#existingProceedings_0_typeOfOrder-contactOrResidenceOrder",
  contactOrResidenceOrderAdoption = "#existingProceedings_0_typeOfOrder-contactOrResidenceOrderWithAdoption",
  orderRelatingToChildMaintenance = "#existingProceedings_0_typeOfOrder-orderRelatingToChildMaintainance",
  childArrangementsOrder = "#existingProceedings_0_typeOfOrder-childArrangementsOrder",
  otherOrder = "#existingProceedings_0_typeOfOrder-otherOrder",
  financialOrderChildrenAct1989 = "#existingProceedings_0_typeOfOrder-childrenAct1989",
  nonMolestationOrder = "#existingProceedings_0_typeOfOrder-nonMolestationOrder",
  occupationOrder = "#existingProceedings_0_typeOfOrder-occupationOrder",
  forcedMarriageProtectionOrder = "#existingProceedings_0_typeOfOrder-fmpo",
  restrainingOrder = "#existingProceedings_0_typeOfOrder-restrainingOrder",
  otherInjunctiveOrder = "#existingProceedings_0_typeOfOrder-otherInjunctiveOrder",
  undertakingInPlaceOfAnOrder = "#existingProceedings_0_typeOfOrder-undertakingInPlaceOfAnOrder",
}

enum invalidDateFields {
  startDateDay = "#",
  startDateMonth = "h",
  startDateYear = "t",
  endDateDay = "&",
  endDateMonth = "8",
  endDateYear = ",",
}

interface C100OtherProceedings1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100OtherProceedings: otherProceedingsRadios;
  c100OngoingProceedingsAndDocX?: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page;

  c100OtherProceedings: otherProceedingsRadios;
  c100OngoingProceedingsAndDocX?: boolean;
}

interface AddNewProceedingsOptions {
  page: Page;
  c100OngoingProceedingsAndDocX: boolean;
}

export class OtherProceedings1Page {
  public static async otherProceedings1Page({
    page,
    accessibilityTest,
    errorMessaging,
    c100OtherProceedings,
    c100OngoingProceedingsAndDocX,
  }: C100OtherProceedings1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page,
      c100OtherProceedings,
      c100OngoingProceedingsAndDocX,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${OtherProceedingsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${OtherProceedingsContent.p1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        OtherProceedingsContent,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    c100OtherProceedings,
    c100OngoingProceedingsAndDocX,
  }: FillInFieldsOptions): Promise<void> {
    let radioKey: keyof typeof inputIDs;
    switch (c100OtherProceedings) {
      case "Yes":
        radioKey = "radioYes";
        break;
      case "No":
        radioKey = "radioNo";
        break;
      case "Don't know":
        radioKey = "radioDK";
        break;
      default:
        throw new Error(`Unrecognised radio option: ${c100OtherProceedings}`);
    }
    await page.click(inputIDs[radioKey]);
    if (c100OtherProceedings === "Yes") {
      if (typeof c100OngoingProceedingsAndDocX !== "boolean") {
        throw new Error(
          "c100OtherProceedingsAndDocX must be boolean if c100OtherProceedings is Yes",
        );
      }
      await this.addNewProceeding({
        page,
        c100OngoingProceedingsAndDocX,
      });
    }
    await page.click(
      `${Selectors.button}:text-is("${OtherProceedingsContent.continue}")`,
    );
  }

  private static async addNewProceeding({
    page,
    c100OngoingProceedingsAndDocX,
  }: AddNewProceedingsOptions): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h2}:text-is("${OtherProceedingsContent.otherProceedingsHeader}")`,
      1,
    );
    await page.click(
      `${Selectors.button}:text-is("${OtherProceedingsContent.addNew}")`,
    );
    await Helpers.checkGroup(
      page,
      26,
      OtherProceedingsContent,
      "proceedingsFormLabel",
      `${Selectors.GovukFormLabel}`,
    );
    for (let checkbox of Object.values(checkboxIDs)) {
      await page.click(checkbox);
    }
    let filePath: string;
    if (c100OngoingProceedingsAndDocX) {
      await page.click(inputIDs.ongoingProceedings);
      filePath = Config.testWordFile;
    } else {
      await page.click(inputIDs.previousProceedings);
      filePath = Config.testPdfFile;
    }
    const textKeys: string[] = [
      "caseNumber",
      "startDateDay",
      "startDateMonth",
      "startDateYear",
      "endDateDay",
      "endDateMonth",
      "endDateYear",
      "judgeName",
      "courtName",
      "childrenInvolved",
      "guardianName",
      "cymruOfficer",
      "typeOfOrder",
    ];
    for (let textKey of textKeys) {
      let contentKey = textKey as keyof typeof OtherProceedingsContent;
      let inputKey = textKey as keyof typeof inputIDs;
      await page.fill(inputIDs[inputKey], OtherProceedingsContent[contentKey]);
    }
    await page.waitForTimeout(6000);
    await page.setInputFiles(inputIDs.fileUpload, filePath);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorMessage}:text-is("${OtherProceedingsContent.uploadingFile}")`,
      1,
    );
    await page.waitForSelector(
      `${Selectors.GovukErrorMessage}:text-is("${OtherProceedingsContent.uploadingFile}")`,
      { state: "hidden" },
    );
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(inputIDs.radioYes);
    await page.click(
      `${Selectors.button}:text-is("${OtherProceedingsContent.addNew}")`,
    );
    const textKeys = [
      "startDateDay",
      "startDateMonth",
      "startDateYear",
      "endDateDay",
      "endDateMonth",
      "endDateYear",
    ];
    for (let textKey of textKeys) {
      let invalidInputKey = textKey as keyof typeof invalidDateFields;
      let inputKey = textKey as keyof typeof inputIDs;
      await page.fill(inputIDs[inputKey], invalidDateFields[invalidInputKey]);
    }
    await page.click(
      `${Selectors.button}:text-is("${OtherProceedingsContent.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${OtherProceedingsContent.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        OtherProceedingsContent,
        "errorValidation",
        `${Selectors.GovukErrorValidation}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        OtherProceedingsContent,
        "errorMessage",
        `${Selectors.GovukErrorMessage}`,
      ),
    ]);
    await page.click(
      `${Selectors.button}:text-is("${OtherProceedingsContent.remove}")`,
    );
    await page.click(
      `${modalSelector}${Selectors.button}:text-is("${OtherProceedingsContent.remove}")`,
    );
  }
}
