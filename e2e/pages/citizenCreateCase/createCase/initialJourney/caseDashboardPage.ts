import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CaseDashboardContent } from "../../../../fixtures/citizenCreateCase/initialJourney/caseDashboardContent";
import { Helpers } from "../../../../common/helpers";

interface CaseDashboardPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class CaseDashboardPage {
  private static async caseDashBoardPage({
    page,
    accessibilityTest
  }: CaseDashboardPageOptions): Promise<void> {

  }

  private static async checkPageLoads({
    page,
    accessibilityTest
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${CaseDashboardContent.pageTitle}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukC}`
      )
    ])
  }
}