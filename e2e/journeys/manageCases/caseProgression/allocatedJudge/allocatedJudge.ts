import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { AllocatedJudge1Page } from "../../../../pages/manageCases/caseProgression/allocatedJudge/allocatedJudge1.ts";
import { completeCheckApplicationAndSendToGatekeeper } from "../../../../common/caseEventsHelper.ts";
import {
  AllocatedJudgeSubmit
} from "../../../../pages/manageCases/caseProgression/allocatedJudge/allocatedJudgeSubmit.ts";


interface AllocatedJudgeParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
}

export class AllocatedJudge {
  public static async allocatedJudge({
                                         page,
                                         accessibilityTest,
                                         ccdRef,
                                       }: AllocatedJudgeParams): Promise<void> {
    await completeCheckApplicationAndSendToGatekeeper(page, ccdRef);
    await page.reload();
    await Helpers.chooseEventFromDropdown(page, "Allocated judge");
    await AllocatedJudge1Page.allocatedJudge1Page(
      page,
      accessibilityTest
    );
    await AllocatedJudgeSubmit.allocatedJudgeSubmit(
      page,
      accessibilityTest
    );
  }
}

