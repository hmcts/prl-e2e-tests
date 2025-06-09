import { Page } from "@playwright/test";
import { TransferToAnotherCourt1Page } from "../../../../pages/manageCases/caseProgression/transferToAnotherCourt/transferToAnotherCourt1Page.ts";
import { TransferToAnotherCourtSubmitPage } from "../../../../pages/manageCases/caseProgression/transferToAnotherCourt/transferToAnotherCourtSubmitPage.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { TransferToAnotherCourtConfirmPage } from "../../../../pages/manageCases/caseProgression/transferToAnotherCourt/transferToAnotherCourtConfirmPage.ts";
import { FL401SummaryTabPage } from "../../../../pages/manageCases/caseTabs/FL401/fl401SummaryTabPage.ts";

interface TransferToAnotherCourtParams {
  page: Page;
  courtIsListed: boolean;
  accessibilityTest: boolean;
}

export class TransferToAnotherCourt {
  public static async transferToAnotherCourt({
    page,
    courtIsListed,
    accessibilityTest,
  }: TransferToAnotherCourtParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Transfer to another court");
    await TransferToAnotherCourt1Page.transferToAnotherCourt1Page({
      page,
      courtIsListed,
      accessibilityTest,
    });
    await TransferToAnotherCourtSubmitPage.transferToAnotherCourtSubmitPage({
      page,
      courtIsListed,
      accessibilityTest,
    });
    await TransferToAnotherCourtConfirmPage.transferToAnotherCourtConfirmPage({
      page,
      accessibilityTest,
    });
    await FL401SummaryTabPage.fl401SummaryTabPage(
      page,
      courtIsListed,
      accessibilityTest,
      false,
    );
  }
}
