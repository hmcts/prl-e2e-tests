import { Locator, Page, expect } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { yesNoDontKnow } from "../../../../common/types.ts";

interface FillInFieldsOptions {
  yesNoDontKnow: yesNoDontKnow;
}

export class AmendChildDetails2Page extends EventPage {
  private readonly pageContent = {
    paragraph: "Amend Child details",
    yesLabel: "Yes",
    noLabel: "No",
    dontKnowLabel: "Don't know",
    childNameAndLocalAuthority: "Test child",
  };

  private readonly yesLabelLocator: Locator = this.page
    .locator(Selectors.GovukFormLabel, {
      hasText: this.pageContent.yesLabel,
    })
    .first();
  private readonly noLabelLocator: Locator = this.page
    .locator(Selectors.GovukFormLabel, {
      hasText: this.pageContent.noLabel,
    })
    .first();
  private readonly dontKnowLabelLocator: Locator = this.page
    .locator(Selectors.GovukFormLabel, {
      hasText: this.pageContent.dontKnowLabel,
    })
    .first();

  private readonly childrenKnownToAuthorityRadio = (value: yesNoDontKnow) =>
    this.page
      .locator(`label[for="childrenKnownToLocalAuthority-${value}"]`)
      .first();
  private readonly childrenKnownToAuthorityField: Locator = this.page.locator(
    "#childrenKnownToLocalAuthorityTextArea",
  );
  private readonly childrenProtectionPlanRadio = (value: yesNoDontKnow) =>
    this.page
      .locator(`label[for="childrenSubjectOfChildProtectionPlan-${value}"]`)
      .first();

  constructor(page: Page) {
    super(page, "Amend Child details");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.yesLabelLocator).toBeVisible();
    await expect(this.noLabelLocator).toBeVisible();
    await expect(this.dontKnowLabelLocator).toBeVisible();
  }

  async fillInFields({ yesNoDontKnow }: FillInFieldsOptions): Promise<void> {
    await this.childrenKnownToAuthorityRadio(yesNoDontKnow).check();
    if (yesNoDontKnow === "yes") {
      await this.childrenKnownToAuthorityField
        .first()
        .fill(this.pageContent.childNameAndLocalAuthority);
    }
    await this.childrenProtectionPlanRadio(yesNoDontKnow).check();
    await this.clickContinue();
  }
}
