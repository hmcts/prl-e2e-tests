import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { ParentalResponsibilityOrderSubmitContent } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/draftAnOrder/parentalResponsibilityOrder/parentalResponsibilityOrderSubmitContent.ts";
import { Helpers } from "../../../../../../common/helpers.ts";

export class ParentalResponsibilityOrderSubmitPage {
  public static async checkPageContent(
    page: Page,
    yesNoToAll: boolean,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page),
      this.checkFilledData(page, yesNoToAll),
    ]);
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    await page
      .locator(`${Selectors.headingH2}`, {
        hasText: `${ParentalResponsibilityOrderSubmitContent.checkYourAnswers}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        19,
        ParentalResponsibilityOrderSubmitContent,
        "text16",
        Selectors.GovukText16,
      ),
      Helpers.checkGroup(
        page,
        3,
        ParentalResponsibilityOrderSubmitContent,
        "span",
        Selectors.Span,
      ),
      Helpers.checkGroup(
        page,
        2,
        ParentalResponsibilityOrderSubmitContent,
        "p",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        2,
        ParentalResponsibilityOrderSubmitContent,
        "a",
        Selectors.a,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ParentalResponsibilityOrderSubmitContent.strong}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ParentalResponsibilityOrderSubmitContent.headingH3}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ParentalResponsibilityOrderSubmitContent.h2}")`,
        1,
      ),
    ]);
  }

  private static async checkFilledData(
    page: Page,
    yesNoToAll: boolean,
  ): Promise<void> {
    if (yesNoToAll) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ParentalResponsibilityOrderSubmitContent.yes}")`,
          3,
        ),
        Helpers.checkGroup(
          page,
          2,
          ParentalResponsibilityOrderSubmitContent,
          "yesText161",
          Selectors.GovukText16,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ParentalResponsibilityOrderSubmitContent.no}")`,
          3,
        ),
        Helpers.checkGroup(
          page,
          2,
          ParentalResponsibilityOrderSubmitContent,
          "noChildP",
          Selectors.p,
        ),
      ]);
    }
  }
}
