import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { AmendChildDetailsRevised1Content } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsRevised1Content.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface amendChildDetailsRevised1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100ChildGender: C100ChildGender;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  c100ChildGender: C100ChildGender;
}

export type C100ChildGender = "female" | "male" | "other";

enum uniqueSelectors {
  firstNameField = "#newChildDetails_0_firstName",
  lastNameField = "#newChildDetails_0_lastName",
  dobDayField = "#dateOfBirth-day",
  dobMonthField = "#dateOfBirth-month",
  dobYearField = "#dateOfBirth-year",
  genderRadio = "#newChildDetails_0_gender-",
  otherGenderField = "#newChildDetails_0_otherGender",
  childArrangementOrderCheckbox = "#newChildDetails_0_orderAppliedFor-childArrangementsOrder",
  prohibitedStepsCheckbox = "#newChildDetails_0_orderAppliedFor-prohibitedStepsOrder",
  specificIssueCheckbox = "#newChildDetails_0_orderAppliedFor-specificIssueOrder",
  parentalResponsibilityField = "#newChildDetails_0_parentalResponsibilityDetails",
  parentDropdown = "#newChildDetails_0_whoDoesTheChildLiveWith",
}

export class AmendChildDetailsRevised1Page {
  public static async amendChildDetailsRevised1Page({
    page: page,
    accessibilityTest: accessibilityTest,
    c100ChildGender: c100ChildGender,
    }: amendChildDetailsRevised1PageOptions): Promise<void> {
      await this.checkPageLoads({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await this.fillInFields({ page: page, c100ChildGender: c100ChildGender });
    }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    }: checkPageLoadsOptions): Promise<void> {
      await page.waitForSelector(
        `${Selectors.h2}:text-is("${AmendChildDetailsRevised1Content.h2}")`,
      );
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHeadingL}:text-is("${AmendChildDetailsRevised1Content.pageTitle}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${AmendChildDetailsRevised1Content.p}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h3}:text-is("${AmendChildDetailsRevised1Content.h3AddNewChild}")`,
          5,
        ),
        Helpers.checkGroup(
          page,
          5,
          AmendChildDetailsRevised1Content,
          `h3`,
          `${Selectors.h3}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelFirstName}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelLastName}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelDOB}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelDay}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelMonth}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelYear}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelGender}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelOrderApplied}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelParentalResponsibility}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelParentalResponsibility2}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormHint}:text-is("${AmendChildDetailsRevised1Content.formHintDOB}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormHint}:text-is("${AmendChildDetailsRevised1Content.formHintParentalResponsibility}")`,
          5,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.strong}:text-is("${AmendChildDetailsRevised1Content.strong}")`,
          5,
        ),
      ]);
      if (accessibilityTest) {
        await AccessibilityTestHelper.run(page);
      }
    }

  private static async fillInFields({
    page: page,
    c100ChildGender: c100ChildGender,
    }: fillInFieldsOptions): Promise<void> {
      await page.fill(
        `${uniqueSelectors.firstNameField}`,
        `${AmendChildDetailsRevised1Content.childFirstName}`,
      );
      await page.fill(
        `${uniqueSelectors.lastNameField}`,
        `${AmendChildDetailsRevised1Content.childLastName}`,
      );
      await page.fill(
        `${uniqueSelectors.dobDayField}`,
        `${AmendChildDetailsRevised1Content.childDayOfBirth}`,
      );
      await page.fill(
        `${uniqueSelectors.dobMonthField}`,
        `${AmendChildDetailsRevised1Content.childMonthOfBirth}`,
      );
      await page.fill(
        `${uniqueSelectors.dobYearField}`,
        `${AmendChildDetailsRevised1Content.childYearOfBirth}`,
      );
      await page.click(`${uniqueSelectors.genderRadio}${c100ChildGender}`);
      if (c100ChildGender === "other") {
        await this.handleOtherChildGender(page);
      }
      await page.click(`${uniqueSelectors.childArrangementOrderCheckbox}`);
      await page.click(`${uniqueSelectors.childArrangementOrderCheckbox}`);
      await page.click(`${uniqueSelectors.prohibitedStepsCheckbox}`);
      await page.click(`${uniqueSelectors.prohibitedStepsCheckbox}`);
      await page.click(`${uniqueSelectors.specificIssueCheckbox}`);
      await page.click(`${uniqueSelectors.specificIssueCheckbox}`);
      await page.fill(
        `${uniqueSelectors.parentalResponsibilityField}`,
        `${AmendChildDetailsRevised1Content.parentalResponsibility3}`,
      );
      await page.selectOption(`${uniqueSelectors.parentDropdown}`, { index: 1 });
      await page.click(
        `${Selectors.button}:text-is("${AmendChildDetailsRevised1Content.continue}")`,
      );
    }

  private static async handleOtherChildGender(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${AmendChildDetailsRevised1Content.formLabelChildGenderOptional}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.otherGenderField}`,
      `${AmendChildDetailsRevised1Content.optionalChildGender}`,
    );
  }
}
