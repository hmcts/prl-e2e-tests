import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { AllegationsOfHarmRevised9Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised9Content";

interface AllegationsOfHarmRevised9PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum uniqueSelectors {
  allChildrenAtRiskYesRadio = "#allChildrenAreRiskFinancialAbuse_Yes",
  natureOfBehaviourField = "#childFinancialAbuse_abuseNatureDescription",
  durationOfBehaviourField = "#childFinancialAbuse_behavioursStartDateAndLength",
  applicantSeekHelpYesRadio = "#childFinancialAbuse_behavioursApplicantSoughtHelp_Yes",
  applicantSeekHelpYesField = "#childFinancialAbuse_behavioursApplicantHelpSoughtWho",
}

export class AllegationsOfHarmRevised9Page {
  public static async allegationsOfHarmRevised9Page({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised9PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised9PageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${AllegationsOfHarmRevised9Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevised9Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised9Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised9Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised9Content.formLabelYes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised9Content.formLabelNo}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        4,
        AllegationsOfHarmRevised9Content,
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
      `${AllegationsOfHarmRevised9Content.natureOfBehaviour}`,
    );
    await page.fill(
      `${uniqueSelectors.durationOfBehaviourField}`,
      `${AllegationsOfHarmRevised9Content.durationOfBehaviour}`,
    );
    await this.handleSeekHelp(page);
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised9Content.continue}")`,
    );
  }

  private static async handleSeekHelp(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.applicantSeekHelpYesRadio}`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised9Content.formLabelSeekHelp}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.applicantSeekHelpYesField}`,
      `${AllegationsOfHarmRevised9Content.seekHelp}`,
    );
  }
}
