import { expect, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { RespondentResponseSubmitPage } from "../respondentResponseSubmit.po.js";

export interface MiamParams {
  hasAttendedMiam: boolean;
  willingToAttendMiam?: boolean;
  reasonNotWilling?: string;
}

export class MiamSubmitPage extends RespondentResponseSubmitPage {
  constructor(page: Page) {
    super(page, "MIAM");
  }

  async assertAnswers(
    params: MiamParams,
    snapshotPath: string[],
    snapshotName: string,
  ): Promise<void> {
    await this.assertPageContents(snapshotPath, snapshotName);
    const yesNo = (answer?: boolean): string =>
      answer ? CommonStaticText.yes : CommonStaticText.no;

    const answers: [string, string][] = [
      [
        "Has the respondent attended a Mediation Information and Assessment Meeting (MIAM)?",
        yesNo(params.hasAttendedMiam),
      ],
    ];
    if (!params.hasAttendedMiam) {
      answers.push([
        "Would they be willing to attend a MIAM?",
        yesNo(params.willingToAttendMiam),
      ]);
      if (!params.willingToAttendMiam) {
        answers.push(["Explain why", params.reasonNotWilling ?? ""]);
      }
    }

    for (const [question, answer] of answers) {
      const row = this.page
        .locator(".form-table tr")
        .filter({ has: this.page.getByText(question, { exact: true }) });
      await expect(row).toHaveCount(1);
      await expect(row.locator("td").first()).toHaveText(answer);
    }
  }
}
