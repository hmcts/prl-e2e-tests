import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CaOrderContent } from "../../../../../fixtures/citizen/createCase/C100/typeOfOrder/caOrderContent";
import { Helpers } from "../../../../../common/helpers";

interface caOrderPageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillinFieldsOptions {
  page: Page;
}

export class CaOrderPage {
  public static async caOrderPage({
    page: page,
    accessibilityTest: accessibilityTest,
  }: caOrderPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${CaOrderContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(page, 3, CaOrderContent, "h2", `${Selectors.h2}`),
      Helpers.checkGroup(page, 3, CaOrderContent, "p", `${Selectors.p}`),
      Helpers.checkGroup(page, 9, CaOrderContent, "li", `${Selectors.li}`),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaOrderContent.liDupe1}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaOrderContent.liDupe2}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CaOrderContent.liDupe3}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page: page,
  }: fillinFieldsOptions): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CaOrderContent.continue}")`,
    );
  }
}
