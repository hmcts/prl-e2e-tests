import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { UserRole } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";
import { InternationalElement1Page } from "../../../../pages/manageCases/createCase/C100/internationalElement/internationalElement1Page";
import { InternationalElementSubmitPage } from "../../../../pages/manageCases/createCase/C100/internationalElement/internationalElementSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface internationalElementOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  yesNoInternationalElement: boolean;
  subJourney: boolean;
}

export class C100InternationalElement {
  public static async c100InternationalElement({
    page,
    user,
    accessibilityTest,
    yesNoInternationalElement,
    subJourney,
  }: internationalElementOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.selectSolicitorEvent(page, "International element");
    await InternationalElement1Page.internationalElement1Page({
      page,
      accessibilityTest,
      yesNoInternationalElement,
    });
    await InternationalElementSubmitPage.internationalElementSubmitPage({
      page,
      accessibilityTest,
      yesNoInternationalElement,
    });
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
