import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { AdminEditAndApproveAnOrder23Content } from "../../../../fixtures/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrder23Content";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

enum UniqueSelectors {
  respondentOptionYes = "#serveToRespondentOptions_Yes",
  respondentOptionNo = "#serveToRespondentOptions_No",
  respondentsOptionsCourtBailiff = "#servingOptionsForNonLegalRep-courtBailiff",
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
      await AccessibilityTestHelper.run(page);
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
      await page.locator(`${Selectors.GovukFormLabel}:has-text("(Applicant)")`).click();
      await page.locator(`${Selectors.GovukFormLabel}:has-text("(Respondent)")`).click();
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
