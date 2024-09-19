import {
  C100ChildGender,
  ChildDetailsRevised1Page,
} from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page";
import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { UserRole } from "../../../../common/types";
import { Helpers } from "../../../../common/helpers";

interface c100ChildDetailsOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  c100ChildGender: C100ChildGender;
  errorMessaging: boolean;
  subJourney: boolean;
}

export class C100ChildDetails {
  public static async c100ChildDetails({
    page: page,
    user: user,
    accessibilityTest: accessibilityTest,
    c100ChildGender: c100ChildGender,
    errorMessaging: errorMessaging,
    subJourney: subJourney,
  }: c100ChildDetailsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.selectSolicitorEvent(page, "Child details");
    await ChildDetailsRevised1Page.childDetailsRevised1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
    });
  }
}
