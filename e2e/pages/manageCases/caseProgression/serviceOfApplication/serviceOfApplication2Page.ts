import { Selectors } from "../../../../common/selectors";
import { ServiceOfApplication2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Content";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { MiamPolicyUpgrade6Content } from "../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Content";
import { CommonStaticText } from "../../../../common/commonStaticText";

interface ServiceOfApplication2Options {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  selectOrder = "#serviceOfApplicationScreen1_0f76a624-e5ec-42aa-bffe-e595e7380a28",
  fileUpload = "#noticeOfSafetySupportLetter",
}

export class ServiceOfApplication2Page {
  public static async serviceOfApplication2Page({
    page,
    accessibilityTest,
  }: ServiceOfApplication2Options): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({ page });
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
        2,
        ServiceOfApplication2Content,
        "formLabel",
        `${Selectors.GovukFormLabel}:visible`,
      ),
      Helpers.checkGroup(
        page,
        3,
        ServiceOfApplication2Content,
        "formHint",
        Selectors.GovukFormHint,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ServiceOfApplication2Content.p}")`,
        1,
      ),
    ]);
    await page.click(
      `${Selectors.p}:text-is("${ServiceOfApplication2Content.p}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
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
  }: Partial<ServiceOfApplication2Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await page.click(UniqueSelectors.selectOrder);
    let fileInput = page.locator(UniqueSelectors.fileUpload);
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
