import { Page } from "@playwright/test";
import { ListOfApplications1Page } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/applicant/listOfApplications1Page.ts";
import { ListOfApplications2Page } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/applicant/listOfApplications2Page.ts";
import { ListOfApplications3Page } from "../../../../../pages/citizen/caseView/makeRequestToCourtAboutCase/applicant/listOfApplications3Page.ts";

interface makeRequestToCourtAboutCaseParams {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  requestToCourtAboutYourCase = "#requestToCourtAboutYourCase",
}

export class MakeRequestToCourtAboutCase {
  public static async makeRequestToCourtAboutCase({
    page,
    accessibilityTest,
  }: makeRequestToCourtAboutCaseParams): Promise<void> {
    await page.locator(UniqueSelectors.requestToCourtAboutYourCase).click();
    await ListOfApplications1Page.listOfApplications1Page(
      page,
      accessibilityTest,
    );
    await ListOfApplications2Page.listOfApplications2Page(
      page,
      accessibilityTest,
    );
    await ListOfApplications3Page.listOfApplications3Page(
      page,
      accessibilityTest,
    );
  }
}
