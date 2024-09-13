import { UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { FL401TypeOfApplication } from "./FL401TypeOfApplication/FL401TypeOfApplication";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { FL401WithoutNoticeOrder } from "./FL401WithoutNoticeOrder/FL401WIthoutNoticeOrder";

export type bailConditionRadios = "Yes" | "No" | "Don't know";

export class FL401 {
  public static async fl401(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    isLinkedToC100: boolean,
    isWithoutNotice: boolean,
    bailConditions: bailConditionRadios,
  ): Promise<void> {
    await SolicitorCreateInitial.createInitialCase(
      page,
      user,
      accessibilityTest,
      "FL401",
      errorMessaging,
    );
    await FL401TypeOfApplication.fl401TypeOfApplication(
      page,
      accessibilityTest,
      errorMessaging,
      isLinkedToC100,
    );
    await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder(
      page,
      accessibilityTest,
      errorMessaging,
      isWithoutNotice,
      bailConditions,
    );
  }
}
