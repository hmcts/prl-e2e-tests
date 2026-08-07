import { expect, Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class AdminAddLocalAuthoritySubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Add local authority", CommonStaticText.submit);
  }

  /**
   * Asserts that the CYA table shows the selected organisation name and each
   * line of its address.
   *
   * From the DOM the org details render inside a <table> with cells:
   *   th="Organisation" | td.Name | td.Address (multiline)
   *
   * @param orgName      - exact org name, e.g. "Local Authority Private Law AAT Test Organisation"
   * @param addressLines - every line of the address to verify, e.g.
   *                       ["7 Fitzhamon Embankment", "Caerdydd", "United Kingdom", "CF11 6AN"]
   */
  async assertOrganisationDetails(
    orgName: string,
    addressLines: string[],
  ): Promise<void> {
    await expect(
      this.page.locator("td, dd").filter({ hasText: orgName }).first(),
    ).toBeVisible();
    for (const line of addressLines) {
      await expect(
        this.page.locator("td, dd").filter({ hasText: line }).first(),
      ).toBeVisible();
    }
  }

  async submitForm(): Promise<void> {
    await this.clickSubmit();
  }
}
