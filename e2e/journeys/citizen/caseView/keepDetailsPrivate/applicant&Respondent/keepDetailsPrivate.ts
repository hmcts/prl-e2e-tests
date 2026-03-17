import { yesNoDontKnow } from "../../../../../common/types.ts";
import { Page } from "@playwright/test";
import { DetailsKnownPage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/detailsKnownPage.ts";
import { ApplicantStartAlternativePage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/startAlternativePage.ts";
import { ApplicantPrivateDetailsConfirmedPage } from "../../../../../pages/citizen/caseView/keepDetailsPrivate/applicant/privateDetailsConfirmedPage.ts";

interface keepDetailsPrivateParams {
  page: Page;
  accessibilityTest: boolean;
  startAlternativeYesNo: boolean;
  yesNoDontKnow: yesNoDontKnow;
  isApplicant: boolean;
}

enum UniqueSelectors {
  keepDetailsPrivateSelector = "#keepYourDetailsPrivate",
}

export class KeepDetailsPrivate {
  public static async keepDetailsPrivate({
    page,
    accessibilityTest,
    startAlternativeYesNo,
    yesNoDontKnow,
    isApplicant,
  }: keepDetailsPrivateParams): Promise<void> {
    await page.locator(UniqueSelectors.keepDetailsPrivateSelector).click();
    if (isApplicant) {
      await DetailsKnownPage.ApplicantDetailsKnownPage(
        page,
        accessibilityTest,
        yesNoDontKnow,
      );
      await ApplicantStartAlternativePage.applicantStartAlternativePage({
        page,
        accessibilityTest,
        startAlternativeYesNo,
        isApplicant,
      });
    } else {
      await DetailsKnownPage.RespondentDetailsKnownPage(
        page,
        accessibilityTest,
        yesNoDontKnow,
      );
      await ApplicantStartAlternativePage.respondentStartAlternativePage({
        page,
        accessibilityTest,
        startAlternativeYesNo,
        isApplicant,
      });
    }
    await ApplicantPrivateDetailsConfirmedPage.privateDetailsConfirmedPage({
      page,
      accessibilityTest,
      startAlternativeYesNo,
      isApplicant,
    });
  }
}
