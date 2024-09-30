import { test } from "@playwright/test";
import Config from "../../../../config";
import { C100MiamPolicyUpgrade } from "../../../../journeys/manageCases/createCase/C100MiamPolicyUpgrade/C100MiamPolicyUpgrade";
import { C100MiamPolicyUpgrade1PageType } from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade1Page";
import { miamSelection } from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Page";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case Children and respondents Tests @manageCases", (): void => {
  test(`Complete the C100 Create case Children and respondents as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Saying yes to all options,
  Setting the applicant Gender to male. @crossbrowserManageCases`, async ({
    page,
  }): Promise<void> => {
    await C100MiamPolicyUpgrade.c100MiamPolicyUpgrade({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      errorMessaging: false,
      C100MiamPolicyUpgrade1PageType: "yes",
      yesNoMiamPolicyUpgrade: true,
      miamSelection: "attended4MonthsPrior",
      subJourney: true,
    });
  });
});
