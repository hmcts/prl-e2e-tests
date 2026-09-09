import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";

test.describe("Complete the Order task for DA Solicitor case tests.", () => {
  let caseRef: string = "";

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
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
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
        "tasks",
      );
    },
  );

  test("Complete Task - Create a Bundle - Power of arrest (FL406) with accessibility test. @nightly @accessibility @regression", async ({
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
