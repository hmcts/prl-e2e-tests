import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { InternationalElement1Content } from "../../../../../fixtures/manageCases/createCase/C100/internationalElement/internationalElement1Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface internationalElement1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoInternationalElement: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInFieldsOptions {
  page: Page;
  yesNoInternationalElement: boolean;
}

enum UniqueSelectors {
  habitualResidentInOtherState_Yes = "#habitualResidentInOtherState_Yes",
  habitualResidentInOtherState_No = "#habitualResidentInOtherState_No",
  habitualResidentInOtherState_Input = "#habitualResidentInOtherStateGiveReason",
  jurisdictionIssue_Yes = "#jurisdictionIssue_Yes",
  jurisdictionIssue_No = "#jurisdictionIssue_No",
  jurisdictionIssue_Input = "#jurisdictionIssueGiveReason",
  requestToForeignAuthority_Yes = "#requestToForeignAuthority_Yes",
  requestToForeignAuthority_No = "#requestToForeignAuthority_No",
  requestToForeignAuthority_Input = "#requestToForeignAuthorityGiveReason",
}

export class InternationalElement1Page {
  public static async internationalElement1Page({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoInternationalElement: yesNoInternationalElement,
  }: internationalElement1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
      yesNoInternationalElement: yesNoInternationalElement,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.p}:text-is("${InternationalElement1Content.p1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${InternationalElement1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        InternationalElement1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${InternationalElement1Content.formLabelYes}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${InternationalElement1Content.formLabelNo}")`,
        3,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
    yesNoInternationalElement: yesNoInternationalElement,
  }: FillInFieldsOptions): Promise<void> {
    if (yesNoInternationalElement) {
      await page.click(`${UniqueSelectors.habitualResidentInOtherState_Yes}`);
      await page.fill(
        `${UniqueSelectors.habitualResidentInOtherState_Input}`,
        InternationalElement1Content.loremIpsum,
      );
      await page.click(`${UniqueSelectors.jurisdictionIssue_Yes}`);
      await page.fill(
        `${UniqueSelectors.jurisdictionIssue_Input}`,
        InternationalElement1Content.loremIpsum,
      );
      await page.click(`${UniqueSelectors.requestToForeignAuthority_Yes}`);
      await page.fill(
        `${UniqueSelectors.requestToForeignAuthority_Input}`,
        InternationalElement1Content.loremIpsum,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${InternationalElement1Content.additionalFormLabel}")`,
        3,
      );
    } else {
      await page.click(`${UniqueSelectors.habitualResidentInOtherState_No}`);
      await page.click(`${UniqueSelectors.jurisdictionIssue_No}`);
      await page.click(`${UniqueSelectors.requestToForeignAuthority_No}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${InternationalElement1Content.continue}")`,
    );
  }
}
