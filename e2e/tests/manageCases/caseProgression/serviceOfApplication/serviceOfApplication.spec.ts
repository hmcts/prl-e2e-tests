import { test } from "../../../fixtures.ts";
import config from "../../../../utils/config.utils.ts";
import {
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { ServiceOptions } from "../../../../pageObjects/pages/exui/serviceOfApplication/serviceOfApplication4.po.js";
import { CaseWorkerPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/caseWorkerPages.js";
import { ManageCaseEventUtils } from "../../../../utils/manageCaseEvent.utils.js";

interface ServiceOfApplicationParams {
  caseRef: string;
  orderType: OrderTypes;
  caseType: solicitorCaseCreateType;
  orderName: string;
  serviceOptions: ServiceOptions;
  snapshotName: string;
}

// C100
test.describe(`Service of Application task for C100 case with confidential details tests.`, () => {
  let caseRef: string;

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("C100"))
        .caseRef;
      await manageCasesEventUtils.issueAndSendToLocalCourt(caseRef);
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "C100");
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  test(`Complete Task - service of application (personally served by applicant's solicitor + cafcass + local authority) - Child arrangements, specific issue or prohibited steps order. @regression @accessibility @nightly @1`, async ({
    caseWorker,
    manageCasesEventUtils,
  }) => {
    await completeServiceOfApplication(caseWorker, manageCasesEventUtils, {
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
      snapshotName: "c100-personally-served-by-applicants-legal-representative",
    });
  });

  test(`Complete Task - service of application (personally served by court bailiff) - Parental responsibility order. @regression @accessibility @2`, async ({
    caseWorker,
    manageCasesEventUtils,
  }) => {
    await completeServiceOfApplication(caseWorker, manageCasesEventUtils, {
      caseRef: caseRef,
      orderType: "Parental responsibility order (C45A)",
      caseType: "C100",
      orderName: "Parental responsibility",
      serviceOptions: {
        personallyServed: "yes",
        servedBy: "courtBailiff",
      },
      snapshotName: "c100-personally-served-by-court-bailiff",
    });
  });

  test(`Complete Task - service of application (personally served by court admin) - Child arrangements, specific issue or prohibited steps order. @regression @accessibility @3`, async ({
    caseWorker,
    manageCasesEventUtils,
  }) => {
    await completeServiceOfApplication(caseWorker, manageCasesEventUtils, {
      caseRef: caseRef,
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      caseType: "C100",
      orderName: "Child arrangements, specific issue or prohibited steps",
      serviceOptions: {
        personallyServed: "yes",
        servedBy: "courtAdmin",
      },
      snapshotName: "c100-personally-served-by-court-admin",
    });
  });

  test(`Complete Task - service of application (non personally served to all parties) - Parental responsibility order. @regression @accessibility @4`, async ({
    caseWorker,
    manageCasesEventUtils,
  }) => {
    await completeServiceOfApplication(caseWorker, manageCasesEventUtils, {
      caseRef: caseRef,
      orderType: "Parental responsibility order (C45A)",
      caseType: "C100",
      orderName: "Parental responsibility",
      serviceOptions: {
        personallyServed: "no",
      },
      snapshotName: "c100-non-personally-to-all-parties",
    });
  });

  test(`Complete Task - service of application (service not applicable + cafcass + local authority) - Child arrangements, specific issue or prohibited steps order. @regression @accessibility @5`, async ({
    caseWorker,
    manageCasesEventUtils,
  }) => {
    await completeServiceOfApplication(caseWorker, manageCasesEventUtils, {
      caseRef: caseRef,
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      caseType: "C100",
      orderName: "Child arrangements, specific issue or prohibited steps",
      serviceOptions: {
        personallyServed: "notApplicable",
        serveCafcass: true,
        serveLocalAuthority: true,
      },
      snapshotName: "c100-personally-served-not-applicable",
    });
  });
});

// FL401
test.describe(`Service of Application task for FL401 case with confidential details tests.`, () => {
  let caseRef: string;

  test.beforeEach(
    async ({ caseWorker, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
        .caseRef;
      await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
      await navigationUtils.goToCase(
        caseWorker.page,
        config.manageCasesBaseURLCase,
        caseRef,
      );
    },
  );

  test(`Complete Task - service of application (personally served by applicant's solicitor) - Power of arrest order. @regression @accessibility @nightly @6`, async ({
    caseWorker,
    manageCasesEventUtils,
  }) => {
    await completeServiceOfApplication(caseWorker, manageCasesEventUtils, {
      caseRef: caseRef,
      orderType: "Power of arrest (FL406)",
      caseType: "FL401",
      orderName: "Power of arrest",
      serviceOptions: {
        personallyServed: "yes",
        servedBy: "applicantsSolicitor",
      },
      snapshotName: "fl401-personally-served-by-applicants-solicitor",
    });
  });

  test(`Complete Task - service of application (personally served by court bailiff) - Amended, discharged or varied order. @regression @accessibility @7`, async ({
    caseWorker,
    manageCasesEventUtils,
  }) => {
    await completeServiceOfApplication(caseWorker, manageCasesEventUtils, {
      caseRef: caseRef,
      orderType: "Amended, discharged or varied order (FL404B)",
      caseType: "FL401",
      orderName: "Amended, discharged or varied",
      serviceOptions: {
        personallyServed: "yes",
        servedBy: "courtBailiff",
      },
      snapshotName: "fl401-personally-served-by-court-bailiff",
    });
  });

  test(`Complete Task - service of application (personally served by court admin) - Power of arrest order. @regression @accessibility @8`, async ({
    caseWorker,
    manageCasesEventUtils,
  }) => {
    await completeServiceOfApplication(caseWorker, manageCasesEventUtils, {
      caseRef: caseRef,
      orderType: "Power of arrest (FL406)",
      caseType: "FL401",
      orderName: "Power of arrest",
      serviceOptions: {
        personallyServed: "yes",
        servedBy: "courtAdmin",
      },
      snapshotName: "fl401-personally-served-by-court-admin",
    });
  });

  test(`Complete Task - service of application (non personally served to all parties) - Amended, discharged or varied order. @regression @accessibility @nightly @9`, async ({
    caseWorker,
    manageCasesEventUtils,
  }) => {
    await completeServiceOfApplication(caseWorker, manageCasesEventUtils, {
      caseRef: caseRef,
      orderType: "Amended, discharged or varied order (FL404B)",
      caseType: "FL401",
      orderName: "Amended, discharged or varied",
      serviceOptions: {
        personallyServed: "no",
      },
      snapshotName: "fl401-non-personally-served-to-all-parties",
    });
  });
});

async function completeServiceOfApplication(
  caseWorker: CaseWorkerPagesGroup,
  manageCasesEventUtils: ManageCaseEventUtils,
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

  await summaryPage.chooseEventFromDropdown("Service of application");
  await page2.assertPageContents(caseType);
  await page2.expandDocumentsServedInPack(caseType);
  await page2.verifyAccessibility();
  await page2.fillInFields(caseType, orderName);
  await page2.clickContinue();

  await page4.assertPageContents(caseType);
  await page4.verifyAccessibility();
  await page4.selectServiceOptions(caseType, serviceOptions, false);
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
