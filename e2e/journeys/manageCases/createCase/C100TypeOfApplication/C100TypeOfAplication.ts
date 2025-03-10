import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import {
  selectApplicationType1Page,
  typeOfChildArrangementOrderID,
} from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Page";
import { selectApplicationType2Page } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType2Page";
import {
  radioButtons,
  selectApplicationType3Page,
} from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType3Page";
import { selectApplicationType4Page } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType4Page";
import { selectApplicationTypeSubmitPage } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationTypeSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface C100TypeOfApplicationParams {
  page: Page;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  yesNoC100TypeOfApplication: boolean;
  typeOfChildArrangementOrder: typeOfChildArrangementOrderID;
  selectionC100TypeOfApplication: radioButtons;
}

export class C100TypeOfApplication {
  public static async c100TypeOfApplication({
    page,
    errorMessaging,
    accessibilityTest,
    yesNoC100TypeOfApplication,
    typeOfChildArrangementOrder,
    selectionC100TypeOfApplication,
  }: C100TypeOfApplicationParams): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Type of application");
    await selectApplicationType1Page.selectApplicationType1Page(
      page,
      errorMessaging,
      accessibilityTest,
      typeOfChildArrangementOrder,
    );
    await selectApplicationType2Page.selectApplicationType2Page(
      page,
      errorMessaging,
      accessibilityTest,
      yesNoC100TypeOfApplication,
    );
    await selectApplicationType3Page.selectApplicationType3Page(
      page,
      errorMessaging,
      accessibilityTest,
      selectionC100TypeOfApplication,
    );
    await selectApplicationType4Page.selectApplicationType4Page(
      page,
      errorMessaging,
      accessibilityTest,
    );
    await selectApplicationTypeSubmitPage.selectApplicationTypeSubmitPage(
      page,
      accessibilityTest,
      yesNoC100TypeOfApplication,
      selectionC100TypeOfApplication,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
