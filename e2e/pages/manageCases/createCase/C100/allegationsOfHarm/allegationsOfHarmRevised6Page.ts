import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { AllegationsOfHarmRevised6Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised6Content";

interface AllegationsOfHarmRevised6PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum uniqueSelectors {
  allChildrenAtRiskYesRadio = "#allChildrenAreRiskPsychologicalAbuse_Yes",
  natureOfBehaviourField = "#childPsychologicalAbuse_abuseNatureDescription",
  durationOfBehaviourField = "#childPsychologicalAbuse_behavioursStartDateAndLength",
  applicantSeekHelpYesRadio = "#childPsychologicalAbuse_behavioursApplicantSoughtHelp_Yes",
  applicantSeekHelpYesField = "#childPsychologicalAbuse_behavioursApplicantHelpSoughtWho",
}

export class AllegationsOfHarmRevised6Page {
  public static async allegationsOfHarmRevised6Page({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised6PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised6PageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${AllegationsOfHarmRevised6Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevised6Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised6Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised6Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised6Content.formLabelYes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised6Content.formLabelNo}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        4,
        AllegationsOfHarmRevised6Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.allChildrenAtRiskYesRadio}`);
    await page.fill(
      `${uniqueSelectors.natureOfBehaviourField}`,
      `${AllegationsOfHarmRevised6Content.natureOfBehaviour}`,
    );
    await page.fill(
      `${uniqueSelectors.durationOfBehaviourField}`,
      `${AllegationsOfHarmRevised6Content.durationOfBehaviour}`,
    );
    await this.handleSeekHelp(page);
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised6Content.continue}")`,
    );
  }

  private static async handleSeekHelp(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.applicantSeekHelpYesRadio}`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised6Content.formLabelSeekHelp}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.applicantSeekHelpYesField}`,
      `${AllegationsOfHarmRevised6Content.seekHelp}`,
    );
  }
}
