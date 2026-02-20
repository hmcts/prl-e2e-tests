import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { ManageOrders2DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders2DAContent";
import { createOrderFL401Options } from "../../../../../common/types";

interface ManageOrders2PageOptions {
  page: Page;
  accessibilityTest: boolean;
  createOrderFL401Options: createOrderFL401Options;
}

enum UniqueSelectors {
  nonMolestationOrder = "#createSelectOrderOptions-nonMolestation",
  powerOfArrest = "#createSelectOrderOptions-powerOfArrest",
  occupationOrder = "#createSelectOrderOptions-occupation",
  amendedDischargeVariedOrder = "#createSelectOrderOptions-amendDischargedVaried",
  blankOrder = "#createSelectOrderOptions-blank",
  generalFormOfUndertaking = "#createSelectOrderOptions-generalForm",
  noticeOfProceedings = "#createSelectOrderOptions-noticeOfProceedings",
}

export class ManageOrders2Page {
  public static async manageOrders2Page({
    page,
    accessibilityTest,
    createOrderFL401Options,
  }: ManageOrders2PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, createOrderFL401Options });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders2PageOptions>): Promise<void> {
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
        `${Selectors.h2}:text-is("${ManageOrders2DAContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukInsetText}:text-is("${ManageOrders2DAContent.govUkInsetText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        17,
        ManageOrders2DAContent,
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
    createOrderFL401Options,
  }: Partial<ManageOrders2PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    switch (createOrderFL401Options) {
      case "power of arrest":
        await page.click(UniqueSelectors.powerOfArrest);
        break;
      case "occupation order":
        await page.click(UniqueSelectors.occupationOrder);
        break;
      case "non-molestation":
        await page.click(UniqueSelectors.nonMolestationOrder);
        break;
      case "amend discharge varied order":
        await page.click(UniqueSelectors.amendedDischargeVariedOrder);
        break;
      case "blank order":
        await page.click(UniqueSelectors.blankOrder);
        break;
      case "general form of undertaking":
        await page.click(UniqueSelectors.generalFormOfUndertaking);
        break;
      case "notice of proceedings":
        await page.click(UniqueSelectors.noticeOfProceedings);
        break;
    }

    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
