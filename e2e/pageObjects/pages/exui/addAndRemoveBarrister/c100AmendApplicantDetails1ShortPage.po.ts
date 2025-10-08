import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page, Browser, BrowserContext } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import Config from "../../../../utils/config.utils.ts";

export class C100AmendApplicantDetails1ShortPage {
  // private readonly continueButton: Locator = this.page.locator(
  //   Selectors.button,
  //   {
  //     hasText: CommonStaticText.continue,
  //   },
  // );
  // private readonly previousButton: Locator = this.page.locator(
  //   Selectors.button,
  //   {
  //     hasText: CommonStaticText.previous,
  //   },
  // );

  // constructor(page: Page) {
  //   super(page, "Amend applicant details");
  // }

  async loginAsCaseworkerAndGoToEvent(
    caseworkerPage,
    caseNumber,
  ) {
    // const newContext: BrowserContext = await browser.newContext({
    //   storageState: Config.sessionStoragePath + "caseWorker.json",
    // });

    //const newPage = await newContext.newPage();
    await Helpers.goToCase(
      caseworkerPage,
      config.manageCasesBaseURLCase,
      caseNumber,
      "tasks",
    );
    await Helpers.chooseEventFromDropdown(caseworkerPage, "Amend applicant details");
  }
  
  // async assertPageContents(existingRepresentatives: string[]): Promise<void> {
  //   await this.assertPageHeadings();
  //   for (const representative of existingRepresentatives) {
  //     await expect(
  //       this.page.locator(Selectors.p, { hasText: representative }),
  //     ).toBeVisible();
  //   }
  //   await expect(this.continueButton).toBeVisible();
  //   await expect(this.previousButton).toBeVisible();
  // }

  async clickContinue(
    caseworkerPage,
  ): Promise<void> {
    await caseworkerPage.getByRole('button', { name: "Continue" }).click();
  }

  async clickSaveAndContinue(
    caseworkerPage,
  ): Promise<void> {
    await caseworkerPage.getByRole('button', { name: "Save and continue" }).click();
  }
}
