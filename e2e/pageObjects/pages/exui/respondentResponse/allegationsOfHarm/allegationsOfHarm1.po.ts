import { expect, Locator, Page } from "@playwright/test";
import {
  AllegationsOfHarmEventPage,
  RespondentNamePrefix,
} from "./allegationsOfHarmEventPage.po.js";
import { AllegationsOfHarm2Params } from "./allegationsOfHarm2.po.js";
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

// Respondent solicitor C7 response - "Allegations of harm", first page (c100ResSolAllegationsOfHarmA1).
export class AllegationsOfHarm1Page extends AllegationsOfHarmEventPage {
  private readonly labels: string[] = [
    "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
  ];
  private readonly allegationsOfHarmLegend: string =
    "*Are there allegations of harm?";

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await this.assertCommonContents(
      "A1",
      respondentName,
      RespondentNamePrefix.respondent,
    );
    await this.pageUtils.assertStrings(this.labels);
    const allegations: Locator = this.question(this.allegationsOfHarmLegend);
    await expect(allegations).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(hasAllegationsOfHarm: boolean): Promise<void> {
    await this.answerYesNo(this.allegationsOfHarmLegend, hasAllegationsOfHarm);
  }
}
