import { C100ChildrenAndApplicantsRelationship } from "./childrenAndApplicants1Page";
import { Page } from "@playwright/test";
import { ChildrenAndApplicantsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndApplicants/childrenAndApplicantsSubmitContent";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { ApplicantDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content";
import { ChildDetailsRevised1Content } from "../../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsRevised1Content";
import { ChildrenAndApplicants1Content } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndApplicants/childrenAndApplicants1Content";

interface ChildrenAndApplicantsSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  applicantChildRelationship: C100ChildrenAndApplicantsRelationship;
  childLiveWithApplicant: boolean;
}

interface checkFieldsOptions {
  page: Page;
  applicantChildRelationship: C100ChildrenAndApplicantsRelationship;
}

interface checkFilledDataOptions {
  page: Page;
  applicantChildRelationship: C100ChildrenAndApplicantsRelationship;
  childLiveWithApplicant: boolean;
}

export class ChildrenAndApplicantsSubmitPage {
  public static async childrenAndApplicantsSubmitPage({
    page: page,
    accessibilityTest: accessibilityTest,
    applicantChildRelationship: applicantChildRelationship,
    childLiveWithApplicant: childLiveWithApplicant,
  }: ChildrenAndApplicantsSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      applicantChildRelationship: applicantChildRelationship,
      childLiveWithApplicant: childLiveWithApplicant,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    applicantChildRelationship: applicantChildRelationship,
    childLiveWithApplicant: childLiveWithApplicant,
  }: ChildrenAndApplicantsSubmitPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${ChildrenAndApplicantsSubmitContent.h2}")`,
    );
    await Promise.all([
      this.checkPageFields({
        page: page,
        applicantChildRelationship: applicantChildRelationship,
      }),
      this.checkPageData({
        page: page,
        applicantChildRelationship: applicantChildRelationship,
        childLiveWithApplicant: childLiveWithApplicant,
      }),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageFields({
    page: page,
    applicantChildRelationship: applicantChildRelationship,
  }: checkFieldsOptions): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ChildrenAndApplicantsSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        7,
        ChildrenAndApplicantsSubmitContent,
        `text16`,
        `${Selectors.GovukText16}`,
      ),
    ]);
    if (applicantChildRelationship === "Other") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildrenAndApplicantsSubmitContent.text16OtherRelationship}")`,
        1,
      );
    }
  }

  private static async checkPageData({
    page: page,
    applicantChildRelationship: applicantChildRelationship,
    childLiveWithApplicant: childLiveWithApplicant,
  }: checkFilledDataOptions): Promise<void> {
    await Promise.all([
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${applicantChildRelationship}")`,
        1,
      ),
    ]);
    if (applicantChildRelationship === "Other") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildrenAndApplicants1Content.ApplicantRelationshipOther}")`,
        1,
      );
    }
    if (childLiveWithApplicant) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildrenAndApplicantsSubmitContent.text16Yes}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildrenAndApplicantsSubmitContent.text16No}")`,
        1,
      );
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndApplicantsSubmitContent.button}")`,
    );
  }
}
