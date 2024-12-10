import { Page } from "@playwright/test";
import { TellUsAboutYourSituationPage } from "../../../../../pages/citizen/createCase/C100/urgencyAndWithoutNotice/tellUsAboutYourSituationPage";
import { UrgentFirstHearingPage } from "../../../../../pages/citizen/createCase/C100/urgencyAndWithoutNotice/urgentFirstHearingPage";
import { WithoutNoticeHearingDetailsPage } from "../../../../../pages/citizen/createCase/C100/urgencyAndWithoutNotice/withoutNoticeHearingDetailsPage";
import { WithoutNoticeHearingPage } from "../../../../../pages/citizen/createCase/C100/urgencyAndWithoutNotice/withoutNoticeHearingPage";

interface C100UrgencyAndWithoutNoticeOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  urgencyAndWithoutNoticeAllOptionsYes: boolean;
}

export class C100UrgencyAndWithoutNotice {
  public static async c100UrgencyAndWithoutNotice({
    page,
    accessibilityTest,
    errorMessaging,
    urgencyAndWithoutNoticeAllOptionsYes,
  }: C100UrgencyAndWithoutNoticeOptions): Promise<void> {
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
