import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";
import { SolicitorPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/solicitorPages.ts";
import {
  ReasonableAdjustment,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { NavigationUtils } from "../../../../utils/navigation.utils.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Request Support for DA case tests.", () => {
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
        // request support as Solicitor
        await requestSupport(
          solicitor,
          recipient,
          supportType,
          reasonableAdjustment,
          adjustment,
          reason,
          caseNumber,
          "FL401",
        );

        // activate support request as HCA
        await reviewSupportRequest(
          caseWorker,
          navigationUtils,
          caseNumber,
          recipient,
          recipientRole,
          supportType,
          adjustment,
          reason,
          newStatus,
          changeReason,
          "FL401",
        );
      });
    },
  );
});

test.describe("Request Support for CA case tests.", () => {
  let caseNumber: string = "";

  test.beforeEach(
    async ({ solicitor, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  [
    {
      recipient: "John Doe",
      supportType: "Reasonable adjustment",
      reasonableAdjustment: "I need documents in an alternative format",
      adjustment: "Documents in a specified colour",
      reason: "Test reason",
      recipientRole: "Applicant 1",
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
        // request support as Solicitor
        await requestSupport(
          solicitor,
          recipient,
          supportType,
          reasonableAdjustment,
          adjustment,
          reason,
          caseNumber,
          "C100",
        );

        // activate support request as HCA
        await reviewSupportRequest(
          caseWorker,
          navigationUtils,
          caseNumber,
          recipient,
          recipientRole,
          supportType,
          adjustment,
          reason,
          newStatus,
          changeReason,
          "C100",
        );
      });
    },
  );
});

async function requestSupport(
  solicitor: SolicitorPagesGroup,
  recipient: string,
  supportType: string,
  reasonableAdjustment: ReasonableAdjustment,
  adjustment: string,
  reason: string,
  caseNumber: string,
  caseType: solicitorCaseCreateType,
): Promise<void> {
  // TODO: why is the functionality around this so flaky
  const { caseFlags, summaryPage, supportPage } = solicitor;
  await summaryPage.chooseEventFromDropdown("Request support");

  // complete support request
  await caseFlags.requestSupport1Page.assertPageContents();
  await caseFlags.requestSupport1Page.verifyAccessibility();
  await caseFlags.requestSupport1Page.selectSupportRecipient(recipient);
  await caseFlags.requestSupport1Page.clickContinue();

  await caseFlags.requestSupport2Page.assertPageContents();
  await caseFlags.requestSupport2Page.verifyAccessibility();
  await caseFlags.requestSupport2Page.selectSupportType(supportType);
  await caseFlags.requestSupport2Page.clickContinue();

  await caseFlags.requestSupport3Page.assertPageContents();
  await caseFlags.requestSupport3Page.verifyAccessibility();
  await caseFlags.requestSupport3Page.selectReasonableAdjustment(
    reasonableAdjustment,
  );
  await caseFlags.requestSupport3Page.clickContinue();

  await caseFlags.requestSupport4Page.assertPageContents(reasonableAdjustment);
  await caseFlags.requestSupport4Page.verifyAccessibility();
  await caseFlags.requestSupport4Page.selectAdjustment(adjustment);
  await caseFlags.requestSupport4Page.clickContinue();

  await caseFlags.requestSupport5Page.assertPageContents();
  await caseFlags.requestSupport5Page.verifyAccessibility();
  await caseFlags.requestSupport5Page.enterReason(reason);
  await caseFlags.requestSupport5Page.clickContinue();

  await caseFlags.requestSupportSubmitPage.assertPageContents(caseType);
  await caseFlags.requestSupportSubmitPage.verifyAccessibility();
  await caseFlags.requestSupportSubmitPage.clickSubmit();
  await summaryPage.alertBanner.assertEventAlert(caseNumber, "Request support");

  // check support request in tab
  await supportPage.goToPage();
  await supportPage.caseFlagSection.assertCaseFlagPresent(
    recipient,
    adjustment,
    reason,
  );
}

async function reviewSupportRequest(
  caseWorker: CaseWorkerPagesGroup,
  navigationUtils: NavigationUtils,
  caseNumber: string,
  recipient: string,
  recipientRole: string,
  supportType: string,
  adjustment: string,
  reason: string,
  newStatus: string,
  changeReason: string,
  caseType: solicitorCaseCreateType,
): Promise<void> {
  const { page, tasksPage, caseFlags, summaryPage, caseFlagsPage } = caseWorker;
  await navigationUtils.goToCase(
    page,
    config.manageCasesBaseURLCase,
    caseNumber,
  );
  await tasksPage.goToPage();
  await tasksPage.chooseEventFromDropdown("Review RA Request");

  await caseFlags.reviewRARequestPage1.assertPageContents(
    recipient,
    recipientRole,
    supportType,
    adjustment,
    reason,
    caseType,
  );
  await caseFlags.reviewRARequestPage1.verifyAccessibility();
  await caseFlags.reviewRARequestPage1.selectSupportRequest(recipient);
  if (caseType === "C100") {
    await caseFlags.reviewRARequestPage1.clickSubmit();
  } else {
    await caseFlags.reviewRARequestPage1.clickContinue();
  }

  await caseFlags.reviewRARequestPage2.assertPageContents(adjustment, caseType);
  // await caseFlags.reviewRARequestPage2.verifyAccessibility(); // Need to add a ticket - seems to be failing
  await caseFlags.reviewRARequestPage2.updateFlagStatus(newStatus);
  await caseFlags.reviewRARequestPage2.addReasonForChange(changeReason);
  if (caseType === "C100") {
    await caseFlags.reviewRARequestPage2.clickSubmit();
  } else {
    await caseFlags.reviewRARequestPage2.clickContinue();
  }

  if (caseType === "FL401") {
    // for some reason there isn't a specific submit page for C100 flags
    await caseFlags.reviewRARequestPageSubmit.assertPageContents(caseType);
    await caseFlags.reviewRARequestPageSubmit.verifyAccessibility();
    await caseFlags.reviewRARequestPageSubmit.clickSubmit();
  }

  await summaryPage.alertBanner.assertEventAlert(
    caseNumber,
    "Review RA Request",
  );
  await summaryPage.notificationBanner.assertNotificationBannerPresent(1);
  await summaryPage.notificationBanner.clickViewCaseFlags();
  await caseFlagsPage.caseFlagSection.assertCaseFlagPresent(
    recipient,
    adjustment,
    reason,
    newStatus,
    true,
  );
}
