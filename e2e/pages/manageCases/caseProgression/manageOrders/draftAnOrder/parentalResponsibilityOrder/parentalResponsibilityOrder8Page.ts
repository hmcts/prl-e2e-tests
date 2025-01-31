import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { ParentalResponsibilityOrder8Content } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/draftAnOrder/parentalResponsibilityOrder/parentalResponsibilityOrder8Content.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { orderTypesMap } from "../../../../../../journeys/manageCases/caseProgression/manageOrders/draftAnOrder/draftAnOrder.ts";
import { DraftAnOrder8Content } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/draftAnOrder/draftAnOrder8Content.ts";

enum UniqueSelectors {
  parentNameTextbox = "#parentName",
}

export class ParentalResponsibilityOrder8Page {
  public static async checkPageLoads(page: Page): Promise<void> {
    await page
      .locator(`${Selectors.GovukFormLabel}`)
      .getByText(`${ParentalResponsibilityOrder8Content.formLabel}`, {
        exact: true,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${DraftAnOrder8Content.heading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${orderTypesMap.get("parentalResponsibility")?.journeyName}")`,
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
  }

  public static async checkErrorMessaging(page: Page): Promise<void> {
    await this.continue(page);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ParentalResponsibilityOrder8Content.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ParentalResponsibilityOrder8Content.errorMessage}")`,
        1,
      ),
    ]);
  }

  public static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      `${UniqueSelectors.parentNameTextbox}`,
      `${ParentalResponsibilityOrder8Content.parentName}`,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
