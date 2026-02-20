import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AllegationsOfHarmRevised3Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised3Content";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";

interface AllegationsOfHarmRevised3PageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100DomesticAbuseTypePage3: C100AllegationsOfHarmTypeOfDomesticAbuse;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  c100DomesticAbuseTypePage3: C100AllegationsOfHarmTypeOfDomesticAbuse;
}

enum uniqueSelectors {
  physicalRadio = "#domesticBehaviours_0_typeOfAbuse-TypeOfAbuseEnum_value_1",
  psychologicalRadio = "#domesticBehaviours_0_typeOfAbuse-TypeOfAbuseEnum_value_2",
  sexualRadio = "#domesticBehaviours_0_typeOfAbuse-TypeOfAbuseEnum_value_3",
  emotionalRadio = "#domesticBehaviours_0_typeOfAbuse-TypeOfAbuseEnum_value_4",
  financialRadio = "#domesticBehaviours_0_typeOfAbuse-TypeOfAbuseEnum_value_5",
  natureField = "#domesticBehaviours_0_newAbuseNatureDescription",
  durationField = "#domesticBehaviours_0_newBehavioursStartDateAndLength",
  applicantHelpRadioYes = "#domesticBehaviours_0_newBehavioursApplicantSoughtHelp_Yes",
  helpSoughtField = "#domesticBehaviours_0_newBehavioursApplicantHelpSoughtWho",
}

export type C100AllegationsOfHarmTypeOfDomesticAbuse =
  | "Physical abuse"
  | "Psychological abuse"
  | "Sexual abuse"
  | "Emotional abuse"
  | "Financial abuse";

export class AllegationsOfHarmRevised3Page {
  public static async allegationsOfHarmRevised3Page({
    page: page,
    accessibilityTest: accessibilityTest,
    c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
  }: AllegationsOfHarmRevised3PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await this.fillInFields({
      page: page,
      c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised3Content.addNewButton}")`,
    );
    await page.waitForSelector(
      `${Selectors.p}:text-is("${AllegationsOfHarmRevised3Content.p}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevised3Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        AllegationsOfHarmRevised3Content,
        `h2`,
        `${Selectors.h2}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${AllegationsOfHarmRevised3Content.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        10,
        AllegationsOfHarmRevised3Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page: page,
    c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
  }: fillInFieldsOptions): Promise<void> {
    switch (c100DomesticAbuseTypePage3) {
      case "Physical abuse":
        await page.click(`${uniqueSelectors.physicalRadio}`);
        await page.click(`${uniqueSelectors.physicalRadio}`);
        break;
      case "Psychological abuse":
        await page.click(`${uniqueSelectors.psychologicalRadio}`);
        await page.click(`${uniqueSelectors.psychologicalRadio}`);
        break;
      case "Sexual abuse":
        await page.click(`${uniqueSelectors.sexualRadio}`);
        await page.click(`${uniqueSelectors.sexualRadio}`);
        break;
      case "Emotional abuse":
        await page.click(`${uniqueSelectors.emotionalRadio}`);
        await page.click(`${uniqueSelectors.emotionalRadio}`);
        break;
      case "Financial abuse":
        await page.click(`${uniqueSelectors.financialRadio}`);
        await page.click(`${uniqueSelectors.financialRadio}`);
        break;
    }
    await page.fill(
      `${uniqueSelectors.natureField}`,
      `${AllegationsOfHarmRevised3Content.natureOfBehaviour}`,
    );
    await page.fill(
      `${uniqueSelectors.durationField}`,
      `${AllegationsOfHarmRevised3Content.behaviourLength}`,
    );
    await page.click(`${uniqueSelectors.applicantHelpRadioYes}`);
    await page.click(`${uniqueSelectors.applicantHelpRadioYes}`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised3Content.formLabelYesExtra}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.helpSoughtField}`,
      `${AllegationsOfHarmRevised3Content.helpSoughtFrom}`,
    );
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised3Content.continueButton}")`,
    );
  }
}
