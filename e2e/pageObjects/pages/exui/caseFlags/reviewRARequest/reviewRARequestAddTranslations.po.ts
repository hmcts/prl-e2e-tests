import { expect, Locator, Page } from "@playwright/test";
import { Base } from "../../../base.po.ts";

interface TranslationDetails {
  otherDescription: string;
  otherDescriptionWelsh: string;
  commentsWelsh: string;
}

// Not a standard event page so don't extend EventPage
export class ReviewRARequestAddTranslationsPage extends Base {
  private readonly eventHeading: Locator = this.page.getByRole("heading", {
    name: "Review RA Request",
  });
  private readonly pageHeading: Locator = this.page.getByText(
    "Add translations to flag",
    { exact: true },
  );
  private readonly instruction: Locator = this.page.getByText(
    "Write translation for flag description or comments in the boxes provided.",
  );
  private readonly otherDescriptionInput: Locator =
    this.page.locator("#otherDescription");
  private readonly otherDescriptionWelshInput: Locator = this.page.locator(
    "#otherDescription_cy",
  );
  private readonly commentsInput: Locator = this.page.locator("#flagComment");
  private readonly commentsWelshInput: Locator =
    this.page.locator("#flagComment_cy");

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await expect(this.eventHeading).toBeVisible();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.instruction).toBeVisible();
    await expect(this.otherDescriptionInput).toBeVisible();
    await expect(this.otherDescriptionWelshInput).toBeVisible();
    await expect(this.commentsInput).toBeVisible();
    await expect(this.commentsWelshInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields({
    otherDescription,
    otherDescriptionWelsh,
    commentsWelsh,
  }: TranslationDetails): Promise<void> {
    await this.otherDescriptionInput.fill(otherDescription);
    await this.otherDescriptionWelshInput.fill(otherDescriptionWelsh);
    await this.commentsWelshInput.fill(commentsWelsh);
  }
}
