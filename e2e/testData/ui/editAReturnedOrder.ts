import { ChildArrangementsEditAReturnedOrderParams } from "../../tests/manageCases/caseProgression/orders/C100/editAReturnedOrder/editAReturnedOrderCA.spec.ts";
import { DomesticAbuseEditAReturnedOrderParams } from "../../tests/manageCases/caseProgression/orders/FL401/editAReturnedOrder/editAReturnedOrderDA.spec.ts";

export const ChildArrangementsEditAReturnedOrderScenarios: ChildArrangementsEditAReturnedOrderParams[] =
  [
    {
      orderType: "Parental responsibility order (C45A)",
      caseType: "C100",
      editReturnedOrder3Params: {
        isOrderByConsent: false,
        wasOrderApprovedAtAHearing: true,
        hearing: "No hearings available", // No hearings available is a valid hearing
        judgeOrMagistratesTitle: "His Honour Judge",
        judgeFullName: "Test judge name",
        justicesLegalAdviserFullName: undefined,
        dateOrderMade: undefined, // this is autofilled to today's date
        isOrderAboutTheChildren: undefined,
        isOrderAboutAllTheChildren: true,
        allChildrenInOrder: [
          "Joe Doe (Child 1)",
          "Simon Anderson (Child 2)",
          "Lilly Anderson (Child 3)",
          "Charlotte Saxon (Child 4)",
          "Selena Lees (Child 5)",
        ],
        recitalsAndPreamble: undefined,
        directions: undefined,
      },
      snapshotName: "child-arrangements-edit-a-returned-order",
      snapshotsPath: ["caseProgression", "orders", "editAReturnedOrder"],
    },
  ];

export const DomesticAbuseEditAReturnedOrderScenarios: DomesticAbuseEditAReturnedOrderParams[] =
  [
    {
      name: "No to all",
      caseType: "FL401",
      isUrgent: false,
      orderType: "Non-molestation order (FL404A)",
      isDraftAnOrder: true,
      isUploadAnOrder: false,
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
      editReturnedOrder12Params: {
        hasJudgeProvidedHearingDetails: false,
        hearingDetails: undefined,
      },
      snapshotName: "domestic-abuse-edit-a-returned-order",
      snapshotsPath: ["caseProgression", "orders", "editAReturnedOrder"],
    },
  ];
