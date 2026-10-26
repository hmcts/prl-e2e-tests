import { expect, Locator, Page } from "@playwright/test";
import { RespondentResponseSubmitPage } from "../respondentResponseSubmit.po.js";
import { AohDate } from "./allegationsOfHarmEventPage.po.js";
import {
  AllegationsOfHarm2Params,
  AohOrder,
  AohOrderName,
} from "./allegationsOfHarm2.po.js";
import { DomesticAbuseBehaviour } from "./domesticAbuseBehaviours.po.js";
import { ChildAbuseDetails } from "./childAbuseType.po.js";
import { ChildAbductionParams } from "./childAbduction.po.js";
import { OtherConcernsParams } from "./otherConcerns.po.js";

/** Everything entered in the "Allegations of harm" event, page by page. */
export interface AllegationsOfHarmParams {
  allegations: AllegationsOfHarm2Params;
  domesticAbuseBehaviours: DomesticAbuseBehaviour[];
  childAbuse: ChildAbuseDetails[];
  childAbduction: ChildAbductionParams;
  otherConcerns: OtherConcernsParams;
}

const MONTHS: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Check your answers for "Allegations of harm" (c100ResSolAllegationsOfHarmA/submit)
export class AllegationsOfHarmSubmitPage extends RespondentResponseSubmitPage {
  constructor(page: Page) {
    super(page, "Allegations of harm");
  }

  /**
   * Compares the answers table with its snapshot, then checks the key answers. Many questions repeat
   * across sections ("Give details", "Date issued", ...), so each check looks for a row holding both
   * the question and its answer.
   */
  async assertAnswers(
    params: AllegationsOfHarmParams,
    snapshotPath: string[],
    snapshotName: string,
  ): Promise<void> {
    await this.assertPageContents(snapshotPath, snapshotName);

    const { allegations, childAbduction, otherConcerns } = params;
    await this.assertAnswer("*Are there allegations of harm?", "Yes");
    await this.assertAnswer(
      "Any form of domestic abuse towards the respondent",
      this.yesNo(allegations.domesticAbuse),
    );
    await this.assertAnswer("Child abuse", this.yesNo(allegations.childAbuse));
    await this.assertAnswer(
      "Child abduction",
      this.yesNo(allegations.childAbduction),
    );
    if (allegations.substanceAbuseDetails) {
      await this.assertAnswer(
        "Give details",
        allegations.substanceAbuseDetails,
      );
    }
    if (allegations.otherConcernsDetails) {
      await this.assertAnswer("Give details", allegations.otherConcernsDetails);
    }
    for (const [name, details] of Object.entries(allegations.orders) as [
      AohOrderName,
      NonNullable<AllegationsOfHarm2Params["orders"][AohOrderName]>,
    ][]) {
      await this.assertAnswer(AohOrder[name].legend, "Yes");
      await this.assertAnswer(
        "Date issued",
        this.formatDate(details.dateIssued),
      );
      await this.assertAnswer("End date", this.formatDate(details.endDate));
      await this.assertAnswer("Name of court", details.courtName);
      await this.assertAnswer("Case number", details.caseNumber);
    }

    for (const behaviour of params.domesticAbuseBehaviours) {
      await this.assertAnswer("Type of abuse", behaviour.typeOfAbuse);
      await this.assertAnswer(
        "Describe the nature of the behaviour, what happened and who was involved.",
        behaviour.description,
      );
    }

    for (const childAbuse of params.childAbuse) {
      await expect(
        this.page.getByRole("heading", {
          name: `Child abuse - ${childAbuse.type}`,
          exact: true,
        }),
      ).toBeVisible();
      await this.assertAnswer(
        "Describe the nature of the behaviour, what happened and who was involved.",
        childAbuse.description,
      );
      for (const child of childAbuse.childrenAtRisk ?? []) {
        await this.assertAnswer("Which children are at risk?", child);
      }
    }

    await this.assertAnswer(
      "Why do you believe the child(ren) may be abducted?",
      childAbduction.reasons,
    );
    await this.assertAnswer(
      "Where is/are the child(ren) now?",
      childAbduction.childrenLocationNow,
    );
    for (const details of [
      childAbduction.previousThreatsDetails,
      childAbduction.policeInvolvementDetails,
    ]) {
      if (details) await this.assertAnswer("Give details", details);
    }

    await this.assertAnswer(
      "What steps or orders does the respondent want the court to take or make to protect the safety of the child(ren) and/or themselves?",
      otherConcerns.courtActions,
    );
    await this.assertAnswer(
      "Do you agree to the child(ren) spending unsupervised time with the other person(s) in receipt of this form?",
      this.yesNo(otherConcerns.agreeUnsupervisedTime),
    );
    await this.assertAnswer(
      "Do you agree to the child(ren) spending supervised time with the other person(s) in receipt of this form?",
      this.yesNo(otherConcerns.agreeSupervisedTime),
    );
  }

  /** A row (top level or inside a complex panel) whose question cell is the question and that shows the answer. */
  private async assertAnswer(question: string, answer: string): Promise<void> {
    const row: Locator = this.page
      .locator(".form-table tr")
      .filter({
        has: this.page.locator("th").getByText(question, { exact: true }),
      })
      .filter({ hasText: answer });
    await expect(
      row.first(),
      `"${question}" should show "${answer}"`,
    ).toBeVisible();
  }

  private yesNo(answer: boolean): string {
    return answer ? "Yes" : "No";
  }

  /** CCD shows dates as e.g. "15 Mar 2035". */
  private formatDate(date: AohDate): string {
    return `${Number(date.day)} ${MONTHS[Number(date.month) - 1]} ${date.year}`;
  }
}
