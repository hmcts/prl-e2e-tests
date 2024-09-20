import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import { ChildrenAndRespondents1Page } from "../../../../pages/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondents1Page";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";
import { ChildrenAndRespondentsSubmitPage } from "../../../../pages/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondentsSubmitPage";

interface c100ChildrenAndRespondentsOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoChildrenAndRespondents: boolean;
  subJourney: boolean;
}

export class C100ChildAndRespondents {
  public static async c100ChildrenAndRespondents({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoChildrenAndRespondents,
    subJourney,
  }: c100ChildrenAndRespondentsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.selectSolicitorEvent(page, "Children and respondents");
    await ChildrenAndRespondents1Page.childrenAndRespondents1Page(
      page,
      accessibilityTest,
      errorMessaging,
      yesNoChildrenAndRespondents,
    );
    await ChildrenAndRespondentsSubmitPage.childrenAndRespondentsSubmitPage(
      page,
      accessibilityTest,
      yesNoChildrenAndRespondents,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
