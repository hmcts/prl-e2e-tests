import path from "path";
import dotenv from "dotenv";

import { UserCredentials, UserRole } from "./common/types";

dotenv.config();

export class Config {
  public static readonly userCredentials: Record<UserRole, UserCredentials> = {
    solicitor: {
      email: process.env.SOLICITOR_USERNAME as string,
      password: process.env.SOLICITOR_PASSWORD as string,
    },
    citizen: {
      email: process.env.CITIZEN_USERNAME as string,
      password: process.env.CITIZEN_PASSWORD as string,
    },
    judge: {
      email: process.env.JUDGE_USERNAME as string,
      password: process.env.JUDGE_PASSWORD as string,
    },
    caseWorker: {
      email: process.env.CASEWORKER_USERNAME as string,
      password: process.env.CASEWORKER_PASSWORD as string,
    },
    courtAdminStoke: {
      email: process.env.COURT_ADMIN_STOKE_USERNAME as string,
      password: process.env.COURT_ADMIN_STOKE_PASSWORD as string,
    },
  };

  public static readonly sessionStoragePath: string = path.join(
      __dirname,
      ".sessions/",
  );

  public static readonly citizenFrontendBaseURL: string =
      process.env.CITIZEN_FRONTEND_BASE_URL ||
      "https://privatelaw.aat.platform.hmcts.net/";
  public static readonly manageCasesBaseURL: string =
    process.env.MANAGE_CASES_BASE_URL ||
    "https://manage-case.aat.platform.hmcts.net/cases";

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

Config.setEnvironmentVariables();

export default Config;