import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { AllegationsOfHarmRevised10Content } from "../../../../../fixtures/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised10Content.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers.ts";

interface AllegationsOfHarmRevised10PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum uniqueSelectors {
  childAbductedField = "#newChildAbductionReasons",
  threatYesRadio = "#newPreviousAbductionThreats_Yes",
  threatYesField = "#newPreviousAbductionThreatsDetails",
  childrenNowField = "#newChildrenLocationNow",
  passportOfficeNotifiedYesRadio = "#newAbductionPassportOfficeNotified_Yes",
  policeInvolvedYesRadio = "#newAbductionPreviousPoliceInvolvement_Yes",
  policeInvolvedYesField = "#newAbductionPreviousPoliceInvolvementDetails",
  passportYesRadio = "#newAbductionChildHasPassport_Yes",
  multiplePassportYesRadio = "#childPassportDetails_newChildHasMultiplePassports_Yes",
  generalPassportPossession = "#childPassportDetails_newChildPassportPossession-",
  otherParentField = "#childPassportDetails_newChildPassportPossessionOtherDetails",
}

export class AllegationsOfHarmRevised10Page {
  public static async allegationsOfHarmRevised10Page({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
  }: AllegationsOfHarmRevised10PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${AllegationsOfHarmRevised10Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AllegationsOfHarmRevised10Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        AllegationsOfHarmRevised10Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised10Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${AllegationsOfHarmRevised10Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised10Content.errorChildrenAbducted}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised10Content.errorChildrenAbducted}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised10Content.errorPreviousThreats}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised10Content.errorPreviousThreats}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised10Content.errorChildrenLocation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised10Content.errorChildrenLocation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised10Content.errorPassportOffice}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised10Content.errorPassportOffice}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised10Content.errorPolice}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised10Content.errorPolice}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${AllegationsOfHarmRevised10Content.errorChildPassport}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${AllegationsOfHarmRevised10Content.errorChildPassport}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.fill(
      `${uniqueSelectors.childAbductedField}`,
      `${AllegationsOfHarmRevised10Content.childrenAbducted}`,
    );
    await page.click(`${uniqueSelectors.threatYesRadio}`);
    await page.click(`${uniqueSelectors.policeInvolvedYesRadio}`);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised10Content.formLabelGiveDetails}")`,
      2,
    );
    await page.fill(
      `${uniqueSelectors.threatYesField}`,
      `${AllegationsOfHarmRevised10Content.previousThreats}`,
    );
    await page.fill(
      `${uniqueSelectors.policeInvolvedYesField}`,
      `${AllegationsOfHarmRevised10Content.policeNotified}`,
    );
    await page.fill(
      `${uniqueSelectors.childrenNowField}`,
      `${AllegationsOfHarmRevised10Content.childrenLocation}`,
    );
    await page.click(`${uniqueSelectors.passportOfficeNotifiedYesRadio}`);
    await this.handlePassport(page);
    await page.click(
      `${Selectors.button}:text-is("${AllegationsOfHarmRevised10Content.continue}")`,
    );
  }

  private static async handlePassport(page: Page): Promise<void> {
    await page.click(`${uniqueSelectors.passportYesRadio}`);
    await page.click(`${uniqueSelectors.multiplePassportYesRadio}`);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised10Content.formLabelMultiplePassports}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised10Content.formLabelPassportPossession}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised10Content.formLabelMother}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised10Content.formLabelFather}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised10Content.formLabelOther1}")`,
        1,
      ),
    ]);
    for (const person of ["mother", "father", "otherPerson"]) {
      await page.click(`${uniqueSelectors.generalPassportPossession}${person}`);
    }
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${AllegationsOfHarmRevised10Content.formLabelOther2}")`,
      1,
    );
    await page.fill(
      `${uniqueSelectors.otherParentField}`,
      `${AllegationsOfHarmRevised10Content.otherParentPassport}`,
    );
  }
}
