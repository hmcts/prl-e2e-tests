import Config from "../../../../../utils/config.utils.ts";
import { test } from "../../../../fixtures.ts";
import {
  JudgeOrMagistrateTitles,
  OrderTypes,
  solicitorCaseCreateType,
} from "../../../../../common/types.js";
import {
  DraftOrdersPage,
  OrderInformation,
} from "../../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";
import { Page } from "@playwright/test";

const snapshotsPath: string[] = [
  "caseProgression",
  "solicitor",
  "draftParentalResponsibilityOrder",
];

const noToAllParams = {
  caseType: "C100" as solicitorCaseCreateType,
  isDraftAnOrder: true,
  orderType: "Parental responsibility order (C45A)" as OrderTypes,
  isOrderByConsent: false,
  wasOrderApprovedAtAHearing: false,
  hearing: undefined,
  judgeOrMagistratesTitle: undefined,
  judgeFullName: undefined,
  justicesLegalAdviserFullName: undefined,
  dateOrderMade: undefined,
  isOrderAboutAllTheChildren: false,
  allChildrenInOrder: [
    "Joe Doe",
    "Simon Anderson",
    "Lilly Anderson",
    "Charlotte Saxon",
    "Selena Lees",
  ],
  recitalsAndPreamble: undefined,
  directions: undefined,
  responsibleParentFullName: "Test Name",
  snapshotName: "draft-order-parental-responsibility-no-to-all",
  orderInformation: [
    {
      typeOfOrder: "Parental responsibility order (C45A)" as OrderTypes,
      welshDocument: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
      englishDocument: "Parental_Responsibility_Order_C45A_draft.pdf",
      otherDetails: {
        orderCreatedBy: "AAT Solicitor",
        status: "Drafted by Solicitor",
      },
      childrenList: [
        "Joe Doe (Child 1)",
        "Simon Anderson (Child 2)",
        "Lilly Anderson (Child 3)",
        "Charlotte Saxon (Child 4)",
        "Selena Lees (Child 5)",
      ],
      isOrderAboutAllTheChildren: false,
    },
  ] as OrderInformation[],
};

const yesToAllParams = {
  caseType: "C100" as solicitorCaseCreateType,
  isDraftAnOrder: true,
  orderType: "Parental responsibility order (C45A)" as OrderTypes,
  isOrderByConsent: true,
  wasOrderApprovedAtAHearing: true,
  hearing: "No hearings available",
  judgeOrMagistratesTitle: "His Honour Judge" as JudgeOrMagistrateTitles,
  judgeFullName: "Test judge name",
  justicesLegalAdviserFullName: "Test legal adviser",
  dateOrderMade: undefined, // already pre-populated
  isOrderAboutAllTheChildren: true,
  allChildrenInOrder: undefined,
  recitalsAndPreamble: "Test recitals",
  directions: "Test preamble",
  responsibleParentFullName: "Test Name",
  snapshotName: "draft-order-parental-responsibility-yes-to-all",
  orderInformation: [
    {
      typeOfOrder: "Parental responsibility order (C45A)" as OrderTypes,
      welshDocument: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
      englishDocument: "Parental_Responsibility_Order_C45A_draft.pdf",
      otherDetails: {
        orderMadeBy: "Test judge name",
        orderCreatedBy: "AAT Solicitor",
        status: "Drafted by Solicitor",
      },
      isOrderAboutAllTheChildren: true,
    },
  ] as OrderInformation[],
};

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a parental responsibility order tests", (): void => {
  let caseNumber: string;

  test.beforeEach(
    async ({ page, browser, caseEventUtils, navigationUtils }) => {
      caseNumber =
        await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
      await navigationUtils.goToCase(
        page,
        Config.manageCasesBaseURLCase,
        caseNumber,
      );
    },
  );

  [noToAllParams, yesToAllParams].forEach(
    ({
      caseType,
      isDraftAnOrder,
      orderType,
      isOrderByConsent,
      wasOrderApprovedAtAHearing,
      hearing,
      judgeOrMagistratesTitle,
      judgeFullName,
      justicesLegalAdviserFullName,
      dateOrderMade,
      isOrderAboutAllTheChildren,
      allChildrenInOrder,
      recitalsAndPreamble,
      directions,
      responsibleParentFullName,
      snapshotName,
      orderInformation,
    }) => {
      test(`Complete drafting Parental Responsibility order as solicitor with the following options: ${isOrderByConsent ? "Yes to all" : "No to all"} @accessibility @regression @nightly @visual`, async ({
        browser,
        summaryPage,
        draftAnOrder1Page,
        draftAnOrder2Page,
        draftAnOrder4Page,
        draftAnOrder8Page,
        draftAnOrder20Page,
        draftAnOrderSubmitPage,
        axeUtils,
        navigationUtils,
      }): Promise<void> => {
        await summaryPage.chooseEventFromDropdown("Draft an order");
        await draftAnOrder1Page.assertPageContents();
        await axeUtils.audit();
        await draftAnOrder1Page.selectWhatYouWantToDo(isDraftAnOrder);
        await draftAnOrder1Page.clickContinue();
        await draftAnOrder2Page.assertPageContents();
        await axeUtils.audit();
        await draftAnOrder2Page.selectOrderType(orderType);
        await draftAnOrder2Page.clickContinue();
        await draftAnOrder4Page.assertPageContents({ caseType, orderType });
        await axeUtils.audit();
        await draftAnOrder4Page.fillInFields({
          isOrderByConsent,
          wasOrderApprovedAtAHearing,
          hearing,
          judgeOrMagistratesTitle,
          judgeFullName,
          justicesLegalAdviserFullName,
          dateOrderMade,
          isOrderAboutAllTheChildren,
          allChildrenInOrder,
          recitalsAndPreamble,
          directions,
        });
        await draftAnOrder4Page.clickContinue();
        await draftAnOrder8Page.assertPageContents(orderType);
        await axeUtils.audit();
        await draftAnOrder8Page.fillInFields(responsibleParentFullName);
        await draftAnOrder8Page.clickContinue();
        await draftAnOrder20Page.assertPageContents(
          orderType,
          caseNumber,
          snapshotName,
          snapshotsPath,
        );
        await axeUtils.audit();
        await draftAnOrder20Page.clickContinue();
        await draftAnOrderSubmitPage.assertPageContents(
          snapshotsPath,
          snapshotName,
        );
        await axeUtils.audit();
        await draftAnOrderSubmitPage.clickSubmit();

        // open new window as court admin to check the draft orders tab
        const adminPage: Page = await navigationUtils.openNewBrowserWindow(
          browser,
          "caseWorker",
        );
        await navigationUtils.goToCase(
          adminPage,
          Config.manageCasesBaseURLCase,
          caseNumber,
        );
        const draftOrdersPage: DraftOrdersPage = new DraftOrdersPage(adminPage);
        await draftOrdersPage.goToPage();
        await draftOrdersPage.assertDraftOrders(orderInformation);
      });
    },
  );
});
