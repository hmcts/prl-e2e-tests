import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { FL401LinkedCasesTabContent } from "../../../../fixtures/manageCases/caseTabs/FL401/fl401LinkedCasesTabContent";
// import { AxeUtils } from "@hmcts/playwright-common";

export class FL401LinkedCasesTabPage {
  public static async fl401LinkedCasesTabPage(
    page: Page,
    isCaseLinked: boolean,
    linkedCaseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    linkedCaseNumber = Helpers.getHyphenatedCaseReference(linkedCaseNumber);
    await Helpers.clickTab(page, "Linked cases");
    await this.checkPageLoads(
      page,
      isCaseLinked,
      linkedCaseNumber,
      accessibilityTest,
    );
  }

  private static async checkPageLoads(
    page: Page,
    isCaseLinked: boolean,
    linkedCaseNumber: string,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${FL401LinkedCasesTabContent.tabTitle}")`,
    );
    await Helpers.checkGroup(
      page,
      2,
      FL401LinkedCasesTabContent,
      "tableHeader",
      `${Selectors.GovukTableSubheading}`,
    );
    if (isCaseLinked) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:has-text("${linkedCaseNumber}")`,
        1,
      );
      await Helpers.checkGroup(
        page,
        5,
        FL401LinkedCasesTabContent,
        "proposedCaseDetailsSpan",
        `${Selectors.Span}`,
      );
    }
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukTableCell}:has-text("${FL401LinkedCasesTabContent.noCasesLinked}")`,
      isCaseLinked ? 1 : 2,
    );
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); //#TODO: Awaiting for accessibility ticket FPVTL-337 to be resolved
    }
  }
}
