import { Page } from "@playwright/test";
import { AddChildrenPage } from "../../../../pages/citizen/createCase/C100/people/addChildrenPage";
import { ProvideDetailsPage } from "../../../../pages/citizen/createCase/C100/people/provideDetailsPage";
import { WhichDecisionsPage } from "../../../../pages/citizen/createCase/C100/people/whichDecisionsPage";
import { ApplicantGender } from "../../../../common/types";

interface C100People1Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  gender: ApplicantGender;
  subJourney: boolean;
}

export class C100People1 {
  public static async c100People1({
    page,
    accessibilityTest,
    errorMessaging,
    gender,
    subJourney,
  }: C100People1Options): Promise<void> {
    if (subJourney) {
    }
    await AddChildrenPage.addChildrenPage({
      page,
      accessibilityTest,
      errorMessaging,
    });
    await ProvideDetailsPage.provideDetailsPage({
      page,
      accessibilityTest,
      errorMessaging,
      gender,
    });
    await WhichDecisionsPage.whichDecisionsPage({
      page,
      accessibilityTest,
      errorMessaging,
    });
  }
}
