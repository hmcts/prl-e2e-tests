import { Page, test } from "@playwright/test";
import { SolicitorCaseCreator } from "../common/solicitorCaseCreator.ts";
import Config from "../config.ts";
import { AccessCodeHelper } from "../common/accessCodeHelper.ts";
import createDaCitizenCourtNavCase from "../common/createCaseHelper.ts";
import { Helpers } from "../common/helpers.ts";
import { completeCheckApplicationAndSendToGatekeeper } from "../common/caseEventsHelper.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Case creation examples", (): void => {
  test("create case and statement of truth and submit", async ({
    page,
  }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURL);
    await SolicitorCaseCreator.createCaseStatementOfTruthAndSubmit(page);
  });

  test("create solicitor case - gatekeeping", async ({
    page,
    browser,
  }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURL);
    await SolicitorCaseCreator.createCaseSendToGatekeeper(page, browser);
  });

  test("create solicitor case and service of application example", async ({
    page,
    browser,
  }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURL);
    const caseRef = await SolicitorCaseCreator.createCaseSOA(page, browser);
    await AccessCodeHelper.getApplicantAccessCode(caseRef);
    await AccessCodeHelper.getRespondentAccessCode(caseRef);
  });

  test("create courtnav case and send to gatekeeper example", async ({
    browser,
  }): Promise<void> => {
    const caseRef = await createDaCitizenCourtNavCase(false, false);
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "courtAdminSwansea",
    );
    await caPage.goto(
      "https://manage-case.aat.platform.hmcts.net/work/my-work/list",
    );
    await completeCheckApplicationAndSendToGatekeeper(caPage, caseRef);
  });
});
