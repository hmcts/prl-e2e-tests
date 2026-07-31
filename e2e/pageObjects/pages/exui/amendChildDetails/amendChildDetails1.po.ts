import { Locator, Page, expect } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AmendChildDetailsRevised1Content } from "../../../../fixtures/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsRevised1Content.ts";

export type C100ChildGender = "female" | "male" | "other";

interface FillInFieldsOptions {
  c100ChildGender: C100ChildGender;
  under18: boolean;
}

export class AmendChildDetails1Page extends EventPage {
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

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.locator(Selectors.p, {
        hasText: AmendChildDetailsRevised1Content.p,
      }),
    ).toBeVisible();

    await expect(
      this.page
        .locator(Selectors.h3, {
          hasText: AmendChildDetailsRevised1Content.h3AddNewChild,
        })
        .first(), // Isolates the first heading globally
    ).toBeVisible();

    await expect(
      this.page
        .locator(Selectors.GovukFormLabel, {
          hasText: AmendChildDetailsRevised1Content.formLabelFirstName,
        })
        .first(),
    ).toBeVisible();
    await expect(
      this.page
        .locator(Selectors.GovukFormLabel, {
          hasText: AmendChildDetailsRevised1Content.formLabelLastName,
        })
        .first(),
    ).toBeVisible();
    await expect(
      this.page
        .locator(Selectors.GovukFormLabel, {
          hasText: AmendChildDetailsRevised1Content.formLabelDOB,
        })
        .first(),
    ).toBeVisible();
    await expect(
      this.page
        .locator(Selectors.GovukFormLabel, {
          hasText: AmendChildDetailsRevised1Content.formLabelGender,
        })
        .first(),
    ).toBeVisible();
  }

  async fillInFields({ c100ChildGender, under18 }: FillInFieldsOptions) {
    const [day, month, year] = Helpers.generateDOB(under18);
    await this.firstNameField.fill(
      AmendChildDetailsRevised1Content.childFirstName,
    );
    await this.lastNameField.fill(
      AmendChildDetailsRevised1Content.childLastName,
    );
    await this.dobDayField.fill(day);
    await this.dobMonthField.fill(month);
    await this.dobYearField.fill(year);
    await this.genderRadio(c100ChildGender).check();
    if (c100ChildGender === "other") {
      await this.otherGenderField.fill(
        AmendChildDetailsRevised1Content.optionalChildGender,
      );
    }
    await this.childArrangementOrderCheckbox.check();
    await this.prohibitedStepsCheckbox.check();
    await this.specificIssueCheckbox.check();
    await this.parentalResponsibilityField.fill(
      AmendChildDetailsRevised1Content.parentalResponsibility3,
    );
    await this.parentDropdown.selectOption({ index: 1 });
    await this.clickContinue();
  }
}
