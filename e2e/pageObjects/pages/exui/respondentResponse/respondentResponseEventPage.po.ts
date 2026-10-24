import { expect } from "@playwright/test";
import { EventPage } from "../eventPage.po.js";

export abstract class RespondentResponseEventPage extends EventPage {
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
