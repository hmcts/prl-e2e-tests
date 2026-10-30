import { expect, Locator, Page } from "@playwright/test";
import {
  AllegationsOfHarmEventPage,
  RespondentNamePrefix,
} from "./allegationsOfHarmEventPage.po.js";
import { AbuseType } from "./abuseTypes.js";

export class ChildAbuseBehavioursPage extends AllegationsOfHarmEventPage {
  private readonly labels: string[] = [
    "Give a short description of what happened and any relevant information so the court can decide what needs to be done.",
  ];
  private readonly sectionHeading: Locator = this.page.getByRole("heading", {
    level: 2,
    name: "Child abuse - Behaviours",
    exact: true,
  });
  private readonly typesOfAbuse: Locator = this.question(
    "Type of abuse (Optional)",
  );

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await this.assertCommonContents(
      "A4",
      respondentName,
      RespondentNamePrefix.respondent,
    );
    await expect(this.sectionHeading).toBeVisible();
    await this.pageUtils.assertStrings(this.labels);
    for (const type of Object.values(AbuseType)) {
      await expect(
        this.typesOfAbuse.getByRole("checkbox", { name: type, exact: true }),
      ).toBeVisible();
    }
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(types: AbuseType[]): Promise<void> {
    for (const type of types) {
      await this.checkUntilChecked(
        this.typesOfAbuse.getByRole("checkbox", { name: type, exact: true }),
      );
    }
  }
}
