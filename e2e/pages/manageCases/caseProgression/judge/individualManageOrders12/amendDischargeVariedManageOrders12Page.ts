import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1DAContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { AmendDischargeVariedManageOrders12Content } from "../../../../../fixtures/manageCases/caseProgression/judge/individualManageOrders12/amendDischargeVariedManageOrders12Content.ts";

interface AmendDischargeVariedManageOrders12PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  fl404CustomFields_fl404bHearingOutcome = "#fl404CustomFields_fl404bHearingOutcome",
}

export class AmendDischargeVariedManageOrders12Page {
  public static async amendDischargeVariedManageOrders12Page({
    page,
    accessibilityTest,
  }: AmendDischargeVariedManageOrders12PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<AmendDischargeVariedManageOrders12PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${AmendDischargeVariedManageOrders12Content.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:has-text("${AmendDischargeVariedManageOrders12Content.formLabel}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
  }: Partial<AmendDischargeVariedManageOrders12PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.fill(
      UniqueSelectors.fl404CustomFields_fl404bHearingOutcome,
      AmendDischargeVariedManageOrders12Content.loremIpsum,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
