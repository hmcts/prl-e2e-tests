import config from "../../../../../../utils/config.utils.ts";
import { UploadAnOrderFL401SolicitorJourney } from "../../../../../../journeys/manageCases/caseProgression/draftAnOrder/uploadAnOrderFL401SolicitorJourney.ts";
import { test } from "../../../../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });

test.describe("'Upload an order' by Solicitor via the 'Create/upload draft order' event tests", (): void => {
  test(`DA 'Upload an order' as a Solicitor with the following options:
  Case: FL401,
  Accessibility testing: yes.
  Judge or Magistrate title: true.
  @regression, @nightly, @accessibility`, async ({
    page,
    browser,
  }): Promise<void> => {
    await UploadAnOrderFL401SolicitorJourney.uploadAnOrderFL401SolicitorJourney(
      {
        page: page,
        accessibilityTest: true,
        solicitorCaseCreateType: "FL401",
        yesNoManageOrders: false,
        uploadOrderFL401Options: "non-molestation",
        isUploadOrder: true,
        errorMessaging: false,
        browser: browser,
        hasJudgeNameAndTitle: true,
      },
    );
  });
});
