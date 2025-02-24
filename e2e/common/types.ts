export interface UserLoginInfo {
  username: string;
  password: string;
}

export interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

export type solicitorCaseCreateType = "C100" | "FL401";

export type State = "undefined";

export type Events = "undefined";

const UserRoles = {
  solicitor: "solicitor",
  citizen: "citizen",
  judge: "judge",
  caseWorker: "caseWorker",
  courtAdminStoke: "courtAdminStoke",
  caseManager: "caseManager",
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export { UserRoles };

export type c100SolicitorEvents =
  | "Case name"
  | "Type of application"
  | "Hearing urgency"
  | "Applicant details"
  | "Child details"
  | "Other people in the case"
  | "Other children not in the case"
  | "Children and applicants"
  | "Children and respondents"
  | "Allegations of harm"
  | "Children and other people"
  | "Attending the hearing"
  | "MIAM"
  | "International element"
  | "Litigation capacity"
  | "Other proceedings"
  | "Welsh language requirements"
  | "View PDF application"
  | "Submit and pay"
  | "Dummy Payment confirmation";

export type fl401SolicitorEvents =
  | "Case name"
  | "Type of application"
  | "Without notice order"
  | "Applicant details"
  | "Respondent details"
  | "Other proceedings"
  | "Respondent's behaviour"
  | "Applicant's family"
  | "Relationship to respondent"
  | "Attending the hearing"
  | "The home"
  | "Upload documents"
  | "Welsh language requirements"
  | "View PDF application"
  | "Statement of truth and submit";

export type WACaseWorkerActions =
  | "Allocated judge"
  | "Manage orders"
  | "Service of application"
  | "Create a bundle"
  | "Manage documents"
  | "Statement of service";

export type fl401CaseWorkerActions =
  | "Welsh language requirements"
  | "Send and reply to messages"
  | "Service of documents"
  | "Transfer to another court"
  | "Remove draft order";

export type fl401SubmittedSolicitorEvents =
  | "Draft an order"
  | "Dummy Payment for AwP"
  | "Manage support"
  | "Manage documents"
  | "Request support"
  | "Upload additional applications"
  | "Withdraw application";

export type fl401JudiciaryEvents =
  | "Edit and approve a draft order"
  | "List on notice"
  | "List without notice";

export type ApplicantGender = "female" | "male" | "other";

export type yesNoDontKnow = "yes" | "no" | "dontKnow";

export type otherProceedingsRadios = "Yes" | "No" | "Don't know";

export type ViewPdfTestCases = "1" | "2" | "3";

export type Relationship =
  | "mother"
  | "father"
  | "guardian"
  | "specialGuardian"
  | "grandparent"
  | "other";

export type CapitalizedRelationship =
  | "Mother"
  | "Father"
  | "Guardian"
  | "SpecialGuardian"
  | "Grandparent"
  | "Other";

export type OrderType =
  | "standardDirectionsOrder"
  | "directionOnIssue"
  | "blankOrderOrDirections"
  | "childArrangementsSpecificProhibitedOrder"
  | "parentalResponsibility"
  | "specialGuardianShip"
  | "noticeOfProceedingsParties"
  | "noticeOfProceedingsNonParties"
  | "appointmentOfGuardian"
  | "nonMolestation"
  | "occupation"
  | "powerOfArrest"
  | "amendDischargedVaried"
  | "blank"
  | "generalForm"
  | "noticeOfProceedings"
  | "c21ApplicationRefused"
  | "c21WithdrawApplication"
  | "c21NoOrderMade"
  | "c21other";

export type typeOfPerson = "applicant" | "respondent" | "otherPerson";

export type JudgeOrderAction =
  | "Send to admin to serve"
  | "Give admin further directions then serve"
  | "Edit the order myself and send to admin to serve"
  | "Ask the legal representative to make changes";

export type Language = "English" | "Welsh";

export type manageOrdersOptions = "create order" | "upload order";

export type createOrderFL401Options =
  | "power of arrest"
  | "non-molestation"
  | "occupation order"
  | "amend discharge varied order"
  | "blank order"
  | "general form of undertaking"
  | "notice of proceedings";

export type uploadOrderFL401Options =
  | "power of arrest"
  | "non-molestation"
  | "occupation order"
  | "amend discharge varied order"
  | "blank order (FL404B)"
  | "general form of undertaking"
  | "warrant of arrest"
  | "remand order"
  | "form for taking recognizance"
  | "form for taking surety"
  | "bail notice"
  | "hospital order"
  | "guardianship order"
  | "statement of service"
  | "blank order (FL514)"
  | "Notice landlord mortgage";

export type judgeTitles =
  | "Her Honour Judge"
  | "His Honour Judge"
  | "Circuit Judge"
  | "Deputy Circuit Judge"
  | "Recorder"
  | "District Judge"
  | "Deputy District Judge"
  | "District Judge Magistrates Court"
  | "Magistrates"
  | "Justices' Legal Adviser"
  | "Justices' Clerk"
  | "The Honourable Mrs Justice"
  | "The Honourable Mr Justice";

export type yesNoNA = "Yes" | "No" | "Not applicable";

export type courtAdminEvents =
  | "Edit and serve an order"
  | "Remove legal representative";

export type contactOption = "Digital" | "Post";

export type amendEvents =
  | "Amend applicant details"
  | "Amend respondent details"
  | "Amend Child details"
  | "Amend attending the hearing"
  | "Amend MIAM"
  | "Amend International element"
  | "Amend Allegations of harm"
  | "Amend Other people in the case"
  | "Amend children and respondents"
  | "Amend children/other people"
  | "Amend court details"
  | "Amend Other proceedings"
  | "Amend Type of application";

export type documentCategory = "Applicant's statements" | "Position statements";

export type documentSubmittedBy = "CourtNav" | "Citizen";

export type applicationSubmittedBy = "Citizen" | "Solicitor";

export type solicitorDACaseAPIEvent =
  | "fl401TypeOfApplication"
  | "withoutNoticeOrderDetails"
  | "applicantsDetails"
  | "respondentsDetails"
  | "fl401ApplicantFamilyDetails"
  | "respondentRelationship"
  | "respondentBehaviour"
  | "fl401Home"
  | "fl401OtherProceedings"
  | "attendingTheHearing"
  | "welshLanguageRequirements"
  | "fl401UploadDocuments"
  | "fl401StatementOfTruthAndSubmit"
  | "fl401AddCaseNumber"
  | "fl401SendToGateKeeper"
  | "manageOrders"
  | "serviceOfApplication"
  | "draftAnOrder";

export type solicitorCACaseAPIEvent =
  | "solicitorCreate"
  | "selectApplicationType"
  | "hearingUrgency"
  | "applicantsDetails"
  | "respondentsDetails"
  | "otherPeopleInTheCaseRevised"
  | "childDetailsRevised"
  | "otherChildNotInTheCase"
  | "childrenAndApplicants"
  | "childrenAndRespondents"
  | "childrenAndOtherPeople"
  | "allegationsOfHarmRevised"
  | "miamPolicyUpgrade"
  | "internationalElement"
  | "welshLanguageRequirements"
  | "submitAndPay"
  | "testingSupportPaymentSuccessCallback";
