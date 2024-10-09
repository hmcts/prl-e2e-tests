import {
  CaseDashboardPage,
  ChildArrangementsJourneyType
} from "../../pages/citizen/createCase/initialJourney/caseDashboardPage";
import { Page } from "@playwright/test";
import config from "../../config";

interface CitizenCreateInitialOptions {
  page: Page;
  accessibilityTest: boolean;
  childArrangementsJourney: ChildArrangementsJourneyType
}

export class CitizenCreateInitial {
  public static async citizenCreateInitial({
    page,
    accessibilityTest,
    childArrangementsJourney
  }: CitizenCreateInitialOptions): Promise<void> {
    await page.goto(config.citizenFrontendBaseURL);
    await CaseDashboardPage.caseDashboardPage({
      page,
      accessibilityTest,
      childArrangementsJourney
    });
  }
}