import path from "path";
import { UserCredentials, UserRole } from "./common/types";

export class Config {
  public static readonly userCredentials: Record<UserRole, UserCredentials> = {
    solicitor: {
      email: process.env.SOLICITOR_USERNAME || "solicitor-user",
      password: process.env.SOLICITOR_PASSWORD || "solicitor-password",
    },
    citizen: {
      email: process.env.CITIZEN_EMAIL || "citizen-user",
      password: process.env.CITIZEN_PASSWORD || "citizen-password"
  };

  public static readonly sessionStoragePath: string = path.join(
    __dirname,
    ".sessions/",
  );

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
