import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import {
  selectApplicationType1Page,
  typeOfChildArrangementOrderID,
} from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType1Page.ts";
import { selectApplicationType2Page } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType2Page.ts";
import {
  radioButtons,
  selectApplicationType3Page,
} from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType3Page.ts";
import { selectApplicationType4Page } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationType4Page.ts";
import { selectApplicationTypeSubmitPage } from "../../../../pages/manageCases/createCase/C100/selectApplicationType/selectApplicationTypeSubmitPage.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";
import { UserRole } from "../../../../common/types.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";

interface C100TypeOfApplicationParams {
  page: Page;
  user: UserRole;
  errorMessaging: boolean;
  accessibilityTest: boolean;
  yesNoC100TypeOfApplication: boolean;
  typeOfChildArrangementOrder: typeOfChildArrangementOrderID;
  permissionSelection: radioButtons;
  subJourney: boolean;
}

export class C100TypeOfApplication {
  public static async c100TypeOfApplication({
    page,
    user,
    errorMessaging,
    accessibilityTest,
    yesNoC100TypeOfApplication,
    typeOfChildArrangementOrder,
    permissionSelection,
    subJourney,
  }: C100TypeOfApplicationParams): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
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
      permissionSelection,
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
      permissionSelection,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
