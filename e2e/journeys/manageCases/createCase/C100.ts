import { solicitorCaseCreateType, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";

export class C100 {
  public static async c100(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    solicitorCaseType: solicitorCaseCreateType,
    errorMessaging: boolean,
  ): Promise<void> {
    await SolicitorCreateInitial.createInitialCase(
      page,
      "solicitor",
      false,
      "C100",
      false,
    );
  }
}
