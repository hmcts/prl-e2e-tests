import { ChildArrangementsEditAReturnedOrderParams } from "../tests/manageCases/caseProgression/editAReturnedOrder/editAReturnedOrder.spec.ts";

export const ChildArrangementsEditAReturnedOrderScenarios: ChildArrangementsEditAReturnedOrderParams[] =
    [
        {
            orderType: "Parental responsibility order (C45A)",
            existingRepresentative: [
                "John Doe (Applicant), PRL NOC Respondent Solicitor 1, Private law NOC solution",
            ],
            existingRepresentativeRemoval: [
                "John Doe (Applicant), PRL NOC Respondent Solicitor 1, BarristerOneFN BarristerOneLN",
            ],
            addBarristerSnapshotName: "c100-add-barrister",
            removeBarristerSnapshotName: "c100-remove-barrister",
            nocParty: { firstname: "John", surname: "Doe" },
            barrister: {
              firstnames: "BarristerOneFN",
                lastname: "BarristerOneLN",
                email: "hmcts.privatelaw+org2bar2@gmail.com",
                org: "PRL Barrister Org2",
        },
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
          editReturnedOrder12PageParams: {
        hasJudgeProvidedHearingDetails: false,
              hearingDetails: undefined,
        orderJourneyType: undefined,
      },
      snapshotName: "child-arrangements-edit-a-returned-order",
      snapshotsPath: ["caseProgression", "orders", "editAReturnedOrder"],
    },
  ];