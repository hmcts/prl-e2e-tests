import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";

export class ExuiCaseTaskComponent {
  constructor(private page: Page) {}

  async assignTaskToMe(taskName: string): Promise<void> {
    await this.page
      .locator("exui-case-task", {
        hasText: taskName,
      })
      .locator(Selectors.a, { hasText: "Assign to me" })
      .click();
  }

  async triggerNextSteps(
    taskName: string,
    nextStepsActionName: string,
  ): Promise<void> {
    await this.page
      .locator("exui-case-task", {
        hasText: taskName,
      })
      .locator(Selectors.a, { hasText: nextStepsActionName })
      .click();
  }
}
