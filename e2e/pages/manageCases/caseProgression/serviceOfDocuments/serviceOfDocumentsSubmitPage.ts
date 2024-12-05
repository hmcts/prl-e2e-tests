import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { yesNoNA } from "../../../../common/types";
import { ServiceOfDocumentsSubmitContent } from "../../../../fixtures/manageCases/caseProgression/serviceOfDocuments/serviceOfDocumentsSubmitContent";

interface serviceOfDocumentsSubmitOptions {
  page: Page;
  accessibilityTest: boolean;
  withCaseDoc: boolean;
  additionalDoc: boolean;
  additionalRecipient: boolean;
  personallyServed: yesNoNA;
  servedByPost: boolean;
  checkDocuments: boolean;
}

export class ServiceOfDocumentsSubmitPage {
  public static async serviceOfDocumentsSubmitPage({
    page,
    accessibilityTest,
    withCaseDoc,
    additionalDoc,
    additionalRecipient,
    personallyServed,
    servedByPost,
    checkDocuments,
  }: serviceOfDocumentsSubmitOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      withCaseDoc,
      additionalDoc,
      additionalRecipient,
      personallyServed,
      servedByPost,
      checkDocuments,
    });
    await this.saveAndContinue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    withCaseDoc,
    additionalDoc,
    additionalRecipient,
    personallyServed,
    servedByPost,
    checkDocuments,
  }: Partial<serviceOfDocumentsSubmitOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    await this.checkPageTitle(page);
    await this.checkMandatoryFields(page);
    await this.checkCaseDocument(page, withCaseDoc);
    await this.checkPersonalService(page, personallyServed);
    await this.checkDocumentVerification(page, checkDocuments);
    await this.checkAdditionalRecipient(
      page,
      additionalRecipient,
      servedByPost,
    );
    await this.checkAdditionalDocument(page, additionalDoc);
    await this.runAccessibilityTest(page, accessibilityTest);
  }

  private static async checkPageTitle(page: Page): Promise<void> {
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ServiceOfDocumentsSubmitContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
  }

  private static async checkMandatoryFields(page: Page): Promise<void> {
    await Helpers.checkGroup(
      page,
      8,
      ServiceOfDocumentsSubmitContent,
      `textField`,
      `${Selectors.GovukFormLabel}`,
    );
  }

  private static async checkCaseDocument(
    page: Page,
    withCaseDoc?: boolean,
  ): Promise<void> {
    if (withCaseDoc) {
      await Helpers.checkGroup(
        page,
        3,
        ServiceOfDocumentsSubmitContent,
        `textFieldCaseDoc`,
        `${Selectors.GovukText16}`,
      );
    }
  }

  private static async checkPersonalService(
    page: Page,
    personallyServed?: yesNoNA,
  ): Promise<void> {
    switch (personallyServed) {
      case "Yes":
        // Check content when "Yes" is selected
        await Helpers.checkGroup(
          page,
          3,
          ServiceOfDocumentsSubmitContent,
          `textPersonallyServed`,
          `${Selectors.GovukText16}`,
        );
        break;
      case "No":
        // Check content when "No" is selected
        await Promise.all([
          Helpers.checkGroup(
            page,
            3,
            ServiceOfDocumentsSubmitContent,
            `textNotPersonallyServed1`,
            `${Selectors.GovukText16}`,
          ),
          Helpers.checkGroup(
            page,
            3,
            ServiceOfDocumentsSubmitContent,
            `pNotPersonallyServed`,
            `${Selectors.p}`,
          ),
        ]);
        break;
      case "Not applicable":
        // Check content when "Not applicable" is selected
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ServiceOfDocumentsSubmitContent.textNAPersonallyServed}")`,
          1,
        );
        break;
      default:
        // Handle the case where there's no valid value for personallyServed
        throw new Error("Invalid value for personallyServed");
    }
  }

  private static async checkDocumentVerification(
    page: Page,
    checkDocuments?: boolean,
  ): Promise<void> {
    const verificationText = checkDocuments
      ? ServiceOfDocumentsSubmitContent.textAnsCheckDoc
      : ServiceOfDocumentsSubmitContent.textAnsNoCheckDoc;

    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${verificationText}")`,
      1,
    );
  }

  private static async checkAdditionalRecipient(
    page: Page,
    additionalRecipient?: boolean,
    servedByPost?: boolean,
  ): Promise<void> {
    if (additionalRecipient) {
      await Helpers.checkGroup(
        page,
        3,
        ServiceOfDocumentsSubmitContent,
        `textFieldAdditionalRecipient`,
        `${Selectors.GovukText16}`,
      );

      const recipientMethodText = servedByPost
        ? ServiceOfDocumentsSubmitContent.textFieldAdditionalRecipientPost
        : ServiceOfDocumentsSubmitContent.textFieldAdditionalRecipientEmail;

      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${recipientMethodText}")`,
        1,
      );
    }
  }

  private static async checkAdditionalDocument(
    page: Page,
    additionalDoc?: boolean,
  ): Promise<void> {
    if (additionalDoc) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ServiceOfDocumentsSubmitContent.textFieldAdditionDoc1}")`,
        1,
      );
    }
  }

  private static async runAccessibilityTest(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
