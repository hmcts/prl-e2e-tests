import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";

interface CreateABundleTestData {
  caseType: solicitorCaseCreateType;
  describeTitle: string;
  orderType: OrderTypes;
  issueToLocalCourt: boolean;
}

const testData: CreateABundleTestData[] = [
  {
    caseType: "C100",
    describeTitle: "Create a Bundle - C100 Case Type",
    orderType:
      "Child arrangements, specific issue or prohibited steps order (C43)",
    issueToLocalCourt: true,
  },
  {
    caseType: "FL401",
    describeTitle: "Create a Bundle - FL401 Case Type",
    orderType: "Power of arrest (FL406)",
    issueToLocalCourt: false,
  },
];

testData.forEach((data) => {
  test.describe(data.describeTitle, () => {
    let caseRef: string = "";

    test.beforeEach(
      async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
        caseRef = (
          await manageCasesEventUtils.submitTSSolicitorCase(data.caseType)
        ).caseRef;

        if (data.issueToLocalCourt) {
          await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
        }

        await manageCasesEventUtils.sendToGatekeeper(caseRef, data.caseType);
        await manageCasesEventUtils.createOrder({
          caseRef,
          orderType: data.orderType,
          isDraft: false,
          doServe: false,
        });
        await manageCasesEventUtils.serviceOfApplication(
          caseRef,
          data.caseType,
          data.orderType,
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

    test(`Complete Task - Create a Bundle - ${data.orderType} with accessibility test. @nightly @regression @accessibility`, async ({
      caseWorker,
    }): Promise<void> => {
      const { summaryPage, createABundle, bundlesPage } = caseWorker;

      await summaryPage.chooseEventFromDropdown("Create a bundle");

      await createABundle.page1.assertPageContents();
      await createABundle.page1.clickCreateBundle();

      await createABundle.submitPage.assertPageContents();
      await createABundle.submitPage.clickCreateBundle();
      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "Create a bundle",
      );

      await bundlesPage.goToPage();
      await bundlesPage.waitForBundleStitched();
      await bundlesPage.assertBundleContents();
    });
  });
});
