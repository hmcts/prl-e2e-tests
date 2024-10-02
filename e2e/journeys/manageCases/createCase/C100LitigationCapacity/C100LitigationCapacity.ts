import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import { LitigationCapacity1Page } from "../../../../pages/manageCases/createCase/C100/litigationCapacity/litigationCapacity1Page";
import { LitigationCapacitySubmitPage } from "../../../../pages/manageCases/createCase/C100/litigationCapacity/litigationCapacitySubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface C100LitigationCapacityOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  yesNoLitigationCapacity: boolean;
  subJourney: boolean;
}

export class C100LitigationCapacity {
  public static async c100LitigationCapacity({
    page,
    user,
    accessibilityTest,
    yesNoLitigationCapacity,
    subJourney,
  }: C100LitigationCapacityOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.selectSolicitorEvent(page, "Litigation capacity");
    await LitigationCapacity1Page.litigationCapacity1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoLitigationCapacity: yesNoLitigationCapacity,
    });
    await LitigationCapacitySubmitPage.litigationCapacitySubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoLitigationCapacity: yesNoLitigationCapacity,
    });
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}