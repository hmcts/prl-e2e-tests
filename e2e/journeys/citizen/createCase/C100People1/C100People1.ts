import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { AddChildrenPage } from "../../../../pages/citizen/createCase/C100/people1/addChildrenPage";
import { ProvideDetailsPage } from "../../../../pages/citizen/createCase/C100/people1/provideDetailsPage";
import { WhichDecisionsPage } from "../../../../pages/citizen/createCase/C100/people1/whichDecisionsPage";
import { ApplicantGender } from "../../../../common/types";

interface C100People1Options {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  gender: ApplicantGender;
  subJourney: boolean;
}

export class C100People1 {
  public static async c100People1({
    page,
    user,
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
