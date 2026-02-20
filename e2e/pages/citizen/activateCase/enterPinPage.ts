import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../common/selectors";
import { CommonStaticText } from "../../../common/commonStaticText";
import { EnterPinPageContent } from "../../../fixtures/citizen/activateCase/enterPinPageContent";
import { Helpers } from "../../../common/helpers";

enum UniqueSelectors {
  caseCodeInput = "#caseCode",
  accessCodeInput = "#accessCode",
}

export class EnterPinPage {
  public static async enterPinPage(
    page: Page,
    caseRef: string,
    accessCode: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, caseRef, accessCode);
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: EnterPinPageContent.govukHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${EnterPinPageContent.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        EnterPinPageContent,
        "govukLabel",
        Selectors.GovukLabel,
      ),
      Helpers.checkGroup(
        page,
        2,
        EnterPinPageContent,
        "caseCodeHint",
        Selectors.GovukHint,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    caseRef: string,
    accessCode: string,
  ): Promise<void> {
    await page.fill(UniqueSelectors.caseCodeInput, caseRef);
    await page.fill(UniqueSelectors.accessCodeInput, accessCode);
  }

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
