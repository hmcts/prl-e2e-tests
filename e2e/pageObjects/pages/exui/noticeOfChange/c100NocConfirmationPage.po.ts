import { EventPage } from "../eventPage.po.js";
import { Locator, Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100NocConfirmationPage extends EventPage {
  private readonly viewThisCaseButton: Locator = this.page.locator(
    Selectors.a,
    {
      hasText: CommonStaticText.viewThisCase,
    },
  );
  private readonly h1: Locator = this.page.locator(Selectors.h1, {
    hasText: "Notice of change successful",
  });
  private readonly govUkPanel: Locator = this.page.locator(
    Selectors.GovukPanelBody,
    {
      hasText: "You're now representing a client on case",
    },
  );
  private readonly p1: Locator = this.page.locator(Selectors.p, {
    hasText:
      "If the client had legal representation, we've sent an email to their legal representative. ",
  });
  private readonly p2: Locator = this.page.locator(Selectors.p, {
    hasText: "This case will now appear in your case list. ",
  });
  private readonly p3: Locator = this.page.locator(Selectors.p, {
    hasText: "You must also inform all parties involved in the case.",
  });
  private readonly p4: Locator = this.page.locator(Selectors.p, {
    hasText:
      "This is a new online process - you don't need to file any further documents in relation to the notice of change to the court. ",
  });
  private readonly h2: Locator = this.page.locator(Selectors.h2, {
    hasText: "What happens next",
  });
  private readonly spanText: Locator = this.page.locator(Selectors.Span, {
    hasText:
      "You should now amend the case details, for example the unique legal representative reference, the address for service and email address.",
  });
  private readonly a1: Locator = this.page.locator(Selectors.a, {
    hasText: "View this case",
  });
  private readonly a2: Locator = this.page.locator(Selectors.a, {
    hasText: "View case list",
  });

  constructor(page: Page) {
    super(page, "Enter your client's details");
  }

  async assertPageContents(): Promise<void> {
    await expect(this.h1).toBeVisible();
    await expect(this.govUkPanel).toBeVisible();
    await expect(this.p1).toBeVisible();
    await expect(this.p2).toBeVisible();
    await expect(this.p3).toBeVisible();
    await expect(this.p4).toBeVisible();
    await expect(this.h2).toBeVisible();
    await expect(this.spanText).toBeVisible();
    await expect(this.a1).toBeVisible();
    await expect(this.a2).toBeVisible();
  }

  async clickViewThisCase(): Promise<void> {
    await this.viewThisCaseButton.click();
    // extra awaits to avoid test failure due to timeout, to be investigated/removed in the future
    await expect(
      this.page.locator(Selectors.a, { hasText: " Case list " }),
    ).toBeVisible({ timeout: 5000 });
  }
}
