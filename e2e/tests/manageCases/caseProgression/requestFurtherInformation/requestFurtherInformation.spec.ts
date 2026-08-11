import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

test.describe("Complete Request further information event", () => {
  //Get case to state or gatekeeping
  test.beforeEach(async ({ page, manageCasesEventUtils, navigationUtils }) => {
    const caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
    await navigationUtils.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
    );
  });
  //Request further info event

  // check status of event is awaiting information
  // confirm all WA tasks cancelled
  // check as judge and LA that they cannot see request further info event in dropdown
  // check as judge and la they can see request for info in history
  // as CTSC or HCA upoload doc or add note to simulate real world
  // as supper user use exit wait info event back to original state
  test("Request further information for C100 case as Court Admin with the following options: Case: C100, Accessibility testing: yes. @nightly @accessibility @regression", async ({
    page,
    courtAdminStoke,
  }): Promise<void> => {
    await courtAdminStoke.requestFurtherInformation.page1.assertPageContents(
      true,
    );
    await courtAdminStoke.requestFurtherInformation.page1.provideInformationDetails();
  });
});
