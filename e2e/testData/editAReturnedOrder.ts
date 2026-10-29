import { ChildArrangementsEditAReturnedOrderParams } from "../tests/manageCases/caseProgression/editAReturnedOrder/editAReturnedOrder.spec.ts";

export const ChildArrangementsEditAReturnedOrderScenarios: ChildArrangementsEditAReturnedOrderParams[] =
    [
        {
            orderType: "Parental responsibility order (C45A)",
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