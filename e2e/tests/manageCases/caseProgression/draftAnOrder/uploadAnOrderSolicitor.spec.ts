import config from "../../../../utils/config.utils.ts";
import { UploadAnOrderC100SolicitorJourney } from "../../../../journeys/manageCases/caseProgression/draftAnOrder/uploadAnOrderC100SolicitorJourney.ts";
import { UploadAnOrderFL401SolicitorJourney } from "../../../../journeys/manageCases/caseProgression/draftAnOrder/uploadAnOrderFL401SolicitorJourney.ts";
import { Helpers } from "../../../../common/helpers.js";
import { test } from "../../../fixtures.ts";

test.use({ storageState: config.sessionStoragePath + "solicitor.json" });
test.describe("'Upload an order' by Solicitor via the 'Draft an Order' event tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ page, browser, caseEventUtils }) => {
    caseRef = await caseEventUtils.createCACase(browser);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
  });

  //CA - Upload an order with magistrate/judge title selected
  test(`CA 'Upload an order' as a Solicitor with the following options:
  Case: C100,
  Accessibility testing: yes.
  Judge or Magistrate title: true
  @regression, @nightly, @accessibility`, async ({
    page,
    browser,
  }): Promise<void> => {
    await UploadAnOrderC100SolicitorJourney.uploadAnOrderC100SolicitorJourney({
      page: page,
      accessibilityTest: false, //outstanding EXUI issue causing axe tests to fail
      solicitorCaseCreateType: "C100",
      yesNoManageOrders: false,
      uploadOrderC100Options:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isUploadOrder: true,
      errorMessaging: false,
      browser: browser,
      caseRef: caseRef,
      hasJudgeNameAndTitle: true,
    });
  });

  //CA - Upload an order with no magistrate/judge title selected
  test(`CA 'Upload an order' as a Solicitor with the following options:
  Case: C100,
  Accessibility testing: yes.
  Judge or Magistrate title: false
  @regression, @nightly, @accessibility`, async ({
    page,
    browser,
  }): Promise<void> => {
    await UploadAnOrderC100SolicitorJourney.uploadAnOrderC100SolicitorJourney({
      page: page,
      accessibilityTest: true,
      solicitorCaseCreateType: "C100",
      yesNoManageOrders: false,
      uploadOrderC100Options:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isUploadOrder: true,
      errorMessaging: false,
      browser: browser,
      caseRef: caseRef,
      hasJudgeNameAndTitle: false,
    });
  });

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
