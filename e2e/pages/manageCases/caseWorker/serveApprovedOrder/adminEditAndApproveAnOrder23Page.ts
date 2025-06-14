import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors.ts";
import { AdminEditAndApproveAnOrder23Content } from "../../../../fixtures/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrder23Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

enum UniqueSelectors {
  respondentOptionYes = "#serveToRespondentOptions-Yes",
  respondentOptionNo = "#serveToRespondentOptions-No",
  respondentsOptionsCourtBailiff = "#personallyServeRespondentsOptions-courtBailiff",
}
export class AdminEditAndApproveAnOrder23Page {
  public static async adminEditAndApproveAnOrder23Page(
    page: Page,
    accessibilityTest: boolean,
    personallyServed: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, personallyServed);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${AdminEditAndApproveAnOrder23Content.govUkHeadingL}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AdminEditAndApproveAnOrder23Content.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AdminEditAndApproveAnOrder23Content.formLabel2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${AdminEditAndApproveAnOrder23Content.formHint}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${AdminEditAndApproveAnOrder23Content.h2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    personallyServed: boolean,
  ): Promise<void> {
    if (personallyServed) {
      await page.check(`${UniqueSelectors.respondentOptionYes}`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AdminEditAndApproveAnOrder23Content.fromLabel3}"):visible`,
        1,
      );
      await page.check(`${UniqueSelectors.respondentsOptionsCourtBailiff}`);
    } else {
      await page.check(`${UniqueSelectors.respondentOptionNo}`);
      await page.check(`${Selectors.GovukFormLabel}:has-text("(Applicant)")`);
      await page.check(`${Selectors.GovukFormLabel}:has-text("(Respondent)")`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AdminEditAndApproveAnOrder23Content.formLabel4}"):visible`,
        1,
      );
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
