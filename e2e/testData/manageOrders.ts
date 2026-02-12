import { ChildArrangementsOrderParams } from "../tests/manageCases/caseProgression/orders/C100/createAnOrder/caseWorker/createChildArrangementsOrder.spec.js";

export const ChildArrangementsOrderScenarios: ChildArrangementsOrderParams[] = [
  {
    name: "No to all",
    caseType: "C100",
    orderType:
      "Child arrangements, specific issue or prohibited steps order (C43)",
    orderOption: "create order",
    isUploadAnOrder: true,
    manageOrder5Params: {
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
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
    },
    manageOrder10Params: {
      childArrangementOrderType: "Spend time with order",
      allC43OrdersSubType: [
        "Child Arrangements Order",
        "Prohibited Steps Order",
        "Specific Issue Order",
      ],
    },
    responsibleParentFullName: "Test Name",
    manageOrder19Params: {
      isDateReservedWithListAssist: true,
      hearingDetails: {
        hearingType: "2nd Gatekeeping Appointment",
        hearingDateAndTime: "14-10-2025 12:00 am",
        estimatedTime: { days: "1", hours: "1", minutes: "1" },
        howDoesHearingNeedToTakePlace: "In Person",
        willAllPartiesAttendTheSameWay: true,
        hearingLocation: undefined, // hearing location is pre-populated
        hearingWillBeBefore: "District judge",
        hearingJudge: "Ms Elizabeth Williams",
        joiningInstructionsForRemoteHearing: "Test joining instructions",
        additionalHearingInstructions: "Test additional hearing instructions",
      },
    },
    snapshotName: "child-arrangements-order-no-to-all",
    snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
    orderInformation: [
      {
        typeOfOrder:
          "Child arrangements, specific issue or prohibited steps order (C43)",
        welshDocument: "Welsh_Child_Arrangements_Order_C43_draft.pdf",
        englishDocument: "Child_Arrangements_Order_C43_draft.pdf",
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
    ],
  },
  {
    name: "Yes to all",
    caseType: "C100",
    orderType:
      "Child arrangements, specific issue or prohibited steps order (C43)",
    orderOption: "create order",
    isUploadAnOrder: true,
    manageOrder5Params: {
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isOrderByConsent: true,
      wasOrderApprovedAtAHearing: true,
      hearing: "No hearings available",
      judgeOrMagistratesTitle: "His Honour Judge",
      judgeFullName: "Test judge name",
      justicesLegalAdviserFullName: "Test legal adviser",
      dateOrderMade: undefined, // already pre-populated
      isOrderAboutAllTheChildren: true,
      allChildrenInOrder: undefined,
      recitalsAndPreamble: "Test recitals",
      directions: "Test preamble",
    },
    manageOrder10Params: {
      childArrangementOrderType: "Spend time with order",
      allC43OrdersSubType: [
        "Child Arrangements Order",
        "Prohibited Steps Order",
        "Specific Issue Order",
      ],
    },
    responsibleParentFullName: "Test Name",
    manageOrder19Params: {
      isDateReservedWithListAssist: true,
      hearingDetails: {
        hearingType: "2nd Gatekeeping Appointment",
        hearingDateAndTime: "14-10-2025 12:00 am",
        estimatedTime: { days: "1", hours: "1", minutes: "1" },
        howDoesHearingNeedToTakePlace: "In Person",
        willAllPartiesAttendTheSameWay: true,
        hearingLocation: undefined, // hearing location is pre-populated
        hearingWillBeBefore: "District judge",
        hearingJudge: "Ms Elizabeth Williams",
        joiningInstructionsForRemoteHearing: "Test joining instructions",
        additionalHearingInstructions: "Test additional hearing instructions",
      },
    },
    snapshotName: "child-arrangements-order-yes-to-all",
    snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
    orderInformation: [
      {
        typeOfOrder:
          "Child arrangements, specific issue or prohibited steps order (C43)",
        welshDocument: "Welsh_Child_Arrangements_Order_C43_draft.pdf",
        englishDocument: "Child_Arrangements_Order_C43_draft.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy: "AAT Solicitor",
          status: "Drafted by Solicitor",
        },
        isOrderAboutAllTheChildren: true,
      },
    ],
  },
];
