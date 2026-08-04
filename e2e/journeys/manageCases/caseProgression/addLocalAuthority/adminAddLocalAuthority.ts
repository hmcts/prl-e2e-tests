import { Browser, Page, expect } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { AdminAddLocalAuthority1Page } from "../../../../pageObjects/pages/exui/addLocalAuthority/adminAddLocalAuthority1.po.ts";
import { AdminAddLocalAuthoritySubmitPage } from "../../../../pageObjects/pages/exui/addLocalAuthority/adminAddLocalAuthoritySubmit.po.ts";
import { AdminAddLocalAuthorityConfirmPage } from "../../../../pageObjects/pages/exui/addLocalAuthority/adminAddLocalAuthorityConfirm.po.ts";
import { SummaryPage } from "../../../../pageObjects/pages/exui/caseView/summary.po.ts";
import Config from "../../../../utils/config.utils.ts";
import { IdamLoginHelper } from "../../../../utils/idamLoginHelper.utils.ts";
import { ManageOrgUtils } from "../../../../utils/manageOrg.utils.ts";
import {
  ServiceAuthUtils,
  IdamUtils,
  createLogger,
} from "@hmcts/playwright-common";
import { CommonCaseEventUtils } from "../../../../utils/commonCaseEvent.utils.ts";

interface AdminAddLocalAuthorityParams {
  page: Page;
  browser: Browser;
  accessibilityTest: boolean;
  organisationName: string;
  caseRef: string;
  localAuthorityUserEmail: string;
}

export class AdminAddLocalAuthority {
  public static async adminAddLocalAuthority({
    page,
    browser,
    accessibilityTest,
    organisationName,
    caseRef,
    localAuthorityUserEmail,
  }: AdminAddLocalAuthorityParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Add local authority");

    const page1 = new AdminAddLocalAuthority1Page(page);
    await page1.assertPageContents();
    if (accessibilityTest) {
      await page1.verifyAccessibility();
    }

    await page1.searchSelectAndContinue(organisationName);

    const submitPage = new AdminAddLocalAuthoritySubmitPage(page);
    await submitPage.assertPageContents(
      ["caseProgression", "addLocalAuthority"],
      "submit",
    );
    await submitPage.assertOrganisationDetails(organisationName, "");
    if (accessibilityTest) {
      await submitPage.verifyAccessibility();
    }
    await submitPage.submitForm();

    const confirmPage = new AdminAddLocalAuthorityConfirmPage(page);
    await confirmPage.assertPageContents();
    if (accessibilityTest) {
      await confirmPage.verifyAccessibility();
    }

    await Helpers.clickTab(page, "Summary");
    const summaryPage = new SummaryPage(page);
    await summaryPage.assertLocalAuthoritySection(organisationName);
    await this.verifyLocalAuthorityOrgCases(
      browser,
      caseRef,
      localAuthorityUserEmail,
    );
  }

  private static async verifyLocalAuthorityOrgCases(
    browser: Browser,
    caseRef: string,
    localAuthorityUserEmail: string,
  ): Promise<void> {
    const laPage = await Helpers.openNewBrowserWindow(
      browser,
      "localAuthority",
    );

    // Assign the case to the local authority user via the case-assignments API
    const idamUtils = new IdamUtils({
      logger: createLogger({ level: "info" }),
    });
    const manageOrgUtils = new ManageOrgUtils(
      new CommonCaseEventUtils(
        new ServiceAuthUtils({ logger: createLogger({ level: "info" }) }),
        idamUtils,
      ),
    );
    await manageOrgUtils.assignCaseToUser(caseRef, localAuthorityUserEmail);

    // LA user signs straight into Manage Cases instead of Manage Organisation.
    const idamLoginHelper = new IdamLoginHelper(idamUtils);
    await idamLoginHelper.signInLongLivedUser(
      laPage,
      "localAuthority",
      Config.manageCasesBaseURLCase,
      "localAuthorityManageCases",
    );
    await laPage.goto(`${Config.manageCasesBaseURL}/cases`);
    await expect
      .poll(
        async () => {
          const visible = await laPage.locator("ccd-search-result").isVisible();
          if (!visible) {
            await laPage.reload();
          }
          return visible;
        },
        { intervals: [5_000], timeout: 60_000 },
      )
      .toBeTruthy();

    const dashedRef = caseRef.match(/.{1,4}/g)?.join("-") ?? caseRef;
    await laPage
      .locator(`a[aria-label="go to case with Case reference:${dashedRef}"]`)
      .click();

    await laPage.waitForLoadState("domcontentloaded");
    await expect(laPage.locator("ccd-case-header")).toBeVisible();
    await expect(laPage.locator("ccd-case-header")).toContainText(dashedRef);

    await laPage.close();
  }
}
