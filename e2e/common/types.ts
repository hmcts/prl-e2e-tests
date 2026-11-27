export interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

export interface UserCredentialsLong extends UserCredentials {
  readonly forename: string;
  readonly surname: string;
}

export interface LocalCourtInfo {
  code: string;
  label: string;
}

export type solicitorCaseCreateType = "C100" | "FL401";

export const caseTypes: solicitorCaseCreateType[] = ["C100", "FL401"];

export type State = "undefined";

const UserRoles = {
  solicitor: "solicitor",
  citizen: "citizen",
  judge: "judge",
  caseWorker: "caseWorker",
  courtAdminStoke: "courtAdminStoke",
  caseManager: "caseManager",
  nocSolicitor: "nocSolicitor",
  legalAdvisor: "legalAdvisor",
  barrister: "barrister",
  localAuthority: "localAuthority",
  superuser: "superuser",
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export { UserRoles };

export type superUserEvents = "Exit Awaiting Information";

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
  | "Submit"
  | "Dummy Payment confirmation"
  | "Create/upload draft order"
  | "Delete application"
  | "Add barrister"
  | "Remove barrister"
  | "Withdraw application"
  | "Edit a returned order";

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
  | "Statement of Truth and submit"
  | "Delete application"
  | "Add barrister"
  | "Remove barrister"
  | "Edit a returned order";

export type WACaseWorkerActions =
  | "Allocated judge"
  | "Manage orders"
  | "Service of application"
  | "Create a bundle"
  | "Manage documents"
  | "Statement of service"
  | "Link cases"
  | "Manage case links"
  | "Return application"
  | "Add barrister"
  | "Remove barrister"
  | "Review RA Request"
  | "Rename documents";

export type WACaseManagerActions = "Confidentiality check";

export type fl401CaseWorkerActions =
  | "Welsh language requirements"
  | "Send and reply to messages"
  | "Service of documents"
  | "Transfer to another court"
  | "Remove draft order";

export type fl401SubmittedSolicitorEvents =
  | "Create/upload draft order"
  | "Dummy Payment for AwP"
  | "Manage support"
  | "Manage documents"
  | "Request support"
  | "Upload additional applications"
  | "Withdraw application";

export type fl401JudiciaryEvents =
  | "Edit and approve a draft order"
  | "List on notice"
  | "List without notice"
  | "Mark case as restricted"
  | "Add a case note";

export type ApplicantGender = "female" | "male" | "other";

export type yesNoDontKnow = "yes" | "no" | "dontKnow";

export type YesNoNotApplicable = "yes" | "no" | "notApplicable";

export type otherProceedingsRadios = "Yes" | "No" | "Don't know";

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

export type typeOfPerson = "applicant" | "respondent" | "otherPerson";

export type Language = "English" | "Welsh";

export type YesNo = "Yes" | "No";

export type manageOrdersOptions =
  "create order" | "upload order" | "serve order" | "create custom order";

export type JudgeOrMagistrateTitles =
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

export const JudgeOrMagistrateTitlesArray: JudgeOrMagistrateTitles[] = [
  "Her Honour Judge",
  "His Honour Judge",
  "Circuit Judge",
  "Deputy Circuit Judge",
  "Recorder",
  "District Judge",
  "Deputy District Judge",
  "District Judge Magistrates Court",
  "Magistrates",
  "Justices' Legal Adviser",
  "Justices' Clerk",
  "The Honourable Mrs Justice",
  "The Honourable Mr Justice",
];

export type yesNoNA = "Yes" | "No" | "Not applicable";

export type courtAdminEvents =
  | "Edit and serve an order"
  | "Send to gatekeeper"
  | "Remove legal representative"
  | "Add local authority"
  | "Request Further Information";

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
  | "draftAnOrder"
  | "confidentialityCheck";

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
  | "testingSupportPaymentSuccessCallback"
  | "issueAndSendToLocalCourtCallback"
  | "serviceOfApplication"
  | "manageOrders"
  | "sendToGateKeeper";

export type EdgeCaseApplicationType =
  | "FGM"
  | "FMPO"
  | "SpecialGuardianship"
  | "DeclarationOfParentage"
  | "ParentalOrder"
  | "ParentalResponsibility"
  | "ParentalResponsibility_secondFemaleParent"
  | "AppointingChildGuardian"
  | "ChangeOfChildSurname";

export interface ClippingCoords {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type OrderTypes =
  | "Directions on Issue"
  | "Blank order or directions (C21)"
  | "Child arrangements, specific issue or prohibited steps order (C43)"
  | "Parental responsibility order (C45A)"
  | "Special guardianship order (C43A)"
  | "Notice of proceedings (C6) (Notice to parties)"
  | "Notice of proceedings (C6a) (Notice to non-parties)"
  | "Appointment of a guardian (C47A)"
  | "Notice of Hearing (CA)"
  | "Non-molestation order (FL404A)"
  | "Occupation order (FL404)"
  | "Power of arrest (FL406)"
  | "Amended, discharged or varied order (FL404B)"
  | "Blank order (FL404B)"
  | "General form of undertaking (N117)"
  | "Notice of proceedings (FL402)"
  | "Notice of Hearing (DA)";

export const OrderTypesArray: OrderTypes[] = [
  "Directions on Issue",
  "Blank order or directions (C21)",
  "Child arrangements, specific issue or prohibited steps order (C43)",
  "Parental responsibility order (C45A)",
  "Special guardianship order (C43A)",
  "Notice of proceedings (C6) (Notice to parties)",
  "Notice of proceedings (C6a) (Notice to non-parties)",
  "Appointment of a guardian (C47A)",
  "Notice of Hearing (CA)",
  "Non-molestation order (FL404A)",
  "Occupation order (FL404)",
  "Power of arrest (FL406)",
  "Amended, discharged or varied order (FL404B)",
  "Blank order (FL404B)",
  "General form of undertaking (N117)",
  "Notice of proceedings (FL402)",
  "Notice of Hearing (DA)",
];

export type NonMolestationRespondentMustNotDoOptions =
  | "Contact the applicant"
  | "Go to or enter any place where the applicant lives or is staying or visiting or working."
  | "Go to the applicant’s street address"
  | "Contact or communicate with the child/ren in any way or by any means except for any contact or communication which the court has ordered or has been agreed in advance between the parties in writing."
  | "Track where the applicant is or what the applicant is doing and/or the child/ren by any means including but not limited to electronic devices or apps."
  | "Damage, interfere with or dispose of, in any way any property belonging to the applicant or jointly owned by you and the applicant unless a court order allows you to dispose of any such property."
  | "Post or threaten to post about the applicant and/or the child/ren and/or these proceedings on the internet or social media."
  | "Disclose or threaten to disclose private sexual images or films of the applicant to any third party or organisation."
  | "Sending documents to the applicant or their solicitor";

export const NonMolestationRespondentMustNotDoOptionsArray: NonMolestationRespondentMustNotDoOptions[] =
  [
    "Contact the applicant",
    "Go to or enter any place where the applicant lives or is staying or visiting or working.",
    "Go to the applicant’s street address",
    "Contact or communicate with the child/ren in any way or by any means except for any contact or communication which the court has ordered or has been agreed in advance between the parties in writing.",
    "Track where the applicant is or what the applicant is doing and/or the child/ren by any means including but not limited to electronic devices or apps.",
    "Damage, interfere with or dispose of, in any way any property belonging to the applicant or jointly owned by you and the applicant unless a court order allows you to dispose of any such property.",
    "Post or threaten to post about the applicant and/or the child/ren and/or these proceedings on the internet or social media.",
    "Disclose or threaten to disclose private sexual images or films of the applicant to any third party or organisation.",
    "Sending documents to the applicant or their solicitor",
  ];
export type ChildArrangementOrderTypes =
  | "Directions on Issue"
  | "Blank order or directions (C21)"
  | "Child arrangements, specific issue or prohibited steps order (C43)"
  | "Parental responsibility order (C45A)"
  | "Special guardianship order (C43A)"
  | "Declaration of parentage order (C63A)"
  | "Order to disclose information about whereabouts of a child (C30)"
  | "Authority for search, taking charge and delivery of a child (C31)"
  | "Family assistance order (C42)"
  | "Leave to change a child's surname or remove from the jurisdiction (C44)"
  | "Appointment of a guardian (C47A)"
  | "Appointment of a solicitor for the child (C48A)"
  | "Enforcement of a child arrangements order (C80)"
  | "Financial compensation order following C79 enforcement application (C82)"
  | "Summons to appear at court for directions in contempt proceedings (FC601)"
  | "Warrant to secure attendance at court (FC602)"
  | "Order on determination of proceedings for contempt of court (FC603)"
  | "Warrant of committal (FC604)";

export type CustomOrderTypes =
  | "Directions on Issue"
  | "Blank order or directions (C21)"
  | "Child arrangements, specific issue or prohibited steps order (C43)"
  | "Parental responsibility order (C45A)"
  | "Special guardianship order (C43A)"
  | "Notice of proceedings (C6) (Notice to parties)"
  | "Notice of proceedings (C6a) (Notice to non-parties)"
  | "Appointment of a guardian (C47A)"
  | "Non-molestation order (FL404A)"
  | "Occupation order (FL404)"
  | "Power of arrest (FL406)"
  | "Amended, discharged or varied order (FL404B)"
  | "Blank order (FL404B)"
  | "General form of undertaking (N117)"
  | "Notice of proceedings (FL402)";

export const ChildArrangementOrderTypesArray: ChildArrangementOrderTypes[] = [
  "Directions on Issue",
  "Blank order or directions (C21)",
  "Child arrangements, specific issue or prohibited steps order (C43)",
  "Parental responsibility order (C45A)",
  "Special guardianship order (C43A)",
  "Declaration of parentage order (C63A)",
  "Order to disclose information about whereabouts of a child (C30)",
  "Authority for search, taking charge and delivery of a child (C31)",
  "Family assistance order (C42)",
  "Leave to change a child's surname or remove from the jurisdiction (C44)",
  "Appointment of a guardian (C47A)",
  "Appointment of a solicitor for the child (C48A)",
  "Enforcement of a child arrangements order (C80)",
  "Financial compensation order following C79 enforcement application (C82)",
  "Summons to appear at court for directions in contempt proceedings (FC601)",
  "Warrant to secure attendance at court (FC602)",
  "Order on determination of proceedings for contempt of court (FC603)",
  "Warrant of committal (FC604)",
];
export const CustomOrderTypesArray: CustomOrderTypes[] = [
  "Directions on Issue",
  "Blank order or directions (C21)",
  "Child arrangements, specific issue or prohibited steps order (C43)",
  "Parental responsibility order (C45A)",
  "Special guardianship order (C43A)",
  "Notice of proceedings (C6) (Notice to parties)",
  "Notice of proceedings (C6a) (Notice to non-parties)",
  "Appointment of a guardian (C47A)",
  "Non-molestation order (FL404A)",
  "Occupation order (FL404)",
  "Power of arrest (FL406)",
  "Amended, discharged or varied order (FL404B)",
  "Blank order (FL404B)",
  "General form of undertaking (N117)",
  "Notice of proceedings (FL402)",
];
export type DomesticAbuseOrderTypes =
  | "Non-molestation order (FL404A)"
  | "Occupation order (FL404)"
  | "Power of arrest (FL406)"
  | "Blank order (FL404B)"
  | "Amended, discharged or varied order (FL404B)"
  | "General form of undertaking (N117)"
  | "Warrant of arrest (FL408)"
  | "Remand order (FL409)"
  | "Form for taking of recognizance (FL410)"
  | "Form for taking of surety (FL411)"
  | "Bail notice (FL412)"
  | "Hospital order (FL413)"
  | "Guardianship order (FL414)"
  | "Statement of service (FL415)"
  | "Blank order (FL415)"
  | "Notice to landlord or mortgage company (FL416)";

export const DomesticAbuseOrderTypesArray: DomesticAbuseOrderTypes[] = [
  "Non-molestation order (FL404A)",
  "Occupation order (FL404)",
  "Power of arrest (FL406)",
  "Blank order (FL404B)",
  "Amended, discharged or varied order (FL404B)",
  "General form of undertaking (N117)",
  "Warrant of arrest (FL408)",
  "Remand order (FL409)",
  "Form for taking of recognizance (FL410)",
  "Form for taking of surety (FL411)",
  "Bail notice (FL412)",
  "Hospital order (FL413)",
  "Guardianship order (FL414)",
  "Statement of service (FL415)",
  "Blank order (FL415)",
  "Notice to landlord or mortgage company (FL416)",
];
export type FcOrderTypes =
  | "Contempt notice (FC600)"
  | "Summons to appear at court (FC601)"
  | "Warrant to secure attendance at court (FC602)"
  | "Order on determination of proceedings for contempt of court (FC603)"
  | "Warrant of committal (FC604)";

export const FcOrderTypesArray: FcOrderTypes[] = [
  "Contempt notice (FC600)",
  "Summons to appear at court (FC601)",
  "Warrant to secure attendance at court (FC602)",
  "Order on determination of proceedings for contempt of court (FC603)",
  "Warrant of committal (FC604)",
];
export type AnyOtherOrderTypes = "Other";

export const AnyOtherOrderTypesArray: AnyOtherOrderTypes[] = ["Other"];

type CourtKey =
  | "aberystwyth"
  | "swansea"
  | "chelmsford"
  | "nottingham"
  | "aldershot"
  | "prestatyn"
  | "blackwood"
  | "medway";

export const LOCAL_COURTS: Record<CourtKey, LocalCourtInfo> = {
  aberystwyth: {
    code: "827534:",
    label: "Aberystwyth Justice Centre - Trefechan - SY23 1AS",
  },
  swansea: {
    code: "234946:",
    label: "Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP",
  },
  chelmsford: {
    code: "816875:",
    label: "Chelmsford County and Family Court - Priory Place - CM2 0PP",
  },
  nottingham: {
    code: "424213:",
    label:
      "Nottingham County Court and Family Court (and Crown) - Canal Street - NG1 7EJ",
  },
  aldershot: {
    code: "450049:",
    label:
      "Aldershot Justice Centre - Civic Centre, Wellington Avenue - GU11 1NY",
  },
  prestatyn: {
    code: "379656:",
    label:
      "Prestatyn Justice Centre - The Court House, Victoria Road - LL19 7TE",
  },
  blackwood: {
    code: "304576:",
    label: "Blackwood Civil and Family Court - Hall Street, Gwent - NP12 1NY",
  },
  medway: {
    code: "369145:",
    label:
      "Medway County Court and Family Court - HMCTS Main Entrance, Gun Wharf, Dock Road, Chatham - ME4 4AR",
  },
};

export type PersonalServiceTypes =
  | "applicantsSolicitor"
  | "courtBailiff"
  | "courtAdmin"
  | "unrepresentedApplicant";

/** Task status, as shown by the status icon's title on ExUI task lists (e.g. "Respondent 1 tasks"). */
export const TaskStatus = {
  notStarted: "Not started / Heb ddechrau",
  inProgress: "In progress / Ar y gweill",
  finished: "Finished / Wedi gorffen",
  cannotStartYet: "Cannot start yet / Methu dechrau eto",
} as const;

export type TaskStatusName = (typeof TaskStatus)[keyof typeof TaskStatus];

/** Task link names on the "Respondent 1 tasks" tab. */
export const RespondentTask = {
  consentToApplication:
    "Do you give your consent? / A ydych yn rhoi eich caniatâd?",
  keepDetailsPrivate: "Keep details private / Cadwch y manylion yn breifat",
  editContactDetails: "Edit contact details / Golygu manylion cyswllt",
  attendingTheCourt: "Attending the court / Mynychu'r llys",
  miam: "MIAM / MIAM",
  allegationsOfHarm: "Make allegations of harm / Gwneud honiadau o niwed",
  otherProceedings: "Other proceedings / Achosion eraill",
  internationalElement: "International element / Elfen ryngwladol",
  litigationCapacity: "Litigation capacity / Capasiti cyfreitha",
} as const;

export type RespondentTaskName =
  (typeof RespondentTask)[keyof typeof RespondentTask];

export type Party =
  | "APPLICANT"
  | "RESPONDENT"
  | "CAFCASS"
  | "CAFCASS_CYMRU"
  | "LOCAL_AUTHORITY"
  | "COURT";

/** Types of abuse, as labelled on the respondent solicitor "Allegations of harm" pages. */
export enum AbuseType {
  physical = "Physical abuse",
  psychological = "Psychological abuse",
  sexual = "Sexual abuse",
  emotional = "Emotional abuse",
  financial = "Financial abuse",
}

/** Help the respondent sought for a behaviour; omit "whoFrom" when they did not seek help. */
export interface SoughtHelp {
  soughtHelp: boolean;
  whoFrom?: string;
}
