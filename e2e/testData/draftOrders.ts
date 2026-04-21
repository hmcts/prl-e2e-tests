import { ParentalResponsibilityDraftOrderParams } from "../tests/manageCases/caseProgression/orders/C100/createAnOrder/solicitor/draftAnParentalResponsibilityOrder.spec.js";
import { RemoveDraftNonMolestationOrderParams } from "../tests/manageCases/caseProgression/orders/FL401/removeDraftOrder/removeDraftNonMolestationOrder.spec.js";
import { RemoveDraftParentalResponsibilityOrderParams } from "../tests/manageCases/caseProgression/orders/C100/removeDraftOrder/removeDraftParentalResponsibilityOrder.spec.js";
import { NonMolestationDraftOrderParams } from "../tests/manageCases/caseProgression/orders/FL401/createAnOrder/solicitor/draftAnOrderNonMolestation.spec.js";
import {
  C21UploadOrderParams,
  ChildArrangementsUploadOrderParams,
} from "../tests/manageCases/caseProgression/orders/C100/uploadAnOrder/uploadChildArrangementsOrderSolicitor.spec.js";
import { DomesticAbuseUploadOrderParams } from "../tests/manageCases/caseProgression/orders/FL401/uploadAnOrder/uploadDomesticAbuseOrderSolicitor.spec.js";
import { SpecialGuardianshipDraftOrderParams } from "../tests/manageCases/caseProgression/orders/C100/createAnOrder/solicitor/draftAnSpecialGuardianshipOrder.spec.js";

export const NonMolestationDraftOrderScenarios: NonMolestationDraftOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "FL401",
      orderType: "Non-molestation order (FL404A)",
      isDraftAnOrder: true,
      draftAnOrder5Params: {
        orderType: "Non-molestation order (FL404A)",
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
      },
      draftAnOrder6Params: {
        doesOrderMentionProperty: false,
        propertyAddress: undefined,
        respondentMustNotDoOptions: undefined,
        mustNotContactApplicantFurtherDetails: undefined,
        mustNotEnterPropertyFurtherDetails: undefined,
        mustNotContactChildrenFurtherDetails: undefined,
        schoolName: undefined,
        mustNotGoToSchoolFurtherDetails: undefined,
        orderLength: "No fixed end date",
        specificDateAndTime: undefined,
        costsOfApplication: undefined,
        withNotice: false,
      },
      draftAnOrder17Params: {
        hasJudgeProvidedHearingDetails: false,
        hearingDetails: undefined,
      },
      snapshotName: "draft-order-non-molestation-no-to-all",
      snapshotsPath: ["caseProgression", "orders", "draftNonMolestationOrder"],
      orderInformation: [
        {
          typeOfOrder: "Non-molestation order (FL404A)",
          welshDocument: "welsh_non_molestation_order_fl404a_draft.pdf",
          englishDocument: "non_molestation_order_fl404a_draft.pdf",
          otherDetails: {
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
            status: "Drafted by Solicitor",
          },
          isOrderAboutChildren: false,
        },
      ],
    },
    {
      name: "Yes to all",
      caseType: "FL401",
      orderType: "Non-molestation order (FL404A)",
      isDraftAnOrder: true,
      draftAnOrder5Params: {
        orderType: "Non-molestation order (FL404A)",
        isOrderByConsent: true,
        wasOrderApprovedAtAHearing: true,
        hearing: "No hearings available",
        judgeOrMagistratesTitle: "Her Honour Judge",
        judgeFullName: "Test judge name",
        justicesLegalAdviserFullName: "Test legal adviser",
        dateOrderMade: undefined, // already pre-populated
        isOrderAboutTheChildren: true,
        allChildrenInOrder: ["Joe Doe", "Simon Anderson"],
        recitalsAndPreamble: "Test recitals",
        directions: "Test preamble",
      },
      draftAnOrder6Params: {
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
        ],
        mustNotContactApplicantFurtherDetails: "Test further details",
        mustNotEnterPropertyFurtherDetails: "Test further details",
        mustNotContactChildrenFurtherDetails: "Test further details",
        schoolName: "Test school",
        mustNotGoToSchoolFurtherDetails: "Test further details",
        orderLength: "Specific date and time",
        specificDateAndTime: "14-10-2025 12:00 am",
        costsOfApplication: "Test costs of application",
        withNotice: true,
      },
      draftAnOrder17Params: {
        hasJudgeProvidedHearingDetails: true,
        hearingDetails: {
          hearingType: "2nd Gatekeeping Appointment",
          hearingDateAndTime: "14-10-2025 12:00 am",
          estimatedTime: { days: "1", hours: "1", minutes: "1" },
          howDoesHearingNeedToTakePlace: "In Person",
          willAllPartiesAttendTheSameWay: false,
          partiesAttendanceMethods: [
            {
              partyName: "John Smith (Applicant) (Optional)",
              attendanceMethod: "In Person",
            },
            {
              partyName: "Legal Solicitor (Applicant solicitor) (Optional)",
              attendanceMethod: "In Person",
            },
            {
              partyName: "Elise Lynn (Respondent) (Optional)",
              attendanceMethod: "In Person",
            },
            {
              partyName: "Local authority (Optional)",
              attendanceMethod: "Not in Attendance",
            },
          ],
          hearingLocation: undefined, // hearing location is pre-populated
          hearingWillBeBefore: "District judge",
          hearingJudge: "Ms Elizabeth Williams",
          joiningInstructionsForRemoteHearing: "Test joining instructions",
          additionalHearingInstructions: "Test additional hearing instructions",
        },
      },
      snapshotName: "draft-order-non-molestation-yes-to-all",
      snapshotsPath: ["caseProgression", "orders", "draftNonMolestationOrder"],
      orderInformation: [
        {
          typeOfOrder: "Non-molestation order (FL404A)",
          welshDocument: "welsh_non_molestation_order_fl404a_draft.pdf",
          englishDocument: "non_molestation_order_fl404a_draft.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
            status: "Drafted by Solicitor",
          },
          childrenList: ["Joe Doe", "Simon Anderson"],
          isOrderAboutChildren: true,
        },
      ],
    },
  ];

export const ParentalResponsibilityOrderScenarios: ParentalResponsibilityDraftOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "C100",
      orderType: "Parental responsibility order (C45A)",
      isDraftAnOrder: true,
      draftAnOrder5Params: {
        orderType: "Parental responsibility order (C45A)",
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
      responsibleParentFullName: "Test Name",
      snapshotName: "draft-order-parental-responsibility-no-to-all",
      snapshotsPath: [
        "caseProgression",
        "orders",
        "draftParentalResponsibilityOrder",
      ],
      orderInformation: [
        {
          typeOfOrder: "Parental responsibility order (C45A)",
          welshDocument: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
          englishDocument: "Parental_Responsibility_Order_C45A_draft.pdf",
          otherDetails: {
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
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
      orderType: "Parental responsibility order (C45A)",
      isDraftAnOrder: true,
      draftAnOrder5Params: {
        orderType: "Parental responsibility order (C45A)",
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
      responsibleParentFullName: "Test Name",
      snapshotName: "draft-order-parental-responsibility-yes-to-all",
      snapshotsPath: [
        "caseProgression",
        "orders",
        "draftParentalResponsibilityOrder",
      ],
      orderInformation: [
        {
          typeOfOrder: "Parental responsibility order (C45A)",
          welshDocument: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
          englishDocument: "Parental_Responsibility_Order_C45A_draft.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
            status: "Drafted by Solicitor",
          },
          isOrderAboutAllTheChildren: true,
        },
      ],
    },
  ];

export const RemoveDraftNonMolestationOrderScenarios: RemoveDraftNonMolestationOrderParams[] =
  [
    {
      draftOrderParams: {
        name: "No to all",
        caseType: "FL401",
        orderType: "Non-molestation order (FL404A)",
        isDraftAnOrder: true,
        draftAnOrder5Params: {
          orderType: "Non-molestation order (FL404A)",
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
        },
        draftAnOrder6Params: {
          doesOrderMentionProperty: false,
          propertyAddress: undefined,
          respondentMustNotDoOptions: undefined,
          mustNotContactApplicantFurtherDetails: undefined,
          mustNotEnterPropertyFurtherDetails: undefined,
          mustNotContactChildrenFurtherDetails: undefined,
          schoolName: undefined,
          mustNotGoToSchoolFurtherDetails: undefined,
          orderLength: "No fixed end date",
          specificDateAndTime: undefined,
          costsOfApplication: undefined,
          withNotice: false,
        },
        draftAnOrder17Params: {
          hasJudgeProvidedHearingDetails: false,
          hearingDetails: undefined,
        },
        snapshotName: "draft-order-non-molestation-no-to-all",
        snapshotsPath: [
          "caseProgression",
          "orders",
          "draftNonMolestationOrder",
        ],
        orderInformation: [
          {
            typeOfOrder: "Non-molestation order (FL404A)",
            welshDocument: "welsh_non_molestation_order_fl404a_draft.pdf",
            englishDocument: "non_molestation_order_fl404a_draft.pdf",
            otherDetails: {
              orderCreatedBy:
                process.env.MANAGE_CASES_TEST_ENV === "demo"
                  ? "PRL DEMO ORG1 Solicitor 2"
                  : "AAT Solicitor",
              status: "Drafted by Solicitor",
            },
            isOrderAboutChildren: false,
          },
        ],
      },
      removalReason: "Test removal reason",
      snapshotsPath: ["caseProgression", "orders", "removeDraftOrder"],
      snapshotName: "remove-draft-non-molestation-order",
    },
  ];

export const RemoveDraftParentalResponsibilityOrderScenarios: RemoveDraftParentalResponsibilityOrderParams[] =
  [
    {
      draftOrderParams: {
        name: "No to all",
        caseType: "C100",
        orderType: "Parental responsibility order (C45A)",
        isDraftAnOrder: true,
        draftAnOrder5Params: {
          orderType: "Parental responsibility order (C45A)",
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
        responsibleParentFullName: "Test Name",
        snapshotName: "draft-order-parental-responsibility-no-to-all",
        snapshotsPath: [
          "caseProgression",
          "orders",
          "draftParentalResponsibilityOrder",
        ],
        orderInformation: [
          {
            typeOfOrder: "Parental responsibility order (C45A)",
            welshDocument: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
            englishDocument: "Parental_Responsibility_Order_C45A_draft.pdf",
            otherDetails: {
              orderCreatedBy:
                process.env.MANAGE_CASES_TEST_ENV === "demo"
                  ? "PRL DEMO ORG1 Solicitor 2"
                  : "AAT Solicitor",
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
      removalReason: "Test removal reason",
      snapshotsPath: ["caseProgression", "orders", "removeDraftOrder"],
      snapshotName: "remove-draft-parental-responsibility-order",
    },
  ];

export const ChildArrangementsUploadOrderScenarios: ChildArrangementsUploadOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "C100",
      orderType:
        "Child arrangements, specific issue or prohibited steps order (C43)",
      isDraftAnOrder: false, //true for create order
      isOrderByConsent: false,
      draftAnOrder5Params: {
        orderType:
          "Child arrangements, specific issue or prohibited steps order (C43)",
        isOrderByConsent: undefined,
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
      draftAnOrder8Params: {
        childArrangementOrderType: "Spend time with order",
        allC43OrdersSubType: [
          "Child Arrangements Order",
          "Prohibited Steps Order",
          "Specific Issue Order",
        ],
      },
      snapshotName: "child-arrangements-upload-order-no-to-all",
      snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
      orderInformation: [
        {
          typeOfOrder:
            "Child arrangements, specific issue or prohibited steps order (C43)",
          englishDocument: "mockFile.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
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
      isDraftAnOrder: false, //true for create order
      isOrderByConsent: true,
      draftAnOrder5Params: {
        orderType:
          "Child arrangements, specific issue or prohibited steps order (C43)",
        isOrderByConsent: undefined,
        wasOrderApprovedAtAHearing: true,
        hearing: "No hearings available",
        judgeOrMagistratesTitle: "His Honour Judge",
        judgeFullName: "Test judge name",
        justicesLegalAdviserFullName: "Test legal adviser",
        dateOrderMade: undefined,
        isOrderAboutAllTheChildren: true,
        allChildrenInOrder: undefined,
        recitalsAndPreamble: undefined,
        directions: undefined,
      },
      draftAnOrder8Params: {
        childArrangementOrderType: "Spend time with order",
        allC43OrdersSubType: [
          "Child Arrangements Order",
          "Prohibited Steps Order",
          "Specific Issue Order",
        ],
      },
      snapshotName: "child-arrangements-upload-order-yes-to-all",
      snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
      orderInformation: [
        {
          typeOfOrder:
            "Child arrangements, specific issue or prohibited steps order (C43)",
          englishDocument: "mockFile.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
            status: "Drafted by Solicitor",
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
export const C21UploadOrderScenarios: C21UploadOrderParams[] = [
  {
    name: "No to all",
    caseType: "C100",
    orderType: "Blank order or directions (C21)",
    isDraftAnOrder: false, //true for create order
    isOrderByConsent: false,
    draftAnOrder4Params: {
      C21OrderSubType: "Blank order or directions (C21): application refused",
    },
    draftAnOrder5Params: {
      orderType: "Blank order or directions (C21)",
      isOrderByConsent: undefined,
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
    snapshotName: "C21-upload-order-no-to-all",
    snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
    orderInformation: [
      {
        typeOfOrder: "Blank order or directions (C21)",
        englishDocument: "mockFile.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy:
            process.env.MANAGE_CASES_TEST_ENV === "demo"
              ? "PRL DEMO ORG1 Solicitor 2"
              : "AAT Solicitor",
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
    orderType: "Blank order or directions (C21)",
    isDraftAnOrder: false, //true for create order
    isOrderByConsent: true,
    draftAnOrder4Params: {
      C21OrderSubType: "Blank order or directions (C21): application refused",
    },
    draftAnOrder5Params: {
      orderType: "Blank order or directions (C21)",
      isOrderByConsent: undefined,
      wasOrderApprovedAtAHearing: true,
      hearing: "No hearings available",
      judgeOrMagistratesTitle: "His Honour Judge",
      judgeFullName: "Test judge name",
      justicesLegalAdviserFullName: "Test legal adviser",
      dateOrderMade: undefined,
      isOrderAboutAllTheChildren: true,
      allChildrenInOrder: undefined,
      recitalsAndPreamble: undefined,
      directions: undefined,
    },
    snapshotName: "C21-upload-order-yes-to-all",
    snapshotsPath: ["caseProgression", "orders", "childArrangementsOrder"],
    orderInformation: [
      {
        typeOfOrder: "Blank order or directions (C21)",
        englishDocument: "mockFile.pdf",
        otherDetails: {
          orderMadeBy: "Test judge name",
          orderCreatedBy:
            process.env.MANAGE_CASES_TEST_ENV === "demo"
              ? "PRL DEMO ORG1 Solicitor 2"
              : "AAT Solicitor",
          status: "Drafted by Solicitor",
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
export const FL404BFL404UploadOrderScenarios: DomesticAbuseUploadOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "FL401",
      orderType: "Amended, discharged or varied order (FL404B)",
      isDraftAnOrder: false, //true for create order
      isOrderByConsent: false,
      draftAnOrder5Params: {
        orderType: "Amended, discharged or varied order (FL404B)",
        isOrderByConsent: undefined,
        wasOrderApprovedAtAHearing: false,
        hearing: undefined,
        judgeOrMagistratesTitle: "His Honour Judge",
        judgeFullName: "Test judge name",
        justicesLegalAdviserFullName: undefined,
        dateOrderMade: undefined,
        isOrderAboutTheChildren: false,
        allChildrenInOrder: undefined,
        recitalsAndPreamble: undefined,
        directions: undefined,
      },
      snapshotName: "FL404B-upload-order-no-to-all",
      snapshotsPath: ["caseProgression", "orders", "domesticAbuseUploadOrders"],
      orderInformation: [
        {
          typeOfOrder: "Amended, discharged or varied order (FL404B)",
          englishDocument: "mockFile.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
            status: "Drafted by Solicitor",
          },
          isOrderAboutChildren: false,
        },
      ],
    },
    {
      name: "Yes to all",
      caseType: "FL401",
      orderType: "Occupation order (FL404)",
      isDraftAnOrder: false, //true for create order
      isOrderByConsent: true,
      draftAnOrder5Params: {
        orderType: "Occupation order (FL404)",
        isOrderByConsent: undefined,
        wasOrderApprovedAtAHearing: true,
        hearing: "No hearings available",
        judgeOrMagistratesTitle: "His Honour Judge",
        judgeFullName: "Test judge name",
        justicesLegalAdviserFullName: "Test legal adviser",
        dateOrderMade: undefined,
        isOrderAboutTheChildren: true,
        allChildrenInOrder: ["Joe Doe", "Simon Anderson"],
        recitalsAndPreamble: undefined,
        directions: undefined,
      },
      snapshotName: "FL404-upload-order-yes-to-all",
      snapshotsPath: ["caseProgression", "orders", "domesticAbuseUploadOrders"],
      orderInformation: [
        {
          typeOfOrder: "Occupation order (FL404)",
          englishDocument: "mockFile.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
            status: "Drafted by Solicitor",
          },
          childrenList: ["Joe Doe", "Simon Anderson"],
          isOrderAboutChildren: true,
        },
      ],
    },
  ];
export const SpecialGuardianshipDraftOrderScenarios: SpecialGuardianshipDraftOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "C100",
      orderType: "Special guardianship order (C43A)",
      isDraftAnOrder: true,
      draftAnOrder5Params: {
        orderType: "Special guardianship order (C43A)",
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
      snapshotName: "draft-order-special-guardianship-no-to-all",
      snapshotsPath: ["caseProgression", "orders", "specialGuardianshipOrder"],
      orderInformation: [
        {
          typeOfOrder: "Special guardianship order (C43A)",
          welshDocument: "Welsh_Special_Guardianship_Order_C43A_Draft.pdf",
          englishDocument: "Special_Guardianship_Order_C43A_Draft.pdf",
          otherDetails: {
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
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
      orderType: "Special guardianship order (C43A)",
      isDraftAnOrder: true,
      draftAnOrder5Params: {
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
      snapshotName: "draft-order-special-guardianship-yes-to-all",
      snapshotsPath: ["caseProgression", "orders", "specialGuardianshipOrder"],
      orderInformation: [
        {
          typeOfOrder: "Special guardianship order (C43A)",
          welshDocument: "Welsh_Special_Guardianship_Order_C43A_Draft.pdf",
          englishDocument: "Special_Guardianship_Order_C43A_Draft.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "demo"
                ? "PRL DEMO ORG1 Solicitor 2"
                : "AAT Solicitor",
            status: "Drafted by Solicitor",
          },
          isOrderAboutAllTheChildren: true,
        },
      ],
    },
  ];
