// TODO: add headings for specific orders types
import { OrderType } from "../../../common/types";

export enum DraftAnOrder4Content {
  pageTitle = "Draft an order",
  formLabel1 = "Is this order by consent?",
  formLabel2 = "Was the order approved at a hearing?",
  formLabel3 = "Select or amend the title of the Judge or magistrate (Optional)",
  formLabel4 = "Her Honour Judge",
  formLabel5 = "His Honour Judge",
  formLabel6 = "Circuit Judge",
  formLabel7 = "Deputy Circuit Judge",
  formLabel8 = "Recorder",
  formLabel9 = "District Judge",
  formLabel10 = "Deputy District Judge",
  formLabel11 = "District Judge Magistrates Court",
  formLabel12 = "Magistrates",
  formLabel13 = "Justices' Legal Adviser",
  formLabel14 = "Justices' Clerk",
  formLabel15 = "The Honourable Mrs Justice",
  formLabel16 = "The Honourable Mr Justice",
  formLabel17 = "Judge's full name (Optional)",
  formLabel18 = "Full name of Justices' Legal Adviser (Optional)",
  formLabel19 = "Date order made (Optional)",
  formLabel20 = "Day",
  formLabel21 = "Month",
  formLabel22 = "Year",
  formLabel23 = "Is the order about all the children?",
  formLabel24 = "Add recitals or preamble (Optional)",
  formLabel25 = "Add directions (Optional)",
  p1 = "Order made by",
  judgeOrMagistratesTitleStrong = "Judge or Magistrate's title",
  formLabelYes = "yes",
  formLabelNo = "No",
  previous = "Previous",
  continue = "Continue",
  errorMessage1 = "Is the order by consent? is required",
  errorMessage2 = "Was the order approved at a hearing? is required",
  errorMessage3 = "Is the order about all the children? is required",
  errorMessage4 = "At which hearing was the order approved? is required",
  errorMessage5 = "Magistrate's full name is required",
  errorMessage6 = "Which children are included in the order? is required",
  errorMessage7 = "Date order made is not valid"
}

// TODO: populate the rest of the map
export const orderTypesMap: Map<OrderType, string> = new Map([
  ["childArrangementsSpecificProhibitedOrder", "Child arrangements, specific issue or prohibited steps order (C43)"]
]);