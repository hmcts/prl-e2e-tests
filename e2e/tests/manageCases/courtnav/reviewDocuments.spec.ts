import { test } from "../../fixtures.ts";
import { ReviewDocuments } from "../../../journeys/manageCases/caseProgression/reviewDocuments/reviewDocuments.ts";
import { Helpers } from "../../../common/helpers.ts";
import config from "../../../utils/config.utils.ts";

test.use({ storageState: config.sessionStoragePath + "caseWorker.json" });

test.describe("Review Documents task for DA Citizen case tests.", () => {
  let ccdRef: string = "";

  test.beforeEach(async ({ page, courtNavUtils }) => {
    ccdRef = await courtNavUtils.createCase(true, true);
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
  });

  test("Complete Review Documents without accessibility test. Saying yes to Restrict Access @regression", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: false,
      yesNoNotSureRestrictDocs: "yes",
      partyUploadedDocument: "CourtNav",
      documentType: "Applicant's statements",
    });
  });

  test("Complete Review Documents without accessibility test. Saying no to Restrict Access @regression", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: false,
      yesNoNotSureRestrictDocs: "no",
      partyUploadedDocument: "CourtNav",
      documentType: "Applicant's statements",
    });
  });

  test("Complete Review Documents with accessibility test. Saying not sure to Restrict Access @regression", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: false,
      yesNoNotSureRestrictDocs: "dontKnow",
      partyUploadedDocument: "CourtNav",
      documentType: "Applicant's statements",
    });
  });

  test("Complete Review Documents with accessibility test. Saying yes to Restrict Access @accessibility @nightly", async ({
    page,
  }): Promise<void> => {
    await ReviewDocuments.reviewDocuments({
      page: page,
      accessibilityTest: true,
      yesNoNotSureRestrictDocs: "yes",
      partyUploadedDocument: "CourtNav",
      documentType: "Applicant's statements",
    });
  });
});
