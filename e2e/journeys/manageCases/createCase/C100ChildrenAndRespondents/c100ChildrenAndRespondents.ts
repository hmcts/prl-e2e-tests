import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { ChildrenAndRespondents1Page } from "../../../../pages/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondents1Page";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";
import { ChildrenAndRespondentsSubmitPage } from "../../../../pages/manageCases/createCase/C100/childrenAndRespondents/childrenAndRespondentsSubmitPage";

interface c100ChildrenAndRespondentsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoChildrenAndRespondents: boolean;
}

export class C100ChildAndRespondents {
  public static async c100ChildrenAndRespondents({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoChildrenAndRespondents,
  }: c100ChildrenAndRespondentsOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(
      page,
      "Children and respondents",
    );
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
