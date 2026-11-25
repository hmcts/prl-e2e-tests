import { expect, Locator, Page } from "@playwright/test";
import {
  AllegationsOfHarmEventPage,
  AohDate,
  RespondentNamePrefix,
} from "./allegationsOfHarmEventPage.po.js";

export const AohOrder = {
  nonMolestation: {
    legend: "Non-molestation order",
    fieldId: "respOrdersNonMolestation",
  },
  occupation: { legend: "Occupation order", fieldId: "respOrdersOccupation" },
  forcedMarriageProtection: {
    legend: "Forced marriage protection order",
    fieldId: "respOrdersForcedMarriageProtection",
  },
  restraining: {
    legend: "Restraining order",
    fieldId: "respOrdersRestraining",
  },
  otherInjunctive: {
    legend: "Other injunctive order",
    fieldId: "respOrdersOtherInjunctive",
  },
  undertakingInPlace: {
    legend: "Undertaking in place of order",
    fieldId: "respOrdersUndertakingInPlace",
  },
} as const;

export type AohOrderName = keyof typeof AohOrder;

export interface AohOrderDetails {
  dateIssued: AohDate;
  endDate: AohDate;
  isCurrent: boolean;
  courtName: string;
  caseNumber: string;
}

export interface AllegationsOfHarm2Params {
  domesticAbuse: boolean;
  childAbuse: boolean;
  childAbduction: boolean;
  substanceAbuseDetails?: string;
  otherConcernsDetails?: string;
  orders: Partial<Record<AohOrderName, AohOrderDetails>>;
}

export class AllegationsOfHarm2Page extends AllegationsOfHarmEventPage {
  private readonly labels: string[] = [
    "Are there allegations that the child(ren) or respondent(s) have experienced, or are at risk of experiencing, harm from any of the following by any person who has had contact with the child?",
    "Has the respondent had (or does the respondent currently have) any of the these orders?",
  ];
  private readonly legends = {
    domesticAbuse: "Any form of domestic abuse towards the respondent",
    childAbuse: "Child abuse",
    childAbduction: "Child abduction",
    substanceAbuse: "Drugs, alcohol or substance abuse?",
    otherConcerns: "Other safety or welfare concerns",
  } as const;
  private readonly ordersHeading: Locator = this.page.getByRole("heading", {
    name: "Orders",
    exact: true,
  });
  private readonly substanceAbuseDetails: Locator = this.page.locator(
    "#respAohSubstanceAbuseDetails",
  );
  private readonly otherConcernsDetails: Locator = this.page.locator(
    "#respAohOtherConcernsDetails",
  );

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await this.assertCommonContents(
      "A2",
      respondentName,
      RespondentNamePrefix.respondent,
    );
    await this.pageUtils.assertStrings(this.labels);
    for (const legend of Object.values(this.legends)) {
      await expect(this.question(legend)).toBeVisible();
    }
    await expect(this.ordersHeading).toBeVisible();
    for (const order of Object.values(AohOrder)) {
      await expect(this.question(order.legend)).toBeVisible();
    }
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(params: AllegationsOfHarm2Params): Promise<void> {
    await this.answerYesNo(this.legends.domesticAbuse, params.domesticAbuse);
    await this.answerYesNo(this.legends.childAbuse, params.childAbuse);
    await this.answerYesNo(this.legends.childAbduction, params.childAbduction);

    await this.answerYesNo(
      this.legends.substanceAbuse,
      !!params.substanceAbuseDetails,
    );
    if (params.substanceAbuseDetails) {
      await this.substanceAbuseDetails.fill(params.substanceAbuseDetails);
    }
    await this.answerYesNo(
      this.legends.otherConcerns,
      !!params.otherConcernsDetails,
    );
    if (params.otherConcernsDetails) {
      await this.otherConcernsDetails.fill(params.otherConcernsDetails);
    }

    for (const [name, order] of Object.entries(AohOrder) as [
      AohOrderName,
      (typeof AohOrder)[AohOrderName],
    ][]) {
      const details: AohOrderDetails | undefined = params.orders[name];
      await this.answerYesNo(order.legend, !!details);
      if (details) await this.fillOrderDetails(order.fieldId, details);
    }
  }

  private async fillOrderDetails(
    fieldId: string,
    details: AohOrderDetails,
  ): Promise<void> {
    await this.checkUntilChecked(
      this.page.locator(
        `#${fieldId}Current_${details.isCurrent ? "Yes" : "No"}`,
      ),
    );
    await this.page.locator(`#${fieldId}CourtName`).fill(details.courtName);
    await this.page.locator(`#${fieldId}CaseNumber`).fill(details.caseNumber);
    // dates last: CCD redraws the form after a date is entered (see checkUntilChecked)
    await this.fillDate(`${fieldId}DateIssued`, details.dateIssued);
    await this.fillDate(`${fieldId}EndDate`, details.endDate);
  }
}
