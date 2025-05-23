import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ChildrenAndApplicants1Content } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndApplicants/childrenAndApplicants1Content";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content";
import { ChildDetailsRevised1Content } from "../../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsRevised1Content";

interface ChildrenAndApplicants1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  applicantChildRelationship: C100ChildrenAndApplicantsRelationship;
  childLiveWithApplicant: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  applicantChildRelationship: C100ChildrenAndApplicantsRelationship;
  childLiveWithApplicant: boolean;
}

export type C100ChildrenAndApplicantsRelationship =
  | "Father"
  | "Mother"
  | "Step-father"
  | "Step-mother"
  | "Grandparent"
  | "Guardian"
  | "Special Guardian"
  | "Other";

enum UniqueSelectors {
  relationshipDropdown = "#buffChildAndApplicantRelations_0_childAndApplicantRelation",
  relationshipOtherField = "#buffChildAndApplicantRelations_0_childAndApplicantRelationOtherDetails",
  childLiveWithApplicantYes = "#buffChildAndApplicantRelations_0_childLivesWith_Yes",
  childLiveWithApplicantNo = "#buffChildAndApplicantRelations_0_childLivesWith_No",
}

export class ChildrenAndApplicants1Page {
  public static async childrenAndApplicants1Page({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    applicantChildRelationship: applicantChildRelationship,
    childLiveWithApplicant: childLiveWithApplicant,
  }: ChildrenAndApplicants1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page: page,
      applicantChildRelationship: applicantChildRelationship,
      childLiveWithApplicant: childLiveWithApplicant,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${ChildrenAndApplicants1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ChildrenAndApplicants1Content,
        `h2`,
        `${Selectors.h2}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ChildrenAndApplicants1Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ChildrenAndApplicants1Content.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildrenAndApplicants1Content,
        `caseFieldLabel`,
        `${Selectors.GovukTextFieldLabel}`,
      ),
      Helpers.checkGroup(
        page,
        4,
        ChildrenAndApplicants1Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ApplicantDetails1Content.applicantFirstName} ${ApplicantDetails1Content.applicantLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildDetailsRevised1Content.childFirstName} ${ChildDetailsRevised1Content.childLastName}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndApplicants1Content.button}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ChildrenAndApplicants1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndApplicants1Content.errorApplicantRelationship}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndApplicants1Content.errorApplicantRelationship}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndApplicants1Content.errorChildLiveWithParty}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndApplicants1Content.errorChildLiveWithParty}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    applicantChildRelationship: applicantChildRelationship,
    childLiveWithApplicant: childLiveWithApplicant,
  }: fillInFieldsOptions): Promise<void> {
    await page.selectOption(
      `${UniqueSelectors.relationshipDropdown}`,
      `${applicantChildRelationship}`,
    );
    if (applicantChildRelationship === "Other") {
      await this.handleOtherRelationship(page);
    }
    if (childLiveWithApplicant) {
      await page
        .locator(`${UniqueSelectors.childLiveWithApplicantYes}`)
        .click();
      await page
        .locator(`${UniqueSelectors.childLiveWithApplicantYes}`)
        .click();
    } else {
      await page.locator(`${UniqueSelectors.childLiveWithApplicantNo}`).click();
      await page.locator(`${UniqueSelectors.childLiveWithApplicantNo}`).click();
    }
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndApplicants1Content.button}")`,
    );
  }

  private static async handleOtherRelationship(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${ChildrenAndApplicants1Content.formLabelApplicantRelationshipOther}")`,
      1,
    );
    await page.fill(
      `${UniqueSelectors.relationshipOtherField}`,
      ChildrenAndApplicants1Content.ApplicantRelationshipOther,
    );
  }
}
