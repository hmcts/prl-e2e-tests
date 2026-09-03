import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.js";
import { solicitorCaseCreateType } from "../../../../common/types.js";

test.describe("Statement of Service event for CA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
      await manageCasesEventUtils.serviceOfApplication(caseRef, "C100");
      await manageCasesEventUtils.confidentialityCheck(caseRef);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  [
    {
      whatServed: "Application pack",
      whoServed: "Elise Lynn",
      servedBy: "Court staff",
      snapshotName: "c100-statementOfService-submit-cya",
      snapshotPath: ["caseProgression", "statementOfService"],
    },
  ].forEach((data) => {
    test("Complete Task - statement of Service - with accessibility test.@check @nightly @regression @accessibility", async ({
      caseWorker,
    }): Promise<void> => {
      await completeStatementOfService(caseWorker, data, "C100", caseRef);
    });
  });
});

test.describe("Statement of Service event for DA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
      await manageCasesEventUtils.serviceOfApplication(caseRef, "FL401");
      await manageCasesEventUtils.confidentialityCheck(caseRef);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  [
    {
      whatServed: "Application pack",
      whoServed: "Elise Lynn",
      servedBy: "Court staff",
      snapshotName: "fl401-statementOfService-submit-cya",
      snapshotPath: ["caseProgression", "statementOfService"],
    },
  ].forEach((data) => {
    test("Complete Task - statement of Service - with accessibility test.@check @nightly @regression @accessibility", async ({
      caseWorker,
    }): Promise<void> => {
      await completeStatementOfService(caseWorker, data, "FL401", caseRef);
    });
  });
});

async function completeStatementOfService(
  caseWorker: CaseWorkerPagesGroup,
  data,
  caseType: solicitorCaseCreateType,
  caseRef: string,
) {
  const { summaryPage, statementOfService } = caseWorker;

  await summaryPage.chooseEventFromDropdown("Statement of service");

  await statementOfService.statementOfService1Page.assertPageContents();
  await statementOfService.statementOfService1Page.selectServedDetails(
    data.whatServed,
    data.whoServed,
  );
  await statementOfService.statementOfService1Page.clickContinue();
  await statementOfService.statementOfServiceSubmitPage.assertPageContents(
    data.snapshotPath,
    data.snapshotName,
  );
  await statementOfService.statementOfServiceSubmitPage.verifyAccessibility();
  await statementOfService.statementOfServiceSubmitPage.clickSaveAndContinue();
  await statementOfService.statementOfServiceConfirmPage.assertPageContents(
    caseType,
  );
  await statementOfService.statementOfServiceConfirmPage.verifyAccessibility();
  await statementOfService.statementOfServiceConfirmPage.clickCloseAndReturnToCaseDetails();

  //***** Assertions  ********** //
  await summaryPage.alertBanner.assertEventAlert(
    caseRef,
    "Statement of service",
  );
  await statementOfService.serviceOfApplicationPage.goToPage();
  await statementOfService.serviceOfApplicationPage.assertStatementOfServiceDetails(
    [
      {
        whoServed: data.whoServed,
        servedBy: data.servedBy,
      },
    ],
  );
}
