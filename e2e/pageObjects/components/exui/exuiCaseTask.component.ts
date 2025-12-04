import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { UserRole } from "../../../common/types.js";

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

  async assertManageActions(
    taskName: string,
    userRole: UserRole,
  ): Promise<void> {
    const task: Locator = this.page.locator("exui-case-task", {
      hasText: taskName,
    });

    const reassignTask: Locator = task.locator(Selectors.a, {
      hasText: "Reassign task",
    });
    const unassignTask: Locator = task.locator(Selectors.a, {
      hasText: "Unassign task",
    });
    await expect(reassignTask).toBeVisible();
    await expect(unassignTask).toBeVisible();

    if (userRole === "caseManager" || userRole === "courtAdminStoke") {
      const cancelTask: Locator = task.locator(Selectors.a, {
        hasText: "Cancel task",
      });
      const markAsDone: Locator = task.locator(Selectors.a, {
        hasText: "Mark as done",
      });
      await expect(cancelTask).toBeVisible();
      await expect(markAsDone).toBeVisible();
    }
  }
}
