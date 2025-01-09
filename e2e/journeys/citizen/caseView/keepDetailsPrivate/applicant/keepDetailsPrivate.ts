import { yesNoDontKnow } from "../../../../../common/types.ts";
import { Browser, Page } from "@playwright/test";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { DetailsKnownPage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/detailsKnownPage.ts";
import { StartAlternativePage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/startAlternativePage.ts";
import { PrivateDetailsConfirmedPage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/privateDetailsConfirmedPage.ts";

interface keepDetailsPrivateParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
  yesNoDontKnow: yesNoDontKnow;
}

// This enum is used to store the locators for each event <a> tag on the applicant dashboard
enum UniqueSelectors {
  keepDetailsPrivateSelector = "#keepYourDetailsPrivate",
}

export class KeepDetailsPrivate {
  public static async keepDetailsPrivate({
    page,
    browser,
    caseRef,
    accessibilityTest,
    startAlternativeYesNo,
    yesNoDontKnow,
  }: keepDetailsPrivateParams): Promise<void> {
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: "applicant",
      accessibilityTest: accessibilityTest,
    });
    await page.click(UniqueSelectors.keepDetailsPrivateSelector);
    await DetailsKnownPage.details_knownPage(
      page,
      accessibilityTest,
      yesNoDontKnow,
    );
    await StartAlternativePage.start_alternativePage({
      page,
      accessibilityTest,
      startAlternativeYesNo,
    });
    await PrivateDetailsConfirmedPage.private_details_confirmedPage({
      page,
      accessibilityTest,
      startAlternativeYesNo,
    });
  }
}
