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

export type fl401SubmittedSolicitorEvents =
  | "Draft an order"
  | "Dummy Payment for AwP"
  | "Manage support"
  | "Manage documents"
  | "Request support"
  | "Upload additional applications"
  | "Withdraw application";

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
