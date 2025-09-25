import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ServiceOfDocuments2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments2Content.ts";
import { yesNoNA } from "../../../../common/types.ts";

interface serviceOfDocuments2Options {
  page: Page;
  accessibilityTest: boolean;
  personallyServed: yesNoNA;
  servedByPost: boolean;
  additionalRecipient: boolean;
}

enum UniqueSelectors {
  personallyServedSelectorYes = "#sodServeToRespondentOptions-Yes",
  personallyServedSelectorNo = "#sodServeToRespondentOptions-No",
  personallyServedSelectorNA = "#sodServeToRespondentOptions-NotApplicable",
  responsibleForServingSelector = "#sodSolicitorServingRespondentsOptions-applicantLegalRepresentative",
  additionalRecipientsSelector = "#sodAdditionalRecipients-additionalRecipients",
  additionalRecipientPostSelector = "#sodAdditionalRecipientsList_0_serveByPostOrEmail-post",
  additionalRecipientEmailSelector = "#sodAdditionalRecipientsList_0_serveByPostOrEmail-email",
  additionalRecipientPost_InputNameSelector = "#sodAdditionalRecipientsList_0_postalInformation_postalName",
  additionalRecipientPost_InputPostcodeSelector = "#sodAdditionalRecipientsList_0_postalInformation_postalAddress_postalAddress_postcodeInput",
  additionalRecipientEmail_InputNameSelector = "#sodAdditionalRecipientsList_0_emailInformation_emailName",
  additionalRecipientEmail_InputEmailSelector = "#sodAdditionalRecipientsList_0_emailInformation_emailAddress",
  additionalRecipientPost_SelectAddress = "#sodAdditionalRecipientsList_0_postalInformation_postalAddress_postalAddress_addressList",
}

export class ServiceOfDocuments2Page {
  public static async serviceOfDocuments2Page({
    page,
    accessibilityTest,
    personallyServed,
    additionalRecipient,
    servedByPost,
  }: serviceOfDocuments2Options): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({
      page,
      personallyServed,
      servedByPost,
      additionalRecipient,
    });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<serviceOfDocuments2Options>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ServiceOfDocuments2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        ServiceOfDocuments2Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${ServiceOfDocuments2Content.formHint}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    personallyServed,
    servedByPost,
    additionalRecipient,
  }: Partial<serviceOfDocuments2Options>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    switch (personallyServed) {
      case "Yes":
        await page.click(UniqueSelectors.personallyServedSelectorYes);
        await page.click(UniqueSelectors.responsibleForServingSelector);
        break;
      case "No":
        await page.click(UniqueSelectors.personallyServedSelectorNo);
        // Match labels containing "(Applicant)" and "(Respondent)"
        await page.locator("label", { hasText: "(Applicant)" }).check();
        await page.locator("label", { hasText: "(Respondent)" }).check();
        break;
      case "Not applicable":
        await page.click(UniqueSelectors.personallyServedSelectorNA);
        break;
    }
    if (additionalRecipient) {
      await this.handleAdditionalRecipient({ page, servedByPost });
    }
  }

  private static async handleAdditionalRecipient({
    page,
    servedByPost,
  }: Partial<serviceOfDocuments2Options>) {
    if (!page) {
      throw new Error("No page found");
    }
    await page.click(UniqueSelectors.additionalRecipientsSelector);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.headingH2}:text-is("${ServiceOfDocuments2Content.hiddenH2}")`,
      1,
    );
    await page.getByRole("button", { name: "Add new" }).click();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ServiceOfDocuments2Content.hiddenH2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ServiceOfDocuments2Content,
        `hiddenFormLabel2`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (servedByPost) {
      await this.handleServeByPost(page);
    } else {
      await this.handleServeByEmail(page);
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async handleServeByPost(page: Page): Promise<void> {
    await page.click(UniqueSelectors.additionalRecipientPostSelector);
    await page.click(UniqueSelectors.additionalRecipientPostSelector);
    await page.fill(
      UniqueSelectors.additionalRecipientPost_InputNameSelector,
      ServiceOfDocuments2Content.inputAdditionalRecipientName,
    );
    await this.handleAddress(page);
  }

  private static async handleAddress(page: Page): Promise<void> {
    await page.fill(
      UniqueSelectors.additionalRecipientPost_InputPostcodeSelector,
      ServiceOfDocuments2Content.inputPostcode,
    );
    await page.getByRole("button", { name: "Find address" }).click();
    await page.selectOption(
      UniqueSelectors.additionalRecipientPost_SelectAddress,
      { index: 1 },
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        8,
        ServiceOfDocuments2Content,
        `hiddenAddressFormLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
  }

  private static async handleServeByEmail(page: Page): Promise<void> {
    await page.click(UniqueSelectors.additionalRecipientEmailSelector);
    await page.check(UniqueSelectors.additionalRecipientEmailSelector);
    await page.fill(
      UniqueSelectors.additionalRecipientEmail_InputNameSelector,
      ServiceOfDocuments2Content.inputAdditionalRecipientName,
    );
    await page.fill(
      UniqueSelectors.additionalRecipientEmail_InputEmailSelector,
      ServiceOfDocuments2Content.inputEmail,
    );
  }
}
