import { UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { FL401TypeOfApplication } from "./FL401TypeOfApplication/FL401TypeOfApplication";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { RespondentDetailsPage } from "../../../pages/manageCases/createCase/FL401/respondentDetails/respondentDetailsPage";

export class FL401 {
  public static async fl401(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    isLinkedToC100: boolean,
    allOptionsYes: boolean,
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

    await this.navigateToEvent(page, "Respondent details");

    await RespondentDetailsPage.respondentDetailsPage(
      page,
      errorMessaging,
      accessibilityTest,
      allOptionsYes,
    );
  }

  private static async navigateToEvent(
    page: Page,
    linkText: string,
  ): Promise<void> {
    let linkSelector = `a:text-is("${linkText}")`;
    await page.click(linkSelector);
  }
}
