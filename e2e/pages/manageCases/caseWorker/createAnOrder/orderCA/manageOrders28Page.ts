import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors.js";
import { Helpers } from "../../../../../common/helpers.js";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import { ManageOrders28CAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders28CAContent.js";
import { applicationSubmittedBy } from "../../../../../common/types.js";

enum UniqueSelectors {
  respondentOptionYes = "#serveToRespondentOptions-Yes",
  respondentOptionNo = "#serveToRespondentOptions-No",
  respondentsOptionsCourtBailiff = "#personallyServeRespondentsOptions-courtBailiff",
  cafcassCymruServedOptionsNo = "#cafcassCymruServedOptions_No",
  respondentOptionsLipCaseCourtBailiff = "#servingOptionsForNonLegalRep-courtBailiff",
}

export class ManageOrders28Page {
  public static async manageOrders28Page(
    page: Page,
    accessibilityTest: boolean,
    personallyServed: boolean,
    applicationSubmittedBy: applicationSubmittedBy,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, personallyServed, applicationSubmittedBy);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${ManageOrders28CAContent.govUkHeadingL}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders28CAContent.h2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders28CAContent.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders28CAContent.formLabel2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${ManageOrders28CAContent.formHint}"):visible`,
        1,
      ),

      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async hiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders28CAContent.hiddenformLabel1}"):visible`,
        1,
      ),
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders28CAContent.hiddenformLabel2}"):visible`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    personallyServed: boolean,
    applicationSubmittedBy: applicationSubmittedBy,
  ): Promise<void> {
    if (personallyServed) {
      await page.check(`${UniqueSelectors.respondentOptionYes}`);
      await this.hiddenFormLabels(page);
      if (applicationSubmittedBy === "Citizen") {
        await page.check(
          `${UniqueSelectors.respondentOptionsLipCaseCourtBailiff}`,
        );
      } else {
        await page.check(`${UniqueSelectors.respondentsOptionsCourtBailiff}`);
      }
    } else {
      await page.check(`${UniqueSelectors.respondentOptionNo}`);
      await page.check(`${Selectors.GovukFormLabel}:has-text("(Applicant)")`);
      await page.check(`${Selectors.GovukFormLabel}:has-text("(Respondent)")`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders28CAContent.formLabel2}"):visible`,
        1,
      );
    }
    await page.check(`${UniqueSelectors.cafcassCymruServedOptionsNo}`);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
