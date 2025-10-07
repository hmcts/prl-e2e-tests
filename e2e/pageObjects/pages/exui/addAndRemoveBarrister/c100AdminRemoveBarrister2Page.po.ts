import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

export class C100AdminRemoveBarrister2Page extends EventPage {
    private readonly submitButton: Locator = this.page.locator(
        Selectors.button,
        {
            hasText: CommonStaticText.submit,
        },
    );
    // private readonly partyToAddBarristerCheckbox: Locator = this.page.locator('[id^="allocatedBarrister_partyList_"]');
    // private readonly barristerFirstName: Locator = this.page.locator('#allocatedBarrister_barristerFirstName');
    // private readonly barristerLasttName: Locator = this.page.locator('#allocatedBarrister_barristerLastName');
    // private readonly barristerEmail: Locator = this.page.locator('#allocatedBarrister_barristerEmail');
    // private readonly barristerOrg: Locator = this.page.locator('#search-org-text');
    // private readonly selectBarristerOrg: Locator = this.page.getByTitle('Select the organisation PRL Barrister Org2');

    constructor(page: Page) {
        super(page, "Remove barrister");
    }

    // async assertPageContents(existingRepresentative: string[]): Promise<void> {
    //   await this.assertPageHeadings();
    //   for (const representative of existingRepresentative) {
    //     await expect(
    //       this.page.locator(Selectors.p, { hasText: representative }),
    //     ).toBeVisible();
    //   }

    //   await expect(this.continueButton).toBeVisible();
    //   await expect(this.previousButton).toBeVisible();
    // }

    // async selectPartyToAddBarrister(
    //   existingRepresentative: string[],
    // ): Promise<void> {
    //   for (const representative of existingRepresentative) {
    //     await this.page.getByLabel(representative).check();
    //   }
    // }

    async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }
}
