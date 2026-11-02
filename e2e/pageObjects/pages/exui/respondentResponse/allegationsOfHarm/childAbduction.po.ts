import { expect, Locator, Page } from "@playwright/test";
import {
  AllegationsOfHarmEventPage,
  RespondentNamePrefix,
} from "./allegationsOfHarmEventPage.po.js";

export enum PassportHolder {
  mother = "Mother",
  father = "Father",
  other = "Other",
}

export interface ChildPassports {
  hasMoreThanOne: boolean;
  heldBy: PassportHolder[];
  otherHolder?: string;
}

export interface ChildAbductionParams {
  reasons: string;
  previousThreatsDetails?: string;
  childrenLocationNow: string;
  passportOfficeNotified: boolean;
  policeInvolvementDetails?: string;
  passports?: ChildPassports;
}

export class ChildAbductionPage extends AllegationsOfHarmEventPage {
  private readonly sectionHeading: Locator = this.page.getByRole("heading", {
    level: 2,
    name: "Child abduction",
    exact: true,
  });
  private readonly reasons: Locator = this.page.getByRole("textbox", {
    name: "Why do you believe the child(ren) may be abducted?",
    exact: true,
  });
  private readonly previousThreats: Locator = this.question(
    "Have there been any previous threats, attempts to abduct or actual abduction of the child(ren)?",
  );
  private readonly childrenLocationNow: Locator = this.page.getByRole(
    "textbox",
    { name: "Where is/are the child(ren) now?", exact: true },
  );
  private readonly passportOfficeNotified: Locator = this.question(
    "Has the passport office been notifed?",
  );
  private readonly policeInvolvement: Locator = this.question(
    "Were the police or any other organisation/agency involved in any previous incident of attempted abduction or abduction?",
  );
  private readonly childHasPassport: Locator = this.question(
    "Do any of the children have a passport?",
  );
  private readonly multiplePassports: Locator = this.question(
    "Do the children have more than one passport?",
  );
  private readonly passportHolders: Locator = this.question(
    "Who is in possession of the children's passport(s)?",
  );
  private readonly otherHolder: Locator = this.page.getByRole("textbox", {
    name: "If other, specify",
    exact: true,
  });
  private readonly previousThreatsDetails: Locator = this.page.locator(
    "#respPreviousAbductionThreatsDetails",
  );
  private readonly policeInvolvementDetails: Locator = this.page.locator(
    "#respAbductionPreviousPoliceInvolvementDetails",
  );

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await this.assertCommonContents(
      "A10",
      respondentName,
      RespondentNamePrefix.activeRespondent,
    );
    await expect(this.sectionHeading).toBeVisible();
    for (const field of [
      this.reasons,
      this.previousThreats,
      this.childrenLocationNow,
      this.passportOfficeNotified,
      this.policeInvolvement,
      this.childHasPassport,
    ]) {
      await expect(field).toBeVisible();
    }
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(params: ChildAbductionParams): Promise<void> {
    await this.reasons.fill(params.reasons);
    await this.check(this.previousThreats, !!params.previousThreatsDetails);
    if (params.previousThreatsDetails) {
      await this.previousThreatsDetails.fill(params.previousThreatsDetails);
    }
    await this.childrenLocationNow.fill(params.childrenLocationNow);
    await this.check(
      this.passportOfficeNotified,
      params.passportOfficeNotified,
    );
    await this.check(this.policeInvolvement, !!params.policeInvolvementDetails);
    if (params.policeInvolvementDetails) {
      await this.policeInvolvementDetails.fill(params.policeInvolvementDetails);
    }

    const passports: ChildPassports | undefined = params.passports;
    await this.check(this.childHasPassport, !!passports);
    if (passports) {
      await this.check(this.multiplePassports, passports.hasMoreThanOne);
      for (const holder of passports.heldBy) {
        await this.checkUntilChecked(
          this.passportHolders.getByRole("checkbox", {
            name: holder,
            exact: true,
          }),
        );
      }
      if (passports.heldBy.includes(PassportHolder.other)) {
        await this.otherHolder.fill(passports.otherHolder ?? "");
      }
    }
  }

  private async check(question: Locator, yes: boolean): Promise<void> {
    await this.checkUntilChecked(
      question.getByRole("radio", { name: yes ? "Yes" : "No", exact: true }),
    );
  }
}
