import { ChildArrangementsCreateOrderParams } from "../tests/manageCases/caseProgression/orders/C100/createAnOrder/caseWorker/createChildArrangementsOrder.spec.js";
import { AmendedDischargedVariedOrderParams } from "../tests/manageCases/caseProgression/orders/FL401/createAnOrder/caseWorker/createAmendedDischargedOrVariedOrder.spec.js";
import { OccupationOrderParams } from "../tests/manageCases/caseProgression/orders/FL401/createAnOrder/caseWorker/createOccupationOrder.spec.js";
import { C43A45AUploadOrderParams } from "../tests/manageCases/caseProgression/orders/C100/uploadAnOrder/uploadChildArrangementsOrderCaseworker.spec.js";
import { DomesticAbuseUploadOrderParams } from "../tests/manageCases/caseProgression/orders/FL401/uploadAnOrder/uploadDomesticAbuseOrderCaseworker.spec.ts";
import { SpecialGuardianshipCreateOrderParams } from "../tests/manageCases/caseProgression/orders/C100/createAnOrder/caseWorker/createSpecialGuardianshipOrder.spec.js";
import { C21CreateOrderParams } from "../tests/manageCases/caseProgression/orders/C100/createAnOrder/judge/createBlankOrderOrDirectionsOrder.spec.js";
import { C43UploadOrderParams } from "../tests/manageCases/caseProgression/orders/C100/uploadAnOrder/uploadChildArrangementsOrderJudge.spec.js";

export const ChildArrangementsCreateOrderScenarios: ChildArrangementsCreateOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "C100",
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      orderOption: "create order",
      isUploadAnOrder: false,
      manageOrder5Params: {
        orderType:
          "Child arrangements, specific issue or prohibited steps order (C43)",
        isOrderByConsent: false,
        wasOrderApprovedAtAHearing: false,
        hearing: undefined,
        judgeOrMagistratesTitle: "His Honour Judge",
        judgeFullName: "Test judge name",
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
      manageOrder24Params: {
        checkOption: "judgeOrLegalAdvisorCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
        judgeOrLegalAdviser: "judge",
        judgeName: "Ms Elizabeth Williams",
      },
      snapshotName: "child-arrangements-order-no-to-all",
      snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
      orderInformation: [
        {
          typeOfOrder:
            "Child arrangements, specific issue or prohibited steps order (C43)",
          welshDocument:
            "Welsh_ChildArrangements_Specific_Prohibited_Steps_C43_Draft.pdf",
          englishDocument:
            "ChildArrangements_Specific_Prohibited_Steps_C43_Draft.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL Demo Swansea HCA"
                : "PRL AAT AM Swansea HCA",
            status: "Created by Admin",
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
      isUploadAnOrder: false,
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
      manageOrder24Params: {
        checkOption: "judgeOrLegalAdvisorCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
        judgeOrLegalAdviser: "judge", ///options judge, legalAdvisor
        judgeName: "Ms Elizabeth Williams",
      },
      snapshotName: "child-arrangements-order-yes-to-all",
      snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
      orderInformation: [
        {
          typeOfOrder:
            "Child arrangements, specific issue or prohibited steps order (C43)",
          welshDocument:
            "Welsh_ChildArrangements_Specific_Prohibited_Steps_C43_Draft.pdf",
          englishDocument:
            "ChildArrangements_Specific_Prohibited_Steps_C43_Draft.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL Demo Swansea HCA"
                : "PRL AAT AM Swansea HCA",
            status: "Created by Admin",
          },
          childrenList: [
            "Joe Doe (Child 1)",
            "Simon Anderson (Child 2)",
            "Lilly Anderson (Child 3)",
            "Charlotte Saxon (Child 4)",
            "Selena Lees (Child 5)",
          ],
          isOrderAboutAllTheChildren: true,
        },
      ],
    },
  ];

export const AmendedDischargedVariedOrderScenarios: AmendedDischargedVariedOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "FL401",
      orderType: "Amended, discharged or varied order (FL404B)",
      orderOption: "create order",
      isUploadAnOrder: false,
      manageOrder5Params: {
        orderType: "Amended, discharged or varied order (FL404B)",
        isOrderByConsent: false,
        wasOrderApprovedAtAHearing: false,
        hearing: undefined,
        judgeOrMagistratesTitle: "His Honour Judge",
        judgeFullName: "Test judge name",
        justicesLegalAdviserFullName: undefined,
        dateOrderMade: undefined,
        isOrderAboutTheChildren: false,
        recitalsAndPreamble: undefined,
        directions: undefined,
      },
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
      manageOrder24Params: {
        checkOption: "noCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
        judgeOrLegalAdviser: undefined,
        judgeName: undefined,
      },
      manageOrder26Params: {
        orderType: "Interim", ////options passed could be either Interim, General or Final
        cafcassReport: undefined,
        cafcassInvolvement: undefined,
        serveOrderNow: true,
        whatToDoWithOrder: undefined, ////"Finalise the order, and save to serve later" or "Save the order as a draft"
      },
      manageOrder28Params: {
        servePersonally: false,
        responsibleToServeRespondent: undefined,
        serveCafcass: undefined,
        recipients: ["John Smith(Applicant)", "Elise Lynn (Respondent)"],
      },
      snapshotName: "amended-dischargedOrVaried-order-no-to-all",
      snapshotsPath: [
        "caseProgression",
        "orders",
        "amendedDischargedVariedOrder",
      ],
      orderInformation: [
        {
          Order: "Amended, discharged or varied order (FL404B)",
          typeOfOrder: "Interim",
          welshDocument:
            "welsh_amended_discharged_or_varied_order_fl404b_final.pdf",
          childrenList: undefined,
          isOrderAboutChildren: false,
          englishDocument:
            "amended_discharged_or_varied_order_fl404b_final.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL Demo Swansea HCA"
                : "PRL AAT AM Swansea HCA",
          },
          serveOrderDetails: {
            recipients: ["John Smith", "Elise Lynn"],
            serveCafcass: undefined,
            responsibleToServe: undefined,
          },
        },
      ],
    },
    {
      name: "Yes to all",
      caseType: "FL401",
      orderType: "Amended, discharged or varied order (FL404B)",
      orderOption: "create order",
      isUploadAnOrder: false,
      manageOrder5Params: {
        orderType: "Amended, discharged or varied order (FL404B)",
        isOrderByConsent: true,
        wasOrderApprovedAtAHearing: true,
        hearing: "No hearings available",
        judgeOrMagistratesTitle: "His Honour Judge",
        judgeFullName: "Test judge name",
        justicesLegalAdviserFullName: "Test legal adviser",
        dateOrderMade: undefined, // already pre-populated
        isOrderAboutTheChildren: true,
        allChildrenInOrder: ["Joe Doe", "Simon Anderson"],
        recitalsAndPreamble: "Test recitals",
        directions: "Test preamble",
      },
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
      manageOrder24Params: {
        checkOption: "noCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
        judgeOrLegalAdviser: undefined,
        judgeName: undefined,
      },
      manageOrder26Params: {
        orderType: "Interim", ////options passed could be either Interim, General or Final
        cafcassReport: undefined,
        cafcassInvolvement: undefined,
        serveOrderNow: true,
        whatToDoWithOrder: undefined, ////"Finalise the order, and save to serve later" or "Save the order as a draft"
      },
      manageOrder28Params: {
        servePersonally: true,
        responsibleToServeRespondent: "Court bailiff",
        serveCafcass: undefined,
        recipients: undefined,
      },
      snapshotName: "amended-dischargedOrVaried-order-yes-to-all",
      snapshotsPath: [
        "caseProgression",
        "orders",
        "amendedDischargedVariedOrder",
      ],
      orderInformation: [
        {
          Order: "Amended, discharged or varied order (FL404B)",
          typeOfOrder: "Interim",
          welshDocument:
            "welsh_amended_discharged_or_varied_order_fl404b_final.pdf",
          childrenList: ["Joe Doe", "Simon Anderson"],
          isOrderAboutChildren: true,
          englishDocument:
            "amended_discharged_or_varied_order_fl404b_final.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL Demo Swansea HCA"
                : "PRL AAT AM Swansea HCA",
          },
          serveOrderDetails: {
            recipients: ["Legal Solicitor (Applicant's legal representative)"],
            serveCafcass: undefined,
            responsibleToServe: "Court bailiff",
          },
        },
      ],
    },
  ];

export const OccupationOrderScenarios: OccupationOrderParams[] = [
  {
    name: "No to all",
    caseType: "FL401",
    orderType: "Occupation order (FL404)",
    orderOption: "create order",
    isUploadAnOrder: false,
    manageOrder5Params: {
      orderType: "Occupation order (FL404)",
      isOrderByConsent: false,
      wasOrderApprovedAtAHearing: false,
      hearing: undefined,
      judgeOrMagistratesTitle: "His Honour Judge",
      judgeFullName: "Test judge name",
      justicesLegalAdviserFullName: undefined,
      dateOrderMade: undefined,
      isOrderAboutTheChildren: false,
      recitalsAndPreamble: undefined,
      directions: undefined,
    },
    manageOrder12Params: {
      yesNoManageOrders: false,
      withOrWithoutNotice: false,
      postcode: "SW1A 1AA",
      address: "Buckingham Palace, London",
      date1: "10-06-2025 12:00 am",
      loremIpsum: "loremIpsum",
    },
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
    manageOrder24Params: {
      checkOption: "judgeOrLegalAdvisorCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
      judgeOrLegalAdviser: "judge",
      judgeName: "Ms Elizabeth Williams",
    },
    snapshotName: "occupation-order-no-to-all",
    snapshotsPath: ["caseProgression", "orders", "occupationOrder"],
    orderInformation: [
      {
        typeOfOrder: "Occupation order (FL404)",
        welshDocument: "welsh_occupation_order_FL404_draft.pdf",
        englishDocument: "occupation_order_FL404_draft.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy:
            process.env.MANAGE_CASES_TEST_ENV === "demo"
              ? "PRL Demo Swansea HCA"
              : "PRL AAT AM Swansea HCA",
          status: "Created by Admin",
        },
        isOrderAboutChildren: false,
      },
    ],
  },
  {
    name: "Yes to all",
    caseType: "FL401",
    orderType: "Occupation order (FL404)",
    orderOption: "create order",
    isUploadAnOrder: false,
    manageOrder5Params: {
      orderType: "Occupation order (FL404)",
      isOrderByConsent: true,
      wasOrderApprovedAtAHearing: true,
      hearing: "No hearings available",
      judgeOrMagistratesTitle: "His Honour Judge",
      judgeFullName: "Test judge name",
      justicesLegalAdviserFullName: "Test legal adviser",
      dateOrderMade: undefined, // already pre-populated
      isOrderAboutTheChildren: true,
      allChildrenInOrder: ["Joe Doe", "Simon Anderson"],
      recitalsAndPreamble: "Test recitals",
      directions: "Test preamble",
    },
    manageOrder12Params: {
      yesNoManageOrders: true,
      withOrWithoutNotice: true,
      postcode: "SW1A 1AA",
      address: "Buckingham Palace, London",
      date1: "10-06-2025 12:00 am",
      loremIpsum: "loremIpsum",
    },
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
    manageOrder24Params: {
      checkOption: "judgeOrLegalAdvisorCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
      judgeOrLegalAdviser: "judge", ///options judge, legalAdvisor
      judgeName: "Ms Elizabeth Williams",
    },
    snapshotName: "occupation-order-yes-to-all",
    snapshotsPath: ["caseProgression", "orders", "occupationOrder"],
    orderInformation: [
      {
        typeOfOrder: "Occupation order (FL404)",
        welshDocument: "welsh_occupation_order_FL404_draft.pdf",
        englishDocument: "occupation_order_FL404_draft.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy:
            process.env.MANAGE_CASES_TEST_ENV === "demo"
              ? "PRL Demo Swansea HCA"
              : "PRL AAT AM Swansea HCA",
          status: "Created by Admin",
        },
        childrenList: ["Joe Doe", "Simon Anderson"],
        isOrderAboutChildren: true,
      },
    ],
  },
];

export const C43A45AUploadOrderScenarios: C43A45AUploadOrderParams[] = [
  {
    name: "No to all",
    caseType: "C100",
    orderType: "Special guardianship order (C43A)",
    orderOption: "upload order",
    isUploadAnOrder: true,
    isOrderByConsent: false,
    manageOrder5Params: {
      orderType: "Special guardianship order (C43A)",
      isOrderByConsent: undefined,
      wasOrderApprovedAtAHearing: false,
      hearing: undefined,
      judgeOrMagistratesTitle: "His Honour Judge",
      judgeFullName: "Test judge name",
      justicesLegalAdviserFullName: undefined,
      dateOrderMade: undefined, // already pre-populated
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
    manageOrder24Params: {
      checkOption: "judgeOrLegalAdvisorCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
      judgeOrLegalAdviser: "judge", ///options judge, legalAdvisor
      judgeName: "Ms Elizabeth Williams",
    },
    snapshotName: "C43A-upload-order-no-to-all",
    snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
    orderInformation: [
      {
        typeOfOrder: "Special guardianship order (C43A)",
        englishDocument: "mockFile.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy:
            process.env.MANAGE_CASES_TEST_ENV === "demo"
              ? "PRL Demo Swansea HCA"
              : "PRL AAT AM Swansea HCA",
          status: "Created by Admin",
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
    orderType: "Parental responsibility order (C45A)",
    orderOption: "upload order",
    isUploadAnOrder: true,
    isOrderByConsent: true,
    manageOrder5Params: {
      orderType: "Parental responsibility order (C45A)",
      isOrderByConsent: undefined,
      wasOrderApprovedAtAHearing: true,
      hearing: "No hearings available",
      judgeOrMagistratesTitle: "His Honour Judge",
      judgeFullName: "Test judge name",
      justicesLegalAdviserFullName: "Test legal adviser",
      dateOrderMade: undefined, // already pre-populated
      isOrderAboutAllTheChildren: true,
    },
    manageOrder24Params: {
      checkOption: "judgeOrLegalAdvisorCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
      judgeOrLegalAdviser: "judge", ///options judge, legalAdvisor
      judgeName: "Ms Elizabeth Williams",
    },
    snapshotName: "C45A-upload-order-yes-to-all",
    snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
    orderInformation: [
      {
        typeOfOrder: "Parental responsibility order (C45A)",
        englishDocument: "mockFile.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy:
            process.env.MANAGE_CASES_TEST_ENV === "demo"
              ? "PRL Demo Swansea HCA"
              : "PRL AAT AM Swansea HCA",
          status: "Created by Admin",
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
];
export const FL404AFL406UploadOrderScenarios: DomesticAbuseUploadOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "FL401",
      orderType: "Non-molestation order (FL404A)",
      orderOption: "upload order",
      isUploadAnOrder: true,
      isOrderByConsent: false,
      manageOrder5Params: {
        orderType: "Non-molestation order (FL404A)",
        isOrderByConsent: undefined,
        wasOrderApprovedAtAHearing: false,
        hearing: undefined,
        judgeOrMagistratesTitle: "His Honour Judge",
        judgeFullName: "Test judge name",
        justicesLegalAdviserFullName: undefined,
        dateOrderMade: undefined, // already pre-populated
        isOrderAboutTheChildren: false,
        recitalsAndPreamble: undefined,
        directions: undefined,
      },
      manageOrder24Params: {
        checkOption: "managerCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
        judgeOrLegalAdviser: undefined, ///options judge, legalAdvisor
        judgeName: undefined,
      },
      manageOrder26Params: {
        orderType: undefined, ////options passed could be either Interim, General or Final
        cafcassReport: undefined,
        cafcassInvolvement: undefined,
        serveOrderNow: false,
        whatToDoWithOrder: undefined, ////finalizeSaveToServeLater or saveAsDraft
      },
      snapshotName: "FL404A-upload-order-no-to-all",
      snapshotsPath: ["caseProgression", "orders", "domesticAbuseUploadOrders"],
      orderInformation: [
        {
          typeOfOrder: "Non-molestation order (FL404A)",
          englishDocument: "mockFile.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL Demo Swansea HCA"
                : "PRL AAT AM Swansea HCA",
            status: "Created by Admin",
          },
          isOrderAboutChildren: false,
        },
      ],
    },
    {
      name: "Yes to all",
      caseType: "FL401",
      orderType: "Power of arrest (FL406)",
      orderOption: "upload order",
      isUploadAnOrder: true,
      isOrderByConsent: true,
      manageOrder5Params: {
        orderType: "Power of arrest (FL406)",
        isOrderByConsent: undefined,
        wasOrderApprovedAtAHearing: true,
        hearing: "No hearings available",
        judgeOrMagistratesTitle: "His Honour Judge",
        judgeFullName: "Test judge name",
        justicesLegalAdviserFullName: "Test legal adviser",
        dateOrderMade: undefined, // already pre-populated
        isOrderAboutTheChildren: true,
        allChildrenInOrder: ["Joe Doe", "Simon Anderson"],
      },
      manageOrder24Params: {
        checkOption: "noCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
        judgeOrLegalAdviser: undefined, ///options judge, legalAdvisor
        judgeName: undefined,
      },
      manageOrder26Params: {
        orderType: "Interim", ////options passed could be either Interim, General or Final
        cafcassReport: undefined,
        cafcassInvolvement: undefined,
        serveOrderNow: false,
        whatToDoWithOrder: "Save the order as a draft", ////"Finalise the order, and save to serve later" or "Save the order as a draft"
      },
      snapshotName: "FL406-upload-order-yes-to-all",
      snapshotsPath: ["caseProgression", "orders", "domesticAbuseUploadOrders"],
      orderInformation: [
        {
          typeOfOrder: "Power of arrest (FL406)",
          englishDocument: "mockFile.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL Demo Swansea HCA"
                : "PRL AAT AM Swansea HCA",
            status: "Created by Admin",
          },
          childrenList: ["Joe Doe", "Simon Anderson"],
          isOrderAboutChildren: true,
        },
      ],
    },
  ];
export const SpecialGuardianshipCreateOrderScenarios: SpecialGuardianshipCreateOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "C100",
      orderType: "Special guardianship order (C43A)",
      orderOption: "create order",
      isUploadAnOrder: false,
      manageOrder5Params: {
        orderType: "Special guardianship order (C43A)",
        isOrderByConsent: false,
        wasOrderApprovedAtAHearing: false,
        hearing: undefined,
        judgeOrMagistratesTitle: "His Honour Judge",
        judgeFullName: "Test judge name",
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
      manageOrder24Params: {
        checkOption: "noCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
        judgeOrLegalAdviser: undefined,
        judgeName: undefined,
      },
      manageOrder26Params: {
        orderType: "Interim", ////options passed could be either Interim, General or Final
        cafcassReport: false,
        cafcassInvolvement: false,
        serveOrderNow: true,
        whatToDoWithOrder: undefined, ////"Finalise the order, and save to serve later" or "Save the order as a draft"
      },
      manageOrder28Params: {
        servePersonally: false,
        responsibleToServeRespondent: undefined,
        serveCafcass: false,
        recipients: ["John Doe (Applicant 1)", "Jeremy Anderson (Applicant 2)"],
      },
      snapshotName: "create-order-special-guardianship-no-to-all",
      snapshotsPath: ["caseProgression", "orders", "specialGuardianshipOrder"],
      orderInformation: [
        {
          Order: "Special guardianship order (C43A)",
          typeOfOrder: "Interim",
          welshDocument: "Welsh_Special_Guardianship_Order_C43A.pdf",
          childrenList: [
            "Joe Doe",
            "Simon Anderson",
            "Lilly Anderson",
            "Charlotte Saxon",
            "Selena Lees",
          ],
          isOrderAboutAllTheChildren: false,
          englishDocument: "Special_Guardianship_Order_C43A.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL Demo Swansea HCA"
                : "PRL AAT AM Swansea HCA",
          },
          serveOrderDetails: {
            recipients: ["John Doe", "Jeremy Anderson"],
            serveCafcass: false,
            responsibleToServe: undefined,
          },
        },
      ],
    },
    {
      name: "Yes to all",
      caseType: "C100",
      orderType: "Special guardianship order (C43A)",
      orderOption: "create order",
      isUploadAnOrder: false,
      manageOrder5Params: {
        orderType: "Special guardianship order (C43A)",
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
      manageOrder24Params: {
        checkOption: "noCheck", ////options passed could be either noCheck or judgeOrLegalAdvisorCheck or managerCheck
        judgeOrLegalAdviser: undefined, ///options judge, legalAdvisor
        judgeName: undefined,
      },
      manageOrder26Params: {
        orderType: "Interim", ////options passed could be either Interim, General or Final
        cafcassReport: true,
        cafcassInvolvement: true,
        serveOrderNow: true,
        whatToDoWithOrder: undefined, ////"Finalise the order, and save to serve later" or "Save the order as a draft"
      },
      manageOrder28Params: {
        servePersonally: true,
        responsibleToServeRespondent: "Court bailiff",
        serveCafcass: true,
        recipients: undefined,
      },
      snapshotName: "create-order-special-guardianship-yes-to-all",
      snapshotsPath: ["caseProgression", "orders", "specialGuardianshipOrder"],
      orderInformation: [
        {
          Order: "Special guardianship order (C43A)",
          typeOfOrder: "Interim",
          welshDocument: "Welsh_Special_Guardianship_Order_C43A.pdf",
          childrenList: [
            "Joe Doe",
            "Simon Anderson",
            "Lilly Anderson",
            "Charlotte Saxon",
            "Selena Lees",
          ],
          isOrderAboutAllTheChildren: true,
          englishDocument: "Special_Guardianship_Order_C43A.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL Demo Swansea HCA"
                : "PRL AAT AM Swansea HCA",
          },
          serveOrderDetails: {
            recipients: ["Legal Solicitor (Applicant's legal representative)"],
            serveCafcass: true,
            responsibleToServe: "Court bailiff",
          },
        },
      ],
    },
  ];
export const C21CreateOrderScenarios: C21CreateOrderParams[] = [
  {
    name: "No to all",
    caseType: "C100",
    orderType: "Blank order or directions (C21)",
    orderOption: "create order",
    isUploadAnOrder: false,
    manageOrder4Params: {
      C21OrderSubType: "Blank order or directions (C21): application refused",
    },
    manageOrder5Params: {
      orderType: "Blank order or directions (C21)",
      isOrderByConsent: false,
      wasOrderApprovedAtAHearing: false,
      hearing: undefined,
      judgeOrMagistratesTitle: "His Honour Judge",
      judgeFullName: "Test judge name",
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
    manageOrder30Params: {
      serveApplication: false,
    },
    snapshotName: "C21-create-order-no-to-all",
    snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
    orderInformation: [
      {
        typeOfOrder: "Blank order or directions (C21)",
        welshDocument: "Welsh_Blank_Order_Directions_C21_Draft.pdf",
        englishDocument: "Blank_Order_Directions_C21_Draft.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy: "Elizabeth Williams",
          status: "Created by Judge",
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
    orderType: "Blank order or directions (C21)",
    orderOption: "create order",
    isUploadAnOrder: false,
    manageOrder4Params: {
      C21OrderSubType: "Blank order or directions (C21): application refused",
    },
    manageOrder5Params: {
      orderType: "Blank order or directions (C21)",
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
    manageOrder30Params: {
      serveApplication: true,
    },
    snapshotName: "C21-create-order-yes-to-all",
    snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
    orderInformation: [
      {
        typeOfOrder: "Blank order or directions (C21)",
        welshDocument: "Welsh_Blank_Order_Directions_C21_Draft.pdf",
        englishDocument: "Blank_Order_Directions_C21_Draft.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy: "Elizabeth Williams",
          status: "Created by Judge",
        },
        childrenList: [
          "Joe Doe (Child 1)",
          "Simon Anderson (Child 2)",
          "Lilly Anderson (Child 3)",
          "Charlotte Saxon (Child 4)",
          "Selena Lees (Child 5)",
        ],
        isOrderAboutAllTheChildren: true,
      },
    ],
  },
];
export const C43UploadOrderScenarios: C43UploadOrderParams[] = [
  {
    name: "No to all",
    caseType: "C100",
    orderType:
      "Child arrangements, specific issue or prohibited steps order (C43)",
    orderOption: "upload order",
    isUploadAnOrder: true,
    isOrderByConsent: false,
    manageOrder5Params: {
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isOrderByConsent: undefined,
      wasOrderApprovedAtAHearing: false,
      hearing: undefined,
      judgeOrMagistratesTitle: "His Honour Judge",
      judgeFullName: "Test judge name",
      justicesLegalAdviserFullName: undefined,
      dateOrderMade: undefined, // already pre-populated
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
    manageOrder30Params: {
      serveApplication: false,
    },
    snapshotName: "C43-upload-order-no-to-all",
    snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
    orderInformation: [
      {
        typeOfOrder:
          "Child arrangements, specific issue or prohibited steps order (C43)",
        englishDocument: "mockFile.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy: "Elizabeth Williams",
          status: "Created by Judge",
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
    orderOption: "upload order",
    isUploadAnOrder: true,
    isOrderByConsent: true,
    manageOrder5Params: {
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isOrderByConsent: undefined,
      wasOrderApprovedAtAHearing: true,
      hearing: "No hearings available",
      judgeOrMagistratesTitle: "His Honour Judge",
      judgeFullName: "Test judge name",
      justicesLegalAdviserFullName: "Test legal adviser",
      dateOrderMade: undefined, // already pre-populated
      isOrderAboutAllTheChildren: true,
    },
    manageOrder10Params: {
      childArrangementOrderType: "Spend time with order",
      allC43OrdersSubType: [
        "Child Arrangements Order",
        "Prohibited Steps Order",
        "Specific Issue Order",
      ],
    },
    manageOrder30Params: {
      serveApplication: false,
    },
    snapshotName: "C45A-upload-order-yes-to-all",
    snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
    orderInformation: [
      {
        typeOfOrder:
          "Child arrangements, specific issue or prohibited steps order (C43)",
        englishDocument: "mockFile.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy: "Elizabeth Williams",
          status: "Created by Judge",
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
];
