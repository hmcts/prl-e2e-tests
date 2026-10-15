import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { HearingRequestPage } from "./hearingRequestPage.po.ts";

export class HearingAttendancePage extends HearingRequestPage {
  readonly remoteAttendanceInformation: Locator = this.page.locator(
    Selectors.GovukInsetText,
    {
      hasText:
        "Where known, contact details for remote attendees will be included in the request.",
    },
  );
  readonly paperHearingHeading: Locator = this.page.locator(
    Selectors.GovukFieldsetHeading,
    { hasText: "Will this be a paper hearing?" },
  );
  readonly attendanceMethodsHeading: Locator = this.page.locator(
    Selectors.GovukFieldsetHeading,
    { hasText: "What will be the methods of attendance for this hearing?" },
  );
  readonly participantAttendanceHeading: Locator = this.page.locator(
    Selectors.GovukFieldsetHeading,
    { hasText: "How will each participant attend the hearing?" },
  );
  readonly inPersonAttendanceHeading: Locator = this.page.locator(
    Selectors.GovukFieldsetHeading,
    { hasText: "How many people will attend the hearing in person?" },
  );
  readonly roomSizeHint: Locator = this.page.locator(Selectors.GovukHint, {
    hasText:
      "Estimate how many people will attend in person, excluding judicial members. This number will determine the room size.",
  });
  readonly paperHearingNo: Locator = this.page.locator("#paperHearingNo");
  readonly inPersonMethod: Locator = this.page.locator("#INTER");
  readonly participantAttendanceOptions: Locator = this.page.locator(
    Selectors.GovukSelect,
  );
  readonly inPersonAttendanceInput: Locator =
    this.page.locator("#attendance-number");

  constructor(page: Page) {
    super(page, "Participant attendance");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadingAndContinue();
    await Promise.all([
      expect(this.remoteAttendanceInformation).toBeVisible(),
      expect(this.paperHearingHeading).toBeVisible(),
      expect(this.attendanceMethodsHeading).toBeVisible(),
      expect(this.participantAttendanceHeading).toBeVisible(),
      expect(this.inPersonAttendanceHeading).toBeVisible(),
      expect(this.roomSizeHint).toBeVisible(),
    ]);
  }

  async fillInFields(): Promise<void> {
    await this.paperHearingNo.check();
    await this.inPersonMethod.check();

    const participantCount = await this.participantAttendanceOptions.count();
    for (let index = 0; index < participantCount; index++) {
      await this.participantAttendanceOptions
        .nth(index)
        .selectOption("In Person");
    }
    await this.inPersonAttendanceInput.fill(String(participantCount));
  }
}
