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
    caseManager: {
      email: process.env.CASEMANAGER_USERNAME as string,
      password: process.env.CASEMANAGER_PASSWORD as string,
    },
  };

  public static readonly sessionStoragePath: string = path.join(
    __dirname,
    ".sessions/",
  );

  public static readonly citizenFrontendBaseURL: string =
    Config.ensureTrailingSlash(
      process.env.CITIZEN_FRONTEND_BASE_URL ||
        "https://privatelaw.aat.platform.hmcts.net/",
    );

  public static readonly manageCasesBaseURLCase: string =
    Config.ensureNoTrailingSlash(
      process.env.MANAGE_CASES_BASE_URL ||
        "https://manage-case.aat.platform.hmcts.net/cases",
    );
  public static readonly manageCasesBaseURL: string = Config.removeCasesPath(
    process.env.MANAGE_CASES_BASE_URL ||
      "https://manage-case.aat.platform.hmcts.net",
  );

  public static readonly edgeCasesBaseURL: string =
    process.env.EDGE_CASE_BASE_URL ||
    "https://fis-ds-web.ithc.platform.hmcts.net/";

  private static removeCasesPath(url: string): string {
    return url.replace(/\/cases$/, ""); // Removes `/cases` only if it's at the end
  }
  //ensures url is in the correct format (with a trailing slash for citizenFrontendBaseURL, and without trailing slash for manageCasesBaseURLCase)
  private static ensureTrailingSlash(url: string): string {
    return url.endsWith("/") ? url : `${url}/`;
  }
  private static ensureNoTrailingSlash(url: string): string {
    return url.endsWith("/") ? url.slice(0, -1) : url;
  }

  public static getEnvironment(url: string): string {
    return (
      ["aat", "demo", "preview", "ithc"].find((env) => url.includes(env)) || "unknown"
    );
  }

  public static setEnvironmentVariables(): void {
    process.env.CITIZEN_TEST_ENV = this.getEnvironment(
      this.citizenFrontendBaseURL,
    );
    process.env.MANAGE_CASES_TEST_ENV = this.getEnvironment(
      this.manageCasesBaseURLCase,
    );
  }

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
