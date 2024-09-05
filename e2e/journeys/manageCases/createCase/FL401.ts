import {solicitorCaseCreateType, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import {
  TypeOfApplication1Page
} from "../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication1Page";
import { Selectors } from "../../../common/selectors";

export class FL401 {
  public static async fl401 (
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    solicitorCaseType: solicitorCaseCreateType = "FL401",
    errorMessaging: boolean,
  ): Promise<void> {
    await SolicitorCreateInitial.createInitialCase(
      page,
      user,
      accessibilityTest,
      solicitorCaseType,
      errorMessaging,
    );

    await this.navigateToEvent(
      page,
      "Type of application"
    )

    await TypeOfApplication1Page.typeOfApplication1Page(
      page,
      errorMessaging,
      accessibilityTest
    );
  }

  private static async navigateToEvent(
    page: Page,
    linkText: string
  ): Promise<void> {
    let linkSelector = `a:text-is("${linkText}")`;
    await page.click(linkSelector);
  };

}
