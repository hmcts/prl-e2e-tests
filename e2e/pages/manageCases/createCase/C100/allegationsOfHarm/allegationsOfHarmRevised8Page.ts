import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { AllegationsOfHarmRevised8Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised8Content.ts";

interface AllegationsOfHarmRevised8PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum uniqueSelectors {
  allChildrenAtRiskYesRadio = "#allChildrenAreRiskEmotionalAbuse_Yes",
  natureOfBehaviourField = "#childEmotionalAbuse_abuseNatureDescription",
  durationOfBehaviourField = "#childEmotionalAbuse_behavioursStartDateAndLength",
  applicantSeekHelpYesRadio = "#childEmotionalAbuse_behavioursApplicantSoughtHelp_Yes",
  applicantSeekHelpYesField = "#childEmotionalAbuse_behavioursApplicantHelpSoughtWho",
}

export class AllegationsOfHarmRevised8Page {
  public static async allegationsOfHarmRevised8Page({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised8PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised8PageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${AllegationsOfHarmRevised8Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevised8Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised8Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised8Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised8Content.formLabelYes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised8Content.formLabelNo}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        4,
        AllegationsOfHarmRevised8Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.allChildrenAtRiskYesRadio}`);
    await page.fill(
      `${uniqueSelectors.natureOfBehaviourField}`,
      `${AllegationsOfHarmRevised8Content.natureOfBehaviour}`,
    );
    await page.fill(
      `${uniqueSelectors.durationOfBehaviourField}`,
      `${AllegationsOfHarmRevised8Content.durationOfBehaviour}`,
    );
    await this.handleSeekHelp(page);
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised8Content.continue}")`,
    );
  }

  private static async handleSeekHelp(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.applicantSeekHelpYesRadio}`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised8Content.formLabelSeekHelp}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.applicantSeekHelpYesField}`,
      `${AllegationsOfHarmRevised8Content.seekHelp}`,
    );
  }
}
