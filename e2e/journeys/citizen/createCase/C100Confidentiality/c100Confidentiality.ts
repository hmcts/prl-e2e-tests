import { Page } from "@playwright/test";
import { yesNoDontKnow } from "../../../../common/types";
import { DetailsKnowPage } from "../../../../pages/citizen/createCase/C100/confidentiality/detailsKnowPage";
import { StartPage } from "../../../../pages/citizen/createCase/C100/confidentiality/startPage";
import {
  StartAlternativeContent
} from "../../../../fixtures/citizen/createCase/C100/confidentiality/startAlternativeContent";
import { StartAlternativePage } from "../../../../pages/citizen/createCase/C100/confidentiality/startAlternativePage";
import { FeedbackPage } from "../../../../pages/citizen/createCase/C100/confidentiality/feedbackPage";
import { FeedbackNoPage } from "../../../../pages/citizen/createCase/C100/confidentiality/feedbackNoPage";

interface C100ConfidentialityOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100OthersKnowApplicantsContact: yesNoDontKnow;
  c100PrivateDetails: boolean;
}

export class C100Confidentiality {
  public static async c100Confidentiality({
    page,
    accessibilityTest,
    errorMessaging,
    c100OthersKnowApplicantsContact,
    c100PrivateDetails,
  }: C100ConfidentialityOptions): Promise<void> {
    await DetailsKnowPage.detailsKnowPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100OthersKnowApplicantsContact: c100OthersKnowApplicantsContact,
    });
    if (c100OthersKnowApplicantsContact === 'yes') {
      await StartPage.startPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100PrivateDetails: c100PrivateDetails,
      });
    } else if (
      c100OthersKnowApplicantsContact === 'no' ||
      c100OthersKnowApplicantsContact === 'dontKnow'
    ) {
      await StartAlternativePage.startAlternativePage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100PrivateDetails: c100PrivateDetails
      });
    } else {
      throw new Error(
        `Unrecognised value for c100OthersKnowApplicantsContact: ${c100OthersKnowApplicantsContact}`
      )
    }
    if (c100PrivateDetails) {
      await FeedbackPage.feedbackPage({
        page: page,
        accessibilityTest: accessibilityTest
      })
    } else {
      await FeedbackNoPage.feedbackNoPage({
        page: page,
        accessibilityTest: accessibilityTest
      })
    }
  }
}
