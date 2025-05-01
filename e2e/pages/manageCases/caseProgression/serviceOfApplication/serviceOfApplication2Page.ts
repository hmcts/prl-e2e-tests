import { Selectors } from "../../../../common/selectors";
import { ServiceOfApplication2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Content";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { MiamPolicyUpgrade6Content } from "../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Content";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { createOrderFL401Options } from "../../../../common/types.ts";
import { ManageOrders3DAContent } from "../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders3DAContent.ts";

interface ServiceOfApplication2Options {
  page: Page;
  accessibilityTest: boolean;
  createOrderFL401Options: createOrderFL401Options;
}

enum UniqueSelectors {
  selectOrder = "#serviceOfApplicationScreen1",
  fileUpload = "#noticeOfSafetySupportLetter",
}

export class ServiceOfApplication2Page {
  public static async serviceOfApplication2Page({
    page,
    accessibilityTest,
    createOrderFL401Options,
  }: ServiceOfApplication2Options): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({ page, createOrderFL401Options });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ServiceOfApplication2Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ServiceOfApplication2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ServiceOfApplication2Content,
        "h2",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        page,
        3,
        ServiceOfApplication2Content,
        "p",
        Selectors.p,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ServiceOfApplication2Content.span}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.p}:text-is("${ServiceOfApplication2Content.p3}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        ServiceOfApplication2Content,
        "hiddenP",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        2,
        ServiceOfApplication2Content,
        "hiddenLi",
        Selectors.li,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    createOrderFL401Options,
  }: Partial<ServiceOfApplication2Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    switch (createOrderFL401Options) {
      case "power of arrest":
        await page.click(
          `${Selectors.p}:has-text("${ServiceOfApplication2Content.powerOfArrest}")`,
        );
        break;
      case "amend discharge varied order":
        await page.click(
          `${Selectors.p}:has-text("${ManageOrders3DAContent.amendDischargeVariedOrder}")`,
        );
        break;
    }
    const fileInput = page.locator(UniqueSelectors.fileUpload);
    await fileInput.setInputFiles(config.testPdfFile);
    await page.waitForSelector(
      `${Selectors.GovukErrorMessage}:text-is("${MiamPolicyUpgrade6Content.uploadingFile}")`,
      { state: "hidden" },
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
