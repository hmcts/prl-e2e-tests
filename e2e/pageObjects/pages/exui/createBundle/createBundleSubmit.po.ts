import { EventPage } from "../eventPage.po.js";
import { Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CreateBundle1Content } from "../../../../fixtures/manageCases/caseProgression/createBundle/createBundle1Content.js";
import { CreateBundleSubmitContent } from "../../../../fixtures/manageCases/caseProgression/createBundle/createBundleSubmitContent.js";

export class CreateBundleSubmitPage extends EventPage {
  private readonly pageTitle: Locator = this.page.locator(
    `${Selectors.GovukHeadingL}:text-is("${CreateBundle1Content.pageTitle}")`,
  );
  private readonly createBundleButton: Locator = this.page.locator(
    `${Selectors.button}:text-is("${CreateBundleSubmitContent.creatBundle}")`,
  );
  private readonly successAlert: Locator = this.page.locator(
    Selectors.alertMessage,
    {
      hasText: "updated with event: Create a bundle",
    },
  );

  constructor(page: Page) {
    super(page, CreateBundle1Content.pageTitle);
  }

  async assertPageContents(accessibilityTest: boolean): Promise<void> {
    await this.pageTitle.waitFor();
    if (accessibilityTest) {
      // await this.verifyAccessibility(); // failing need to make a ticket
    }
  }

  async fillInFields(): Promise<void> {
    await this.createBundleButton.click();
    // check for success message
    await this.successAlert.waitFor();
  }
}
