import { expect, Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { AdminEditAndApproveAnOrderSubmitContent } from "../../../../fixtures/manageCases/caseProgression/completeTheOrder/adminEditAndApproveAnOrderSubmitContent";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { createOrderFL401Options } from "../../../../common/types";

export class AdminEditAndApproveAnOrderSubmitPage {
  public static async adminEditAndApproveAnOrderSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    createOrderFL401Options: createOrderFL401Options,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest, createOrderFL401Options);
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    createOrderFL401Options: createOrderFL401Options,
  ): Promise<void> {
    await page
      .locator(`${Selectors.headingH2}`, {
        hasText: `${AdminEditAndApproveAnOrderSubmitContent.headingH2}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AdminEditAndApproveAnOrderSubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${AdminEditAndApproveAnOrderSubmitContent.h21}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${AdminEditAndApproveAnOrderSubmitContent.h22}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AdminEditAndApproveAnOrderSubmitContent.p}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${AdminEditAndApproveAnOrderSubmitContent.Span}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
        1,
      ),
    ]);
    switch (createOrderFL401Options) {
      case "power of arrest":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.headingH3}:text-is("${AdminEditAndApproveAnOrderSubmitContent.powerOfArrestFL406}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${AdminEditAndApproveAnOrderSubmitContent.powerOfArrest}")`,
            1,
          ),
          Helpers.checkGroup(
            page,
            11,
            AdminEditAndApproveAnOrderSubmitContent,
            `powerText16`,
            Selectors.GovukText16,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.No}"):visible`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.Yes}"):visible`,
            2,
          ),
          await expect(
            page.locator("ccd-read-dynamic-list-field span", {
              hasText:
                AdminEditAndApproveAnOrderSubmitContent.powerOfArrestFL406,
            }),
          ).toBeVisible(),
        ]);
        break;
      case "amend discharge varied order":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.headingH3}:text-is("${AdminEditAndApproveAnOrderSubmitContent.amendedDischargedFL404B}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${AdminEditAndApproveAnOrderSubmitContent.amendedDischarged}")`,
            1,
          ),
          Helpers.checkGroup(
            page,
            10,
            AdminEditAndApproveAnOrderSubmitContent,
            `amendText16`,
            Selectors.GovukText16,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.No}"):visible`,
            2,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.Yes}"):visible`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.p}:text-is("${AdminEditAndApproveAnOrderSubmitContent.pApplicant}"):visible`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.p}:text-is("${AdminEditAndApproveAnOrderSubmitContent.pRespondent}"):visible`,
            1,
          ),
          await expect(
            page.locator("ccd-read-dynamic-list-field span", {
              hasText:
                AdminEditAndApproveAnOrderSubmitContent.amendedDischargedFL404B,
            }),
          ).toBeVisible(),
        ]);
        break;
    }

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
