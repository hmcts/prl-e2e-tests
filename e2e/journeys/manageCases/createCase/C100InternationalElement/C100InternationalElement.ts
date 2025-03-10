import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { InternationalElement1Page } from "../../../../pages/manageCases/createCase/C100/internationalElement/internationalElement1Page";
import { InternationalElementSubmitPage } from "../../../../pages/manageCases/createCase/C100/internationalElement/internationalElementSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface internationalElementOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoInternationalElement: boolean;
}

export class C100InternationalElement {
  public static async c100InternationalElement({
    page,
    accessibilityTest,
    yesNoInternationalElement,
  }: internationalElementOptions): Promise<void> {
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
