import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CaseDashboardContent } from "../../../../fixtures/citizen/initialJourney/caseDashboardContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { solicitorCaseCreateType } from "../../../../common/types.ts";

export type ChildArrangementsJourneyType =
  | "accessCode"
  | solicitorCaseCreateType;

enum linkSelectors {
  accessCode = `${Selectors.GovukLink}:text-is("${CaseDashboardContent.link1}")`,
  C100 = `${Selectors.GovukLink}:text-is("${CaseDashboardContent.link2}")`,
  FL401 = `${Selectors.GovukLink}:text-is("${CaseDashboardContent.link3}")`,
}

interface CaseDashboardPageOptions {
  page: Page;
  accessibilityTest: boolean;
  childArrangementsJourney?: ChildArrangementsJourneyType;
}

interface SelectChildArrangementJourneyOptions {
  page: Page;
  childArrangementsJourney: ChildArrangementsJourneyType;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface SelectDraftCaseOptions {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
}

export class CaseDashboardPage {
  public static async caseDashboardPage({
    page,
    accessibilityTest,
    childArrangementsJourney,
  }: CaseDashboardPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (childArrangementsJourney) {
      await this.selectChildArrangementJourney({
        page,
        childArrangementsJourney,
      });
    }
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${CaseDashboardContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        CaseDashboardContent,
        "link",
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        CaseDashboardContent,
        "tab",
        `${Selectors.GovukTabs}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async selectChildArrangementJourney({
    page,
    childArrangementsJourney,
  }: SelectChildArrangementJourneyOptions): Promise<void> {
    const journeyTypeKey =
      childArrangementsJourney as keyof typeof linkSelectors;
    await page.click(linkSelectors[journeyTypeKey]);
  }

  public static async selectDraftCase({
    page,
    accessibilityTest,
    ccdRef,
  }: SelectDraftCaseOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await page.getByRole("link", { name: ccdRef }).click(); // Select draft case
  }
}
