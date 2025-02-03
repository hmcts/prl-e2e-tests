import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { DummyC100 } from "../../createCase/dummyCase/dummyC100.ts";


interface WithdrawApplicationParams {
    page: Page;
    applicantLivesInRefuge: applicantLivesInRefuge;
    otherPersonLivesInRefuge: otherPersonLivesInRefuge;
    accessibilityTest: boolean;
}

export class WelshLanguageRequirements {
    public static async welshLanguageRequirements({
      page,
      accessibilityTest,
      applicantLivesInRefuge,
      otherPersonLivesInRefuge,
  }: WithdrawApplicationParams) {
        await DummyC100.dummyC100({
            page: page,
            applicantLivesInRefuge,
            otherPersonLivesInRefuge,
        });
        await Helpers.chooseEventFromDropdown(page, "Withdraw application");
        await WithAppli