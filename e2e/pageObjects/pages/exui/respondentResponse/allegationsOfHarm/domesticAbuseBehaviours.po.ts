import { expect, Locator, Page } from "@playwright/test";
import {
  AllegationsOfHarmEventPage,
  RespondentNamePrefix,
} from "./allegationsOfHarmEventPage.po.js";
import { AbuseType, SoughtHelp } from "../../../../../common/types.js";

export interface DomesticAbuseBehaviour extends SoughtHelp {
  typeOfAbuse: AbuseType;
  description: string;
  startAndDuration: string;
}

export class DomesticAbuseBehavioursPage extends AllegationsOfHarmEventPage {
  private readonly labels: string[] = [
    "Give a short description of what happened and any relevant information so the court can decide what needs to be done.",
  ];
  private readonly sectionHeading: Locator = this.page.getByRole("heading", {
    level: 2,
    name: "Domestic abuse - Behaviours",
    exact: true,
  });
  private readonly addNewButton: Locator = this.page
    .locator("#respDomesticBehaviours")
    .getByRole("button", { name: "Add new" })
    .first();

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await this.assertCommonContents(
      "A3",
      respondentName,
      RespondentNamePrefix.respondent,
    );
    await expect(this.sectionHeading).toBeVisible();
    await this.pageUtils.assertStrings(this.labels);
    await expect(this.addNewButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(behaviours: DomesticAbuseBehaviour[]): Promise<void> {
    for (const [index, behaviour] of behaviours.entries()) {
      await this.fillBehaviour(index, behaviour);
    }
  }

  private async fillBehaviour(
    index: number,
    behaviour: DomesticAbuseBehaviour,
  ): Promise<void> {
    const id: string = `respDomesticBehaviours_${index}`;
    const description: Locator = this.page.locator(
      `#${id}_respAbuseNatureDescription`,
    );
    if (!(await description.isVisible())) await this.addNewButton.click();
    await expect(description).toBeVisible();

    await this.checkUntilChecked(
      this.page
        .locator(`#${id}_respTypeOfAbuse`)
        .getByRole("radio", { name: behaviour.typeOfAbuse, exact: true }),
    );
    await description.fill(behaviour.description);
    await this.page
      .locator(`#${id}_respBehavioursStartDateAndLength`)
      .fill(behaviour.startAndDuration);
    await this.checkUntilChecked(
      this.page.locator(
        `#${id}_respBehavioursApplicantSoughtHelp_${behaviour.soughtHelp ? "Yes" : "No"}`,
      ),
    );
    if (behaviour.soughtHelp && behaviour.whoFrom) {
      await this.page
        .locator(`#${id}_respBehavioursApplicantHelpSoughtWho`)
        .fill(behaviour.whoFrom);
    }
  }
}
