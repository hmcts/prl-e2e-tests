import { expect, Locator, Page } from "@playwright/test";
import { CaseAccessViewPage } from "../caseAccessView.po.js";

/** Task status, as the status icon's title on the "Respondent 1 tasks" tab. */
export const RespondentTaskStatus = {
  notStarted: "Not started / Heb ddechrau",
  inProgress: "In progress / Ar y gweill",
  finished: "Finished / Wedi gorffen",
  cannotStartYet: "Cannot start yet / Methu dechrau eto",
} as const;

export type RespondentTaskStatusName =
  (typeof RespondentTaskStatus)[keyof typeof RespondentTaskStatus];

/** Task link names on the "Respondent 1 tasks" tab. */
export const RespondentTask = {
  consentToApplication:
    "Do you give your consent? / A ydych yn rhoi eich caniatâd?",
  keepDetailsPrivate: "Keep details private / Cadwch y manylion yn breifat",
  editContactDetails: "Edit contact details / Golygu manylion cyswllt",
  attendingTheCourt: "Attending the court / Mynychu'r llys",
  miam: "MIAM / MIAM",
  allegationsOfHarm: "Make allegations of harm / Gwneud honiadau o niwed",
  otherProceedings: "Other proceedings / Achosion eraill",
  internationalElement: "International element / Elfen ryngwladol",
  litigationCapacity: "Litigation capacity / Capasiti cyfreitha",
} as const;

export type RespondentTaskName =
  (typeof RespondentTask)[keyof typeof RespondentTask];

// Section heading -> task links in that section, as shown before any task is started
const TASK_SECTIONS: Record<string, RespondentTaskName[]> = {
  "1. Consent to the Application / Caniatâd i'r Cais": [
    RespondentTask.consentToApplication,
  ],
  "2. Respondent's details / Manylion yr atebydd": [
    RespondentTask.keepDetailsPrivate,
    RespondentTask.editContactDetails,
    RespondentTask.attendingTheCourt,
  ],
  "3. Application details / Manylion cais": [RespondentTask.miam],
  "4. Safety Concerns / Pryderon Diogelwch": [RespondentTask.allegationsOfHarm],
  "5. Additional information / Gwybodaeth ychwanegol": [
    RespondentTask.otherProceedings,
    RespondentTask.internationalElement,
    RespondentTask.litigationCapacity,
  ],
};

/** "Respondent 1 tasks" case tab, shown to the solicitor representing respondent 1. */
export class RespondentTasksPage extends CaseAccessViewPage {
  readonly tabName: string = "Respondent 1 tasks";
  private readonly tab: Locator = this.page.getByRole("tab", {
    name: this.tabName,
  });
  private readonly taskList: Locator = this.page.locator(
    "#case-viewer-field-read--respondentTaskListLabelA",
  );

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.tab.click();
  }

  async assertTabIsSelected(): Promise<void> {
    await expect(this.tab).toHaveAttribute("aria-selected", "true");
  }

  /** Asserts the task list for a response that has not been started yet. */
  async assertPageContents(respondentName: string): Promise<void> {
    await expect(
      this.taskList.getByRole("heading", {
        level: 3,
        name: `Respond to the application for respondent ${respondentName} / Ymateb i gais yr atebydd ${respondentName}`,
      }),
    ).toBeVisible();

    for (const [section, tasks] of Object.entries(TASK_SECTIONS)) {
      await this.assertSectionHeading(section);
      for (const task of tasks) {
        await this.assertTaskStatus(task, RespondentTaskStatus.notStarted);
      }
    }

    await this.assertSectionHeading("6. View PDF response / Gweld ymateb PDF");
    await expect(
      this.taskLink("View a draft of your response / Gweld drafft o'ch ymateb"),
    ).toBeVisible();

    await this.assertSectionHeading("7. Submit / Cyflwyno");
    await expect(
      this.taskList
        .locator("p", { hasText: "Submit / Cyflwyno" })
        .locator(`img[title="${RespondentTaskStatus.cannotStartYet}"]`),
    ).toBeVisible();
    await expect(
      this.taskList.getByText("Why can't I submit my application?"),
    ).toBeVisible();
  }

  async clickTask(taskName: RespondentTaskName): Promise<void> {
    await this.taskLink(taskName).click();
  }

  private taskLink(taskName: string): Locator {
    return this.taskList
      .getByRole("link", { name: taskName, exact: true })
      .first();
  }

  private async assertSectionHeading(section: string): Promise<void> {
    await expect(
      this.taskList.getByRole("heading", {
        level: 2,
        name: section,
        exact: true,
      }),
    ).toBeVisible();
  }

  async assertTaskStatus(
    taskName: RespondentTaskName,
    status: RespondentTaskStatusName,
  ): Promise<void> {
    await expect(this.taskLink(taskName)).toBeVisible();
    await expect(
      this.taskList
        .locator("p")
        .filter({
          has: this.page.getByRole("link", { name: taskName, exact: true }),
        })
        .first()
        .locator(`img[title="${status}"]`),
    ).toBeVisible();
  }
}
