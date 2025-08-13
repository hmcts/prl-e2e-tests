import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { ExuiCaseTaskComponent } from "../../../components/exui/exuiCaseTask.component.js";
import { Selectors } from "../../../../common/selectors.js";

export class TasksPage extends CaseAccessViewPage {
  readonly heading: Locator;
  readonly task: ExuiCaseTaskComponent;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator(".govuk-heading-m", {
      hasText: "Active tasks",
    });
    this.task = new ExuiCaseTaskComponent(page);
  }

  async assignTaskToMeAndTriggerNextSteps(
    taskName: string,
    nextStepsActionName: string,
  ): Promise<void> {
    await this.waitForTask(taskName);
    await this.task.assignTaskToMe(taskName);
    await this.alertBanner.assertTaskAssignedAlert();
    await this.task.triggerNextSteps(taskName, nextStepsActionName);
  }

  private async waitForTask(taskName: string): Promise<void> {
    // refresh page until the task shows up - there can be some delay
    await expect
      .poll(
        async () => {
          const visible = await this.page
            .locator(Selectors.strong, {
              hasText: taskName,
            })
            .isVisible();
          if (!visible) {
            await this.page.reload();
          }
          return visible;
        },
        {
          // Allow 10s delay before retrying
          intervals: [10_000],
          // Allow up to a minute for it to become visible
          timeout: 100_000,
        },
      )
      .toBeTruthy();
  }
}