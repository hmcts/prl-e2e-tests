import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";

export class AddACaseNote1Page extends EventPage {
  constructor(page: Page) {
    super(page, "Add a case note");
  }

  private readonly caseNameLabel = this.page.locator(
    Selectors.GovukTextFieldValue,
  );

  private readonly subjectInput: Locator = this.page.getByRole("textbox", {
    name: "Subject",
  });

  private readonly caseNoteInput: Locator = this.page.getByRole("textbox", {
    name: "case note",
  });

  private readonly subjectRequiredValidation: Locator = this.page.locator(
    Selectors.GovukErrorValidation,
    {
      hasText: "Subject is required",
    },
  );

  private readonly caseNoteRequiredValidation: Locator = this.page.locator(
    Selectors.GovukErrorValidation,
    {
      hasText: "case note is required",
    },
  );

  private readonly subjectRequiredError: Locator = this.page.locator(
    Selectors.GovukErrorMessage,
    {
      hasText: "Subject is required",
    },
  );

  private readonly caseNoteRequiredError: Locator = this.page.locator(
    Selectors.GovukErrorMessage,
    {
      hasText: "case note is required",
    },
  );

  private readonly caseNoteInputHint: Locator = this.page.locator(
    Selectors.GovukFormHint,
    {
      hasText: "Add note detail, including relevant dates and people involved",
    },
  );

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await Promise.all([
      expect(this.caseNameLabel).toBeVisible(),
      expect(this.subjectInput).toBeVisible(),
      expect(this.caseNoteInput).toBeVisible(),
      expect(this.caseNoteInputHint).toBeVisible(),
    ]);
  }

  async errorMessaging(): Promise<void> {
    await this.clickContinue();
    await Promise.all([
      expect(this.subjectRequiredValidation).toBeVisible(),
      expect(this.caseNoteRequiredValidation).toBeVisible(),
      expect(this.subjectRequiredError).toBeVisible(),
      expect(this.caseNoteRequiredError).toBeVisible(),
    ]);
  }

  async completeCaseNoteDetails(): Promise<void> {
    await this.subjectInput.fill("Test Automation Case Note Subject");
    await this.caseNoteInput.fill("Test Automation Case Note Detail");
  }
}
