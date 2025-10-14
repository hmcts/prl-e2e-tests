import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.js";
import { CommonStaticText } from "../../../common/commonStaticText.js";

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

export interface HearingDetailsParams {
  hearingType?: string; // this should probably have it's own custom type - that would be effort though
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
  private readonly hearingTitle: Locator;
  private readonly hearingsTitle = this.page
    .locator(Selectors.h2)
    .getByText("Hearing", { exact: true });
  private readonly hearingTypeLabel = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Hearing Type (Optional)",
    },
  );
  private readonly enterDateAndTimeLabel = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Enter date and time",
    },
  );
  private readonly estimatedTimeLabel = this.page.locator(Selectors.p, {
    hasText: "Estimated time",
  });
  private readonly dateTimeInputDescriptionLabel = this.page.locator(
    Selectors.p,
    {
      hasText: "A minimum of one input is required",
    },
  );
  private readonly timeOptions: string[] = [
    "Days (Optional)",
    "Hours (Optional)",
    "Minutes (Optional)",
  ];
  private readonly howDoesHearingNeedToTakePlaceLabel = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "How does the hearing need to take place?",
    },
  );
  private readonly howDoesHearingNeedToTakePlaceOptions: string[] = [
    "In person",
    "Telephone",
    "Video",
    "On the papers",
  ];
  private readonly willAllPartiesAttendInTheSameWayLabel = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Will all parties attend the hearing in the same way?",
    },
  );
  private readonly hearingLocationLabel = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Hearing location (Optional)",
    },
  );
  private readonly hearingWillBeBeforeLabel = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "This hearing will be before (Optional)",
    },
  );
  private readonly hearingWillBeBeforeOptions: string[] = [
    "Legal adviser",
    "Magistrates",
    "District judge",
    "Circuit judge",
  ];
  private readonly hearingJudgeLabel = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Hearing judge (Optional)",
    },
  );
  private readonly hearingListedWithLinkedCaseLabel = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Hearing listed with a linked case (Optional)",
    },
  );
  private readonly joiningInstructionsLabel = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Insert joining instructions for remote hearing (Optional)",
    },
  );
  private readonly additionalHearingDetailsLabel = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Additional hearing details (Optional)",
    },
  );
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly previousButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.previous,
    },
  );

  constructor(
    private page: Page,
    hearingTitle: string,
  ) {
    this.hearingTitle = this.page.locator(Selectors.headingH3, {
      hasText: hearingTitle,
    });
  }

  async assertHearingDetailsContents(): Promise<void> {
    await expect(this.hearingsTitle).toBeVisible();
    await this.assertMultipleButtons(CommonStaticText.addNew, 4);
    await this.assertMultipleButtons(CommonStaticText.remove, 2);
    await expect(this.hearingTitle).toBeVisible();
    await expect(this.hearingTypeLabel).toBeVisible();
    await expect(this.enterDateAndTimeLabel).toBeVisible();
    await expect(this.estimatedTimeLabel).toBeVisible();
    await expect(this.dateTimeInputDescriptionLabel).toBeVisible();
    await this.assertStrings(Selectors.GovukFormLabel, this.timeOptions);
    await expect(this.howDoesHearingNeedToTakePlaceLabel).toBeVisible();
    await this.assertStrings(
      Selectors.GovukFormLabel,
      this.howDoesHearingNeedToTakePlaceOptions,
    );
    await expect(this.willAllPartiesAttendInTheSameWayLabel).toBeVisible();
    await expect(this.hearingLocationLabel).toBeVisible();
    await expect(this.hearingWillBeBeforeLabel).toBeVisible();
    await this.assertStrings(
      Selectors.GovukFormLabel,
      this.hearingWillBeBeforeOptions,
    );
    await expect(this.hearingJudgeLabel).toBeVisible();
    await expect(this.hearingListedWithLinkedCaseLabel).toBeVisible();
    await expect(this.joiningInstructionsLabel).toBeVisible();
    await expect(this.additionalHearingDetailsLabel).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
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
      await this.page.selectOption(
        "#ordersHearingDetails_0_hearingTypes",
        hearingType,
      );
    }
    await this.page.locator(".mat-datepicker-input").fill(hearingDateAndTime);
    if (estimatedTime) {
      if (estimatedTime.days) {
        await this.page
          .locator("#ordersHearingDetails_0_hearingEstimatedDays")
          .fill(estimatedTime.days);
      }
      if (estimatedTime.hours) {
        await this.page
          .locator("#ordersHearingDetails_0_hearingEstimatedHours")
          .fill(estimatedTime.hours);
      }
      if (estimatedTime.minutes) {
        await this.page
          .locator("#ordersHearingDetails_0_hearingEstimatedMinutes")
          .fill(estimatedTime.minutes);
      }
    }
    await this.page
      .getByRole("radio", { name: howDoesHearingNeedToTakePlace })
      .check();
    await this.page
      .locator("#ordersHearingDetails_0_allPartiesAttendHearingSameWayYesOrNo")
      .getByRole("radio", {
        name: willAllPartiesAttendTheSameWay ? "Yes" : "No",
      })
      .check();
    if (!willAllPartiesAttendTheSameWay) {
      // TODO: how to handle this
    }
    if (hearingLocation) {
      await this.page.selectOption(
        "#ordersHearingDetails_0_courtList",
        hearingLocation,
      );
    }
    if (hearingWillBeBefore) {
      await this.page.getByRole("radio", { name: hearingWillBeBefore }).check();
    }
    if (hearingJudge) {
      await this.page
        .locator("#ordersHearingDetails_0_hearingJudgeNameAndEmail")
        .fill(hearingJudge);
      await this.page
        .locator(".mat-option-text", { hasText: hearingJudge })
        .click();
    }
    if (hearingListedWithALinkedCase) {
      await this.page.selectOption(
        "#ordersHearingDetails_0_hearingListedLinkedCases",
        hearingListedWithALinkedCase,
      );
    }
    if (joiningInstructionsForRemoteHearing) {
      await this.page
        .locator("#ordersHearingDetails_0_instructionsForRemoteHearing")
        .fill(joiningInstructionsForRemoteHearing);
    }
    if (additionalHearingInstructions) {
      await this.page
        .locator("#ordersHearingDetails_0_additionalHearingDetails")
        .fill(additionalHearingInstructions);
    }
  }

  // TODO: probably make these methods more generic - move into a helper
  private async assertMultipleButtons(
    buttonName: string,
    count: number,
  ): Promise<void> {
    const buttonLocator: Locator = this.page
      .locator(".button")
      .filter({ hasText: buttonName, visible: true });
    await expect(buttonLocator).toHaveCount(count);
  }

  private async assertStrings(
    selector: string,
    stringArray: string[],
  ): Promise<void> {
    for (const string of stringArray) {
      await expect(
        this.page.locator(selector).getByText(string, { exact: true }),
      ).toBeVisible();
    }
  }
}
