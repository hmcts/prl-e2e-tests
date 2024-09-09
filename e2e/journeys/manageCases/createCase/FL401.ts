import { UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { FL401TypeOfApplication } from "./FL401TypeOfApplication/FL401TypeOfApplication";

export class FL401 {
  public static async fl401(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    isLinkedToC100: boolean,
  ): Promise<void> {
    await FL401TypeOfApplication.fl401TypeOfApplication(
      page,
      user,
      accessibilityTest,
      errorMessaging,
      isLinkedToC100
    );
  }
}
