import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ReturnApplication2Content } from "../../../../fixtures/manageCases/caseWorker/returnApplication/returnApplication2Content";
import { Helpers } from "../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { solicitorCaseCreateType } from "../../../../common/types";

interface ReturnApplication2PageOptions {
  page: Page;
  caseType: solicitorCaseCreateType;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  returnMessageTextArea = "#returnMessage",
}

export class ReturnApplication2Page {
  public static async returnApplication2Page({
    page,
    caseType,
    accessibilityTest,
  }: ReturnApplication2PageOptions): Promise<void> {
    await this.checkPageLoads({ page, caseType, accessibilityTest });
    await Helpers.clickButton(page, CommonStaticText.continue);
  }

  private static async checkPageLoads({
    page,
    caseType,
    accessibilityTest,
  }: Partial<ReturnApplication2PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ReturnApplication2Content.govUkHeadingL}")`,
    );
    await pageTitle.waitFor({ state: "visible" });
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h3}:text-is("${ReturnApplication2Content.h3}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Span}:text-is("${ReturnApplication2Content.span}")`,
      1,
    );
    if (caseType == "C100") {
      expect(
        await page.locator(UniqueSelectors.returnMessageTextArea).inputValue(),
      ).toContain(ReturnApplication2Content.c100ReturnMessageContent);
    }
    if (caseType == "FL401") {
      expect(
        await page.locator(UniqueSelectors.returnMessageTextArea).inputValue(),
      ).toContain(ReturnApplication2Content.fl401ReturnMessageContent);
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
