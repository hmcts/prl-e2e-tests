import { expect, Locator, Page } from "@playwright/test";

interface DayHourMinute {
  days?: string;
  hours?: string;
  minutes?: string;
}

type HowHearingTakesPlaceOptions =
  | "In person"
  | "Telephone"
  | "Video"
  | "On the papers"
  | "Not in Attendance";

type HearingWillBeBeforeOptions =
  | "Legal adviser"
  | "Magistrates"
  | "District judge"
  | "Circuit judge";

type HearingType =
  | "2nd Gatekeeping Appointment"
  | "Allocation"
  | "Appeal"
  | "Application"
  | "Breach"
  | "Case Management Conference"
  | "Case Management Hearing"
  | "Committal"
  | "Conciliation"
  | "Costs"
  | "Decision Hearing"
  | "Directions (First/Further)"
  | "Dispute Resolution Appointment"
  | "Further Case Management Hearing"
  | "Full/Final hearing"
  | "First Hearing Dispute Resolution Appointment (FHDRA)"
  | "First Hearing"
  | "Finding of Fact"
  | "Ground Rules Hearing"
  | "Human Rights Act Application"
  | "Judgment"
  | "Neutral Evaluation Hearing"
  | "Permission Hearing"
  | "Pre Hearing Review"
  | "Review"
  | "Settlement Conference"
  | "Safeguarding Gatekeeping Appointment";

export interface HearingDetailsParams {
  hearingType?: HearingType;
  hearingDateAndTime: string;
  estimatedTime: DayHourMinute;
  howDoesHearingNeedToTakePlace: HowHearingTakesPlaceOptions;
  willAllPartiesAttendTheSameWay: boolean;
  // TODO: how to handle not attending in some way??
  hearingLocation?: string; // populated by default
  hearingWillBeBefore?: HearingWillBeBeforeOptions;
  hearingJudge?: string;
  hearingListedWithALinkedCase?: string;
  joiningInstructionsForRemoteHearing?: string;
  additionalHearingInstructions?: string;
}

export class OrderHearingDetailsComponent {
  private readonly hearingsTitle = this.page
    .getByRole("heading", { name: "Hearing", exact: true })
    .nth(0);
  private readonly hearingTitle = this.page
    .getByRole("heading", { name: "Hearing", exact: true })
    .nth(1);
  private readonly hearingTypeLabel = this.page.getByText(
    "Hearing Type (Optional)",
  );
  private readonly enterDateAndTimeLabel = this.page.getByText(
    "Enter date and time",
  );
  private readonly estimatedTimeLabel = this.page.getByText("Estimated time");
  private readonly dateTimeInputDescriptionLabel = this.page.getByText(
    "A minimum of one input is required",
  );
  private readonly timeOptions: string[] = [
    "Days (Optional)",
    "Hours (Optional)",
    "Minutes (Optional)",
  ];
  private readonly howDoesHearingNeedToTakePlaceLabel = this.page.getByText(
    "How does the hearing need to take place?",
  );
  private readonly howDoesHearingNeedToTakePlaceOptions: string[] = [
    "In person",
    "Telephone",
    "Video",
    "On the papers",
  ];
  private readonly willAllPartiesAttendInTheSameWayLabel = this.page.getByText(
    "Will all parties attend the hearing in the same way?",
  );
  private readonly hearingLocationLabel = this.page.getByText(
    "Hearing location (Optional)",
  );
  private readonly hearingWillBeBeforeLabel = this.page.getByText(
    "This hearing will be before (Optional)",
  );
  private readonly hearingWillBeBeforeOptions: string[] = [
    "Legal adviser",
    "Magistrates",
    "District judge",
    "Circuit judge",
  ];
  private readonly hearingJudgeLabel = this.page.getByText(
    "Hearing judge (Optional)",
  );
  private readonly hearingListedWithLinkedCaseLabel = this.page.getByText(
    "Hearing listed with a linked case (Optional)",
  );
  private readonly joiningInstructionsLabel = this.page.getByText(
    "Insert joining instructions for remote hearing (Optional)",
  );
  private readonly additionalHearingDetailsLabel = this.page.getByText(
    "Additional hearing details (Optional)",
  );

  constructor(private page: Page) {}

  async assertHearingDetailsContents(): Promise<void> {
    await expect(this.hearingsTitle).toBeVisible();
    await this.assertMultipleButtons("Add new", 4);
    await this.assertMultipleButtons("Remove", 2);
    await expect(this.hearingTitle).toBeVisible();
    await expect(this.hearingTypeLabel).toBeVisible();
    await expect(this.enterDateAndTimeLabel).toBeVisible();
    await expect(this.estimatedTimeLabel).toBeVisible();
    await expect(this.dateTimeInputDescriptionLabel).toBeVisible();
    await this.assertStrings(this.timeOptions);
    await expect(this.howDoesHearingNeedToTakePlaceLabel).toBeVisible();
    await this.assertStrings(
      this.howDoesHearingNeedToTakePlaceOptions,
      this.page.getByRole("group", { name: "How does the hearing need to" }),
    );
    await expect(this.willAllPartiesAttendInTheSameWayLabel).toBeVisible();
    await expect(this.hearingLocationLabel).toBeVisible();
    await expect(this.hearingWillBeBeforeLabel).toBeVisible();
    await this.assertStrings(this.hearingWillBeBeforeOptions);
    await expect(this.hearingJudgeLabel).toBeVisible();
    await expect(this.hearingListedWithLinkedCaseLabel).toBeVisible();
    await expect(this.joiningInstructionsLabel).toBeVisible();
    await expect(this.additionalHearingDetailsLabel).toBeVisible();
  }

  async fillInHearingDetails({
    hearingType,
    hearingDateAndTime,
    estimatedTime,
    howDoesHearingNeedToTakePlace,
    willAllPartiesAttendTheSameWay,
    hearingLocation,
    hearingWillBeBefore,
    hearingJudge,
    hearingListedWithALinkedCase,
    joiningInstructionsForRemoteHearing,
    additionalHearingInstructions,
  }: HearingDetailsParams): Promise<void> {
    if (hearingType) {
      await this.page
        .getByLabel("Hearing Type (Optional)")
        .selectOption(hearingType);
    }
    await this.page
      .getByRole("textbox", { name: "Please enter a date and time" })
      .fill(hearingDateAndTime);
    if (estimatedTime) {
      if (estimatedTime.days) {
        await this.page
          .getByRole("textbox", { name: "Days (Optional)" })
          .fill(estimatedTime.days);
      }
      if (estimatedTime.hours) {
        await this.page
          .getByRole("textbox", { name: "Hours (Optional)" })
          .fill(estimatedTime.hours);
      }
      if (estimatedTime.minutes) {
        await this.page
          .getByRole("textbox", { name: "Minutes (Optional)" })
          .fill(estimatedTime.minutes);
      }
    }
    await this.page
      .getByRole("radio", { name: howDoesHearingNeedToTakePlace })
      .check();
    await this.page
      .getByRole("group", { name: "Will all parties attend the" })
      .getByRole("radio", {
        name: willAllPartiesAttendTheSameWay ? "Yes" : "No",
      })
      .check();
    if (!willAllPartiesAttendTheSameWay) {
      // TODO: how to handle this
    }
    if (hearingLocation) {
      await this.page
        .getByLabel("Hearing location (Optional)")
        .selectOption(hearingLocation);
    }
    if (hearingWillBeBefore) {
      await this.page.getByRole("radio", { name: hearingWillBeBefore }).check();
    }
    if (hearingJudge) {
      await this.page
        .getByRole("combobox", { name: "Hearing judge (Optional)" })
        .fill(hearingJudge);
      await this.page
        .locator(".mat-option-text", { hasText: hearingJudge })
        .click();
    }
    if (hearingListedWithALinkedCase) {
      await this.page
        .getByLabel("Hearing listed with a linked")
        .selectOption(hearingListedWithALinkedCase);
    }
    if (joiningInstructionsForRemoteHearing) {
      await this.page
        .getByRole("textbox", {
          name: "Insert joining instructions for remote hearing (Optional)",
        })
        .fill(joiningInstructionsForRemoteHearing);
    }
    if (additionalHearingInstructions) {
      await this.page
        .getByRole("textbox", {
          name: "Additional hearing details (Optional)",
        })
        .fill(additionalHearingInstructions);
    }
  }

  // TODO: probably make these methods more generic - move into a helper
  private async assertMultipleButtons(
    buttonName: string,
    count: number,
  ): Promise<void> {
    const buttonLocator: Locator = this.page.getByRole("button", {
      name: buttonName,
    });
    await expect(buttonLocator).toHaveCount(count);
  }

  // TODO: this is similar to the checkStrings method somewhere else - probably move both into a helper
  private async assertStrings(
    stringArray: string[],
    locator?: Locator,
  ): Promise<void> {
    for (const string of stringArray) {
      // use locator if more specificity is needed
      if (locator) {
        await expect(locator.getByText(string, { exact: true })).toBeVisible();
      } else {
        await expect(
          this.page.getByText(string, { exact: true }),
        ).toBeVisible();
      }
    }
  }
}
