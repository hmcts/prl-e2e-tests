import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { CaOrderContent } from "../../../../../fixtures/citizen/createCase/C100/typeOfOrder/caOrderContent";
import { Helpers } from "../../../../../common/helpers";
import { SelectCourtOrderContent } from "../../../../../fixtures/citizen/createCase/C100/typeOfOrder/selectCourtOrderContent";

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
      Helpers.checkGroup(
        page,
        2,
        SelectCourtOrderContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        SelectCourtOrderContent,
        "formLabelStopOtherPeople",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        6,
        SelectCourtOrderContent,
        "formLabelResolveSpecificIssue",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        SelectCourtOrderContent,
        "formLabelDuplicateHidden",
        `${Selectors.GovukLabel}`,
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
      `${Selectors.button}:text-is("${CaOrderContent.continue}")`,
    );
  }
}
