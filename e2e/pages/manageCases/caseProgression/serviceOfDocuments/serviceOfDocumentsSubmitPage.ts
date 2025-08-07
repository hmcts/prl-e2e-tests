import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { yesNoNA } from "../../../../common/types.ts";
import { ServiceOfDocumentsSubmitContent } from "../../../../fixtures/manageCases/caseProgression/serviceOfDocuments/serviceOfDocumentsSubmitContent.ts";

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
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ServiceOfDocumentsSubmitContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await this.checkStaticFields(page);
    await this.checkCaseDocument(page, withCaseDoc);
    await this.checkAdditionalDocument(page, additionalDoc);
    await this.checkAdditionalRecipient(
      page,
      additionalRecipient,
      servedByPost,
    );
    await this.checkPersonalService(page, personallyServed);
    await this.checkDocumentVerification(page, checkDocuments);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkStaticFields(page: Page): Promise<void> {
    await expect(
      page.getByText(ServiceOfDocumentsSubmitContent.textFielda),
    ).toBeVisible();
    //checking group is causing failures, so using singular checks
    await Helpers.checkGroup(
      page,
      5,
      ServiceOfDocumentsSubmitContent,
      `textField`,
      `${Selectors.GovukText16}`,
    );
  }

  private static async checkCaseDocument(
    page: Page,
    withCaseDoc?: boolean,
  ): Promise<void> {
    if (withCaseDoc) {
      await Helpers.checkGroup(
        page,
        2,
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
        await Helpers.checkGroup(
          page,
          5,
          ServiceOfDocumentsSubmitContent,
          `textPersonallyServed`,
          `${Selectors.GovukText16}`,
        );
        break;
      case "No":
        await Promise.all([
          Helpers.checkGroup(
            page,
            2,
            ServiceOfDocumentsSubmitContent,
            `textNotPersonallyServed`,
            `${Selectors.GovukText16}`,
          ),
          Helpers.checkGroup(
            page,
            2,
            ServiceOfDocumentsSubmitContent,
            `pNotPersonallyServed`,
            `${Selectors.p}`,
          ),
        ]);
        break;
      case "Not applicable":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ServiceOfDocumentsSubmitContent.textNAPersonallyServed}")`,
          1,
        );
        break;
      default:
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
      await Promise.all([
        await Helpers.checkGroup(
          page,
          3,
          ServiceOfDocumentsSubmitContent,
          `textFieldAdditionalRecipient`,
          `${Selectors.GovukText16}`,
        ),
      ]);

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

  private static async saveAndContinue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
