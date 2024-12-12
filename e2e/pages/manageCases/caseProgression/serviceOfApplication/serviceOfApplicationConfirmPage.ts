import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { ServiceOfApplication2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Content";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { ServiceOfApplicationConfirmContent } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationConfirmContent";

interface ServiceOfApplicationConfirmOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ServiceOfApplicationConfirmPage {
  public static async serviceOfApplicationConfirmPage({
    page,
    accessibilityTest,
  }: ServiceOfApplicationConfirmOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ServiceOfApplicationConfirmOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ServiceOfApplication2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${ServiceOfApplicationConfirmContent.h1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ServiceOfApplicationConfirmContent.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        ServiceOfApplicationConfirmContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ServiceOfApplicationConfirmContent.a}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<ServiceOfApplicationConfirmOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }

    await page.click(
      `${Selectors.GovukButton}:text-is("${ServiceOfApplicationConfirmContent.closeAndReturnToCaseDetails}")`,
    );
  }
}
