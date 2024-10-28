import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import AxeTest from "../../../../../../common/accessibilityTestHelper";
import { ReasonableAdjustmentsCommunicationHelpContent } from "../../../../../../fixtures/citizen/createCase/C100/reasonableAdjustments/currentBranch/reasonableAdjustmentsCommunicationHelpContent";

interface ReasonableAdjustmentsCommunicationHelpPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoReasonableAdjustments: boolean;
}

enum CheckListUniqueSelectors {
  hearingLoop = "#ra_communicationHelp",
  infraredReceiver = "#ra_communicationHelp-2",
  closeToSpeaking = "#ra_communicationHelp-3",
  lipSpeaker = "#ra_communicationHelp-4",
  signLanguageInterpreter = "#ra_communicationHelp-5",
  speechToText = "#ra_communicationHelp-6",
  extraTimeToThink = "#ra_communicationHelp-7",
  visitCourtBeforeHearing = "#ra_communicationHelp-8",
  explanationOfCourt = "#ra_communicationHelp-9",
  intermediary = "#ra_communicationHelp-10",
  other = "#ra_communicationHelp-11",
}

enum TextboxInputUniqueSelectors {
  describeLanguageInterpreter = "#ra_signLanguageInterpreter_subfield",
  describeOther = "#ra_communicationHelpOther_subfield",
}

const noToAll: string = "#ra_communicationHelp-13";

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
      for (const selector of Object.values(CheckListUniqueSelectors)) {
        await page.click(selector);
      }
      await page.fill(
        TextboxInputUniqueSelectors.describeLanguageInterpreter,
        ReasonableAdjustmentsCommunicationHelpContent.loremIpsumLanguageInterpreter,
      );
      await page.fill(
        TextboxInputUniqueSelectors.describeOther,
        ReasonableAdjustmentsCommunicationHelpContent.loremIpsumOther,
      );
    } else {
      await page.click(noToAll);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
