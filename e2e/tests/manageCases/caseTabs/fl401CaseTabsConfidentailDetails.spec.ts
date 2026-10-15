import { test } from "../../fixtures.ts";
import { ConfirmApplicantContactInstructions } from "../../../journeys/citizen/caseView/confirmContactDetails/confirmApplicantContactInstructions.ts";

// This test is specifically for FL401 cases see FPVTL-871
test.describe("Applicant confirm contact details tests", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ manageCasesEventUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
    await manageCasesEventUtils.createOrder({
      caseRef,
      orderType: "Power of arrest (FL406)",
      isDraft: false,
      doServe: false,
    });
    await manageCasesEventUtils.serviceOfApplication(
      caseRef,
      "FL401",
      "Power of arrest (FL406)",
    );
    await manageCasesEventUtils.confidentialityCheck(caseRef);
  });

  test("Applicant update contact details. @nightly @regression", async ({
    caseWorker,
    browser,
  }): Promise<void> => {
    await ConfirmApplicantContactInstructions.confirmApplicantContactInstructions(
      {
        page: caseWorker.page,
        browser,
        caseRef: caseRef,
        isApplicant: true,
        accessibilityTest: true,
        applicationSubmittedBy: "Citizen",
      },
    );
  });
});
