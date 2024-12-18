import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { ServiceOfApplication2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Content";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { ServiceOfApplicationConfirmContent } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationConfirmContent";

interface ServiceOfApplicationConfirmOptions {
  page: Page;
  yesNoServiceOfApplication4: boolean;
  accessibilityTest: boolean;
}

export class ServiceOfApplicationConfirmPage {
  public static async serviceOfApplicationConfirmPage({
    page,
    yesNoServiceOfApplication4,
    accessibilityTest,
  }: ServiceOfApplicationConfirmOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      yesNoServiceOfApplication4,
      accessibilityTest,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    yesNoServiceOfApplication4,
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
        `${Selectors.h3}:text-is("${ServiceOfApplicationConfirmContent.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
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
    if(yesNoServiceOfApplication4) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h1}:text-is("${ServiceOfApplicationConfirmContent.servedByCourtBaliffH1}")`,
          1,
        ),
        Helpers.checkGroup(
          page,
          2,
          ServiceOfApplicationConfirmContent,
          "servedByCourtBaliffP",
          `${Selectors.p}`,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h1}:text-is("${ServiceOfApplicationConfirmContent.bothPartiesServedH1}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${ServiceOfApplicationConfirmContent.bothPartiesServedP1}")`,
          1,
        ),
      ]);
    }
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
      `${Selectors.button}:text-is("${ServiceOfApplicationConfirmContent.closeAndReturnToCaseDetails}")`,
    );
  }
}
