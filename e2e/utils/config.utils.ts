import dotenv from "dotenv";
import path from "path";
import { UserCredentialsSession, UserRole } from "../common/types";
import { fileURLToPath } from "url";

dotenv.config();

export class Config {
  public static readonly userCredentials: Record<UserRole, UserCredentialsSession> = {
    solicitor: {
      email: process.env.SOLICITOR_USERNAME as string,
      password: process.env.SOLICITOR_PASSWORD as string,
      // sessionFile:
      //   path.join(fileURLToPath(import.meta.url), "../../.sessions/") +
      //   `solicitor.json`,
      // cookieName: "xui-webapp",
    },
    judge: {
      email: process.env.JUDGE_USERNAME as string,
      password: process.env.JUDGE_PASSWORD as string,
      // sessionFile:
      //   path.join(fileURLToPath(import.meta.url), "../../.sessions/") +
      //   `judge.json`,
      // cookieName: "xui-webapp",
    },
    caseWorker: {
      email: process.env.CASEWORKER_USERNAME as string,
      password: process.env.CASEWORKER_PASSWORD as string,
      // sessionFile:
      //   path.join(fileURLToPath(import.meta.url), "../../.sessions/") +
      //   `caseWorker.json`,
      // cookieName: "xui-webapp",
    },
    courtAdminStoke: {
      email: process.env.COURT_ADMIN_STOKE_USERNAME as string,
      password: process.env.COURT_ADMIN_STOKE_PASSWORD as string,
      // sessionFile:
      //   path.join(fileURLToPath(import.meta.url), "../../.sessions/") +
      //   `courtAdminStoke.json`,
      // cookieName: "xui-webapp",
    },
    caseManager: {
      email: process.env.CASEMANAGER_USERNAME as string,
      password: process.env.CASEMANAGER_PASSWORD as string,
      // sessionFile:
      //   path.join(fileURLToPath(import.meta.url), "../../.sessions/") +
      //   `caseManager.json`,
      // cookieName: "xui-webapp",
    },
    nocSolicitor: {
      email: process.env.NOC_SOLICITOR_USERNAME as string,
      password: process.env.NOC_SOLICITOR_PASSWORD as string,
      // sessionFile:
      //   path.join(fileURLToPath(import.meta.url), "../../.sessions/") +
      //   `nocSolicitor.json`,
      // cookieName: "xui-webapp",
    },
  };

  public static readonly sessionStoragePath: string = path.join(
    import.meta.dirname,
    "../.sessions/",
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
      ["aat", "demo", "preview", "ithc"].find((env) => url.includes(env)) ||
      "unknown"
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
    import.meta.dirname,
    "../assets/mockFile.txt",
  );
  public static readonly testPdfFile: string = path.resolve(
    import.meta.dirname,
    "../assets/mockFile.pdf",
  );
  public static readonly testWordFile: string = path.resolve(
    import.meta.dirname,
    "../assets/mockFile.docx",
  );
  public static readonly testOdtFile: string = path.resolve(
    import.meta.dirname,
    "../assets/mockFile.odt",
  );
  public static readonly testMP3File: string = path.resolve(
    import.meta.dirname,
    "../assets/mockFile.mp3",
  );

  public static getUserCredentials(role: UserRole): UserCredentialsSession {
    return this.userCredentials[role];
  }
}

Config.setEnvironmentVariables();

export default Config;
