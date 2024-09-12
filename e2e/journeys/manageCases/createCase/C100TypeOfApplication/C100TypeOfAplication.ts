import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { selectApplicationType1Page } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Page";
import { selectApplicationType2Page } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType2Page";
import { selectApplicationType3Page } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType3Page";
import { selectApplicationType4Page } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType4Page";
import { selectApplicationTypeSubmitPage } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationTypeSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

export class C100TypeOfApplication {
  public static async c100TypeOfApplication(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    yesNo: boolean,
  ): Promise<void> {
    await Helpers.selectSolicitorEvent(page, "Type of application");
    await selectApplicationType1Page.selectApplicationType1Page(
      page,
      errorMessaging,
      accessibilityTest,
    );
    await selectApplicationType2Page.selectApplicationType2Page(
      page,
      errorMessaging,
      accessibilityTest,
      yesNo,
    );
    await selectApplicationType3Page.selectApplicationType3Page(
      page,
      errorMessaging,
      accessibilityTest,
    );
    await selectApplicationType4Page.selectApplicationType4Page(
      page,
      errorMessaging,
      accessibilityTest,
    );
    await selectApplicationTypeSubmitPage.selectApplicationTypeSubmitPage(
      page,
      accessibilityTest,
      yesNo,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
