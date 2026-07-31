import { Locator, Page, expect } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { AmendChildDetailsRevised2Content } from "../../../../fixtures/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsRevised2Content.ts";
import { yesNoDontKnow } from "../../../../common/types.ts";

interface FillInFieldsOptions {
  yesNoDontKnow: yesNoDontKnow;
}

export class AmendChildDetails2Page extends EventPage {
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
    await expect(
      this.page.locator(Selectors.p, {
        hasText: AmendChildDetailsRevised2Content.p,
      }),
    ).toBeVisible();
    await expect(
      this.page
        .locator(Selectors.GovukFormLabel, {
          hasText: AmendChildDetailsRevised2Content.formLabelYes,
        })
        .first(),
    ).toBeVisible();
    await expect(
      this.page
        .locator(Selectors.GovukFormLabel, {
          hasText: AmendChildDetailsRevised2Content.formLabelNo,
        })
        .first(),
    ).toBeVisible();
    await expect(
      this.page
        .locator(Selectors.GovukFormLabel, {
          hasText: AmendChildDetailsRevised2Content.formLabelDontKnow,
        })
        .first(),
    ).toBeVisible();
  }

  async fillInFields({ yesNoDontKnow }: FillInFieldsOptions): Promise<void> {
    await this.childrenKnownToAuthorityRadio(yesNoDontKnow).check();
    if (yesNoDontKnow === "yes") {
      await this.childrenKnownToAuthorityField
        .first()
        .fill(AmendChildDetailsRevised2Content.childNameAndLocalAuthority);
    }
    await this.childrenProtectionPlanRadio(yesNoDontKnow).check();
    await this.clickContinue();
  }
}
