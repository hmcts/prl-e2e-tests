import { expect, Locator, Page } from "@playwright/test";
import {
  AllegationsOfHarmEventPage,
  RespondentNamePrefix,
} from "./allegationsOfHarmEventPage.po.js";

export interface OtherConcernsParams {
  courtActions: string;
  agreeUnsupervisedTime: boolean;
  agreeSupervisedTime: boolean;
  agreeOtherContact: boolean;
}

export class OtherConcernsPage extends AllegationsOfHarmEventPage {
  private readonly otherConcernsHeading: Locator = this.page.getByRole(
    "heading",
    { level: 2, name: "Other concerns", exact: true },
  );
  private readonly childContactHeading: Locator = this.page.getByRole(
    "heading",
    { level: 3, name: "Child contact", exact: true },
  );
  private readonly courtActions: Locator = this.page.getByRole("textbox", {
    name: "What steps or orders does the respondent want the court to take or make to protect the safety of the child(ren) and/or themselves?",
    exact: true,
  });
  private readonly legends = {
    unsupervised:
      "Do you agree to the child(ren) spending unsupervised time with the other person(s) in receipt of this form?",
    supervised:
      "Do you agree to the child(ren) spending supervised time with the other person(s) in receipt of this form?",
    otherContact:
      "Do you agree to the child having other forms of contact with the other person in receipt of this form? (by telephone, text, email, social media)",
  } as const;

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await this.assertCommonContents(
      "A11",
      respondentName,
      RespondentNamePrefix.activeRespondent,
    );
    await expect(this.otherConcernsHeading).toBeVisible();
    await expect(this.courtActions).toBeVisible();
    await expect(this.childContactHeading).toBeVisible();
    for (const legend of Object.values(this.legends)) {
      await expect(this.question(legend)).toBeVisible();
    }
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(params: OtherConcernsParams): Promise<void> {
    await this.courtActions.fill(params.courtActions);
    await this.answerYesNo(
      this.legends.unsupervised,
      params.agreeUnsupervisedTime,
    );
    await this.answerYesNo(this.legends.supervised, params.agreeSupervisedTime);
    await this.answerYesNo(this.legends.otherContact, params.agreeOtherContact);
  }
}
