import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";

export class StopRepresenting1Page extends EventPage {
  private readonly partyToAddBarristerCheckbox: Locator = this.page.locator(
    "#allocatedBarrister_partyList_",
  );
  private readonly barristerFirstName: Locator = this.page
    .locator("#allocatedBarrister_barristerFirstName")
    .first();
  private readonly barristerLastName: Locator = this.page
    .locator("#allocatedBarrister_barristerLastName")
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

  private readonly govUKDetails: Locator = this.page.locator(
    Selectors.GovukDetailsText,
    {
      hasText:
        " If you know that the solicitor is already registered with MyHMCTS, check that you have entered their details correctly. Remember that organisations can only register one office address. This means that the details could be slightly different from what you're expecting. Contact the solicitor directly if you have any concerns. ",
    },
  );

  constructor(page: Page) {
    super(page, "Stop representing client");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.textLabel1).toBeVisible(); //to fix
    await expect(this.partyToAddBarristerCheckbox).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectParty(
    existingRepresentative: string[],
  ): Promise<void> {
    await this.page
      .getByRole("radio", { name: existingRepresentative[0] })
      .check();
  }
}
