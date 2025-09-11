import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { ServiceOfApplication2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { C100ServiceOfApplication4Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/C100ServiceOfApplication4Content.js";

interface C100ServiceOfApplication4Options {
  page: Page;
  accessibilityTest: boolean;
  yesNoServiceOfApplication4: boolean;
  responsibleForServing: responsibleForServing;
}

export type responsibleForServing =
  | "courtBailiff"
  | "unrepresentedApplication"
  | "courtAdmin";

enum UniqueSelectors {
  yes = "#soaServeToRespondentOptions-Yes",
  no = "#soaServeToRespondentOptions-No",
  notApplicable = "#soaServeToRespondentOptions-NotApplicable",
  unrepresentedApplication = "#soaCitizenServingRespondentsOptions-unrepresentedApplicant",
  courtAdmin = "#soaCitizenServingRespondentsOptions-courtAdmin",
  noLocalAuth = "#soaServeLocalAuthorityYesOrNo_No",
  yesLocalAuth = "soaServeLocalAuthorityYesOrNo_Yes",
}

export class C100ServiceOfApplication4Page {
  public static async c100ServiceOfApplication4Page({
    page,
    accessibilityTest,
    yesNoServiceOfApplication4,
    responsibleForServing,
  }: C100ServiceOfApplication4Options): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      yesNoServiceOfApplication4,
      responsibleForServing,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<C100ServiceOfApplication4Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ServiceOfApplication2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        C100ServiceOfApplication4Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}"):visible`,
        3,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    yesNoServiceOfApplication4,
    responsibleForServing,
  }: Partial<C100ServiceOfApplication4Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (yesNoServiceOfApplication4) {
      await page.click(UniqueSelectors.yes);
      await this.yesHiddenFormLabel1(page);
      switch (responsibleForServing) {
        case "courtBailiff":
          const courtBailiff1 = page.locator(
            "#soaCitizenServingRespondentsOptions-courtBailiff",
          );
          const courtBailiff2 = page.locator(
            "#soaServingRespondentsOptions-courtBailiff",
          );
          if (await courtBailiff1.isVisible()) {
            await courtBailiff1.click();
          } else if (await courtBailiff2.isVisible()) {
            await courtBailiff2.click();
          } else {
            throw new Error(
              "Neither court bailiff option is visible on the page.",
            );
          }
          break;
        case "unrepresentedApplication":
          await page.click(UniqueSelectors.unrepresentedApplication);
          break;
        case "courtAdmin":
          await page.click(UniqueSelectors.courtAdmin);
          break;
      }
    } else {
      await page.click(UniqueSelectors.no);
      await this.noHiddenFormLabel1(page);
      const recipientsCheckboxes = page.locator(
        "#soaRecipientsOptions .form-control",
      );
      for (let i = 0; i < (await recipientsCheckboxes.count()); i++) {
        await recipientsCheckboxes.nth(i).click();
      }
    }
    //if local authority need to be informed, code need to be updated. Currently it is not informing local authority
    await page.click(UniqueSelectors.noLocalAuth);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async yesHiddenFormLabel1(page: Page): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100ServiceOfApplication4Content.yesHiddenFormLabelResponsible}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100ServiceOfApplication4Content.yesHiddenFormLabel1}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100ServiceOfApplication4Content.yesHiddenFormLabel2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100ServiceOfApplication4Content.yesHiddenFormLabel3}"):visible`,
        1,
      ),
    ]);
  }

  private static async noHiddenFormLabel1(page: Page): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${C100ServiceOfApplication4Content.noHiddenFormLabel1}")`,
        1,
      ),
    ]);
  }
}
