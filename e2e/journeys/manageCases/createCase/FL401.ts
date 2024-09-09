import { UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { TypeOfApplication1Page } from "../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication1Page";
import { TypeOfApplication2Page } from "../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication2Page";
import { TypeOfApplicationSubmitPage } from "../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplicationSubmitPage";
import { Helpers } from "../../../common/helpers";

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
    await Helpers.selectSolicitorEvent(
      page,
      "Type of application"
    )
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
}
