import { Page, test } from "@playwright/test";
import { SolicitorCaseCreator } from "../common/solicitorCaseCreator.ts";
import Config from "../config.ts";
import { AccessCodeHelper } from "../common/accessCodeHelper.ts";
import createDaCitizenCourtNavCase from "../common/createCaseHelper.ts";
import { submitEvent } from "../common/solicitorCaseCreatorHelper.ts";
import { Helpers } from "../common/helpers.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Case creation examples", (): void => {
  test("create case and statement of truth and submit", async ({
    page,
  }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURL);
    const caseRef =
      await SolicitorCaseCreator.createCaseStatementOfTruthAndSubmit(page);
    console.log(caseRef);
  });

  test("create solicitor case - gatekeeping", async ({
    page,
    browser,
  }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURL);
    const caseRef = await SolicitorCaseCreator.createCaseSendToGatekeeper(
      page,
      browser,
    );
    console.log(caseRef);
  });

  test("create solicitor case and service of application example", async ({
    page,
    browser,
  }): Promise<void> => {
    await page.goto(Config.manageCasesBaseURL);
    const caseRef = await SolicitorCaseCreator.createCaseSOA(page, browser);
    console.log(caseRef);
    const appAccessCode: string =
      await AccessCodeHelper.getApplicantAccessCode("1733309023574046");
    console.log(`Applicant access code: ${appAccessCode}`);
    const respAccessCode: string =
      await AccessCodeHelper.getRespondentAccessCode(caseRef);
    console.log(`Respondent access code: ${respAccessCode}`);
  });

  test("create courtnav case and send to gatekeeper example", async ({
    browser,
  }): Promise<void> => {
    const caseRef = await createDaCitizenCourtNavCase(false, false);
    const caPage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await caPage.goto(
      "https://manage-case.aat.platform.hmcts.net/work/my-work/list",
    );
    await submitEvent(caPage, caseRef, "fl401SendToGateKeeper");
    // await submitEvent(caPage, caseRef, "serviceOfApplication");
    console.log(caseRef);
  });
});
