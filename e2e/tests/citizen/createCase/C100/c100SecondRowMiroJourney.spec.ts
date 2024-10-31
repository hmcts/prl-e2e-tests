import { test } from "@playwright/test";
import { C100 } from "../../../../journeys/citizen/createCase/C100/C100";
import Config from "../../../../config";
import IdamLoginHelper from "../../../../common/idamLoginHelper";

test.describe("C100 Citizen Application tests on the second MIRO set. @citizenFrontend @crossbrowserCitizenFrontend", (): void => {
  test.beforeEach(async ({ page }) => {
    await IdamLoginHelper.signInCitizenUser(
      page,
      Config.citizenFrontendBaseURL,
    );
  });
  test(`Test the second row of the second row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: no
    Court Permission Needed: no
    Other proceedings: no to all
    child arrangement order details: no
    urgency and without notice: no`, async ({ page }): Promise<void> => {
    await C100.c100SecondMiroJourney({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      yesNoOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });

  test(`Test the second row of the second row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Yes Error Messaging,
    No Screening and Written Review
    Legal Representation: no
    Court Permission Needed: no
    Other proceedings: yes to all
    child arrangement order details: no
    urgency and without notice: no`, async ({ page }): Promise<void> => {
    await C100.c100SecondMiroJourney({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      yesNoOtherProceedings: true,
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });
  test(`Test the second row of the second row c100 citizen journey with the following options:
    Not Accessibility Testing,
    Not Error Messaging,
    No Screening and Written Review
    Legal Representation: no
    Court Permission Needed: no
    Other proceedings: no to all
    child arrangement order details: no
    urgency and without notice: no,
    @accessibilityCitizenFrontend`, async ({ page }): Promise<void> => {
    await C100.c100SecondMiroJourney({
      page: page,
      accessibilityTest: true,
      errorMessaging: false,
      c100LegalRepresentation: false,
      c100CourtPermissionNeeded: false,
      yesNoOtherProceedings: false,
      urgencyAndWithoutNoticeAllOptionsYes: false,
    });
  });
});
