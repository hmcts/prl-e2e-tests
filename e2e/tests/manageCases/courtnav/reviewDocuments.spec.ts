import { test } from "../../fixtures.ts";
import config from "../../../utils/config.utils.ts";
import { CaseWorkerPagesGroup } from "../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { yesNoDontKnow } from "../../../common/types.ts";

test.describe("Review Documents task for DA Solicitor case tests.", () => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - initial Courtnav case creation doesn't work",
  );

  let ccdRef: string = "";

  test.beforeEach(async ({ caseWorker, courtNavUtils, navigationUtils }) => {
    ccdRef = await courtNavUtils.createCase(true, true);
    await navigationUtils.goToCase(
      caseWorker.page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  async function completeReviewDocuments(
    caseWorker: CaseWorkerPagesGroup,
    accessibilityTest: boolean,
    yesNoNotSureRestrictDocs: yesNoDontKnow,
  ): Promise<void> {
    const { tasksPage, reviewDocuments } = caseWorker;

    await tasksPage.assignTaskToMeAndTriggerNextSteps(
      "Review Documents",
      "Review Documents",
      "caseWorker",
    );

    await reviewDocuments.page1.assertPageContents();
    if (accessibilityTest) {
      await reviewDocuments.page1.verifyAccessibility();
    }
    await reviewDocuments.page1.selectFirstDocument();
    await reviewDocuments.page1.clickContinue();

    await reviewDocuments.page2.assertPageContents(
      "CourtNav",
      "Applicant's statements",
    );
    if (accessibilityTest) {
      await reviewDocuments.page2.verifyAccessibility();
    }
    await reviewDocuments.page2.selectRestrictAccessAnswer(
      yesNoNotSureRestrictDocs,
    );
    await reviewDocuments.page2.clickContinue();

    await reviewDocuments.submitPage.assertDocumentAndAnswers(
      yesNoNotSureRestrictDocs,
      "CourtNav",
    );
    if (accessibilityTest) {
      await reviewDocuments.submitPage.verifyAccessibility();
    }
    await reviewDocuments.submitPage.clickSubmit();
  }

  test("Complete Review Documents without accessibility test. Saying yes to Restrict Access @regression @tp", async ({
    caseWorker,
  }): Promise<void> => {
    await completeReviewDocuments(caseWorker, false, "yes");
  });

  test("Complete Review Documents without accessibility test. Saying no to Restrict Access @regression @tp", async ({
    caseWorker,
  }): Promise<void> => {
    await completeReviewDocuments(caseWorker, false, "no");
  });

  test("Complete Review Documents with accessibility test. Saying not sure to Restrict Access @regression @tp", async ({
    caseWorker,
  }): Promise<void> => {
    await completeReviewDocuments(caseWorker, false, "dontKnow");
  });

  test("Complete Review Documents with accessibility test. Saying yes to Restrict Access @accessibility @nightly @tp", async ({
    caseWorker,
  }): Promise<void> => {
    await completeReviewDocuments(caseWorker, true, "yes");
  });
});
