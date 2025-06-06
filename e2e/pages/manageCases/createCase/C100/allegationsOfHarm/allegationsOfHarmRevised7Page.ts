import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { AllegationsOfHarmRevised7Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised7Content.ts";

interface AllegationsOfHarmRevised7PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum uniqueSelectors {
  allChildrenAtRiskYesRadio = "#allChildrenAreRiskSexualAbuse_Yes",
  natureOfBehaviourField = "#childSexualAbuse_abuseNatureDescription",
  durationOfBehaviourField = "#childSexualAbuse_behavioursStartDateAndLength",
  applicantSeekHelpYesRadio = "#childSexualAbuse_behavioursApplicantSoughtHelp_Yes",
  applicantSeekHelpYesField = "#childSexualAbuse_behavioursApplicantHelpSoughtWho",
}

export class AllegationsOfHarmRevised7Page {
  public static async allegationsOfHarmRevised7Page({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised7PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised7PageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${AllegationsOfHarmRevised7Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevised7Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised7Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised7Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised7Content.formLabelYes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised7Content.formLabelNo}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        4,
        AllegationsOfHarmRevised7Content,
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
      `${AllegationsOfHarmRevised7Content.natureOfBehaviour}`,
    );
    await page.fill(
      `${uniqueSelectors.durationOfBehaviourField}`,
      `${AllegationsOfHarmRevised7Content.durationOfBehaviour}`,
    );
    await this.handleSeekHelp(page);
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised7Content.continue}")`,
    );
  }

  private static async handleSeekHelp(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.applicantSeekHelpYesRadio}`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised7Content.formLabelSeekHelp}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.applicantSeekHelpYesField}`,
      `${AllegationsOfHarmRevised7Content.seekHelp}`,
    );
  }
}
