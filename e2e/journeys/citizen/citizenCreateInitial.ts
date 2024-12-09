import { Page } from "@playwright/test";
import { ApplicantPage } from "../../pages/citizen/createCase/initialJourney/applicantPage";
import {
  CaseDashboardPage,
  ChildArrangementsJourneyType,
} from "../../pages/citizen/createCase/initialJourney/caseDashboardPage";

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
        await ApplicantPage.applicantPage({
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
