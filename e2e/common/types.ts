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
  | "Children and respondents"
  | "Children and other people";

export type fl401SolicitorEvents =
  | "Case name"
  | "Type of application"
  | "Without notice order"
  | "Applicant details"
  | "Respondent details"
  | "Respondent's behaviour"
  | "Applicant's family"
  | "Relationship to respondent";

export type ApplicantGender = "female" | "male" | "other";
