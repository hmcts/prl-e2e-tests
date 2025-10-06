import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import { DraftAnOrder } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder.ts";
import config from "../../../../utils/config.utils.ts";
import { OrderTypes } from "../../../../common/types.js";
import { OrderLengthOptions } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder5.po.js";
import { HearingDetailsParams } from "../../../../pageObjects/components/exui/orderHearingDetails.component.js";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });
// Just have two tests one which fills out as little as possible and one which fills out as much as possible
test.describe("Draft a non molestation order tests", (): void => {
  let caseNumber: string;

  test.beforeEach(async ({ browser, caseEventUtils, navigationUtils }) => {
    caseNumber = await caseEventUtils.createDACase(browser);
    await navigationUtils.goToCase(
      config.manageCasesBaseURLCase,
      caseNumber,
      "summary",
    );
  });

  test(`Complete Drafting a non molestation order as a solicitor with the following options:
  No to all options,
  No respondent checkbox actions ticked,
  Order in force until specific date and time,
  Not accessibility testing,
  Not error message testing. @regression @visual`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: false,
      howLongWillOrderBeInForce: "specifiedDateAndTime",
      willAllPartiesAttendHearing: false,
      browser: browser,
      caseRef: caseNumber,
      checkPdf: true,
      isUploadOrder: false,
    });
  });

  test(`Complete Drafting a non molestation order as a solicitor with the following options:
  Yes to all options,
  All respondent checkbox actions ticked,
  Order in force until specific date and time,
  Not Accessibility testing,
  Not error message testing. @regression @visual`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: false,
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: true,
      howLongWillOrderBeInForce: "specifiedDateAndTime",
      willAllPartiesAttendHearing: true,
      browser: browser,
      caseRef: caseNumber,
      checkPdf: true,
      isUploadOrder: false,
    });
  });

  test(`Complete Drafting a non molestation order as a solicitor with the following options:
  No to all options,
  No respondent checkbox actions ticked,
  Order in force until no fixed end date,
  Accessibility testing,
  Not error message testing. @accessibility @nightly @visual`, async ({
    page,
    browser,
  }): Promise<void> => {
    await DraftAnOrder.draftAnOrder({
      page: page,
      errorMessaging: false,
      accessibilityTest: true,
      caseType: "FL401",
      orderType: "nonMolestation",
      yesNoToAll: false,
      howLongWillOrderBeInForce: "noEndDate",
      willAllPartiesAttendHearing: false,
      browser: browser,
      caseRef: caseNumber,
      checkPdf: true,
      isUploadOrder: false,
    });
  });

  [
    {
      isDraftAnOrder: true,
      orderType: "Non-molestation order (FL404A)" as OrderTypes,
      isOrderByConsent: false,
      wasOrderApprovedAtAHearing: false,
      judgeOrMagistratesTitle: undefined,
      judgeFullName: undefined,
      justicesLegalAdviserFullName: undefined,
      dateOrderMade: undefined,
      isOrderAboutTheChildren: false,
      recitalsAndPreamble: undefined,
      directions: undefined,
      allChildrenInOrder: undefined,
      hearing: undefined,
      doesOrderMentionProperty: false,
      propertyAddress: undefined,
      respondentMustNotDoOptions: undefined,
      mustNotContactApplicantFurtherDetails: undefined,
      mustNotEnterPropertyFurtherDetails: undefined,
      mustNotContactChildrenFurtherDetails: undefined,
      schoolName: undefined,
      mustNotGoToSchoolFurtherDetails: undefined,
      orderLength: "No fixed end date" as OrderLengthOptions,
      specificDateAndTime: undefined,
      costsOfApplication: undefined,
      withNotice: false,
      hasJudgeProvidedHearingDetails: false,
      hearingDetails: undefined as HearingDetailsParams,
    },
  ].forEach(
    ({
      isDraftAnOrder,
      orderType,
      isOrderByConsent,
      wasOrderApprovedAtAHearing,
      judgeOrMagistratesTitle,
      judgeFullName,
      justicesLegalAdviserFullName,
      dateOrderMade,
      isOrderAboutTheChildren,
      recitalsAndPreamble,
      directions,
      allChildrenInOrder,
      hearing,
      doesOrderMentionProperty,
      propertyAddress,
      respondentMustNotDoOptions,
      mustNotContactApplicantFurtherDetails,
      mustNotEnterPropertyFurtherDetails,
      mustNotContactChildrenFurtherDetails,
      schoolName,
      mustNotGoToSchoolFurtherDetails,
      orderLength,
      specificDateAndTime,
      costsOfApplication,
      withNotice,
      hasJudgeProvidedHearingDetails,
      hearingDetails,
    }) => {
      test(`POM Test - no to everything`, async ({
        summaryPage,
        draftAnOrder1Page,
        draftAnOrder2Page,
        draftAnOrder4Page,
        draftAnOrder5Page,
        draftAnOrder16Page,
        axeUtils,
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
        await draftAnOrder4Page.assertPageContents(orderType);
        await axeUtils.audit();
        await draftAnOrder4Page.fillInFields({
          isOrderByConsent,
          wasOrderApprovedAtAHearing,
          judgeOrMagistratesTitle,
          judgeFullName,
          justicesLegalAdviserFullName,
          dateOrderMade,
          isOrderAboutTheChildren,
          recitalsAndPreamble,
          directions,
          allChildrenInOrder,
          hearing,
        });
        await draftAnOrder4Page.clickContinue();
        await draftAnOrder5Page.assertPageContents(orderType);
        await axeUtils.audit();
        await draftAnOrder5Page.fillInFields({
          doesOrderMentionProperty,
          propertyAddress,
          respondentMustNotDoOptions,
          mustNotContactApplicantFurtherDetails,
          mustNotEnterPropertyFurtherDetails,
          mustNotContactChildrenFurtherDetails,
          schoolName,
          mustNotGoToSchoolFurtherDetails,
          orderLength,
          specificDateAndTime,
          costsOfApplication,
          withNotice,
        });
        await draftAnOrder5Page.clickContinue();
        await draftAnOrder16Page.assertPageContents(orderType);
        await axeUtils.audit();
        await draftAnOrder16Page.fillInFields({
          hasJudgeProvidedHearingDetails,
          hearingDetails,
        });
        await draftAnOrder16Page.clickContinue();
        // TODO: add rest of the test
      });
    },
  );
});
