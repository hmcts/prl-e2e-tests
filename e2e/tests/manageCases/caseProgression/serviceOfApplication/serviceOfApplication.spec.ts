import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { ServiceOptions } from "../../../../pageObjects/pages/exui/serviceOfApplication/serviceOfApplication4.po.js";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.js";
import { ManageCaseEventUtils } from "../../../../utils/manageCaseEvent.utils.js";
import { NavigationUtils } from "../../../../utils/navigation.utils.js";

interface ServiceOfApplicationParams {
  caseRef: string;
  orderType: OrderTypes;
  caseType: solicitorCaseCreateType;
  orderName: string;
  serviceOptions: ServiceOptions;
  snapshotName: string;
}

// C100
test.describe(`Service of Application task for C100 case tests.`, () => {
  let caseRef: string;

  test.beforeEach(async ({ manageCasesEventUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
      .caseRef;
    await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
  });

  // TODO: add C100 scenarios
  test(`Complete Task - service of application (personally served by applicant's solicitor) - Child arrangements, specific issue or prohibited steps order with accessibility test. @regression @accessibility @nightly`, async ({
    caseWorker,
    manageCasesEventUtils,
    navigationUtils,
  }) => {
    await completeServiceOfApplication(
      caseWorker,
      manageCasesEventUtils,
      navigationUtils,
      {
        caseRef: caseRef,
        orderType:
          "Child arrangements, specific issue or prohibited steps order (C43)",
        caseType: "C100",
        orderName: "Child arrangements, specific issue or prohibited steps",
        serviceOptions: {
          personallyServed: "yes",
          servedBy: "applicantsSolicitor",
          serveCafcass: true,
          serveLocalAuthority: true,
        },
        snapshotName: "c100-personally-served-by-applicants-solicitor",
      },
    );
  });
});

// FL401
test.describe(`Service of Application task for FL401 case tests.`, () => {
  let caseRef: string;

  test.beforeEach(async ({ manageCasesEventUtils }) => {
    caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
  });

  test(`Complete Task - service of application (personally served by applicant's solicitor) - Power of arrest order with accessibility test. @regression @accessibility @nightly`, async ({
    caseWorker,
    manageCasesEventUtils,
    navigationUtils,
  }) => {
    await completeServiceOfApplication(
      caseWorker,
      manageCasesEventUtils,
      navigationUtils,
      {
        caseRef: caseRef,
        orderType: "Power of arrest (FL406)",
        caseType: "FL401",
        orderName: "Power of arrest",
        serviceOptions: {
          personallyServed: "yes",
          servedBy: "applicantsSolicitor",
        },
        snapshotName: "fl401-personally-served-by-applicants-solicitor",
      },
    );
  });

  test(`Complete Task - service of application (personally served by court bailiff) - Amended, discharged or varied order with accessibility test. @regression @accessibility`, async ({
    caseWorker,
    manageCasesEventUtils,
    navigationUtils,
  }) => {
    await completeServiceOfApplication(
      caseWorker,
      manageCasesEventUtils,
      navigationUtils,
      {
        caseRef: caseRef,
        orderType: "Amended, discharged or varied order (FL404B)",
        caseType: "FL401",
        orderName: "Amended, discharged or varied",
        serviceOptions: {
          personallyServed: "yes",
          servedBy: "courtBailiff",
        },
        snapshotName: "fl401-personally-served-by-court-bailiff",
      },
    );
  });

  test(`Complete Task - service of application (personally served by court admin) - Power of arrest order with accessibility test. @regression @accessibility`, async ({
    caseWorker,
    manageCasesEventUtils,
    navigationUtils,
  }) => {
    await completeServiceOfApplication(
      caseWorker,
      manageCasesEventUtils,
      navigationUtils,
      {
        caseRef: caseRef,
        orderType: "Power of arrest (FL406)",
        caseType: "FL401",
        orderName: "Power of arrest",
        serviceOptions: {
          personallyServed: "yes",
          servedBy: "courtAdmin",
        },
        snapshotName: "fl401-personally-served-by-court-admin",
      },
    );
  });

  test(`Complete Task - service of application (non personally served to all parties) - Amended, discharged or varied order with accessibility test. @regression @accessibility`, async ({
    caseWorker,
    manageCasesEventUtils,
    navigationUtils,
  }) => {
    await completeServiceOfApplication(
      caseWorker,
      manageCasesEventUtils,
      navigationUtils,
      {
        caseRef: caseRef,
        orderType: "Amended, discharged or varied order (FL404B)",
        caseType: "FL401",
        orderName: "Amended, discharged or varied",
        serviceOptions: {
          personallyServed: "no",
        },
        snapshotName: "fl401-non-personally-served-to-all-parties",
      },
    );
  });
});

async function completeServiceOfApplication(
  caseWorker: CaseWorkerPagesGroup,
  manageCasesEventUtils: ManageCaseEventUtils,
  navigationUtils: NavigationUtils,
  {
    caseRef,
    orderType,
    caseType,
    orderName,
    serviceOptions,
    snapshotName,
  }: ServiceOfApplicationParams,
): Promise<void> {
  const { summaryPage, serviceOfApplication } = caseWorker;
  const { page2, page4, submitPage, confirmPage, serviceOfApplicationPage } =
    serviceOfApplication;

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
  await page4.selectServiceOptions(caseType, serviceOptions);
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
    serviceOptions,
  );
}
