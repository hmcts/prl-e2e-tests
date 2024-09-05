import { solicitorCaseCreateType, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";

export class FL401 {
  public static async fl401 (
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
      "FL401",
      false,
    );

  }

}
