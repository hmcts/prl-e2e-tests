import { Page } from "@playwright/test";
import { AddChildrenPage } from "../../../../../pages/citizen/createCase/C100/people/addChildrenPage";
import { ProvideDetailsPage } from "../../../../../pages/citizen/createCase/C100/people/provideDetailsPage";
import { WhichDecisionsPage } from "../../../../../pages/citizen/createCase/C100/people/whichDecisionsPage";
import { ParentalResponsibilityPage } from "../../../../../pages/citizen/createCase/C100/people/parentalResponsibilityPage";
import { FurtherInformationPage } from "../../../../../pages/citizen/createCase/C100/people/furtherInformationPage";
import { HasOtherChildrenPage } from "../../../../../pages/citizen/createCase/C100/people/hasOtherChildrenPage";
import { OtherChildrenPage } from "../../../../../pages/citizen/createCase/C100/people/otherChildrenPage";
import { PersonalDetailsPage } from "../../../../../pages/citizen/createCase/C100/people/personalDetailsPage";
import { AddApplicantPage } from "../../../../../pages/citizen/createCase/C100/people/addApplicantPage";
import { ApplicantGender } from "../../../../../common/types";
import { yesNoDontKnow } from "../../../../../common/types";

interface C100People1Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  gender: ApplicantGender;
  c100PeopleYesNoDontKnow: yesNoDontKnow;
  c100PeopleOtherChildrenYes: boolean;
}

export class C100People1 {
  public static async c100People1({
    page,
    accessibilityTest,
    errorMessaging,
    gender,
    c100PeopleYesNoDontKnow,
    c100PeopleOtherChildrenYes,
  }: C100People1Options): Promise<void> {
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
    await OtherChildrenPage.otherChildrenPage({
      page,
      accessibilityTest,
      errorMessaging,
      c100PeopleOtherChildrenYes,
    });
    if (c100PeopleOtherChildrenYes) {
    }
  }
}
