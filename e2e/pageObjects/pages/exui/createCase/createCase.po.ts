import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { Base } from "../../base.po.js";

/**
 * Shared base for the CCD create-case screens.
 *
 * These run *before* a case exists, so there is no FamilyMan ID / Casenumber
 * header on them and they cannot extend `EventPage`.
 */
export abstract class CreateCasePage extends Base {
  /** Title of the real solicitor create-case event. */
  protected static readonly solicitorApplication: string =
    "Solicitor application";
  /** Title of the dummy (test-setup) create-case event. */
  protected static readonly dummySolicitorApplication: string =
    "TS-Solicitor application";

  readonly saveAndContinueButton: Locator = this.page.getByRole("button", {
    name: /save and continue/i,
  });

  private readonly errorSummaryTitle: Locator = this.page.locator(
    `${Selectors.GovukErrorSummaryTitle}:text-is("There is a problem")`,
  );
  private readonly errorSummary: Locator = this.page.locator(
    Selectors.GovukErrorSummary,
  );

  protected constructor(page: Page) {
    super(page);
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  /**
   * Submits the page with nothing filled in and asserts the GOV.UK error
   * summary, its body text and the inline field error all carry `errorText`.
   */
  async assertValidationError(errorText: string): Promise<void> {
    await this.clickContinue();
    await expect(this.errorSummaryTitle).toBeVisible();
    await expect(
      this.errorSummary.filter({ hasText: errorText }),
    ).toBeVisible();
    await expect(
      this.page.locator(
        `${Selectors.GovukErrorMessage}:text-is("${errorText}")`,
      ),
    ).toBeVisible();
  }

  protected applicationHeading(isDummyCase: boolean): Locator {
    return this.page.locator(
      `${Selectors.GovukHeadingL}:text-is("${
        isDummyCase
          ? CreateCasePage.dummySolicitorApplication
          : CreateCasePage.solicitorApplication
      }")`,
    );
  }

  /** Asserts every string is visible exactly once under `selector`. */
  protected async assertTextContent(
    selector: string,
    texts: string[],
  ): Promise<void> {
    for (const text of texts) {
      await expect(
        this.page.locator(`${selector}:text-is("${text}")`),
      ).toBeVisible();
    }
  }
}
