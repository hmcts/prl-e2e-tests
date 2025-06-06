import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { MiamDomesticAbuseContent } from "../../../../../fixtures/citizen/createCase/C100/MIAM/miamDomesticAbuseContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface MiamDomesticAbusePageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  miamDomesticAbuse: boolean;
}

enum uniqueOuterSelectors {
  policeInvolvement = "#miam_domesticabuse_involvement",
  courtInvolvement = "#miam_domesticabuse_involvement-2",
  letterConfirmingCourt = "#miam_domesticabuse_involvement-3",
  letterConfirmingAuthority = "#miam_domesticabuse_involvement-4",
  letterConfirmingDomesticViolence = "#miam_domesticabuse_involvement-5",
  letterConfirmingHomeOffice = "#miam_domesticabuse_involvement-6",
  financialAbuse = "#miam_domesticabuse_involvement-7",
  noneOfAbove = "#miam_domesticabuse_involvement-9",
}

enum uniqueInnerSelectors {
  policeInvolved1 = "#miam_domesticAbuse_policeInvolvement_subfields",
  policeInvolved2 = "#miam_domesticAbuse_policeInvolvement_subfields-2",
  policeInvolved3 = "#miam_domesticAbuse_policeInvolvement_subfields-3",
  policeInvolved4 = "#miam_domesticAbuse_policeInvolvement_subfields-4",
  policeInvolved5 = "#miam_domesticAbuse_policeInvolvement_subfields-5",
  policeInvolved6 = "#miam_domesticAbuse_policeInvolvement_subfields-6",
  courtInvolved1 = "#miam_domesticAbuse_courtInvolvement_subfields",
  courtInvolved2 = "#miam_domesticAbuse_courtInvolvement_subfields-2",
  courtInvolved3 = "#miam_domesticAbuse_courtInvolvement_subfields-3",
  courtInvolved4 = "#miam_domesticAbuse_courtInvolvement_subfields-4",
  courtInvolved5 = "#miam_domesticAbuse_courtInvolvement_subfields-5",
  letterVictim1 = "#miam_domesticAbuse_letterOfBeingVictim_subfields",
  letterVictim2 = "#miam_domesticAbuse_letterOfBeingVictim_subfields-2",
  letterDomestic1 = "#miam_domesticAbuse_letterFromAuthority_subfields",
  letterDomestic2 = "#miam_domesticAbuse_letterFromAuthority_subfields-2",
  letterDomestic3 = "#miam_domesticAbuse_letterFromAuthority_subfields-3",
  letterDomesticSupport1 = "#miam_domesticAbuse_letterFromSupportService_subfields",
  letterDomesticSupport2 = "#miam_domesticAbuse_letterFromSupportService_subfields-2",
  letterDomesticSupport3 = "#miam_domesticAbuse_letterFromSupportService_subfields-3",
  letterDomesticSupport4 = "#miam_domesticAbuse_letterFromSupportService_subfields-4",
}

export class MiamDomesticAbusePage {
  public static async miamDomesticAbusePage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    miamDomesticAbuse: miamDomesticAbuse,
  }: Partial<MiamDomesticAbusePageOptions>): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages({ page: page });
    }
    await this.fillInFields({
      page: page,
      miamDomesticAbuse: miamDomesticAbuse,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
  }: Partial<MiamDomesticAbusePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${MiamDomesticAbuseContent.pageTitle}")`,
    );
    const selectorsArray: uniqueOuterSelectors[] = Object.values(
      uniqueOuterSelectors,
    ).slice(0, -1);
    for (const selector of selectorsArray) {
      await page.click(selector);
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${MiamDomesticAbuseContent.pageCaptionXL}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        MiamDomesticAbuseContent,
        `govukBodyM`,
        Selectors.GovukBodyM,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${MiamDomesticAbuseContent.govukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        9,
        MiamDomesticAbuseContent,
        `govukHint`,
        Selectors.GovukHint,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${MiamDomesticAbuseContent.govukBodyLetters}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${MiamDomesticAbuseContent.govukBodyEvidence}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        28,
        MiamDomesticAbuseContent,
        `govukLabel`,
        Selectors.GovukLabel,
      ),
      Helpers.checkGroup(
        page,
        16,
        MiamDomesticAbuseContent,
        `li`,
        Selectors.li,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages({
    page: page,
  }: Partial<MiamDomesticAbusePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
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
      Helpers.checkGroup(
        page,
        5,
        MiamDomesticAbuseContent,
        `errorMessage`,
        Selectors.a,
      ),
      Helpers.checkGroup(
        page,
        5,
        MiamDomesticAbuseContent,
        `errorMessage`,
        Selectors.GovukErrorMessageCitizen,
      ),
    ]);
  }

  private static async fillInFields({
    page: page,
    miamDomesticAbuse: miamDomesticAbuse,
  }: Partial<MiamDomesticAbusePageOptions>): Promise<void> {
    if (!page) {
      throw new Error();
    }
    for (const selector of Object.values(uniqueInnerSelectors)) {
      await page.click(selector);
    }
    if (!miamDomesticAbuse) {
      await page.click(uniqueOuterSelectors.noneOfAbove);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
