import { expect, Page } from "@playwright/test";
import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";

export class AdminAddLocalAuthoritySubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Add local authority", CommonStaticText.submit);
  }

  /**
   * Asserts that the CYA table shows the selected organisation name and a
   * partial address string.
   *
   * From the DOM the org details render inside a <table> with cells:
   *   th="Organisation" | td.Name | td.Address (multiline)
   *
   * @param orgName  - exact org name, e.g. "Local Authority Private Law AAT Test Organisation"
   * @param address  - partial address to verify, e.g. "7 Fitzhamon Embankment"
   */
  async assertOrganisationDetails(
    orgName: string,
    address: string,
  ): Promise<void> {
    // CYA table uses a standard <table>; Name and Address are separate <td> cells
    await expect(
      this.page.locator("td, dd").filter({ hasText: orgName }).first(),
    ).toBeVisible();
    await expect(
      this.page.locator("td, dd").filter({ hasText: address }).first(),
    ).toBeVisible();
  }

  async submitForm(): Promise<void> {
    await this.clickSubmit();
  }
}
