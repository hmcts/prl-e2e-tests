import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ChildDetailsRevised1Content } from "../../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsRevised1Content.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface childDetailsRevised1PageOptions {
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

export class ChildDetailsRevised1Page {
  public static async childDetailsRevised1Page({
    page: page,
    accessibilityTest: accessibilityTest,
    c100ChildGender: c100ChildGender,
  }: childDetailsRevised1PageOptions): Promise<void> {
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
      `${Selectors.h2}:text-is("${ChildDetailsRevised1Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ChildDetailsRevised1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildDetailsRevised1Content,
        `h3`,
        `${Selectors.h3}`,
      ),
      Helpers.checkGroup(
        page,
        16,
        ChildDetailsRevised1Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildDetailsRevised1Content,
        `formHint`,
        `${Selectors.GovukFormHint}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ChildDetailsRevised1Content.strong}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
    c100ChildGender: c100ChildGender,
  }: fillInFieldsOptions): Promise<void> {
    await page.fill(
      `${uniqueSelectors.firstNameField}`,
      `${ChildDetailsRevised1Content.childFirstName}`,
    );
    await page.fill(
      `${uniqueSelectors.lastNameField}`,
      `${ChildDetailsRevised1Content.childLastName}`,
    );
    await page.fill(
      `${uniqueSelectors.dobDayField}`,
      `${ChildDetailsRevised1Content.childDayOfBirth}`,
    );
    await page.fill(
      `${uniqueSelectors.dobMonthField}`,
      `${ChildDetailsRevised1Content.childMonthOfBirth}`,
    );
    await page.fill(
      `${uniqueSelectors.dobYearField}`,
      `${ChildDetailsRevised1Content.childYearOfBirth}`,
    );
    await page.click(`${uniqueSelectors.genderRadio}${c100ChildGender}`);
    await page.click(`${uniqueSelectors.genderRadio}${c100ChildGender}`);
    if (c100ChildGender === "other") {
      await this.handleOtherChildGender(page);
    }
    await page.click(`${uniqueSelectors.childArrangementOrderCheckbox}`);
    await page.click(`${uniqueSelectors.prohibitedStepsCheckbox}`);
    await page.click(`${uniqueSelectors.specificIssueCheckbox}`);
    await page.fill(
      `${uniqueSelectors.parentalResponsibilityField}`,
      `${ChildDetailsRevised1Content.parentalResponsibility}`,
    );
    await page.selectOption(`${uniqueSelectors.parentDropdown}`, { index: 1 });
    await page.click(
      `${Selectors.button}:text-is("${ChildDetailsRevised1Content.continue}")`,
    );
  }

  private static async handleOtherChildGender(page: Page): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${ChildDetailsRevised1Content.formLabelChildGenderOptional}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.otherGenderField}`,
      `${ChildDetailsRevised1Content.optionalChildGender}`,
    );
  }
}
