import { UserRole } from "../../../../common/types";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { Helpers } from "../../../../common/helpers";
import {
  TypeOfApplication1Page
} from "../../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication1Page";
import {
  TypeOfApplication2Page
} from "../../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication2Page";
import {
  TypeOfApplicationSubmitPage
} from "../../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplicationSubmitPage";
import { Page } from "@playwright/test";

export class FL401TypeOfApplication {
  public static async fl401TypeOfApplication(
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
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
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