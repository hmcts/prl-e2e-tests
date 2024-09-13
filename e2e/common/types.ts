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
  | "Type of application"
  | "Hearing urgency"
  | "Applicant details";

export type fl401SolicitorEvents = "Type of application" | "Applicant details";

export type ApplicantGender = "female" | "male" | "other";