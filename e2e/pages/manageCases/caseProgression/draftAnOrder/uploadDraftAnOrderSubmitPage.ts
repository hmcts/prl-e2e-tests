import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { UploadDraftAnOrderSubmitContent } from "../../../../fixtures/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrderSubmitContent.ts";

interface submitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: string;
}

export class UploadDraftAnOrderSubmitPage {
  public static async uploadDraftAnOrderSubmitPage({
    page,
    accessibilityTest,
  }: submitPageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
  }: Partial<submitPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await expect(
      page.locator(Selectors.GovukHeadingL, {
        hasText: UploadDraftAnOrderSubmitContent.pageTitle,
      }),
    ).toBeVisible();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${UploadDraftAnOrderSubmitContent.headingh2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${UploadDraftAnOrderSubmitContent.strong1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        12,
        UploadDraftAnOrderSubmitContent,
        "text16_",
        `${Selectors.GovukText16}`,
      ),
    ]);
    if (solicitorCaseCreateType === "C100") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${UploadDraftAnOrderSubmitContent.CAtext}")`,
        1,
      ),
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.change}")`,
          9,
        ),
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.CAchildren}")`,
          1,
        );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.DAtext}")`,
        1,
      ),
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.change}")`,
          10,
        ),
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.DAchildren}")`,
          1,
        );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.DAchildrenQuestion}")`,
        1,
      );
    }
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
