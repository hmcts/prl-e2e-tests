import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { ServiceOfApplication2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplication2Content";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ServiceOfApplication4Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplication4Content";

interface ServiceOfApplication4Options {
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
  courtBailiff = "#soaCitizenServingRespondentsOptions-courtBailiff",
  unrepresentedApplication = "#soaCitizenServingRespondentsOptions-unrepresentedApplicant",
  courtAdmin = "#soaCitizenServingRespondentsOptions-courtAdmin",
  noApplicant = "#soaRecipientsOptions_d0cfb768-9707-4091-b0d4-b2d09eb82318",
  noRespondent = "#soaRecipientsOptions_ea441ab6-d136-422f-bf91-0c9407a0185d",
}

export class ServiceOfApplication4Page {
  public static async serviceOfApplication4Page({
    page,
    accessibilityTest,
    yesNoServiceOfApplication4,
    responsibleForServing,
  }: ServiceOfApplication4Options): Promise<void> {
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
  }: Partial<ServiceOfApplication4Options>): Promise<void> {
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
        2,
        ServiceOfApplication4Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${CommonStaticText.yes}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${CommonStaticText.no}"):visible`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    yesNoServiceOfApplication4,
    responsibleForServing,
  }: Partial<ServiceOfApplication4Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (yesNoServiceOfApplication4) {
      await page.click(UniqueSelectors.yes);
      await this.yesHiddenFormLabel1(page);
      switch (responsibleForServing) {
        case "courtBailiff":
          await page.click(UniqueSelectors.courtBailiff);
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
      await page.click(UniqueSelectors.noApplicant);
      await page.click(UniqueSelectors.noRespondent);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async yesHiddenFormLabel1(page: Page): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await Promise.all([
      Helpers.checkGroup(
        page,
        1,
        ServiceOfApplication4Content,
        "yesHiddenFormLabel",
        Selectors.GovukFormLabel,
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
        `${Selectors.GovukFormLabel}:text-is("${ServiceOfApplication4Content.noHiddenFormLabel1}")`,
        1,
      ),
    ]);
  }
}
