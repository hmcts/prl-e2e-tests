import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AllegationsOfHarmRevised5Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised5Content";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";

interface AllegationsOfHarmRevised5PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum uniqueSelectors {
  allChildrenAtRiskYesRadio = "#allChildrenAreRiskPhysicalAbuse_Yes",
  natureOfBehaviourField = "#childPhysicalAbuse_abuseNatureDescription",
  durationOfBehaviourField = "#childPhysicalAbuse_behavioursStartDateAndLength",
  applicantSeekHelpYesRadio = "#childPhysicalAbuse_behavioursApplicantSoughtHelp_Yes",
  applicantSeekHelpYesField = "#childPhysicalAbuse_behavioursApplicantHelpSoughtWho",
}

export class AllegationsOfHarmRevised5Page {
  public static async allegationsOfHarmRevised5Page({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised5PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: AllegationsOfHarmRevised5PageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${AllegationsOfHarmRevised5Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevised5Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised5Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AllegationsOfHarmRevised5Content.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised5Content.formLabelYes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised5Content.formLabelNo}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        4,
        AllegationsOfHarmRevised5Content,
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
      `${AllegationsOfHarmRevised5Content.natureOfBehaviour}`,
    );
    await page.fill(
      `${uniqueSelectors.durationOfBehaviourField}`,
      `${AllegationsOfHarmRevised5Content.durationOfBehaviour}`,
    );
    await this.handleSeekHelp(page);
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised5Content.continue}")`,
    );
  }

  private static async handleSeekHelp(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.applicantSeekHelpYesRadio}`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised5Content.formLabelSeekHelp}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.applicantSeekHelpYesField}`,
      `${AllegationsOfHarmRevised5Content.seekHelp}`,
    );
  }
}
