import config from "../../../../utils/config.utils";
import { test } from "../../../fixtures";
import { CourtAdminStokePagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/courtAdminStokePages.js";

// -------------------------------
// C100 CASE TYPE: Transfer to another court as a CTSC
// -------------------------------
test.describe("Transfer to another court event for CA Solicitor case tests as a court admin.", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ courtAdminStoke, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createCACase(browser);
      await navigationUtils.goToCase(
        courtAdminStoke.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "tasks",
      );
    },
  );

  [
    {
      courtIsListed: true,
      courtName: "Aberystwyth Justice Centre - Trefechan - SY23 1AS",
      snapshotName: "listed-court",
    },
  ].forEach((data) => {
    test(`Complete Transfer to another court event by selecting court from the courts list. @regression @nightly`, async ({
      courtAdminStoke,
    }): Promise<void> => {
      await transferToAnotherCourt("C100", courtAdminStoke, caseNumber, data);
    });
  });
  [
    {
      courtIsListed: false,
      courtName: "Test Court",
      snapshotName: "not-listed-court",
    },
  ].forEach((data) => {
    test(`Complete Transfer to another court event by entering court name manually when the court is not available in the courts list. @regression`, async ({
      courtAdminStoke,
    }): Promise<void> => {
      await transferToAnotherCourt("C100", courtAdminStoke, caseNumber, data);
    });
  });
});

// -------------------------------
// FL401 CASE TYPE: Transfer to another court as a CTSC
// -------------------------------
test.describe("Transfer to another court event for DA Solicitor case tests as a court admin.", () => {
  let caseNumber: string;

  test.beforeEach(
    async ({ courtAdminStoke, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        courtAdminStoke.page,
        config.manageCasesBaseURLCase,
        caseNumber,
        "tasks",
      );
    },
  );

  [
    {
      courtIsListed: true,
      courtName: "Aberystwyth Justice Centre - Trefechan - SY23 1AS",
      snapshotName: "listed-court",
    },
  ].forEach((data) => {
    test(`Complete Transfer to another court event by selecting court from the courts list. @regression @nightly`, async ({
      courtAdminStoke,
    }): Promise<void> => {
      await transferToAnotherCourt("FL401", courtAdminStoke, caseNumber, data);
    });
  });
  [
    {
      courtIsListed: false,
      courtName: "Test Court",
      snapshotName: "not-listed-court",
    },
  ].forEach((data) => {
    test(`Complete Transfer to another court event by entering court name manually when the court is not available in the courts list. @regression`, async ({
      courtAdminStoke,
    }): Promise<void> => {
      await transferToAnotherCourt("FL401", courtAdminStoke, caseNumber, data);
    });
  });
});

async function transferToAnotherCourt(
  caseType: string,
  courtAdminStoke: CourtAdminStokePagesGroup,
  caseNumber: string,
  data,
): Promise<void> {
  const { summaryPage, transferToAnotherCourt } = courtAdminStoke;
  await summaryPage.chooseEventFromDropdown("Transfer to another court");
  await transferToAnotherCourt.transferToAnotherCourt1Page.assertPageContents(
    caseType,
  );
  //await transferToAnotherCourt.transferToAnotherCourt1Page.verifyAccessibility();
  // await new AxeUtils(page).audit(); //#TODO: Awaiting for accessibility ticket EXUI-2794 to be resolved

  await transferToAnotherCourt.transferToAnotherCourt1Page.selectCourt(
    caseType,
    data.courtIsListed,
    data.courtName,
  );
  await transferToAnotherCourt.transferToAnotherCourt1Page.clickContinue();

  await transferToAnotherCourt.submitPage.assertPageContents(
    ["caseProgression", caseType + "TransferToAnotherCourt"],
    data.snapshotName,
  );
  await transferToAnotherCourt.submitPage.verifyAccessibility();
  await transferToAnotherCourt.submitPage.clickSaveAndContinue();

  await transferToAnotherCourt.confirmPage.assertPageContents();
  await transferToAnotherCourt.confirmPage.verifyAccessibility();
  await transferToAnotherCourt.confirmPage.clickCloseAndReturnToCaseDetails();

  await summaryPage.alertBanner.assertEventAlert(
    caseNumber,
    "Transfer to another court",
  );
}
