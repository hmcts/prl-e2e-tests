import { Page, test } from "@playwright/test";
import { SolicitorDACaseCreator } from "../common/caseHelpers/solicitorDACaseCreator.ts";
import Config from "../utils/config.utils.ts";
import { AccessCodeHelper } from "../common/caseHelpers/accessCodeHelper.ts";
import createDaCitizenCourtNavCase from "../common/caseHelpers/citizenDACaseCreateHelper.ts";
import { Helpers } from "../common/helpers.ts";
import { completeCheckApplicationAndSendToGatekeeper } from "../common/caseHelpers/caseEventsHelper.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Case creation examples", (): void => {
  test("create case", async ({ page }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURLCase);
    await SolicitorDACaseCreator.createCaseStatementOfTruthAndSubmit(page);
  });

  test("create solicitor case - gatekeeping", async ({
    page,
    browser,
  }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURLCase);
    await SolicitorDACaseCreator.createCaseSendToGatekeeper(page, browser);
  });

  test("create solicitor case and service of application example", async ({
    page,
    browser,
  }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURLCase);
    const caseRef = await SolicitorDACaseCreator.createCaseSOA(page, browser);
    await AccessCodeHelper.getApplicantAccessCode(caseRef);
    await AccessCodeHelper.getRespondentAccessCode(caseRef);
  });

  test("create courtnav case and send to gatekeeper example", async ({
    browser,
  }): Promise<void> => {
    const caseRef = await createDaCitizenCourtNavCase(false, false);
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(`${Config.manageCasesBaseURL}/work/my-work/list`);
    await completeCheckApplicationAndSendToGatekeeper(caPage, caseRef);
  });

  test("create courtnav", async ({ browser }): Promise<void> => {
    await createDaCitizenCourtNavCase(false, false);
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(`${Config.manageCasesBaseURL}/work/my-work/list`);
  });
});
