import { Locator, Page, expect } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";

export type C100ChildGender = "female" | "male" | "other";

interface FillInFieldsOptions {
  c100ChildGender: C100ChildGender;
  under18: boolean;
}

export class AmendChildDetails1Page extends EventPage {
  private readonly pageContent = {
    paragraph: "Amend Child details",
    heading: "Add new child",
    firstNameLabel: "First name",
    lastNameLabel: "Last name",
    dateOfBirthLabel: "Date of birth",
    genderLabel: "Gender",
    childFirstName: "Test",
    childLastName: "Child",
    optionalChildGender: "Other",
    parentalResponsibility: "Parental responsibility",
  };

  private readonly paragraphLocator: Locator = this.page.locator(Selectors.p, {
    hasText: this.pageContent.paragraph,
  });
  private readonly headingLocator: Locator = this.page
    .locator(Selectors.h3, {
      hasText: this.pageContent.heading,
    })
    .first();
  private readonly firstNameLabelLocator: Locator = this.page
    .locator(Selectors.GovukFormLabel, {
      hasText: this.pageContent.firstNameLabel,
    })
    .first();
  private readonly lastNameLabelLocator: Locator = this.page
    .locator(Selectors.GovukFormLabel, {
      hasText: this.pageContent.lastNameLabel,
    })
    .first();
  private readonly dateOfBirthLabelLocator: Locator = this.page
    .locator(Selectors.GovukFormLabel, {
      hasText: this.pageContent.dateOfBirthLabel,
    })
    .first();
  private readonly genderLabelLocator: Locator = this.page
    .locator(Selectors.GovukFormLabel, {
      hasText: this.pageContent.genderLabel,
    })
    .first();

  private readonly firstNameField: Locator = this.page.locator(
    "#newChildDetails_0_firstName",
  );
  private readonly lastNameField: Locator = this.page.locator(
    "#newChildDetails_0_lastName",
  );
  private readonly dobDayField: Locator = this.page
    .locator("#dateOfBirth-day")
    .first();
  private readonly dobMonthField: Locator = this.page
    .locator("#dateOfBirth-month")
    .first();
  private readonly dobYearField: Locator = this.page
    .locator("#dateOfBirth-year")
    .first();
  private readonly genderRadio = (gender: C100ChildGender) =>
    this.page.locator(`#newChildDetails_0_gender-${gender}`);
  private readonly otherGenderField: Locator = this.page.locator(
    "#newChildDetails_0_otherGender",
  );
  private readonly childArrangementOrderCheckbox: Locator = this.page.locator(
    "#newChildDetails_0_orderAppliedFor-childArrangementsOrder",
  );
  private readonly prohibitedStepsCheckbox: Locator = this.page.locator(
    "#newChildDetails_0_orderAppliedFor-prohibitedStepsOrder",
  );
  private readonly specificIssueCheckbox: Locator = this.page.locator(
    "#newChildDetails_0_orderAppliedFor-specificIssueOrder",
  );
  private readonly parentalResponsibilityField: Locator = this.page.locator(
    "#newChildDetails_0_parentalResponsibilityDetails",
  );
  private readonly parentDropdown: Locator = this.page.locator(
    "#newChildDetails_0_whoDoesTheChildLiveWith",
  );

  constructor(page: Page) {
    super(page, "Amend Child details");
  }
//Asserting the page contents to ensure all elements are visible and correct
  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.paragraphLocator).toBeVisible();
    await expect(this.headingLocator).toBeVisible();
    await expect(this.firstNameLabelLocator).toBeVisible();
    await expect(this.lastNameLabelLocator).toBeVisible();
    await expect(this.dateOfBirthLabelLocator).toBeVisible();
    await expect(this.genderLabelLocator).toBeVisible();
  }

  async fillInFields({ c100ChildGender, under18 }: FillInFieldsOptions) {
    const [day, month, year] = Helpers.generateDOB(under18);
    await this.firstNameField.fill(this.pageContent.childFirstName);
    await this.lastNameField.fill(this.pageContent.childLastName);
    await this.dobDayField.fill(day);
    await this.dobMonthField.fill(month);
    await this.dobYearField.fill(year);
    await this.genderRadio(c100ChildGender).check();
    if (c100ChildGender === "other") {
      await this.otherGenderField.fill(this.pageContent.optionalChildGender);
    }
    await this.childArrangementOrderCheckbox.check();
    await this.prohibitedStepsCheckbox.check();
    await this.specificIssueCheckbox.check();
    await this.parentalResponsibilityField.fill(
      this.pageContent.parentalResponsibility,
    );
    await this.parentDropdown.selectOption({ index: 1 });
    await this.clickContinue();
  }
}
