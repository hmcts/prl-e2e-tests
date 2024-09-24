import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import { ChildrenAndOtherPeople1Page } from "../../../../pages/manageCases/createCase/C100/childrenAndOtherPeople/childrenAndOtherPeople1Page";
import { ChildrenAndOtherPeopleSubmitPage } from "../../../../pages/manageCases/createCase/C100/childrenAndOtherPeople/childrenAndOtherPeopleSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface c100ChildrenAndOtherPeopleOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoChildrenAndOtherPeople: boolean;
  subJourney: boolean;
}

export class C100ChildrenAndOtherPeople {
  public static async c100ChildrenAndOtherPeople({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoChildrenAndOtherPeople,
    subJourney,
  }: c100ChildrenAndOtherPeopleOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.selectSolicitorEvent(page, "Children and other people");
    await ChildrenAndOtherPeople1Page.childrenAndOtherPeople1Page(
      page,
      accessibilityTest,
      errorMessaging,
      yesNoChildrenAndOtherPeople,
    );
    await ChildrenAndOtherPeopleSubmitPage.childrenAndOtherPeopleSubmitPage(
      page,
      accessibilityTest,
      yesNoChildrenAndOtherPeople,
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
