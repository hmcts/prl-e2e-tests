import { solicitorCaseCreateType, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import {
  RespondentDetailsCreatePage
} from "../../../pages/manageCases/createCase/FL401/respondentDetails/respondentDetailsCreatePage";

export class FL401 {
  public static async fl401(
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

    await this.navigateToEvent(
      page,
      'Respondent details',
    )

    await RespondentDetailsCreatePage.respondentDetailsCreatePage(
      page,
      errorMessaging,
      accessibilityTest
    )
  }

  private static async navigateToEvent(
    page: Page,
    linkText: string
  ): Promise<void> {
    let linkSelector = `a:text-is("${linkText}")`;
    await page.click(linkSelector);
  };
}
