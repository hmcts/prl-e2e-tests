import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import AxeTest from "../../../../../../common/accessibilityTestHelper";

interface ReasonableAdjustmentsDocumentSupportPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum UniqueSelectors {}

const fillInput: string = "#";

const noToAll: string = "#";

export class ReasonableAdjustmentsDocumentSupportPage {
  public static async reasonableAdjustmentsDocumentSupportPageOptions({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAdjustmentsDocumentSupportPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      yesNoReasonableAdjustments: yesNoReasonableAdjustments,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<ReasonableAdjustmentsDocumentSupportPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (accessibilityTest) {
      await AxeTest.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<ReasonableAdjustmentsDocumentSupportPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async fillInFields({
    page: page,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: Partial<ReasonableAdjustmentsDocumentSupportPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (yesNoReasonableAdjustments) {
      // click all
    } else {
      await page.click(noToAll);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
