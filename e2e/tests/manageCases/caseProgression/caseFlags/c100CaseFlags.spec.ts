import config from "../../../../utils/config.utils.ts";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { SolicitorPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/solicitorPages.ts";
import { NavigationUtils } from "../../../../utils/navigation.utils.ts";
import { test } from "../../../fixtures.ts";

type FlagStatus = "Active" | "Not approved";
type SupportType = "Reasonable adjustment" | "Language Interpreter";
type TestTag = "@nightly" | "@accessibility" | "@regression";

interface CaseFlagScenario {
  recipient: string;
  recipientRole: string;
  supportType: SupportType;
  reasonableAdjustment: string;
  adjustment: string;
  reason: string;
  newStatus: FlagStatus;
  changeReason: string;
  withTranslation: boolean;
  accessibilityTest: boolean;
  tags: TestTag[];
}

interface RequestSupportParams {
  solicitor: SolicitorPagesGroup;
  recipient: string;
  supportType: SupportType;
  reasonableAdjustment: string;
  adjustment: string;
  reason: string;
  caseNumber: string;
  accessibilityTest: boolean;
}

interface ReviewSupportRequestParams {
  caseWorker: CaseWorkerPagesGroup;
  navigationUtils: NavigationUtils;
  caseNumber: string;
  recipient: string;
  recipientRole: string;
  supportType: SupportType;
  adjustment: string;
  reason: string;
  newStatus: FlagStatus;
  changeReason: string;
  withTranslation: boolean;
  accessibilityTest: boolean;
}

const scenarios: CaseFlagScenario[] = [
  {
    recipient: "John Doe",
    recipientRole: "Applicant 1",
    supportType: "Reasonable adjustment",
    reasonableAdjustment: "I need documents in an alternative format",
    adjustment: "Documents in a specified colour",
    reason: "test comments",
    newStatus: "Active",
    changeReason: "test reason",
    withTranslation: true,
    accessibilityTest: true,
    tags: ["@nightly", "@accessibility", "@regression"],
  },
  {
    recipient: "John Doe",
    recipientRole: "Applicant 1",
    supportType: "Language Interpreter",
    reasonableAdjustment: "I need documents in an alternative format",
    adjustment: "Korean",
    reason: "test comments",
    newStatus: "Not approved",
    changeReason: "test reason",
    withTranslation: true,
    accessibilityTest: true,
    tags: ["@nightly", "@accessibility", "@regression"],
  },
  {
    recipient: "John Doe",
    recipientRole: "Applicant 1",
    supportType: "Reasonable adjustment",
    reasonableAdjustment: "I need documents in an alternative format",
    adjustment: "Documents in a specified colour",
    reason: "test comments",
    newStatus: "Not approved",
    changeReason: "test reason",
    withTranslation: false,
    accessibilityTest: false,
    tags: ["@regression"],
  },
  {
    recipient: "John Doe",
    recipientRole: "Applicant 1",
    supportType: "Language Interpreter",
    reasonableAdjustment: "I need documents in an alternative format",
    adjustment: "Korean",
    reason: "test comments",
    newStatus: "Active",
    changeReason: "test reason",
    withTranslation: false,
    accessibilityTest: false,
    tags: ["@regression"],
  },
];

test.slow();

test.describe("Case flags tests for CA case tests.", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseRef,
        "tasks",
      );
    },
  );

  scenarios.forEach(
    ({
      recipient,
      recipientRole,
      supportType,
      reasonableAdjustment,
      adjustment,
      reason,
      newStatus,
      changeReason,
      withTranslation,
      accessibilityTest,
      tags,
    }) => {
      const supportTypeDescription =
        supportType === "Reasonable adjustment"
          ? "reasonable adjustments"
          : supportType.toLowerCase();
      const approvalStatus =
        newStatus === "Active" ? "approved" : "not approved";
      const translationStatus = withTranslation
        ? "with translation"
        : "without translation";

      test(
        `Case flags - request support - ${supportTypeDescription} - court admin ${approvalStatus} - ${translationStatus}.`,
        { tag: [...tags] },
        async ({ solicitor, caseWorker, navigationUtils }): Promise<void> => {
          // request support as Solicitor
          await requestSupport({
            solicitor,
            recipient,
            supportType,
            reasonableAdjustment,
            adjustment,
            reason,
            caseNumber: caseRef,
            accessibilityTest,
          });

          // review support request as HCA
          await reviewSupportRequest({
            caseWorker,
            navigationUtils,
            caseNumber: caseRef,
            recipient,
            recipientRole,
            supportType,
            adjustment,
            reason,
            newStatus,
            changeReason,
            withTranslation,
            accessibilityTest,
          });
        },
      );
    },
  );
});

async function requestSupport({
  solicitor,
  recipient,
  supportType,
  reasonableAdjustment,
  adjustment,
  reason,
  caseNumber,
  accessibilityTest,
}: RequestSupportParams): Promise<void> {
  const { caseFlags, summaryPage, supportPage } = solicitor;

  await summaryPage.chooseEventFromDropdown("Request support");

  await caseFlags.requestSupport1Page.assertPageContents();
  if (accessibilityTest) {
    await caseFlags.requestSupport1Page.verifyAccessibility();
  }
  await caseFlags.requestSupport1Page.selectSupportRecipient(recipient);
  await caseFlags.requestSupport1Page.clickContinue();

  await caseFlags.requestSupport2Page.assertPageContents();
  if (accessibilityTest) {
    await caseFlags.requestSupport2Page.verifyAccessibility();
  }
  await caseFlags.requestSupport2Page.selectSupportType(supportType);
  await caseFlags.requestSupport2Page.clickContinue();

  if (supportType === "Reasonable adjustment") {
    await caseFlags.requestSupport3Page.assertPageContents();
    if (accessibilityTest) {
      await caseFlags.requestSupport3Page.verifyAccessibility();
    }
    await caseFlags.requestSupport3Page.selectReasonableAdjustment(
      reasonableAdjustment,
    );
    await caseFlags.requestSupport3Page.clickContinue();

    await caseFlags.requestSupport4Page.assertPageContents(
      reasonableAdjustment,
    );
    if (accessibilityTest) {
      await caseFlags.requestSupport4Page.verifyAccessibility();
    }
    await caseFlags.requestSupport4Page.selectAdjustment(adjustment);
    await caseFlags.requestSupport4Page.clickContinue();
  } else {
    await caseFlags.requestSupportLanguageInterpreterPage.assertPageContents();
    if (accessibilityTest) {
      await caseFlags.requestSupportLanguageInterpreterPage.verifyAccessibility();
    }
    await caseFlags.requestSupportLanguageInterpreterPage.selectLanguage(
      adjustment,
    );
    await caseFlags.requestSupportLanguageInterpreterPage.clickContinue();
  }

  await caseFlags.requestSupport5Page.assertPageContents();
  if (accessibilityTest) {
    await caseFlags.requestSupport5Page.verifyAccessibility();
  }
  await caseFlags.requestSupport5Page.enterReason(reason);
  await caseFlags.requestSupport5Page.clickContinue();

  await caseFlags.requestSupportSubmitPage.assertPageContents("C100", false);
  await caseFlags.requestSupportSubmitPage.assertRequestDetails([
    recipient,
    supportType === "Language Interpreter"
      ? `${supportType} - ${adjustment}`
      : adjustment,
    reason,
    "Requested",
  ]);
  if (accessibilityTest) {
    await caseFlags.requestSupportSubmitPage.verifyAccessibility();
  }
  await caseFlags.requestSupportSubmitPage.clickSubmit();

  await summaryPage.alertBanner.assertEventAlert(caseNumber, "Request support");
  await supportPage.goToPage();
  await supportPage.caseFlagSection.assertCaseFlagPresent(
    recipient,
    adjustment,
    reason,
  );
}

async function reviewSupportRequest({
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
  withTranslation,
  accessibilityTest,
}: ReviewSupportRequestParams): Promise<void> {
  const { page, tasksPage, caseFlags, summaryPage, caseFlagsPage } = caseWorker;
  await navigationUtils.goToCase(
    page,
    config.manageCasesBaseURLCase,
    caseNumber,
  );
  await tasksPage.goToPage();
  await tasksPage.chooseEventFromDropdown("Review RA Request");

  await caseFlags.reviewRARequestPage1.assertPageContents({
    recipient,
    recipientRole,
    supportType,
    adjustment,
    reason,
    caseType: "C100",
  });
  if (accessibilityTest) {
    await caseFlags.reviewRARequestPage1.verifyAccessibility();
  }
  await caseFlags.reviewRARequestPage1.selectSupportRequest(recipient);
  await caseFlags.reviewRARequestPage1.clickSubmit();

  const flagName =
    supportType === "Language Interpreter"
      ? `${supportType}, ${adjustment}`
      : adjustment;
  await caseFlags.reviewRARequestPage2.assertPageContents(flagName, "C100");
  await caseFlags.reviewRARequestPage2.updateFlagStatus(newStatus);
  await caseFlags.reviewRARequestPage2.addReasonForChange(changeReason);
  if (withTranslation) {
    await caseFlags.reviewRARequestPage2.requestTranslation();
  }
  await caseFlags.reviewRARequestPage2.clickSubmit();

  if (withTranslation) {
    await caseFlags.reviewRARequestAddTranslationsPage.assertPageContents();
    if (accessibilityTest) {
      await caseFlags.reviewRARequestAddTranslationsPage.verifyAccessibility();
    }
    await caseFlags.reviewRARequestAddTranslationsPage.fillInFields({
      otherDescription: "test description",
      otherDescriptionWelsh: "test description welsh",
      commentsWelsh: "test comments welsh",
    });
    await caseFlags.reviewRARequestAddTranslationsPage.clickSubmit();
  }

  await summaryPage.alertBanner.assertEventAlert(
    caseNumber,
    "Review RA Request",
  );
  if (newStatus === "Active") {
    await summaryPage.notificationBanner.assertNotificationBannerPresent(1);
    await summaryPage.notificationBanner.clickViewCaseFlags();
  } else {
    await caseFlagsPage.goToPage();
  }
  await caseFlagsPage.caseFlagSection.assertCaseFlagPresent(
    recipient,
    adjustment,
    reason,
    newStatus,
    true,
  );
}
