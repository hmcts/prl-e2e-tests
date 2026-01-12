import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });
test.slow();

test.describe("Case flags tests for DA case tests.", () => {
  let caseNumber: string = "";

  test.beforeEach(
    async ({ solicitor, browser, caseEventUtils, navigationUtils }) => {
      caseNumber = await caseEventUtils.createDACase(browser);
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  [
    {
      recipient: "John Smith",
      supportType: "Reasonable adjustment",
      reasonableAdjustment: "I need documents in an alternative format",
      adjustment: "Documents in a specified colour",
      reason: "Test reason",
    },
  ].forEach(
    ({ recipient, supportType, reasonableAdjustment, adjustment, reason }) => {
      test("do something @nightly @accessibility @regression", async ({
        solicitor,
      }): Promise<void> => {
        const { summaryPage, caseFlags, supportPage } = solicitor;
        await summaryPage.chooseEventFromDropdown("Request support");

        // complete support request
        await caseFlags.requestSupport1Page.assertPageContents();
        // await caseFlags.requestSupport1Page.verifyAccessibility();
        await caseFlags.requestSupport1Page.selectSupportRecipient(recipient);
        await caseFlags.requestSupport1Page.clickContinue();

        await caseFlags.requestSupport2Page.assertPageContents();
        // await caseFlags.requestSupport2Page.verifyAccessibility();
        await caseFlags.requestSupport2Page.selectSupportType(supportType);
        await caseFlags.requestSupport2Page.clickContinue();

        await caseFlags.requestSupport3Page.assertPageContents();
        // await caseFlags.requestSupport3Page.verifyAccessibility();
        await caseFlags.requestSupport3Page.selectReasonableAdjustment(
          reasonableAdjustment,
        );
        await caseFlags.requestSupport3Page.clickContinue();

        await caseFlags.requestSupport4Page.assertPageContents(
          reasonableAdjustment,
        );
        // await caseFlags.requestSupport4Page.verifyAccessibility();
        await caseFlags.requestSupport4Page.selectAdjustment(adjustment);
        await caseFlags.requestSupport4Page.clickContinue();

        await caseFlags.requestSupport5Page.assertPageContents();
        // await caseFlags.requestSupport5Page.verifyAccessibility();
        await caseFlags.requestSupport5Page.enterReason(reason);
        await caseFlags.requestSupport5Page.clickContinue();

        await caseFlags.requestSupportSubmitPage.assertPageContents();
        // await caseFlags.requestSupportSubmitPage.verifyAccessibility();
        await caseFlags.requestSupportSubmitPage.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Request support",
        );

        // check support request in tab
        await supportPage.goToPage();
        await supportPage.assertCaseFlag(recipient, adjustment, reason);
      });
    },
  );
});
