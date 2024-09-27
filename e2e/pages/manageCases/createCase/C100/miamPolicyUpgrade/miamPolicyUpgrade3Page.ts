import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamPolicyUpgrade3Content } from "../../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade3Content";
import { Helpers } from "../../../../../common/helpers";
import config from "../../../../../config";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface MiamPolicyUpgrade3PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoMiamPolicyUpgrade: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillinFieldsOptions {
  page: Page;
  yesNoMiamPolicyUpgrade: boolean;
}

enum UniqueSelectors {
  radio1 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_1",
  radio2 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_2",
  radio3 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_3",
  radio4 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_4",
  radio5 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_5",
  radio6 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_6",
  radio7 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_7",
  radio8 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_8",
  radio9 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_9",
  radio10 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_10",
  radio11 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_11",
  radio12 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_12",
  radio13 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_13",
  radio14 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_14",
  radio15 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_15",
  radio16 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_16",
  radio17 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_17",
  radio18 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_18",
  radio19 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_19",
  radio20 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_20",
  radio21 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_21",
  radio22 = "#mpuDomesticAbuseEvidences-miamDomesticAbuseChecklistEnum_Value_22",
  provideEvidenceYes = "#mpuIsDomesticAbuseEvidenceProvided_Yes",
  provideEvidenceNo = "#mpuIsDomesticAbuseEvidenceProvided_No",
  provideEvidenceNoInput = "#mpuNoDomesticAbuseEvidenceReason",
  uploadFileInput = "#mpuDomesticAbuseEvidenceDocument_0_domesticAbuseDocument",
}

export class MiamPolicyUpgrade3Page {
  public static async miamPolicyUpgrade1Page({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
  }: MiamPolicyUpgrade3PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.triggerErrorMessages(page);
    await this.fillInFields({
      page: page,
      yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${MiamPolicyUpgrade3Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${MiamPolicyUpgrade3Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${MiamPolicyUpgrade3Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${MiamPolicyUpgrade3Content.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${MiamPolicyUpgrade3Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${MiamPolicyUpgrade3Content.formLabelNo}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        25,
        MiamPolicyUpgrade3Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  public static async triggerErrorMessages(page: Page): Promise<void> {
    const fileInput = page.locator(`${UniqueSelectors.uploadFileInput}`);
    await fileInput.setInputFiles(config.testOdtFile);
    await page.waitForTimeout(5000);
  }

  private static async fillInFields({
    page: page,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
  }: fillinFieldsOptions): Promise<void> {
    await page.click(`${UniqueSelectors.radio1}`);
    await page.click(`${UniqueSelectors.radio2}`);
    await page.click(`${UniqueSelectors.radio3}`);
    await page.click(`${UniqueSelectors.radio4}`);
    await page.click(`${UniqueSelectors.radio5}`);
    await page.click(`${UniqueSelectors.radio6}`);
    await page.click(`${UniqueSelectors.radio7}`);
    await page.click(`${UniqueSelectors.radio8}`);
    await page.click(`${UniqueSelectors.radio8}`);
    await page.click(`${UniqueSelectors.radio10}`);
    await page.click(`${UniqueSelectors.radio11}`);
    await page.click(`${UniqueSelectors.radio12}`);
    await page.click(`${UniqueSelectors.radio13}`);
    await page.click(`${UniqueSelectors.radio14}`);
    await page.click(`${UniqueSelectors.radio15}`);
    await page.click(`${UniqueSelectors.radio16}`);
    await page.click(`${UniqueSelectors.radio17}`);
    await page.click(`${UniqueSelectors.radio17}`);
    await page.click(`${UniqueSelectors.radio18}`);
    await page.click(`${UniqueSelectors.radio19}`);
    await page.click(`${UniqueSelectors.radio20}`);
    await page.click(`${UniqueSelectors.radio21}`);
    await page.click(`${UniqueSelectors.radio22}`);

    if (yesNoMiamPolicyUpgrade) {
      await page.click(`${UniqueSelectors.provideEvidenceYes}`);
      await this.provideEvidence_yes(page);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${MiamPolicyUpgrade3Content.formLabelUpload}")`,
        1,
      );
      await page.waitForTimeout(5000);
      const fileInput = page.locator(`${UniqueSelectors.uploadFileInput}`);
      await fileInput.setInputFiles(config.testPdfFile);
    } else {
      await page.click(`${UniqueSelectors.provideEvidenceNo}`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${MiamPolicyUpgrade3Content.formLabelTextInput}")`,
        1,
      );
      await page.fill(
        `${UniqueSelectors.provideEvidenceNoInput}`,
        MiamPolicyUpgrade3Content.loremIpsum,
      );
    }
    await page.click(
      `${Selectors.button}:text-is("${MiamPolicyUpgrade3Content.continue}")`,
    );
  }

  public static async provideEvidence_yes(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${MiamPolicyUpgrade3Content.h2addEvidence}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${MiamPolicyUpgrade3Content.Evidence}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.button}:text-is("${MiamPolicyUpgrade3Content.addNew}");`,
    );
  }
}
