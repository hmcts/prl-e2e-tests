import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { TransferToAnotherCourt1Content } from "../../../../fixtures/manageCases/caseProgression/transferToAnotherCourt/transferToAnotherCourt1Content";
import { Helpers } from "../../../../common/helpers";
// import { AxeUtils } from "@hmcts/playwright-common";

interface TransferToAnotherCourt1PageOptions {
  page: Page;
  courtIsListed: boolean;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  courtListDropdown = "#courtList",
  cannotFindCourt = "#cantFindCourtCheck-cantFindCourt",
  inputCourtName = "#anotherCourt",
  inputCourtEmailAddress = "#courtEmailAddress",
  reasonForTransferAnotherJurisdiction = "#reasonForTransferToAnotherCourtDa-anotherJurisdiction",
  reasonForTransferAnotherReasonLabel = "label[for='reasonForTransferToAnotherCourtDa-anotherReason']",
  reasonForTransferAnotherReason = "#reasonForTransferToAnotherCourtDa-anotherReason",
  inputAnotherReasonToTransferDetails = "#anotherReasonToTransferDetails",
}

export class TransferToAnotherCourt1Page {
  public static async transferToAnotherCourt1Page({
    page,
    courtIsListed,
    accessibilityTest,
  }: TransferToAnotherCourt1PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, courtIsListed });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<TransferToAnotherCourt1PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${TransferToAnotherCourt1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${TransferToAnotherCourt1Content.strong}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${TransferToAnotherCourt1Content.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        TransferToAnotherCourt1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.reasonForTransferAnotherReasonLabel}:text-is("${TransferToAnotherCourt1Content.formLabelAnotherReasonForTransfer}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); //#TODO: Awaiting for accessibility ticket EXUI-2794 to be resolved
    }
  }

  private static async fillInFields({
    page,
    courtIsListed,
  }: Partial<TransferToAnotherCourt1PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (courtIsListed) {
      await page.selectOption(
        UniqueSelectors.courtListDropdown,
        TransferToAnotherCourt1Content.courtNameToSelect,
      );
    } else {
      await page.check(UniqueSelectors.cannotFindCourt);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${TransferToAnotherCourt1Content.formLabelCourtName}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${TransferToAnotherCourt1Content.formLabelCourtEmailAddress}")`,
        1,
      );
      await page.fill(
        UniqueSelectors.inputCourtName,
        TransferToAnotherCourt1Content.courtNameToEnter,
      );
      await page.fill(
        UniqueSelectors.inputCourtEmailAddress,
        TransferToAnotherCourt1Content.emailAdddress,
      );
    }
    await page.check(UniqueSelectors.reasonForTransferAnotherJurisdiction);
    await page.check(UniqueSelectors.reasonForTransferAnotherReason);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${TransferToAnotherCourt1Content.formLabelAnotherReasonForTransferDetails}")`,
      1,
    );
    await page.fill(
      UniqueSelectors.inputAnotherReasonToTransferDetails,
      TransferToAnotherCourt1Content.anotherReasonDetails,
    );
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
