import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../common/helpers.ts";

export class C100AdminAddBarrister1Page extends EventPage {
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly partyToAddBarristerCheckbox: Locator = this.page.locator(
    '[id^="allocatedBarrister_partyList_"]',
  );
  private readonly barristerFirstName: Locator = this.page
    .locator("#allocatedBarrister_barristerFirstName")
    .first();
  private readonly barristerLastName: Locator = this.page
    .locator("#allocatedBarrister_barristerLastName")
    .first();
  private readonly barristerEmail: Locator = this.page
    .locator("#allocatedBarrister_barristerEmail")
    .first();
  private readonly barristerOrg: Locator = this.page
    .locator("#search-org-text")
    .first();
  private readonly selectBarristerOrg: Locator = this.page.getByTitle(
    "Select the organisation PRL Barrister Org2",
  );

  constructor(page: Page) {
    super(page, "Add barrister");
  }

  async assertPageContents(
    govUkHeadingL: string,
    span1: string,
    span2: string,
    span3: string,
    span4: string,
    govUkHint: string,
    govukDetailsText: string,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.locator(Selectors.GovukHeadingL, { hasText: govUkHeadingL }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.Span, { hasText: span1 }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.Span, { hasText: span2 }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.Span, { hasText: span3 }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.Span, { hasText: span4 }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.GovukHint, { hasText: govUkHint }),
    ).toBeVisible();
    await expect(
      this.page.locator(Selectors.GovukDetailsText, {
        hasText: govukDetailsText,
      }),
    ).toBeHidden();
    await expect(this.continueButton).toBeVisible();
  }

  async selectPartyAndFillInBarristerDetails(
    firstnames: string,
    lastname: string,
    email: string,
    org: string,
  ): Promise<void> {
    await this.partyToAddBarristerCheckbox.check();
    await this.barristerFirstName.fill(firstnames);
    await this.barristerLastName.fill(lastname);
    await this.barristerEmail.fill(email);
    await this.barristerOrg.fill(org);
    await this.selectBarristerOrg.click();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
