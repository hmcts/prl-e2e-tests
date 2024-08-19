export interface UserLoginInfo {
  username: string;
  password: string;
}

export interface UserCredentials {
  readonly email: string;
  readonly password: string;
}

export type State = "undefined";

export type Events = "undefined";

const UserRoles = {
  CaseWorker: "caseWorker",
  SeniorCaseworker: "seniorCaseworker",
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export { UserRoles };
