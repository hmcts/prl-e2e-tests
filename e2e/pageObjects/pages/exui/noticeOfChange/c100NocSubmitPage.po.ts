import { EventPage } from "../eventPage.po.js";
import { Locator, Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class C100NocSubmitPage extends EventPage {
  private readonly detailsAccurateCheckbox: Locator =
    this.page.locator("#affirmation");
  private readonly notifyEveryPartyCheckbox: Locator =
    this.page.locator("#notifyEveryParty");
  private readonly headingCheckAndSumit: Locator = this.page.locator(
    Selectors.GovukHeadingL,
    {
      hasText: "Check and submit",
    },
  );
  private readonly textRequest: Locator = this.page.locator(
    Selectors.GovukSummaryListKey,
    {
      hasText: "Request",
    },
  );
  private readonly textNOC: Locator = this.page.locator(
    Selectors.GovukSummaryListValue,
    {
      hasText: "Notice of change",
    },
  );
  private readonly textCaseNumber: Locator = this.page.locator(
    Selectors.GovukSummaryListKey,
    {
      hasText: "Case number",
    },
  );
  private readonly textClientFN: Locator = this.page.locator(
    Selectors.GovukSummaryListKey,
    {
      hasText: "Your client's first name",
    },
  );
  private readonly textClientLN: Locator = this.page.locator(
    Selectors.GovukSummaryListKey,
    {
      hasText: "Your client's last name",
    },
  );
  private readonly textSign: Locator = this.page.locator(Selectors.p, {
    hasText: "You should tick to 'sign' when:",
  });
  private readonly textLi1: Locator = this.page.locator(Selectors.li, {
    hasText:
      "You're satisfied that all these details are accurate and match what is written on the case",
  });
  private readonly textLi2: Locator = this.page.locator(Selectors.li, {
    hasText:
      "You have served notice of this change on every party to the case, including the former legal representative (if there was one)",
  });
  private readonly textLabel1: Locator = this.page.locator(
    Selectors.GovukLabel,
    {
      hasText:
        "I confirm all these details are accurate and match what is written on the case.",
    },
  );
  private readonly textLabel2: Locator = this.page.locator(
    Selectors.GovukLabel,
    {
      hasText:
        " I have served notice of this change on every party to the case, including the former legal representative (if there was one). ",
    },
  );
  private readonly h2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Notifications",
  });
  private readonly p2: Locator = this.page.locator(Selectors.p, {
    hasText:
      "If the client previously had legal representation, we'll let the legal firm or legal representative know that they no longer have access to the case. ",
  });
  private readonly textLabel3: Locator = this.page.locator(
    Selectors.GovukInsetText,
    {
      hasText:
        "After you submit a notice of change, you might not see the confirmation page immediately",
    },
  );

  constructor(page: Page) {
    super(page, "Enter your client's details");
  }

  async checkBoxes(): Promise<void> {
    await this.detailsAccurateCheckbox.check();
    await this.notifyEveryPartyCheckbox.check();
  }

  async assertPageContents(): Promise<void> {
    await expect(this.headingCheckAndSumit).toBeVisible();
    await expect(this.textRequest).toBeVisible();
    await expect(this.textNOC).toBeVisible();
    await expect(this.textCaseNumber).toBeVisible();
    await expect(this.textClientFN).toBeVisible();
    await expect(this.textClientLN).toBeVisible();
    await expect(this.textSign).toBeVisible();
    await expect(this.textLi1).toBeVisible();
    await expect(this.textLi2).toBeVisible();
    await expect(this.textLabel1).toBeVisible();
    await expect(this.textLabel2).toBeVisible();
    await expect(this.textLabel3).toBeVisible();
    await expect(this.h2).toBeVisible();
    await expect(this.p2).toBeVisible();
    await expect(
      this.page.getByRole("link", { name: "Notice of change" }),
    ).toBeVisible();
  }
}
