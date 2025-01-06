import { Browser, Page } from "@playwright/test";
import { ActivateCase } from "../../../activateCase/activateCase.ts";
import { CheckAnswersPage } from "../../../../../pages/citizen/caseView/applicant/confirmContactDetails/checkAnswersPage.ts";
import {
  Details_knownPage
} from "../../../../../pages/citizen/caseView/applicant/keepDetailsPrivate/details_knownPage.ts";
import {
  Start_alternativePage
} from "../../../../../pages/citizen/caseView/applicant/keepDetailsPrivate/start_alternativePage.ts";
import { yesNoDontKnow } from "../../../../../common/types.ts";
import {
  Private_details_confirmedPage
} from "../../../../../pages/citizen/caseView/applicant/keepDetailsPrivate/private_details_confirmedPage.ts";

interface ApplicantConfirmContactDetailsParams {
  page: Page;
  browser: Browser;
  caseRef: string;
  accessibilityTest: boolean;
  event: Event;
  startAlternativeYesNo: boolean;
  yesNoDontKnow: yesNoDontKnow;
}

type Event =
  "confirmContactDetails" | "keepDetailsPrivate";


enum UniqueSelectors {
  confirmOrEditYourContactDetailsSelector = "#editYouContactDetails",
  keepDetailsPrivateSelector = "#keepYourDetailsPrivate",
}

export class daCitizenApplicationEvents {
  public static async confirmContactDetails({
                                              page,
                                              browser,
                                              caseRef,
                                              accessibilityTest,
                                              event,
                                              startAlternativeYesNo,
                                              yesNoDontKnow
                                            }: ApplicantConfirmContactDetailsParams): Promise<void> {
    page = await ActivateCase.activateCase({
      page: page,
      browser: browser,
      caseRef: caseRef,
      caseUser: "applicant",
      accessibilityTest: accessibilityTest,
    });
    switch (event) {
      case "confirmContactDetails":
        await page.click(UniqueSelectors.confirmOrEditYourContactDetailsSelector);
        await CheckAnswersPage.checkAnswersPage(page, accessibilityTest);
        break;
      case "keepDetailsPrivate":
        await page.click(UniqueSelectors.keepDetailsPrivateSelector);
        await Details_knownPage.details_knownPage(page, accessibilityTest, yesNoDontKnow);
        await Start_alternativePage.start_alternativePage({page, accessibilityTest, startAlternativeYesNo});
        await Private_details_confirmedPage.private_details_confirmedPage({page, accessibilityTest, startAlternativeYesNo});
        break;
    }
  }
}
