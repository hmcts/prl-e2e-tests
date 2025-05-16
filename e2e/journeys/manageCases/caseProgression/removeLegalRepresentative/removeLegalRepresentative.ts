import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { AdminRemoveLegalRepresentativePage } from "../../../../pages/manageCases/caseProgression/removeLegalRepresentative/adminRemoveLegalRepresentativePage.ts";
import { RemoveLegalRepresentativeSubmitPage } from "../../../../pages/manageCases/caseProgression/removeLegalRepresentative/removeLegalRepresentativeSubmitPage.ts";
import { RemoveLegalRepresentativeConfirmPage } from "../../../../pages/manageCases/caseProgression/removeLegalRepresentative/removeLegalRepresentativeConfirmPage.ts";
import config from "../../../../utils/config.ts";
import { Selectors } from "../../../../common/selectors.ts";

interface RemoveLegalRepresentativeParams {
  page: Page;
  accessibilityTest: boolean;
  browser: Browser;
  caseRef: string;
}

export class RemoveLegalRepresentative {
  public static async removeLegalRepresentative({
    page,
    accessibilityTest,
    browser,
    caseRef,
  }: RemoveLegalRepresentativeParams): Promise<void> {
    // open new browser and sign in as court admin user
    page = await Helpers.openNewBrowserWindow(browser, "courtAdminStoke");
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
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
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "parties",
    );
    await page
      .locator(Selectors.h3, { hasText: "Applicant Solicitor" })
      .isVisible();
  }
}
