import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.describe("Complete the Order task for CA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
      await manageCasesEventUtils.createOrder({
        caseRef,
        orderType:
          "Child arrangements, specific issue or prohibited steps order (C43)",
        isDraft: false,
        doServe: false,
      });
      await manageCasesEventUtils.serviceOfApplication(
        caseRef,
        "C100",
        "Child arrangements, specific issue or prohibited steps order (C43)",
      );
      await manageCasesEventUtils.confidentialityCheck(caseRef);
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
        "tasks",
      );
    },
  );

  test("Complete Task - Create a Bundle - Child arrangements, specific issue or prohibited steps order (C43) with accessibility test. @nightly @regression @accessibility", async ({
    caseWorker,
  }): Promise<void> => {
    const { summaryPage, createABundle, bundlesPage } = caseWorker;

    await summaryPage.chooseEventFromDropdown("Create a bundle");

    await createABundle.page1.assertPageContents();
    await createABundle.page1.clickCreateBundle();

    await createABundle.submitPage.assertPageContents();
    await createABundle.submitPage.clickCreateBundle();
    await summaryPage.alertBanner.assertEventAlert(caseRef, "Create a bundle");

    await bundlesPage.goToPage();
    await bundlesPage.waitForBundleStitched();
    await bundlesPage.assertBundleContents();
  });
});
