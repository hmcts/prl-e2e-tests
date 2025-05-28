import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../common/helpers.ts";
import { FullNameContent } from "../../../fixtures/edgeCases/personalDetails/fullNameContent.ts";

interface FullNamePageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  firstName = "#applicantFirstName",
  lastName = "#applicantLastName",
}

export class FullNamePage {
  public static async fullNamePage({
    page,
    accessibilityTest,
  }: FullNamePageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${FullNameContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        FullNameContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        FullNameContent,
        "formHint",
        `${Selectors.GovukHint}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(UniqueSelectors.firstName, FullNameContent.firstNameInput);
    await page.fill(UniqueSelectors.lastName, FullNameContent.lastNameInput);
  }
}
