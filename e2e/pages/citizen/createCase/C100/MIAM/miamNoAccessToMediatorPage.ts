import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { MiamNoAccessToMediatorContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamNoAccessToMediatorContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface MiamNoAccessToMediatorPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  reasonForNoAccessToMediator: MiamReasonForNoAccessToMediator;
}

export type MiamReasonForNoAccessToMediator =
  | "Unable to conduct within 15 days"
  | "Disability"
  | "No mediator within 15 miles"
  | "Prison or institution"
  | "Subject to bail"
  | "Released from prison on license"
  | "None of these";

enum uniqueSelectors {
  unableToConductWithin15DaysRadio = "#miam_noMediatorReasons",
  unableToConductWithin15DaysField = "#miam_noAppointmentAvailableDetails",
  disabilityRadio = "#miam_noMediatorReasons-2",
  disabilityField = "#miam_unableToAttainDueToDisablityDetails",
  no15MilesRadio = "#miam_noMediatorReasons-3",
  no15MilesField = "#miam_noMediatorIn15mileDetails",
  prisonRadio = "#miam_noMediatorReasons-4",
  bailRadio = "#miam_noMediatorReasons-5",
  licenseRadio = "#miam_noMediatorReasons-6",
  noneOfThese = "#miam_noMediatorReasons-8",
}

export class MiamNoAccessToMediatorPage {
  public static async miamNoAccessToMediatorPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    reasonForNoAccessToMediator: reasonForNoAccessToMediator,
  }: MiamNoAccessToMediatorPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      reasonForNoAccessToMediator: reasonForNoAccessToMediator,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamNoAccessToMediatorPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${MiamNoAccessToMediatorContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${MiamNoAccessToMediatorContent.govukBody}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        7,
        MiamNoAccessToMediatorContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${MiamNoAccessToMediatorContent.govukHintContactMediator}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page); #TODO: Re-enable when PRL-6521 is completed.
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MiamNoAccessToMediatorPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is undefined.");
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${MiamNoAccessToMediatorContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${MiamNoAccessToMediatorContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    reasonForNoAccessToMediator: reasonForNoAccessToMediator,
  }: Partial<MiamNoAccessToMediatorPageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    switch (reasonForNoAccessToMediator) {
      case "Unable to conduct within 15 days":
        await page.click(uniqueSelectors.unableToConductWithin15DaysRadio);
        await page.fill(
          uniqueSelectors.unableToConductWithin15DaysField,
          MiamNoAccessToMediatorContent.unableToConductWithin15Days,
        );
        break;
      case "Disability":
        await page.click(uniqueSelectors.disabilityRadio);
        await page.fill(
          uniqueSelectors.disabilityField,
          MiamNoAccessToMediatorContent.disability,
        );
        break;
      case "No mediator within 15 miles":
        await page.click(uniqueSelectors.no15MilesRadio);
        await page.fill(
          uniqueSelectors.no15MilesField,
          MiamNoAccessToMediatorContent.no15miles,
        );
        break;
      case "Prison or institution":
        await page.click(uniqueSelectors.prisonRadio);
        break;
      case "Subject to bail":
        await page.click(uniqueSelectors.bailRadio);
        break;
      case "Released from prison on license":
        await page.click(uniqueSelectors.licenseRadio);
        break;
      default:
        await page.click(uniqueSelectors.noneOfThese);
        break;
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
