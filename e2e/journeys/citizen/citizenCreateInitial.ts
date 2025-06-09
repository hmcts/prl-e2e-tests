import { Page } from "@playwright/test";
import { ApplicantPage } from "../../pages/citizen/createCase/initialJourney/applicantPage.ts";
import {
  CaseDashboardPage,
  ChildArrangementsJourneyType,
} from "../../pages/citizen/createCase/initialJourney/caseDashboardPage.ts";

interface CitizenCreateInitialOptions {
  page: Page;
  accessibilityTest: boolean;
  childArrangementsJourney: ChildArrangementsJourneyType;
}

export class CitizenCreateInitial {
  public static async citizenCreateInitial({
    page,
    accessibilityTest,
    childArrangementsJourney,
  }: CitizenCreateInitialOptions): Promise<void> {
    await CaseDashboardPage.caseDashboardPage({
      page: page,
      accessibilityTest: accessibilityTest,
      childArrangementsJourney: childArrangementsJourney,
    });
    switch (childArrangementsJourney) {
      case "C100":
        await ApplicantPage.applicantPageNewCase({
          page: page,
          accessibilityTest: accessibilityTest,
        });
        break;
      case "FL401":
        break;
      case "accessCode":
        break;
      default:
        throw new Error(
          `Unrecognised childArrangementsJourney: ${childArrangementsJourney}`,
        );
    }
  }
}
