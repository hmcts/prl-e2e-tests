import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";

export class ExuiCaseTaskComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

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
