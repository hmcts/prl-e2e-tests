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
    await StartPage.startPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100PrivateDetails: c100PrivateDetails,
    });
    await FeedbackNoPage.feedbackNoPage({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await FeedbackPage.feedbackPage({
      page: page,
      accessibilityTest: accessibilityTest,
    });
  }
}
