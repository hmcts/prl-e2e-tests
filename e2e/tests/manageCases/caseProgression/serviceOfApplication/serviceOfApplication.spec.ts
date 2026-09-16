import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import {
  caseTypes,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";

interface ServiceOfApplicationScenario {
  orderType: OrderTypes;
  orderName?: string;
  personallyServed: boolean;
  snapshotName: string;
}

const scenarios: Record<
  solicitorCaseCreateType,
  ServiceOfApplicationScenario[]
> = {
  C100: [
    {
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      personallyServed: false,
      snapshotName: "c100-non-personally-served",
    },
  ],
  FL401: [
    {
      orderType: "Power of arrest (FL406)",
      orderName: "Power of arrest",
      personallyServed: true,
      snapshotName: "fl401-fl406-personally-served",
    },
    {
      orderType: "Amended, discharged or varied order (FL404B)",
      personallyServed: true,
      snapshotName: "fl401-fl404b-personally-served",
    },
  ],
};

caseTypes.forEach((caseType) => {
  test.describe(`Service of Application task for ${caseType} Solicitor case tests.`, () => {
    let caseRef: string;

    test.beforeEach(async ({ manageCasesEventUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase(caseType))
        .caseRef;
      if (caseType === "C100") {
        await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      }
      await manageCasesEventUtils.sendToGatekeeper(caseRef, caseType);
    });

    scenarios[caseType].forEach(
      ({
        orderType,
        orderName = orderType,
        personallyServed,
        snapshotName,
      }) => {
        const serviceMethod = personallyServed
          ? "personally served"
          : "non-personally served";

        test(`Complete Task - service of application (${serviceMethod}) - ${orderType} with accessibility test. @regression @accessibility${caseType === "C100" || orderType === "Power of arrest (FL406)" ? " @nightly" : ""}`, async ({
          caseWorker,
          manageCasesEventUtils,
          navigationUtils,
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
          await navigationUtils.goToCase(
            caseWorker.page,
            config.manageCasesBaseURLCase,
            caseRef,
          );

          await summaryPage.chooseEventFromDropdown("Service of application");
          await page2.assertPageContents(caseType);
          await page2.expandDocumentsServedInPack(caseType);
          await page2.verifyAccessibility();
          await page2.fillInFields(caseType, orderName);
          await page2.clickContinue();

          await page4.assertPageContents(caseType);
          await page4.verifyAccessibility();
          await page4.selectServiceOptions(caseType, personallyServed);
          await page4.clickContinue();

          await submitPage.assertPageContents(
            ["caseProgression", "serviceOfApplication"],
            snapshotName,
          );
          await submitPage.verifyAccessibility();
          await submitPage.clickSaveAndContinue();

          await confirmPage.assertPageContents();
          await confirmPage.verifyAccessibility();
          await confirmPage.clickCloseAndReturnToCaseDetails();

          await serviceOfApplicationPage.goToPage();
          await serviceOfApplicationPage.assertServicePacks(
            caseType,
            orderType,
            personallyServed,
          );
        });
      },
    );
  });
});
