import { NonMolestationDraftOrderParams } from "../tests/manageCases/caseProgression/solicitor/draftAnOrder/draftAnOrderNonMolestation.spec.js";
import { ParentalResponsibilityDraftOrderParams } from "../tests/manageCases/caseProgression/solicitor/draftAnOrder/draftAnOrderParentalResponsibility.spec.js";
import { RemoveDraftNonMolestationOrderParams } from "../tests/manageCases/caseProgression/removeDraftOrder/removeDraftNonMolestationOrder.spec.js";
import { RemoveDraftParentalResponsibilityOrderParams } from "../tests/manageCases/caseProgression/removeDraftOrder/removeDraftParentalResponsibilityOrder.spec.js";

export const NonMolestationDraftOrderScenarios: NonMolestationDraftOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "FL401",
      orderType: "Non-molestation order (FL404A)",
      isDraftAnOrder: true,
      draftAnOrder4Params: {
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
      draftAnOrder5Params: {
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
      draftAnOrder16Params: {
        hasJudgeProvidedHearingDetails: false,
        hearingDetails: undefined,
      },
      snapshotName: "draft-order-non-molestation-no-to-all",
      snapshotsPath: [
        "caseProgression",
        "solicitor",
        "draftNonMolestationOrder",
      ],
      orderInformation: [
        {
          typeOfOrder: "Non-molestation order (FL404A)",
          welshDocument: "welsh_non_molestation_order_fl404a_draft.pdf",
          englishDocument: "non_molestation_order_fl404a_draft.pdf",
          otherDetails: {
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "aat"
                ? "AAT Solicitor"
                : "PRL DEMO ORG1 Solicitor 2",
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
      draftAnOrder4Params: {
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
      draftAnOrder5Params: {
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
      draftAnOrder16Params: {
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
      snapshotsPath: [
        "caseProgression",
        "solicitor",
        "draftNonMolestationOrder",
      ],
      orderInformation: [
        {
          typeOfOrder: "Non-molestation order (FL404A)",
          welshDocument: "welsh_non_molestation_order_fl404a_draft.pdf",
          englishDocument: "non_molestation_order_fl404a_draft.pdf",
          otherDetails: {
            orderMadeBy: "Test judge name",
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "aat"
                ? "AAT Solicitor"
                : "PRL DEMO ORG1 Solicitor 2",
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
      draftAnOrder4Params: {
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
        "solicitor",
        "draftParentalResponsibilityOrder",
      ],
      orderInformation: [
        {
          typeOfOrder: "Parental responsibility order (C45A)",
          welshDocument: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
          englishDocument: "Parental_Responsibility_Order_C45A_draft.pdf",
          otherDetails: {
            orderCreatedBy:
              process.env.MANAGE_CASES_TEST_ENV === "aat"
                ? "AAT Solicitor"
                : "PRL DEMO ORG1 Solicitor 2",
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
      draftAnOrder4Params: {
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
        "solicitor",
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
              process.env.MANAGE_CASES_TEST_ENV === "aat"
                ? "AAT Solicitor"
                : "PRL DEMO ORG1 Solicitor 2",
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
        draftAnOrder4Params: {
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
        draftAnOrder5Params: {
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
        draftAnOrder16Params: {
          hasJudgeProvidedHearingDetails: false,
          hearingDetails: undefined,
        },
        snapshotName: "draft-order-non-molestation-no-to-all",
        snapshotsPath: [
          "caseProgression",
          "solicitor",
          "draftNonMolestationOrder",
        ],
        orderInformation: [
          {
            typeOfOrder: "Non-molestation order (FL404A)",
            welshDocument: "welsh_non_molestation_order_fl404a_draft.pdf",
            englishDocument: "non_molestation_order_fl404a_draft.pdf",
            otherDetails: {
              orderCreatedBy:
                process.env.MANAGE_CASES_TEST_ENV === "aat"
                  ? "AAT Solicitor"
                  : "PRL DEMO ORG1 Solicitor 2",
              status: "Drafted by Solicitor",
            },
            isOrderAboutChildren: false,
          },
        ],
      },
      removalReason: "Test removal reason",
      snapshotsPath: ["caseProgression", "removeDraftOrder"],
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
        draftAnOrder4Params: {
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
          "solicitor",
          "draftParentalResponsibilityOrder",
        ],
        orderInformation: [
          {
            typeOfOrder: "Parental responsibility order (C45A)",
            welshDocument: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
            englishDocument: "Parental_Responsibility_Order_C45A_draft.pdf",
            otherDetails: {
              orderCreatedBy:
                process.env.MANAGE_CASES_TEST_ENV === "aat"
                  ? "AAT Solicitor"
                  : "PRL DEMO ORG1 Solicitor 2",
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
      snapshotsPath: ["caseProgression", "removeDraftOrder"],
      snapshotName: "remove-draft-parental-responsibility-order",
    },
  ];
