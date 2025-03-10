import { Page } from "@playwright/test";
import { UserRole } from "../../../../common/types";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import { LitigationCapacity1Page } from "../../../../pages/manageCases/createCase/C100/litigationCapacity/litigationCapacity1Page";
import { LitigationCapacitySubmitPage } from "../../../../pages/manageCases/createCase/C100/litigationCapacity/litigationCapacitySubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface C100LitigationCapacityOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoLitigationCapacity: boolean;
}

export class C100LitigationCapacity {
  public static async c100LitigationCapacity({
    page,
    accessibilityTest,
    yesNoLitigationCapacity,
  }: C100LitigationCapacityOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Litigation capacity");
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
