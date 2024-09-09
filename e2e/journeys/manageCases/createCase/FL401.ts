import { solicitorCaseCreateType, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { TypeOfApplication1Page } from "../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication1Page";
import { TypeOfApplication2Page } from "../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication2Page";
import { TypeOfApplicationSubmitPage } from "../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplicationSubmitPage";

export class FL401 {
  public static async fl401(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    isLinkedToC100: boolean,
  ): Promise<void> {
    await SolicitorCreateInitial.createInitialCase(
      page,
      user,
      accessibilityTest,
      "FL401",
      errorMessaging,
    );
    await this.navigateToEvent(page, "Type of application");
    await TypeOfApplication1Page.typeOfApplication1Page(
      page,
      errorMessaging,
      accessibilityTest,
    );
    await TypeOfApplication2Page.typeOfApplication2Page(
      page,
      errorMessaging,
      accessibilityTest,
      isLinkedToC100,
    );
    await TypeOfApplicationSubmitPage.typeOfApplicationSubmitPage(
      page,
      isLinkedToC100,
      accessibilityTest,
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
