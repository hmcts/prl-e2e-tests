import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Fl401SendToGateKeeper1Content } from "../../../../fixtures/manageCases/caseProgression/sendToGateKepper/fl401SendToGateKeeper1Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Fl401SendToGateKeeperSubmitContent } from "../../../../fixtures/manageCases/caseProgression/sendToGateKepper/fl401SendToGateKeeperSubmitContent.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonContent } from "../../../../fixtures/manageCases/commonContent.ts";

interface FL401SendToGateKeeperSubmitOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
}

export class FL401SendToGateKeeperSubmitPage {
  public static async fl401SendToGateKeeperSubmitPage({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
  }: FL401SendToGateKeeperSubmitOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
    });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
  }: Partial<FL401SendToGateKeeperSubmitOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${Fl401SendToGateKeeper1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${Fl401SendToGateKeeperSubmitContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${Fl401SendToGateKeeperSubmitContent.h3}")`,
        1,
      ),
    ]);
    if (yesNoSendToGateKeeper) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          3,
          Fl401SendToGateKeeperSubmitContent,
          "text16",
          Selectors.GovukText16,
        ),
        Helpers.checkGroup(
          page,
          2,
          Fl401SendToGateKeeperSubmitContent,
          "yesText16",
          Selectors.GovukText16,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${CommonContent.judgeNameAndEmail}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Fl401SendToGateKeeperSubmitContent.text162}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Fl401SendToGateKeeperSubmitContent.noText16}")`,
          1,
        ),
      ]);
      if (accessibilityTest) {
        await new AxeUtils(page).audit();
      }
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
