import { Page } from "@playwright/test";
import { yesNoDontKnow } from "../../../../common/types";
import { DetailsKnowPage } from "../../../../pages/citizen/createCase/C100/confidentiality/detailsKnowPage";

interface C100ConfidentialityOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100OthersKnowApplicantsContact: yesNoDontKnow
}

export class C100Confidentiality {
  public static async c100Confidentiality({
    page,
    accessibilityTest,
    errorMessaging,
    c100OthersKnowApplicantsContact
  }: C100ConfidentialityOptions): Promise<void> {
    await DetailsKnowPage.detailsKnowPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100OthersKnowApplicantsContact: c100OthersKnowApplicantsContact
    });
    if (c100OthersKnowApplicantsContact === 'yes') {
      // start
    } else if (
      c100OthersKnowApplicantsContact === 'no' ||
      c100OthersKnowApplicantsContact === 'dontKnow'
    ) {
      // start alternative
    } else {
      throw new Error(
        `The value c100OthersKnowApplicantsContact must be one of 'yes', 'no', 'dontKnow'. You used ${c100OthersKnowApplicantsContact}`
      );
    }
  }
}