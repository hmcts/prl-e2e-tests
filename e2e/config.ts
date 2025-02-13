import path from "path";
import dotenv from "dotenv";

import { UserCredentials, UserRole } from "./common/types";
import process from "node:process";

dotenv.config();

export class Config {
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

  public static getEnvironment(url: string): string {
    return (
      ["aat", "demo", "preview", "ithc"].find((env) => url.includes(env)) ||
      "unknown"
    );
  }

  public static setEnvironment(): void {
    const env_citizen =
      this.getEnvironment(this.citizenFrontendBaseURL) || "aat";
    const env_manage_cases =
      this.getEnvironment(this.manageCasesBaseURL) || "aat";
    process.env.CITIZEN_TEST_ENV = env_citizen;
    process.env.MANAGE_CASES_TEST_ENV = env_manage_cases;
    process.env.TEST_ENV =
      env_citizen !== "aat" || env_manage_cases !== "aat" ? env_citizen : "aat";
  }

  public static baseUserCredentials: Record<UserRole, UserCredentials> = {
    solicitor: {
      email: process.env.AAT_SOLICITOR_USERNAME || "",
      password: process.env.PROF_PASSWORD || "",
    },
    judge: {
      email: process.env.AAT_JUDGE_USERNAME || "",
      password: process.env.JUDGE_PASSWORD || "",
    },
    caseWorker: {
      email: process.env.AAT_CASEWORKER_USERNAME || "",
      password: process.env.PROF_PASSWORD || "",
    },
    courtAdminStoke: {
      email: process.env.AAT_COURT_ADMIN_STOKE_USERNAME || "",
      password: process.env.PROF_PASSWORD || "",
    },
    caseManager: {
      email: process.env.AAT_CASEMANAGER_USERNAME || "",
      password: process.env.PROF_PASSWORD || "",
    },
  };

  public static urlConfig(env: string): Record<string, string> {
    return {
      IDAM_TOKEN_URL: `https://idam-web-public.${env}.platform.hmcts.net/o/token`,
      IDAM_TESTING_SUPPORT_USERS_URL: `https://idam-testing-support-api.${env}.platform.hmcts.net/test/idam/users`,
      COURTNAV_CASE_URL: `https://cft-api-mgmt.${env}.platform.hmcts.net/prl-cos-api/case`,
      COURTNAV_DOC_URL: `https://cft-api-mgmt.${env}.platform.hmcts.net/prl-document-api/`,
      S2S_TOKEN_URL: `http://rpe-service-auth-provider-${env}.service.core-compute-${env}.internal/testing-support/lease`,
      CCD_DATA_STORE_URL: `http://ccd-data-store-api-${env}.service.core-compute-aat.internal`,
      MANAGE_CASE_REDIRECT_URI: `https://manage-case.${env}.platform.hmcts.net/oauth2/callback`,
    };
  }

  public static getEnvUserCredentials(
    env: string,
  ): Record<UserRole, UserCredentials> {
    const credentials = { ...this.baseUserCredentials }; //copy base credentials
    if (env === "aat" || env === "preview") {
      //if aat or preview, keep the base credentials
      return credentials;
    }
    // get environment specific emails
    const envUpper = env.toUpperCase();
    const envEmails: Partial<Record<UserRole, string>> = {
      solicitor: process.env[`${envUpper}_SOLICITOR_USERNAME`] || "",
      judge: process.env[`${envUpper}_JUDGE_USERNAME`] || "",
      caseWorker: process.env[`${envUpper}_CASEWORKER_USERNAME`] || "",
      courtAdminStoke:
        process.env[`${envUpper}_COURT_ADMIN_STOKE_USERNAME`] || "",
      caseManager: process.env[`${envUpper}_CASEMANAGER_USERNAME`] || "",
    };
    // update user credentials with new environment specific emails
    Object.keys(envEmails).forEach((role) => {
      const email = envEmails[role as UserRole];
      if (email) {
        credentials[role as UserRole].email = email;
      }
    });
    return credentials;
  }

  public static courtNavEnvConfig(env: string): {
    COURTNAV_USERNAME: string;
    COURTNAV_SUBSCRIPTION_KEY_CREATE_CASE: string;
    COURTNAV_SUBSCRIPTION_KEY_ADD_DOC: string;
  } {
    const envUpper = env.toUpperCase();
    const username = process.env[`${envUpper}_COURTNAV_USERNAME`];
    const createKey =
      process.env[`${envUpper}_COURTNAV_SUBSCRIPTION_KEY_CREATE_CASE`];
    const addDocKey =
      process.env[`${envUpper}_COURTNAV_SUBSCRIPTION_KEY_ADD_DOC`];

    return {
      COURTNAV_USERNAME: username || "",
      COURTNAV_SUBSCRIPTION_KEY_CREATE_CASE: createKey || "",
      COURTNAV_SUBSCRIPTION_KEY_ADD_DOC: addDocKey || "",
    };
  }

  public static readonly testFileTxt: string = path.resolve(
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
}

Config.setEnvironment();

export default Config;
