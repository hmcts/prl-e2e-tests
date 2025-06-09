import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { LinkCases3Content } from "../../../../fixtures/manageCases/caseLinking/linkCases/linkCases3Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface LinkCases3PageOptions {
  page: Page;
  linkedCaseNumber: string;
  accessibilityTest: boolean;
}

export class LinkCases3Page {
  public static async linkCases3Page({
    page,
    linkedCaseNumber,
    accessibilityTest,
  }: LinkCases3PageOptions): Promise<void> {
    linkedCaseNumber = Helpers.getHyphenatedCaseReference(linkedCaseNumber);
    await this.checkPageLoads({ page, linkedCaseNumber, accessibilityTest });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    linkedCaseNumber,
    accessibilityTest,
  }: Partial<LinkCases3PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${LinkCases3Content.pageTitle}")`,
    );
    await pageTitle.waitFor({ state: "visible" });
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukTableCaption}:text-is("${LinkCases3Content.tableCaption}")`,
      1,
    );
    await Helpers.checkGroup(
      page,
      2,
      LinkCases3Content,
      "tableHeading",
      Selectors.th,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Span}:has-text("${linkedCaseNumber}")`,
      1,
    );
    await Helpers.checkGroup(
      page,
      2,
      LinkCases3Content,
      "proposedCaseDetailsSpan",
      Selectors.Span,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukLink}:has-text("${LinkCases3Content.changeLink}")`,
      1,
    );
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
