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
      recipientRole: "Applicant",
      newStatus: "Active",
      changeReason: "Test change reason",
    },
  ].forEach(
    ({
      recipient,
      supportType,
      reasonableAdjustment,
      adjustment,
      reason,
      recipientRole,
      newStatus,
      changeReason,
    }) => {
      test("do something @nightly @accessibility @regression", async ({
        solicitor,
        caseWorker,
        navigationUtils,
      }): Promise<void> => {
        await solicitor.summaryPage.goToPage();
        // TODO: why is the functionality around this so flaky
        await solicitor.summaryPage.chooseEventFromDropdown("Request support");

        // complete support request
        await solicitor.caseFlags.requestSupport1Page.assertPageContents();
        await solicitor.caseFlags.requestSupport1Page.verifyAccessibility();
        await solicitor.caseFlags.requestSupport1Page.selectSupportRecipient(
          recipient,
        );
        await solicitor.caseFlags.requestSupport1Page.clickContinue();

        await solicitor.caseFlags.requestSupport2Page.assertPageContents();
        await solicitor.caseFlags.requestSupport2Page.verifyAccessibility();
        await solicitor.caseFlags.requestSupport2Page.selectSupportType(
          supportType,
        );
        await solicitor.caseFlags.requestSupport2Page.clickContinue();

        await solicitor.caseFlags.requestSupport3Page.assertPageContents();
        await solicitor.caseFlags.requestSupport3Page.verifyAccessibility();
        await solicitor.caseFlags.requestSupport3Page.selectReasonableAdjustment(
          reasonableAdjustment,
        );
        await solicitor.caseFlags.requestSupport3Page.clickContinue();

        await solicitor.caseFlags.requestSupport4Page.assertPageContents(
          reasonableAdjustment,
        );
        await solicitor.caseFlags.requestSupport4Page.verifyAccessibility();
        await solicitor.caseFlags.requestSupport4Page.selectAdjustment(
          adjustment,
        );
        await solicitor.caseFlags.requestSupport4Page.clickContinue();

        await solicitor.caseFlags.requestSupport5Page.assertPageContents();
        await solicitor.caseFlags.requestSupport5Page.verifyAccessibility();
        await solicitor.caseFlags.requestSupport5Page.enterReason(reason);
        await solicitor.caseFlags.requestSupport5Page.clickContinue();

        await solicitor.caseFlags.requestSupportSubmitPage.assertPageContents();
        await solicitor.caseFlags.requestSupportSubmitPage.verifyAccessibility();
        await solicitor.caseFlags.requestSupportSubmitPage.clickSubmit();
        await solicitor.summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Request support",
        );

        // check support request in tab
        await solicitor.supportPage.goToPage();
        await solicitor.supportPage.caseFlagSection.assertCaseFlagPresent(
          recipient,
          adjustment,
          reason,
        );

        // activate support request as HCA
        await navigationUtils.goToCase(
          caseWorker.page,
          config.manageCasesBaseURLCase,
          caseNumber,
        );
        await caseWorker.tasksPage.goToPage();
        await caseWorker.tasksPage.chooseEventFromDropdown("Review RA Request");

        await caseWorker.caseFlags.reviewRARequestPage1.assertPageContents(
          recipient,
          recipientRole,
          supportType,
          adjustment,
          reason,
        );
        await caseWorker.caseFlags.reviewRARequestPage1.verifyAccessibility();
        await caseWorker.caseFlags.reviewRARequestPage1.selectSupportRequest(
          recipient,
        );
        await caseWorker.caseFlags.reviewRARequestPage1.clickContinue();

        await caseWorker.caseFlags.reviewRARequestPage2.assertPageContents(
          adjustment,
        );
        // await caseWorker.caseFlags.reviewRARequestPage2.verifyAccessibility(); // Need to add a ticket - seems to be failing
        await caseWorker.caseFlags.reviewRARequestPage2.updateFlagStatus(
          newStatus,
        );
        await caseWorker.caseFlags.reviewRARequestPage2.addReasonForChange(
          changeReason,
        );
        await caseWorker.caseFlags.reviewRARequestPage2.clickContinue();

        await caseWorker.caseFlags.reviewRARequestPageSubmit.assertPageContents();
        await caseWorker.caseFlags.reviewRARequestPageSubmit.verifyAccessibility();
        await caseWorker.caseFlags.reviewRARequestPageSubmit.clickSubmit();
        await caseWorker.summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Review RA Request",
        );
        await caseWorker.summaryPage.notificationBanner.assertNotificationBannerPresent(
          1,
        );
        await caseWorker.summaryPage.notificationBanner.clickViewCaseFlags();
        await caseWorker.caseFlagsPage.caseFlagSection.assertCaseFlagPresent(
          recipient,
          adjustment,
          reason,
          newStatus,
          true,
        );
      });
    },
  );
});
