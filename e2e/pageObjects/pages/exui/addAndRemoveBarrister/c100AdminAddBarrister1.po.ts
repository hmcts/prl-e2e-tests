import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

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

  private readonly textLabel1: Locator = this.page.locator(Selectors.Span, {
    hasText: "For which party do you want to add a barrister?",
  });
  private readonly textLabel2: Locator = this.page.locator(Selectors.Span, {
    hasText: "First names of the barrister",
  });
  private readonly textLabel3: Locator = this.page.locator(Selectors.Span, {
    hasText: "Last name of the barrister",
  });
  private readonly textLabel4: Locator = this.page.locator(Selectors.Span, {
    hasText: "Email address of the barrister",
  });
  private readonly govUkHint: Locator = this.page.locator(Selectors.GovukHint, {
    hasText:
      " You can only search for organisations already registered with MyHMCTS. For example, you can search by organisation name or address. ",
  });
  private readonly govUKDetails: Locator = this.page.locator(
    Selectors.GovukDetailsText,
    {
      hasText:
        " If you know that the solicitor is already registered with MyHMCTS, check that you have entered their details correctly. Remember that organisations can only register one office address. This means that the details could be slightly different from what you're expecting. Contact the solicitor directly if you have any concerns. ",
    },
  );

  constructor(page: Page) {
    super(page, "Add barrister");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.textLabel1).toBeVisible();
    await expect(this.textLabel2).toBeVisible();
    await expect(this.textLabel3).toBeVisible();
    await expect(this.textLabel4).toBeVisible();
    await expect(this.govUkHint).toBeVisible();
    await expect(this.govUKDetails).toBeHidden();
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
