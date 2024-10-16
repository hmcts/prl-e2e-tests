import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { UrgentFirstHearingPage } from "../../../../pages/citizen/createCase/C100/urgencyAndWithoutNotice/urgentFirstHearingPage";
import { TellUsAboutYourSituationPage } from "../../../../pages/citizen/createCase/C100/urgencyAndWithoutNotice/tellUsAboutYourSituationPage";
import { WithoutNoticeHearingPage } from "../../../../pages/citizen/createCase/C100/urgencyAndWithoutNotice/withoutNoticeHearingPage";
import { WithoutNoticeHearingDetailsPage } from "../../../../pages/citizen/createCase/C100/urgencyAndWithoutNotice/withoutNoticeHearingDetailsPage";

interface C100UrgencyAndWithoutNoticeOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
  subJourney: boolean;
}

export class C100UrgencyAndWithoutNotice {
  public static async c100UrgencyAndWithoutNotice({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    urgencyAndWithoutNoticeAllOptionsYes,
    subJourney,
  }: C100UrgencyAndWithoutNoticeOptions): Promise<void> {
    if (subJourney) {
    }
    await UrgentFirstHearingPage.urgentFirstHearingPage({
      page,
      accessibilityTest,
      errorMessaging,
      urgencyAndWithoutNoticeAllOptionsYes,
    });
    if (urgencyAndWithoutNoticeAllOptionsYes) {
      await TellUsAboutYourSituationPage.tellUsAboutYourSituationPage({
        page,
        accessibilityTest,
        errorMessaging,
        urgencyAndWithoutNoticeAllOptionsYes,
      });
    }
    await WithoutNoticeHearingPage.withoutNoticeHearingPage({
      page,
      accessibilityTest,
      errorMessaging,
      urgencyAndWithoutNoticeAllOptionsYes,
    });
    if (urgencyAndWithoutNoticeAllOptionsYes) {
      await WithoutNoticeHearingDetailsPage.withoutNoticeHearingDetailsPage({
        page,
        accessibilityTest,
        errorMessaging,
        urgencyAndWithoutNoticeAllOptionsYes,
      });
    }
  }
}
