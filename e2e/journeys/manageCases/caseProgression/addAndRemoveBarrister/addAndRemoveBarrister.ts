import { Browser, Locator, Page, expect } from "@playwright/test";
import { Noc2Page } from "../../../../pages/manageCases/caseProgression/noticeOfChange/noc2Page.ts";
import { NocSubmitPage } from "../../../../pages/manageCases/caseProgression/noticeOfChange/nocSubmitPage.ts";
import { NocSuccessfulPage } from "../../../../pages/manageCases/caseProgression/noticeOfChange/nocSuccessfulPage.ts";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { Noc1Page } from "../../../../pages/manageCases/caseProgression/noticeOfChange/noc1Page.ts";
import { SolicitorAddBarrister } from "../../../../pages/manageCases/caseProgression/addBarristerAndRemoveBarrister/solicitorAddBarristerPage.ts";
import { RemoveBarrister } from "../../../../pages/manageCases/caseProgression/addBarristerAndRemoveBarrister/removeBarristerPage.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { BarristerDetailsTabContent } from "../../../../fixtures/manageCases/caseProgression/addBarristerAndRemoveBarrister/barristerDetailsTabContent.ts";
import { CaseworkerAddBarrister } from "../../../../pages/manageCases/caseProgression/addBarristerAndRemoveBarrister/caseworkerAddBarristerPage.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface addBarristerAndRemoveBarristerParams {
  page: Page;
  browser: Browser;
  caseType: solicitorCaseCreateType;
  ccdRef: string;
  isApplicant: boolean;
  accessibilityTest: boolean;
  isCaseworker: boolean;
}

export class AddAndRemoveBarrister {
    public static async addAndRemoveBarrister({
    page,
    caseType,
    ccdRef,
    isApplicant,
    accessibilityTest,
    browser,
    isCaseworker,
    }: addBarristerAndRemoveBarristerParams): Promise<void> {
      if (caseType === "FL401") {
        //Running 'Amend appl details' event to allow NoC to happen without any issues(DA)
        const page: Page = await Helpers.openNewBrowserWindow(
          browser,
          "caseWorker",
        );
        await Helpers.goToCase(
              page,
              config.manageCasesBaseURLCase,
              ccdRef,
              "tasks",
            );
        await Helpers.chooseEventFromDropdown(page, "Amend applicant details");
        await page.click(
          `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        );
        await page.click(
              `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
        );
      }
      //Adding Solicitor via NOC
    await page.getByRole("link", { name: "Notice of change" }).click();
    await Noc1Page.noc1Page(page, ccdRef, accessibilityTest);
    await Noc2Page.noc2Page(page, caseType, isApplicant, accessibilityTest);
    await NocSubmitPage.nocSubmitPage(
      page,
      caseType,
      isApplicant,
      accessibilityTest,
    );
    await NocSuccessfulPage.nocSuccessfulPage(page, accessibilityTest);
    await this.checkSolicitorOnApplication(page, caseType, isApplicant);
      if (isCaseworker === false) {
        await SolicitorAddBarrister.solicitorAddBarrister(page, ccdRef, accessibilityTest);
      } else {
        await CaseworkerAddBarrister.caseworkerAddBarrister(ccdRef, accessibilityTest, browser);
      }
    //Checking barrister details in the case tabs
    await this.checkTabsBarristerDetails(ccdRef, browser,caseType);
    await RemoveBarrister.removeBarrister(page, ccdRef, accessibilityTest);
    await this.checkTabsBarristerDetailsNotVisible(ccdRef, browser, caseType);
  }

  private static async checkSolicitorOnApplication(
    page: Page,
    caseType: solicitorCaseCreateType,
    isApplicant: boolean,
  ): Promise<void> {
    const nocSolicitorEmail: string = process.env
      .NOC_SOLICITOR_USERNAME as string;
    await page
      .getByRole("tab", {
        name: "Application",
        exact: false,
      })
      .click();
    let tableLocator: Locator;
    if (caseType === "C100") {
      tableLocator = page.locator(
        isApplicant
          ? "#case-viewer-field-read--applicantTable"
          : "#case-viewer-field-read--respondentTable",
      );
    } else {
      tableLocator = page.locator(
        isApplicant
          ? "#case-viewer-field-read--fl401SolicitorDetailsTable"
          : "#case-viewer-field-read--fl401RespondentTable",
      );
    }
    await tableLocator
      .getByRole("link", { name: nocSolicitorEmail })
      .isVisible();
  }

  private static async checkTabsBarristerDetails(
    ccdRef: string,
    browser: Browser,
    caseType: string,
  ): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "History",
    );
    await Helpers.checkVisibleAndPresent(
                page,
      `${Selectors.a}:text-is("${BarristerDetailsTabContent.a}")`,
      1,
    );
    if (caseType === "C100") {
      await page.locator(`${Selectors.div}:text-is("${BarristerDetailsTabContent.tab1CA}")`).click();
      await expect(
        page.locator
          (`${Selectors.h3}:text-is("${BarristerDetailsTabContent.h3}")`)
          .first()
      ).toBeVisible();
      await expect(
        page.locator
          (`${Selectors.Span}:text-is("${BarristerDetailsTabContent.span}")`)
          .first()
      ).toBeHidden();
      await page.locator(`${Selectors.div}:text-is("${BarristerDetailsTabContent.tab2CA}")`).click();
      await expect(
        page.locator
          (`${Selectors.h3}:text-is("${BarristerDetailsTabContent.h3}")`)
          .first()
      ).toBeVisible();
    } else {
      await page.locator(`${Selectors.div}:text-is("${BarristerDetailsTabContent.tab1DA}")`).click();
      await expect(
        page.locator
          (`${Selectors.h3}:text-is("${BarristerDetailsTabContent.h3}")`)
          .first()
      ).toBeVisible();
      await expect(
        page.locator
          (`${Selectors.Span}:text-is("${BarristerDetailsTabContent.span}")`)
          .first()
      ).toBeHidden();
      await page.locator(`${Selectors.div}:text-is("${BarristerDetailsTabContent.tab2DA}")`).click();
      await expect(
        page.locator
          (`${Selectors.h3}:text-is("${BarristerDetailsTabContent.h3}")`)
      ).toBeVisible();
    };
   }

  private static async checkTabsBarristerDetailsNotVisible(
    ccdRef: string,
    browser: Browser,
    caseType: string,
  ): Promise<void> {
    const page: Page = await Helpers.openNewBrowserWindow(
      browser,
      "caseWorker",
    );
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      ccdRef,
      "History",
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.a}:text-is("${BarristerDetailsTabContent.removeEvent}")`,
      1,
    );
    if (caseType === "C100") {
      await page.locator(`${Selectors.div}:text-is("${BarristerDetailsTabContent.tab1CA}")`).click();
      //Checking hidden Barrister elements, which will still be present with count 3
      await expect(
        page.locator
          (`${Selectors.h3}:text-is("${BarristerDetailsTabContent.h3}")`),
      ).toHaveCount(3);
      //Checking the orgs related to the Barrister, which the expected is 0, as there are no Barristers anymore
      await expect(
        page.locator
          (`${Selectors.Span}:text-is("${BarristerDetailsTabContent.span}")`),
      ).toHaveCount(0);
      await page.locator(`${Selectors.div}:text-is("${BarristerDetailsTabContent.tab2CA}")`).click();
      await expect(
        page.locator
          (`${Selectors.h3}:text-is("${BarristerDetailsTabContent.h3}")`),
      ).toHaveCount(3);
      await expect(
        page.locator
          (`${Selectors.Span}:text-is("${BarristerDetailsTabContent.span}")`),
      ).toHaveCount(0);
    } else {
      await page.locator(`${Selectors.div}:text-is("${BarristerDetailsTabContent.tab1DA}")`).click();
      await expect(
        page.locator
          (`${Selectors.h3}:text-is("${BarristerDetailsTabContent.h3}")`),
      ).toHaveCount(1);
      await expect(
        page.locator
          (`${Selectors.Span}:text-is("${BarristerDetailsTabContent.span}")`),
      ).toHaveCount(0);
      await page.locator(`${Selectors.div}:text-is("${BarristerDetailsTabContent.tab2DA}")`).click();
      await expect(
        page.locator
          (`${Selectors.h3}:text-is("${BarristerDetailsTabContent.h3}")`),
      ).toHaveCount(1);
      await expect(
        page.locator
          (`${Selectors.Span}:text-is("${BarristerDetailsTabContent.span}")`),
      ).toHaveCount(0);
    };
  }
}
