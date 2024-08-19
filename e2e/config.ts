import path from "path";
import { UserCredentials, UserRole } from "./common/types";

export class Config {
  public static readonly userCredentials: Record<UserRole, UserCredentials> = {
    caseWorker: {
      email: process.env.CASEWORKER_USERNAME || "caseworker-user",
      password: process.env.CASEWORKER_PASSWORD || "caseworker-password",
    },
    seniorCaseworker: {
      email: process.env.SENIOR_CASEWORKER_USERNAME || "seniorCaseworker-user",
      password:
        process.env.SENIOR_CASEWORKER_PASSWORD || "seniorCaseworker-password",
    },
  };

  public static readonly citizenFrontendBaseURL: string =
    process.env.CITIZEN_FRONTEND_BASE_URL || "citizenFrontendBaseURL";
  public static readonly manageCasesBaseURL: string =
    process.env.MANAGE_CASES_BASE_URL || "manageCasesBaseURL";

  public static readonly testFile: string = path.resolve(
    __dirname,
    "./assets/mockFile.txt",
  );
  public static readonly testPdfFile: string = path.resolve(
    __dirname,
    "./assets/mockFile.pdf",
  );
  public static readonly testWordFile: string = path.resolve(
    __dirname,
    "./assets/mockFile.docx",
  );
  public static readonly testOdtFile: string = path.resolve(
    __dirname,
    "./assets/mockFile.odt",
  );
  public static readonly testMP3File: string = path.resolve(
    __dirname,
    "./assets/mockFile.mp3",
  );

  public static getUserCredentials(role: UserRole): UserCredentials {
    return this.userCredentials[role];
  }
}

export default Config;
