import {
  C100OtherChildGender,
  OtherChildNotInTheCase1Page,
} from "../../../../pages/manageCases/createCase/C100/otherChildrenNotInTheCase/otherChildNotInTheCase1Page";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import { OtherChildNotInTheCaseSubmitPage } from "../../../../pages/manageCases/createCase/C100/otherChildrenNotInTheCase/otherChildNotInTheCaseSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface C100OtherChildrenNotInTheCaseOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  otherChildPresent: boolean;
  otherChildGender: C100OtherChildGender;
  otherChildDOBKnown: boolean;
}
export class C100OtherChildrenNotInTheCase {
  public static async c100OtherChildrenNotInTheCase({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    otherChildPresent: otherChildPresent,
    otherChildGender: otherChildGender,
    otherChildDOBKnown: otherChildDOBKnown,
  }: C100OtherChildrenNotInTheCaseOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(
      page,
      "Other children not in the case",
    );
    await OtherChildNotInTheCase1Page.otherChildNotInTheCase1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      otherChildPresent: otherChildPresent,
      otherChildGender: otherChildGender,
      otherChildDOBKnown: otherChildDOBKnown,
    });
    await OtherChildNotInTheCaseSubmitPage.otherChildNotInTheCaseSubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      otherChildPresent: otherChildPresent,
      otherChildGender: otherChildGender,
      otherChildDOBKnown: otherChildDOBKnown,
    });
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
