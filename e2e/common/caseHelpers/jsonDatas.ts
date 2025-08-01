import process from "node:process";
import solicitorDACaseData from "../../caseData/solicitorDACaseEventData.json" with { type: "json" };
import solicitorDACaseDataDemo from "../../caseData/solicitorDACaseEventData-demo.json" with { type: "json" };
import orderEventDataAmendDischargedVariedDemo from "../../caseData/orderData/orderEventData-amendDischargedVaried-demo.json" with { type: "json" };
import orderEventDataAmendDischargedVaried from "../../caseData/orderData/orderEventData-amendDischargedVaried.json" with { type: "json" };
import orderEventDataPowerOfArrestDemo from "../../caseData/orderData/orderEventData-powerOfArrest-demo.json" with { type: "json" };
import orderEventDataPowerOfArrest from "../../caseData/orderData/orderEventData-powerOfArrest.json" with { type: "json" };
import solicitorCACaseDataDemo from "../../caseData/solicitorCACaseEventData-demo.json" with { type: "json" };
import solicitorCACaseData from "../../caseData/solicitorCACaseEventData.json" with { type: "json" };
import citizenOrderEventDataAmendDischargedVariedDemo from "../../caseData/orderData/citizen/orderEventData-amendDischargedVaried-demo.json" with { type: "json" };
import citizenOrderEventDataAmendDischargedVaried from "../../caseData/orderData/citizen/orderEventData-amendDischargedVaried.json" with { type: "json" };
import citizenOrderEventDataPowerOfArrestDemo from "../../caseData/orderData/citizen/orderEventData-powerOfArrest-demo.json" with { type: "json" };
import citizenOrderEventDataPowerOfArrest from "../../caseData/orderData/citizen/orderEventData-powerOfArrest.json" with { type: "json" };

// Using "any" type below because it represents a large JSON object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonDatas = Record<string, any>;
export let jsonDatas: JsonDatas;
if (process.env.MANAGE_CASES_TEST_ENV === "demo") {
  jsonDatas = {
    solicitorDACaseData: solicitorDACaseDataDemo,
    solicitorCACaseData: solicitorCACaseDataDemo,
    manageOrderDataPowerOfArrest: orderEventDataPowerOfArrestDemo,
    manageOrderDataAmendDischargedVaried:
      orderEventDataAmendDischargedVariedDemo,
    citizenManageOrderDataPowerOfArrest: citizenOrderEventDataPowerOfArrestDemo,
    citizenManageOrderDataAmendDischargedVaried: citizenOrderEventDataAmendDischargedVariedDemo,
  };
} else {
  jsonDatas = {
    solicitorDACaseData: solicitorDACaseData,
    solicitorCACaseData: solicitorCACaseData,
    manageOrderDataPowerOfArrest: orderEventDataPowerOfArrest,
    manageOrderDataAmendDischargedVaried: orderEventDataAmendDischargedVaried,
    citizenManageOrderDataPowerOfArrest: citizenOrderEventDataPowerOfArrest,
    citizenManageOrderDataAmendDischargedVaried: citizenOrderEventDataAmendDischargedVaried,
  };
}
