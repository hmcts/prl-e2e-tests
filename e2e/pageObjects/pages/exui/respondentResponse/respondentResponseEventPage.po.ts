import { expect } from "@playwright/test";
import { EventPage } from "../eventPage.po.js";

/** Form page shared by the respondent solicitor C7 response events. */
export abstract class RespondentResponseEventPage extends EventPage {
  /**
   * Continues to the next page. CCD redraws the form after some answers (a date, a Yes that
   * reveals more fields), which can swallow the next click, so click until the page changes.
   * The wait between clicks leaves time for the page's mid-event callback, so a slow callback
   * is not submitted twice.
   */
  async clickContinue(): Promise<void> {
    const formPage: string = new URL(this.page.url()).pathname;
    await expect
      .poll(
        async () => {
          const leftFormPage: boolean =
            new URL(this.page.url()).pathname !== formPage;
          if (!leftFormPage) {
            await this.continueButton.click();
          }
          return leftFormPage;
        },
        {
          intervals: [10_000],
          timeout: 60_000,
          message: `Still on ${formPage} after clicking Continue`,
        },
      )
      .toBeTruthy();
  }
}
