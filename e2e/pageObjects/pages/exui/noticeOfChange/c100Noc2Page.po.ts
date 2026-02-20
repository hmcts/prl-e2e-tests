import { Locator, Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { EventPage } from "../eventPage.po";

export class C100Noc2Page extends EventPage {
  private readonly clientFirstNameField: Locator =
    this.page.locator("#NoCChallengeQ1");
  private readonly clientLastNameField: Locator =
    this.page.locator("#NoCChallengeQ2");
  private readonly textLabel1: Locator = this.page.locator(Selectors.p, {
    hasText: `You must enter the client details exactly as they're written on the case, including any mistakes. If the client's name is Smyth but it has been labelled \"Smith\", you should enter Smith. Please ensure that you are only performing a notice of change on behalf of the client that you are representing.`,
  });
  private readonly textLabel2: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "Your client's first name" },
  );
  private readonly textLabel3: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "Your client's last name" },
  );

  constructor(page: Page) {
    super(page, "Enter your client's details");
  }

  async assertPageContents(): Promise<void> {
    await expect(this.textLabel1).toBeVisible();
    await expect(this.textLabel2).toBeVisible();
    await expect(this.textLabel3).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInPartyName(firstname: string, surname: string): Promise<void> {
    await this.clientFirstNameField.fill(firstname);
    await this.clientLastNameField.fill(surname);
  }
}
