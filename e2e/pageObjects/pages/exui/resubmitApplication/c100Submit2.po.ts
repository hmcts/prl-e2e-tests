import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";

export class C100Submit2Page extends EventPage {
  private readonly declarationHeading: Locator = this.page.getByRole(
    "heading",
    { name: "Declaration", level: 3 },
  );
  private readonly declarationInfo1: Locator = this.page.getByText(
    "I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in its truth.",
  );
  private readonly declarationInfo2: Locator = this.page.getByText(
    "The applicant believes that the facts stated in this form and any continuation sheets are true. AAT Solicitor is authorised by the applicant to sign this statement.",
  );
  private readonly checkboxHint: Locator = this.page.locator(".form-hint", {
    hasText:
      "This option should only be selected if the legal representative is signing the form on behalf of the applicant.",
  });
  private readonly agreeWithStatementLabel: Locator = this.page.getByText(
    "I agree with this statement",
  );
  private readonly agreeWithStatementCheckbox: Locator = this.page.getByRole(
    "checkbox",
    {
      name: "I agree with this statement",
    },
  );

  constructor(page: Page) {
    super(page, "Submit");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.declarationHeading).toBeVisible();
    await expect(this.declarationInfo1).toBeVisible();
    await expect(this.declarationInfo2).toBeVisible();
    await expect(this.checkboxHint).toBeVisible();
    await expect(this.agreeWithStatementLabel).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async checkAgreeWithStatement(): Promise<void> {
    await this.agreeWithStatementCheckbox.check();
  }
}
