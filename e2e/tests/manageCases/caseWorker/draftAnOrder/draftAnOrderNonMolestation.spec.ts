import { test } from "../../../fixtures.ts";
import Config from "../../../../utils/config.utils.ts";
import config from "../../../../utils/config.utils.ts";
import {
  JudgeOrMagistrateTitles,
  NonMolestationRespondentMustNotDoOptions,
  OrderTypes,
} from "../../../../common/types.js";
import { OrderLengthOptions } from "../../../../pageObjects/pages/exui/orders/solicitor/draftAnOrder5.po.js";
import { HearingDetailsParams } from "../../../../pageObjects/components/exui/orderHearingDetails.component.js";
import { OrderInformation } from "../../../../pageObjects/pages/exui/caseView/draftOrders.po.js";

const noToAllParams = {
  isDraftAnOrder: true,
  orderType: "Non-molestation order (FL404A)" as OrderTypes,
  isOrderByConsent: false,
  wasOrderApprovedAtAHearing: false,
  hearing: undefined,
  judgeOrMagistratesTitle: undefined,
  judgeFullName: undefined,
  justicesLegalAdviserFullName: undefined,
  dateOrderMade: undefined,
  isOrderAboutTheChildren: false,
  allChildrenInOrder: undefined,
  recitalsAndPreamble: undefined,
  directions: undefined,
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
  snapshotName: "draft-order-non-molestation-no-to-all",
  orderInformation: [
    {
      typeOfOrder: "Non-molestation order (FL404A)" as OrderTypes,
      welshDocument: "welsh_non_molestation_order_fl404a_draft.pdf",
      englishDocument: "non_molestation_order_fl404a_draft.pdf",
      otherDetails: {
        orderCreatedBy: "AAT Solicitor",
        status: "Drafted by Solicitor",
      },
      isOrderAboutChildren: false,
    },
  ] as OrderInformation[],
};

const yesToAllParams = {
  isDraftAnOrder: true,
  orderType: "Non-molestation order (FL404A)" as OrderTypes,
  isOrderByConsent: true,
  wasOrderApprovedAtAHearing: true,
  hearing: "No hearings available",
  judgeOrMagistratesTitle: "Her Honour Judge" as JudgeOrMagistrateTitles,
  judgeFullName: "Test judge name",
  justicesLegalAdviserFullName: "Test legal adviser",
  dateOrderMade: undefined, // already pre-populated
  isOrderAboutTheChildren: true,
  allChildrenInOrder: ["Joe Doe", "Simon Anderson"],
  recitalsAndPreamble: "Test recitals",
  directions: "Test preamble",
  doesOrderMentionProperty: true,
  propertyAddress: "Test property address",
  respondentMustNotDoOptions: [
    "use or threaten violence against the applicant, and must not instruct, encourage or in any way suggest that any other person should do so",
    "must not intimidate, harass or pester the applicant, and must not instruct, encourage or in any way suggest that any other person should do so",
    "must not telephone, text, email or otherwise contact or attempt to contact the applicant",
    "must not damage, attempt to damage or threaten to damage any property owned by or in the possession or control of the applicant, and must not instruct, encourage or in any way suggest that any other person should do so",
    "must not damage, attempt to damage or threaten to damage the property or contents of the property, and must not instruct, encourage or in any way suggest that any other person should do so",
    "must not go to, enter or attempt to enter the property",
    "must not use or threaten violence against the relevant children, and must not instruct, encourage or in any way suggest that any other person should do so",
    "must not intimidate, harass or pester the relevant children, and must not instruct, encourage or in any way suggest that any other person should do so",
    "must not telephone, text, email or otherwise contact or attempt to contact the relevant children",
    "must not go to, enter or attempt to enter the school",
  ] as NonMolestationRespondentMustNotDoOptions[],
  mustNotContactApplicantFurtherDetails: "Test further details",
  mustNotEnterPropertyFurtherDetails: "Test further details",
  mustNotContactChildrenFurtherDetails: "Test further details",
  schoolName: "Test school",
  mustNotGoToSchoolFurtherDetails: "Test further details",
  orderLength: "Specific date and time" as OrderLengthOptions,
  specificDateAndTime: "14-10-2025 12:00 am",
  costsOfApplication: "Test costs of application",
  withNotice: true,
  hasJudgeProvidedHearingDetails: true,
  hearingDetails: {
    hearingType: "2nd Gatekeeping Appointment",
    hearingDateAndTime: "14-10-2025 12:00 am",
    estimatedTime: { days: "1", hours: "1", minutes: "1" },
    howDoesHearingNeedToTakePlace: "In person",
    willAllPartiesAttendTheSameWay: true,
    hearingLocation: undefined, // hearing location is pre-populated
    hearingWillBeBefore: "District judge",
    hearingJudge: "Ms Elizabeth Williams",
    joiningInstructionsForRemoteHearing: "Test joining instructions",
    additionalHearingInstructions: "Test additional hearing instructions",
  } as HearingDetailsParams,
  snapshotName: "draft-order-non-molestation-yes-to-all",
  orderInformation: [
    {
      typeOfOrder: "Non-molestation order (FL404A)" as OrderTypes,
      welshDocument: "welsh_non_molestation_order_fl404a_draft.pdf",
      englishDocument: "non_molestation_order_fl404a_draft.pdf",
      otherDetails: {
        orderMadeBy: "Test judge name",
        orderCreatedBy: "AAT Solicitor",
        status: "Drafted by Solicitor",
      },
      childrenList: ["Joe Doe","Simon Anderson"],
      isOrderAboutChildren: true,
    },
  ] as OrderInformation[],
};

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Draft a non molestation order tests", (): void => {
  let caseNumber: string;

  test.beforeEach(async ({ browser, caseEventUtils, navigationUtils }) => {
    caseNumber = await caseEventUtils.createDACase(browser);
    await navigationUtils.goToCase(config.manageCasesBaseURLCase, caseNumber);
  });

  [noToAllParams, yesToAllParams].forEach(
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
      snapshotName,
      orderInformation,
    }) => {
      test(`POM Test - no to everything ${withNotice ? "Yes to all" : "No to all"}`, async ({
        page,
        summaryPage,
        draftAnOrder1Page,
        draftAnOrder2Page,
        draftAnOrder4Page,
        draftAnOrder5Page,
        draftAnOrder16Page,
        draftAnOrder20Page,
        draftAnOrderSubmitPage,
        draftOrdersPage,
        axeUtils,
        idamLoginHelper,
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
        await draftAnOrder4Page.assertPageContents(orderType);
        await axeUtils.audit();
        await draftAnOrder4Page.fillInFields({
          isOrderByConsent,
          wasOrderApprovedAtAHearing,
          hearing,
          judgeOrMagistratesTitle,
          judgeFullName,
          justicesLegalAdviserFullName,
          dateOrderMade,
          isOrderAboutTheChildren,
          allChildrenInOrder,
          recitalsAndPreamble,
          directions,
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
        await draftAnOrder20Page.assertPageContents(
          orderType,
          caseNumber,
          snapshotName,
        );
        await axeUtils.audit();
        await draftAnOrder20Page.clickContinue();
        await draftAnOrderSubmitPage.assertPageContents(snapshotName);
        await axeUtils.audit();
        await draftAnOrderSubmitPage.clickSubmit();
        await summaryPage.alertBanner.assertEventAlert(
          caseNumber,
          "Draft an order",
        );

        // sign in as case worker and check draft order present on draft orders tab page
        await summaryPage.exuiHeader.signOut();
        await idamLoginHelper.signInLongLivedUser(
          page,
          "caseWorker",
          config.manageCasesBaseURLCase,
        );
        await navigationUtils.goToCase(
          config.manageCasesBaseURLCase,
          caseNumber,
        );
        await draftOrdersPage.goToPage();
        await draftOrdersPage.assertDraftOrders(orderInformation);
      });
    },
  );
});
