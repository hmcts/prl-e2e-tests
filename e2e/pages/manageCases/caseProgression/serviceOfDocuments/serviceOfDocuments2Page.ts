import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { ServiceOfDocuments2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments2Content";
import { yesNoNA } from "../../../../common/types";
import { ServiceOfDocuments1Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfDocuments/serviceOfDocuments1Content";

interface serviceOfDocuments2Options {
  page: Page;
  accessibilityTest: boolean;
  personallyServed: yesNoNA;
  servedByPost: boolean;
}
enum UniqueSelectors {
  personallyServedSelectorYes = "#sodServeToRespondentOptions-Yes",
  personallyServedSelectorNo = "#sodServeToRespondentOptions-No",
  personallyServedSelectorNA = "#sodServeToRespondentOptions-NotApplicable",
  responsibleForServingSelector = "#sodCitizenServingRespondentsOptions-unrepresentedApplicant",
  additionalRecipientsSelector = "#sodAdditionalRecipients-additionalRecipients",
  additionalRecipientPostSelector = "#sodAdditionalRecipientsList_0_serveByPostOrEmail-post",
  additionalRecipientEmailSelector = "#sodAdditionalRecipientsList_0_serveByPostOrEmail-post",
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
    servedByPost,
  }: serviceOfDocuments2Options): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, personallyServed, servedByPost });
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
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    personallyServed,
    servedByPost,
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
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormHint}:text-is("${ServiceOfDocuments2Content.hiddenFormLabel4}")`,
          1,
        );
        await page.click(UniqueSelectors.personallyServedSelectorNo);
        // Match labels containing "(Applicant)" and "(Respondent)"
        await page.locator('label', { hasText: "(Applicant)" }).check();
        await page.locator('label', { hasText: "(Respondent)" }).check();
        break;
      case "Not applicable":
        await page.click(UniqueSelectors.personallyServedSelectorNA);
        break;
    }
    //add additional recipients and check hidden fields
    await page.click(UniqueSelectors.additionalRecipientsSelector);
    await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${ServiceOfDocuments2Content.hiddenH2}")`,
        1,
      );
    await page.getByRole('button', { name: 'Add new' }).click();
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
      await page.click(UniqueSelectors.additionalRecipientPostSelector);
      await Promise.all([
        Helpers.checkGroup(
          page,
          2,
          ServiceOfDocuments2Content,
          `hiddenFormLabel3`,
          `${Selectors.GovukFormLabel}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${ServiceOfDocuments2Content.a}")`,
          1,
        ),
      ]);
      await page.fill(
        UniqueSelectors.additionalRecipientPost_InputNameSelector,
        ServiceOfDocuments2Content.inputAdditionalRecipientName,
      );
      await page.fill(
        UniqueSelectors.additionalRecipientPost_InputPostcodeSelector,
        ServiceOfDocuments2Content.inputPostcode,
      );
      await page.getByRole("button", { name: "Find address" }).click();
      await page
        .locator(UniqueSelectors.additionalRecipientPost_SelectAddress)
        .selectOption("46: Object");
    } else {
      await page.click(UniqueSelectors.additionalRecipientEmailSelector);
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${ServiceOfDocuments2Content.hiddenFormLabel31}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${ServiceOfDocuments2Content.hiddenFormLabel41}")`,
          1,
        ),
      ]);
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
  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
