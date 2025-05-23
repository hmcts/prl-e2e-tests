import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { TransferToAnotherCourtSubmitContent } from "../../../../fixtures/manageCases/caseProgression/transferToAnotherCourt/transferToAnotherCourtSubmitContent";
import { Helpers } from "../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../common/commonStaticText";

interface TransferToAnotherCourtSubmitPageOptions {
  page: Page;
  courtIsListed: boolean;
  accessibilityTest: boolean;
}

export class TransferToAnotherCourtSubmitPage {
  public static async transferToAnotherCourtSubmitPage({
    page,
    courtIsListed,
    accessibilityTest,
  }: TransferToAnotherCourtSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({ page, courtIsListed, accessibilityTest });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    courtIsListed,
    accessibilityTest,
  }: Partial<TransferToAnotherCourtSubmitPageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${TransferToAnotherCourtSubmitContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        TransferToAnotherCourtSubmitContent,
        "heading",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        page,
        2,
        TransferToAnotherCourtSubmitContent,
        "reasonForTransferText16",
        Selectors.GovukText16,
      ),
      Helpers.checkGroup(
        page,
        2,
        TransferToAnotherCourtSubmitContent,
        "reasonForTransferAnswer",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${TransferToAnotherCourtSubmitContent.reasonForTransferDetails}")`,
        1,
      ),
    ]);
    if (courtIsListed) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${TransferToAnotherCourtSubmitContent.selectedCourt}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${TransferToAnotherCourtSubmitContent.cannotFindCourtText16}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${TransferToAnotherCourtSubmitContent.courtNameAnswer}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${TransferToAnotherCourtSubmitContent.courtEmailAddressAnswer}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
