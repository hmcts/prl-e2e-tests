import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";
import { UserRole } from "../../../../common/types.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { InternationalElement1Page } from "../../../../pages/manageCases/createCase/C100/internationalElement/internationalElement1Page.ts";
import { InternationalElementSubmitPage } from "../../../../pages/manageCases/createCase/C100/internationalElement/internationalElementSubmitPage.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";

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
    await Helpers.handleEventBasedOnEnvironment(page, "International element");
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
