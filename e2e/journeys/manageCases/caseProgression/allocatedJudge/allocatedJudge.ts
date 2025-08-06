import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { AllocatedJudge1Page } from "../../../../pages/manageCases/caseProgression/allocatedJudge/allocatedJudge1.ts";
import { AllocatedJudgeSubmit } from "../../../../pages/manageCases/caseProgression/allocatedJudge/allocatedJudgeSubmit.ts";

interface AllocatedJudgeParams {
  page: Page;
  accessibilityTest: boolean;
}

export class AllocatedJudge {
  public static async allocatedJudge({
    page,
    accessibilityTest,
  }: AllocatedJudgeParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Allocated judge");
    await AllocatedJudge1Page.allocatedJudge1Page(page, accessibilityTest);
    await AllocatedJudgeSubmit.allocatedJudgeSubmit(page, accessibilityTest);
  }
}
