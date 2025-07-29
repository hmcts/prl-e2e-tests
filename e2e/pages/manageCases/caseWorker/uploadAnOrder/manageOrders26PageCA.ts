import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Page, expect } from "@playwright/test";
import { ManageOrders26CAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders26CAContent.ts";

interface ManageOrders26PageOptions {
  page: Page;
  accessibilityTest: boolean;
  serveOrderNow: boolean;
}

enum UniqueSelectors {
  selectTypeOfOrder = "#selectTypeOfOrder",
}

enum radioIds {
  cafcassReport = "#cafcassOrCymruNeedToProvideReport_No",
  cafcassInvolvement = "#orderEndsInvolvementOfCafcassOrCymru_No",
  readyToServe = "#doYouWantToServeOrder_No",
  saveOrderAsDraft = "#whatDoWithOrder-saveAsDraft",
}

const readyToServeID = "#doYouWantToServeOrder_Yes";

export class ManageOrders26PageCA {
  public static async manageOrders26PageCA({
    page,
    accessibilityTest,
    serveOrderNow,
  }: ManageOrders26PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, serveOrderNow });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders26PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await expect(
      page.locator(Selectors.h1, {
        hasText: ManageOrders26CAContent.pageTitle,
      }),
    ).toBeVisible();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}"):visible`,
        3,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    serveOrderNow,
  }: Partial<ManageOrders26PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }

    if (serveOrderNow) {
      await page.click(radioIds.cafcassReport);
      await page.click(radioIds.cafcassInvolvement);
      await page.click(readyToServeID);
    } else {
      for (const selector of Object.values(radioIds)) {
        await page.click(selector);
      }
    }

    await page.selectOption(
      UniqueSelectors.selectTypeOfOrder,
      ManageOrders26CAContent.orderType,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
