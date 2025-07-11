import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { ServiceOfApplication2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ServiceOfApplicationConfirmContent } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplicationConfirmContent.ts";
import { applicationSubmittedBy } from "../../../../common/types.ts";

interface ServiceOfApplicationConfirmOptions {
  page: Page;
  yesNoServiceOfApplication4: boolean;
  accessibilityTest: boolean;
  confidentialityCheck: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

export class ServiceOfApplicationConfirmPage {
  public static async serviceOfApplicationConfirmPage({
    page,
    yesNoServiceOfApplication4,
    accessibilityTest,
    confidentialityCheck,
    applicationSubmittedBy,
  }: ServiceOfApplicationConfirmOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      yesNoServiceOfApplication4,
      accessibilityTest,
      confidentialityCheck,
      applicationSubmittedBy,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    yesNoServiceOfApplication4,
    accessibilityTest,
    confidentialityCheck,
    applicationSubmittedBy,
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
    if (applicationSubmittedBy === "Solicitor" || confidentialityCheck) {
      // solicitor application is treated as though it needs to be checked for confidentiality
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h1}:text-is("${ServiceOfApplicationConfirmContent.confidentialityH1}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${ServiceOfApplicationConfirmContent.confidentialityP1}")`,
          1,
        ),
      ]);
    } else if (yesNoServiceOfApplication4) {
      // personally served by court baliff
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
    } else if (!yesNoServiceOfApplication4) {
      // not personally served
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
      await new AxeUtils(page).audit();
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
