import config from "../../../utils/config.utils.ts";
import { test } from "../../fixtures.ts";
import { OrderTypes } from "../../../common/types.ts";

interface ServiceOfApplicationScenario {
  orderType: OrderTypes;
  orderName?: string;
  personallyServed: boolean;
  snapshotName: string;
}

const scenarios: ServiceOfApplicationScenario[] = [
  {
    orderType: "Power of arrest (FL406)",
    orderName: "Power of arrest",
    personallyServed: true,
    snapshotName: "courtnav-fl406-personally-served",
  },
  {
    orderType: "Amended, discharged or varied order (FL404B)",
    personallyServed: true,
    snapshotName: "courtnav-fl404b-personally-served",
  },
];

test.describe("Service of Application task for DA Citizen case tests.", () => {
  test.skip(
    process.env.MANAGE_CASES_TEST_ENV === "preview",
    "Doesn't work on preview env - initial Courtnav case creation doesn't work",
  );

  let caseRef: string;

  test.beforeEach(
    async ({
      caseWorker,
      courtNavUtils,
      manageCasesEventUtils,
      navigationUtils,
    }) => {
      caseRef = await courtNavUtils.createCase(true, false);
      await manageCasesEventUtils.addFamilyManNumber(caseRef);
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
        "tasks",
      );
    },
  );

  scenarios.forEach(
    ({ orderType, orderName = orderType, personallyServed, snapshotName }) => {
      const serviceMethod = personallyServed
        ? "personally served"
        : "non-personally served";
      const confirmation = personallyServed
        ? "personal service"
        : "non-personal service";

      test(`Complete Task - service of application (${serviceMethod}) - ${orderType} with accessibility test. @regression @accessibility${orderType === "Power of arrest (FL406)" ? " @nightly" : ""}`, async ({
        caseWorker,
        manageCasesEventUtils,
      }): Promise<void> => {
        const { summaryPage, serviceOfApplication } = caseWorker;
        const {
          page2,
          page4,
          submitPage,
          confirmPage,
          serviceOfApplicationPage,
        } = serviceOfApplication;

        await manageCasesEventUtils.createOrder({
          caseRef,
          orderType,
          isDraft: false,
          doServe: false,
        });

        await summaryPage.chooseEventFromDropdown("Service of application");
        await page2.assertPageContents("FL401");
        await page2.expandDocumentsServedInPack("FL401");
        await page2.verifyAccessibility();
        await page2.fillInFields("FL401", orderName);
        await page2.clickContinue();

        await page4.assertPageContents("FL401");
        await page4.verifyAccessibility();
        await page4.selectServiceOptions("FL401", personallyServed);
        await page4.clickContinue();

        await submitPage.assertPageContents(
          ["manageCases", "courtnav", "serviceOfApplication"],
          snapshotName,
        );
        await submitPage.verifyAccessibility();
        await submitPage.clickSaveAndContinue();

        await confirmPage.assertPageContents(confirmation);
        await confirmPage.verifyAccessibility();
        await confirmPage.clickCloseAndReturnToCaseDetails();

        await serviceOfApplicationPage.goToPage();
        await serviceOfApplicationPage.assertServicePacks(
          "FL401",
          orderType,
          personallyServed,
          "Citizen",
        );
      });
    },
  );
});
