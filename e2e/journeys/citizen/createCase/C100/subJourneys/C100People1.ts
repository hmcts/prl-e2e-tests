import { Page } from "@playwright/test";
import { AddChildrenPage } from "../../../../../pages/citizen/createCase/C100/people/addChildrenPage.ts";
import { ProvideDetailsPage } from "../../../../../pages/citizen/createCase/C100/people/provideDetailsPage.ts";
import { WhichDecisionsPage } from "../../../../../pages/citizen/createCase/C100/people/whichDecisionsPage.ts";
import { ParentalResponsibilityPage } from "../../../../../pages/citizen/createCase/C100/people/parentalResponsibilityPage.ts";
import { FurtherInformationPage } from "../../../../../pages/citizen/createCase/C100/people/furtherInformationPage.ts";
import { HasOtherChildrenPage } from "../../../../../pages/citizen/createCase/C100/people/hasOtherChildrenPage.ts";
import { AddApplicantPage } from "../../../../../pages/citizen/createCase/C100/people/addApplicantPage.ts";
import { ApplicantGender } from "../../../../../common/types.ts";
import { yesNoDontKnow } from "../../../../../common/types.ts";

interface C100PeopleOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  gender: ApplicantGender;
  c100PeopleYesNoDontKnow: yesNoDontKnow;
}

export class C100People {
  public static async c100People({
    page,
    accessibilityTest,
    errorMessaging,
    gender,
    c100PeopleYesNoDontKnow,
  }: C100PeopleOptions): Promise<void> {
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
    await ParentalResponsibilityPage.parentalResponsibilityPage({
      page,
      accessibilityTest,
      errorMessaging,
    });
    await FurtherInformationPage.furtherInformationPage({
      page,
      accessibilityTest,
      errorMessaging,
      c100PeopleYesNoDontKnow,
    });
    await HasOtherChildrenPage.hasOtherChildrenPage({
      page,
      accessibilityTest,
      errorMessaging,
      c100PeopleYesNoDontKnow,
    });
    if (c100PeopleYesNoDontKnow === "yes") {
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
    }
    await AddApplicantPage.addApplicantPage({
      page,
      accessibilityTest,
      errorMessaging,
    });
  }
}
