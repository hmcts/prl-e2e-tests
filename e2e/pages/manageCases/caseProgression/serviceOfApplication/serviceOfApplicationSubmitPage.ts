import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { ServiceOfApplication2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Content";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ServiceOfApplicationSubmitContent } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationSubmitContent";

interface ServiceOfApplicationSubmitOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ServiceOfApplicationSubmitPage {
  public static async serviceOfApplicationSubmitPage({
    page,
    accessibilityTest,
  }: ServiceOfApplicationSubmitOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ServiceOfApplicationSubmitOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ServiceOfApplication2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    // need to had looking for order (switch case) - same for page 2
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ServiceOfApplicationSubmitContent,
        "h2",
        Selectors.h2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ServiceOfApplicationSubmitContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ServiceOfApplicationSubmitContent.a}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ServiceOfApplicationSubmitContent,
        "text16",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ServiceOfApplicationSubmitContent.text16Change}"):visible`,
        3,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<ServiceOfApplicationSubmitOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
