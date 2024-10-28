import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import AxeTest from "../../../../../../common/accessibilityTestHelper";

interface ReasonableAdjustmentsCommunicationHelpPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum UniqueSelectors {}

const fillInput: string = "#";

const noToAll: string = "#";

export class ReasonableAdjustmentsCommunicationHelpPage {
  public static async reasonableAdjustmentsCommunicationHelpPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoReasonableAdjustments: yesNoReasonableAdjustments,
  }: ReasonableAdjustmentsCommunicationHelpPageOptions): Promise<void> {
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
  }: Partial<ReasonableAdjustmentsCommunicationHelpPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    if (accessibilityTest) {
      await AxeTest.run(page);
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<ReasonableAdjustmentsCommunicationHelpPageOptions>): Promise<void> {
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
  }: Partial<ReasonableAdjustmentsCommunicationHelpPageOptions>): Promise<void> {
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
