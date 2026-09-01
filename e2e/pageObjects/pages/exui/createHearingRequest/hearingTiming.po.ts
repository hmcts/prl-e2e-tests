import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { HearingRequestPage } from "./hearingRequestPage.po.ts";

export class HearingTimingPage extends HearingRequestPage {
  readonly hearingLengthHeading: Locator = this.page.locator(
    Selectors.GovukFieldsetHeading,
    { hasText: "Length of hearing" },
  );
  readonly specificDateHeading: Locator = this.page.locator(
    Selectors.GovukFieldsetHeading,
    { hasText: "Does the hearing need to take place on a specific date?" },
  );
  readonly priorityHeading: Locator = this.page.locator(
    Selectors.GovukFieldsetHeading,
    { hasText: "What is the priority of this hearing?" },
  );
  readonly partyAvailabilityHint: Locator = this.page.locator(
    Selectors.GovukHint,
    {
      hasText:
        "Availability of all the parties will be taken into account when scheduling this hearing",
    },
  );
  readonly durationDaysInput: Locator = this.page.locator("#durationdays");
  readonly durationHoursInput: Locator = this.page.locator("#durationhours");
  readonly durationMinutesInput: Locator = this.page.locator("#durationmins");
  readonly noSpecificDate: Locator = this.page.locator("#noSpecificDate");
  readonly standardPriority: Locator = this.page.locator("#Standard");

  constructor(page: Page) {
    super(page, "Length, date and priority level of hearing");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadingAndContinue();
    await Promise.all([
      expect(this.hearingLengthHeading).toBeVisible(),
      expect(this.specificDateHeading).toBeVisible(),
      expect(this.priorityHeading).toBeVisible(),
      expect(this.partyAvailabilityHint).toBeVisible(),
    ]);
  }

  async fillInFields(): Promise<void> {
    await this.durationDaysInput.fill("1");
    await this.durationHoursInput.fill("0");
    await this.durationMinutesInput.fill("0");
    await this.noSpecificDate.check();
    await this.standardPriority.check();
  }
}
