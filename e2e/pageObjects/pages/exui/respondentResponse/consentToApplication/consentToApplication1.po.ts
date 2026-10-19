import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../../eventPage.po.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

export interface ConsentToApplicationParams {
  consentToApplication: boolean;
  applicationReceivedDate: { day: string; month: string; year: string };
  noConsentReason?: string; // required when consentToApplication is false
  permissionFromCourtNeeded: boolean;
  courtOrderDetails?: string; // required when permissionFromCourtNeeded is true
}

// Respondent solicitor C7 response - "Do you give your consent?" (c100ResSolConsentingToApplicationA1)
export class ConsentToApplication1Page extends EventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  private readonly formLabels: string[] = [
    "You can save and return to this page at any time. Questions marked with a * need to be completed before you can send your application.",
    "*Do you consent to the application? (Optional)",
    "*When did you receive the application? (Optional)",
    "For example, 27 3 2007",
    "*Does the respondent need permission from the court before making applications? (Optional)",
  ];

  private readonly consentYes: Locator = this.page.locator(
    "#respondentConsentToApplication_consentToTheApplication_Yes",
  );
  private readonly consentNo: Locator = this.page.locator(
    "#respondentConsentToApplication_consentToTheApplication_No",
  );
  private readonly noConsentReason: Locator = this.page.locator(
    "#respondentConsentToApplication_noConsentReason",
  );
  private readonly receivedDay: Locator = this.page.locator(
    "#applicationReceivedDate-day",
  );
  private readonly receivedMonth: Locator = this.page.locator(
    "#applicationReceivedDate-month",
  );
  private readonly receivedYear: Locator = this.page.locator(
    "#applicationReceivedDate-year",
  );
  private readonly permissionFromCourtYes: Locator = this.page.locator(
    "#respondentConsentToApplication_permissionFromCourt_Yes",
  );
  private readonly permissionFromCourtNo: Locator = this.page.locator(
    "#respondentConsentToApplication_permissionFromCourt_No",
  );
  private readonly courtOrderDetails: Locator = this.page.locator(
    "#respondentConsentToApplication_courtOrderDetails",
  );

  constructor(page: Page) {
    super(page, "Do you give your consent?");
  }

  async assertPageContents(respondentName: string): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.getByRole("heading", {
        level: 3,
        name: `Respondent name: ${respondentName}`,
      }),
    ).toBeVisible();
    await this.pageUtils.assertStrings(this.formLabels);
    await expect(this.continueButton).toBeVisible();
  }

  /**
   * Fills in every answer on the page. The date is filled last: CCD briefly redraws the form
   * after a date is entered, which can swallow a radio click made straight after it.
   */
  async fillInFields(params: ConsentToApplicationParams): Promise<void> {
    if (params.consentToApplication) {
      await this.consentYes.check();
    } else {
      await this.consentNo.check();
      await this.noConsentReason.fill(params.noConsentReason as string);
    }

    if (params.permissionFromCourtNeeded) {
      await this.permissionFromCourtYes.check();
      await this.courtOrderDetails.fill(params.courtOrderDetails as string);
    } else {
      await this.permissionFromCourtNo.check();
    }

    const { day, month, year } = params.applicationReceivedDate;
    await this.receivedDay.fill(day);
    await this.receivedMonth.fill(month);
    await this.receivedYear.fill(year);
  }

  /**
   * Continues to check your answers. The click straight after the date can be swallowed by
   * CCD's redraw of the form, so click until the browser is on the event's submit page.
   */
  async clickContinue(): Promise<void> {
    await expect
      .poll(
        async () => {
          const onSubmitPage = new URL(this.page.url()).pathname.endsWith(
            "/submit",
          );
          if (!onSubmitPage) {
            await this.continueButton.click();
          }
          return onSubmitPage;
        },
        {
          intervals: [2_000],
          timeout: 30_000,
          message: "Check your answers page did not open after Continue",
        },
      )
      .toBeTruthy();
  }
}
