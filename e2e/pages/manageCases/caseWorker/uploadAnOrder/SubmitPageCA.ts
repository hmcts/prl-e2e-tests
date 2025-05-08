import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { SubmitCAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/submitCAContent";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { uploadOrderC100Options } from "../../../../common/types.ts";

interface submitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  uploadOrderC100Options?: uploadOrderC100Options;
}

export class SubmitPageCA {
  public static async submitPageCA({
    page,
    accessibilityTest,
    uploadOrderC100Options,
  }: submitPageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({
      page,
      accessibilityTest,
      uploadOrderC100Options,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<submitPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await expect(
      page.locator(Selectors.GovukHeadingL, { hasText: SubmitCAContent.pageTitle }),
    ).toBeVisible();
    // const pageTitle = page.locator(
    //   `${Selectors.GovukHeadingL}:text-is("${SubmitCAContent.pageTitle}")`,
    // );
    // await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${SubmitCAContent.headingh2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitCAContent.change}")`,
        16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Helpers.todayDate()}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${SubmitCAContent.h2upload1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${SubmitCAContent.strong1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        13,
        SubmitCAContent,
        "uploadText16_",
        `${Selectors.GovukText16}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<submitPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
