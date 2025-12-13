import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { UploadDraftAnOrderSubmitContent } from "../../../../fixtures/manageCases/caseProgression/draftAnOrder/uploadDraftAnOrderSubmitContent.ts";

interface submitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: string;
  hasJudgeNameAndTitle: boolean;
}

export class UploadDraftAnOrderSubmitPage {
  public static async uploadDraftAnOrderSubmitPage({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
  }: submitPageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    if (solicitorCaseCreateType === "C100") {
      await this.checkPageLoadsCA({
        page,
        accessibilityTest,
      });
    } else {
      await this.checkPageLoadsDA({
        page,
        accessibilityTest,
      });
    }
    await this.fillInFields({ page });
  }

  private static async checkPageLoadsCA({
    page,
    accessibilityTest,
    hasJudgeNameAndTitle,
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
        10,
        UploadDraftAnOrderSubmitContent,
        "text16_",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.CAtext}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.change}")`,
        9,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.CAchildren}")`,
        1,
      ),
    ]);
    if (hasJudgeNameAndTitle) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.judgeName}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.judgeNameLabel}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageLoadsDA({
    page,
    accessibilityTest,
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.DAtext}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.change}")`,
        10,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.DAchildren}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${UploadDraftAnOrderSubmitContent.DAchildrenQuestion}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
