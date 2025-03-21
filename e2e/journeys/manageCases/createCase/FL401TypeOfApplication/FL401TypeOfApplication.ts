import { Helpers } from "../../../../common/helpers";
import { TypeOfApplication1Page } from "../../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication1Page";
import { TypeOfApplication2Page } from "../../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplication2Page";
import { TypeOfApplicationSubmitPage } from "../../../../pages/manageCases/createCase/FL401/typeOfApplication/typeOfApplicationSubmitPage";
import { Page } from "@playwright/test";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

interface fl401TypeOfApplicationOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  isLinkedToC100: boolean;
}

export class FL401TypeOfApplication {
  public static async fl401TypeOfApplication({
    page,
    accessibilityTest,
    errorMessaging,
    isLinkedToC100,
  }: fl401TypeOfApplicationOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Type of application");
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
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
