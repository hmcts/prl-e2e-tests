import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { ChildDetailsRevised2Content } from "../../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsRevised2Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface ChildDetailsRevised2PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions;
}

export type yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions =
  | "yes"
  | "no"
  | "dontKnow";

enum uniqueSelectors {
  childrenKnownToAuthorityRadio = "#childrenKnownToLocalAuthority-",
  childrenKnownToAuthorityField = "#childrenKnownToLocalAuthorityTextArea",
  childrenProtectionPlanRadio = "#childrenSubjectOfChildProtectionPlan-",
}

export class ChildDetailsRevised2Page {
  public static async childDetailsRevised2Page({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
  }: ChildDetailsRevised2PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({
      page,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.strong}:text-is("${ChildDetailsRevised2Content.strong}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ChildDetailsRevised2Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildDetailsRevised2Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildDetailsRevised2Content.formLabelYes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildDetailsRevised2Content.formLabelNo}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildDetailsRevised2Content.formLabelDontKnow}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
  }: fillInFieldsOptions): Promise<void> {
    await page.click(
      `${uniqueSelectors.childrenKnownToAuthorityRadio}${yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions}`,
    );
    await page.click(
      `${uniqueSelectors.childrenKnownToAuthorityRadio}${yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions}`,
    );
    if (yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions === "yes") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildDetailsRevised2Content.formLabelChildrenKnown}")`,
        1,
      );
      await page.fill(
        `${uniqueSelectors.childrenKnownToAuthorityField}`,
        `${ChildDetailsRevised2Content.childNameAndLocalAuthority}`,
      );
    }
    await page.click(
      `${uniqueSelectors.childrenProtectionPlanRadio}${yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions}`,
    );
    await page.click(
      `${uniqueSelectors.childrenProtectionPlanRadio}${yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions}`,
    );
    await page.click(
      `${Selectors.button}:text-is("${ChildDetailsRevised2Content.continue}")`,
    );
  }
}
