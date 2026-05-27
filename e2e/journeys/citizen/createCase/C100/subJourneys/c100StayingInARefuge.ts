import { ApplicantStayingInRefugePage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantStayingInRefugePage.ts";
import { Page } from "@playwright/test";
import { ApplicantKeepingDetailsSafePage } from "../../../../../pages/citizen/createCase/C100/casePartyDetails/applicant/applicantKeepingDetailsSafePage.ts";

interface c100StayingInARefugeOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  applicantLivesInRefuge: boolean;
}

export class C100StayingInARefuge {
  public static async c100StayingInARefuge({
    page,
    accessibilityTest,
    errorMessaging,
    applicantLivesInRefuge,
  }: c100StayingInARefugeOptions) {
    await ApplicantStayingInRefugePage.applicantStayingInRefugePage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantLivesInRefuge: applicantLivesInRefuge,
    });
    if (applicantLivesInRefuge) {
      await ApplicantKeepingDetailsSafePage.applicantKeepingDetailsSafePage({
        page: page,
        accessibilityTest: accessibilityTest,
      });
    }
  }
}
