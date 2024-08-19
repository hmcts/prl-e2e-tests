import { Page } from "@playwright/test";
import { Helpers } from "../../../common/helpers";
import config from "../../../config";
import { Selectors } from "../../../common/selectors";
import { UserRole } from "../../../common/types";
import { ExampleContent } from "../../../fixtures/manageCases/exampleEvent/exampleContent";

export class ExamplePage {
  public static async checkPageLoads(
    page: Page,
    user: UserRole,
    caseNumber: string,
  ): Promise<void> {
    await page.goto(`http://www.google.com`);
    await Helpers.signOutAndGoToCase(
      page,
      user,
      config.citizenFrontendBaseURL,
      caseNumber,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Header}:text-is("${ExampleContent.pageTitle}")`,
      1,
    );
  }
}
