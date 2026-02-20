import { Selectors } from "../../../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../utils/config.utils";
import { MiamPolicyUpgrade6Content } from "../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Content";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { C100OrdersTabContent } from "../../../../fixtures/manageCases/caseTabs/C100/c100OrdersTabContent.js";
import { C100ServiceOfApplication2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/C100ServiceOfApplication2Content.js";

interface C100ServiceOfApplication2Options {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  fileUpload = "#specialArrangementsLetter",
}

export class C100ServiceOfApplication2Page {
  public static async c100ServiceOfApplication2Page({
    page,
    accessibilityTest,
  }: C100ServiceOfApplication2Options): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<C100ServiceOfApplication2Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${C100ServiceOfApplication2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        C100ServiceOfApplication2Content,
        "h2",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        page,
        4,
        C100ServiceOfApplication2Content,
        "p",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        2,
        C100ServiceOfApplication2Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkGroup(
        page,
        4,
        C100ServiceOfApplication2Content,
        "h3",
        Selectors.h3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${C100ServiceOfApplication2Content.hint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${C100ServiceOfApplication2Content.warning}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${C100ServiceOfApplication2Content.span}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.p}:text-is("${C100ServiceOfApplication2Content.p1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        C100ServiceOfApplication2Content,
        "hiddenP",
        Selectors.p,
      ),
      Helpers.checkGroup(
        page,
        6,
        C100ServiceOfApplication2Content,
        "hiddenLi",
        Selectors.li,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
  }: Partial<C100ServiceOfApplication2Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await page.click(
      `${Selectors.p}:has-text("${C100OrdersTabContent.orderName}")`,
    );

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
