import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { AdminRemoveLegalRepresentativePage } from "../../../../pages/manageCases/caseProgression/removeLegalRepresentative/adminRemoveLegalRepresentativePage.ts";
import { RemoveLegalRepresentativeSubmitPage } from "../../../../pages/manageCases/caseProgression/removeLegalRepresentative/removeLegalRepresentativeSubmitPage.ts";
import { RemoveLegalRepresentativeConfirmPage } from "../../../../pages/manageCases/caseProgression/removeLegalRepresentative/removeLegalRepresentativeConfirmPage.ts";
import config from "../../../../config.ts";
import { DummyC100 } from "../../createCase/dummyCase/dummyC100.ts";
import { Selectors } from "../../../../common/selectors.ts";

interface RemoveLegalRepresentativeParams {
  page: Page;
  accessibilityTest: boolean;
  browser: Browser;
}

export class RemoveLegalRepresentative {
  public static async removeLegalRepresentative({
    page,
    accessibilityTest,
    browser,
  }: RemoveLegalRepresentativeParams): Promise<void> {
    const caseRef = await DummyC100.dummyC100({
      page: page,
      applicantLivesInRefuge: true,
      otherPersonLivesInRefuge: false,
    });
    // open new browser and sign in as court admin user
    page = await Helpers.openNewBrowserWindow(browser, "courtAdminStoke");
    await Helpers.goToCase(page, config.manageCasesBaseURL, caseRef, "tasks");
    await Helpers.chooseEventFromDropdown(page, "Remove legal representative");
    await AdminRemoveLegalRepresentativePage.adminRemoveLegalRepresentativePage(
      page,
      accessibilityTest,
    );
    await RemoveLegalRepresentativeSubmitPage.removeLegalRepresentativeSubmitPage(
      page,
      accessibilityTest,
    );
    await RemoveLegalRepresentativeConfirmPage.removeLegalRepresentativeConfirmPage(
      page,
      accessibilityTest,
    );
    await page.reload();
    await Helpers.goToCase(page, config.manageCasesBaseURL, caseRef, "parties");
    // await page.isVisible("text='Applicant Solicitor'");
    await page
      .locator(Selectors.h3, { hasText: "Applicant Solicitor" })
      .isVisible();
  }
}
