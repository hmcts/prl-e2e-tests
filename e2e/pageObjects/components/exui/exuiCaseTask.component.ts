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

  /**
   * Asserts a task card on the Tasks tab shows the expected priority,
   * Manage links and assignee. Assertions are scoped to the exui-case-task
   * element for the named task only.
   *
   * @param taskName     exact task name, e.g. "Review CIR Extension Request"
   * @param priority     expected priority badge text (case-insensitive)
   * @param manageLinks  links expected in the Manage row,
   *                     e.g. ["Assign to me"] or ["Assign task", "Cancel task"]
   * @param assignedTo   optional exact "Assigned to" value to verify,
   *                     e.g. "Unassigned" or a user's full name
   */
  async assertTaskSummary(
    taskName: string,
    priority: "urgent" | "high" | "medium" | "low",
    manageLinks: string[],
    assignedTo?: string,
  ): Promise<void> {
    const task: Locator = this.page.locator("exui-case-task", {
      has: this.page.locator(`strong:text-is("${taskName}")`),
    });
    await expect(task, `Task "${taskName}" should be listed once`).toHaveCount(
      1,
    );

    const priorityBadge: Locator = task
      .locator(".govuk-summary-list__row", { hasText: "Priority" })
      .locator("exui-priority-field strong");
    await expect(
      priorityBadge,
      `Task "${taskName}" should have priority "${priority}"`,
    ).toHaveText(priority, { ignoreCase: true });

    for (const linkText of manageLinks) {
      await expect(
        task.locator(Selectors.a, { hasText: linkText }),
        `Task "${taskName}" should offer "${linkText}"`,
      ).toBeVisible();
    }

    if (assignedTo) {
      await expect(
        task
          .locator(".govuk-summary-list__row", { hasText: "Assigned to" })
          .locator("dd"),
        `Task "${taskName}" should be assigned to "${assignedTo}"`,
      ).toHaveText(assignedTo);
    }
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
