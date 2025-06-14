import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { TestingSupportDummyAdminCreateNoc2Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/initialJourney/testingSupportDummyAdminCreateNoc2Content.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { solicitorCaseCreateType } from "../../../../../common/types.ts";

interface testingSupportDummyAdminCreateNocPage2Options {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

enum UniqueSelectors {
  c100 = "#caseTypeOfApplication-C100",
  fl401 = "#caseTypeOfApplication-FL401",
}

export class TestingSupportDummyAdminCreateNoc2Page {
  public static async testingSupportDummyAdminCreateNoc2Page({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
  }: testingSupportDummyAdminCreateNocPage2Options): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, solicitorCaseCreateType });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<testingSupportDummyAdminCreateNocPage2Options>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${TestingSupportDummyAdminCreateNoc2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${TestingSupportDummyAdminCreateNoc2Content.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${TestingSupportDummyAdminCreateNoc2Content.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        TestingSupportDummyAdminCreateNoc2Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    solicitorCaseCreateType,
  }: Partial<testingSupportDummyAdminCreateNocPage2Options>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    switch (solicitorCaseCreateType) {
      case "C100":
        await page.click(UniqueSelectors.c100);
        break;
      case "FL401":
        await page.click(UniqueSelectors.fl401);
        break;
      default:
        throw new Error("Invalid solicitorCaseCreateType");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
