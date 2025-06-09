import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { Fl401TheHomeSubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/theHome/fl401TheHomeSubmitContent.ts";
import { addressRadios } from "./fl401TheHome1Page.ts";

interface FL401HomeSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  applicantHasChildren: boolean;
  fl401TheHomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

interface CheckPageContentOptions {
  page: Page;
  accessibilityTest: boolean;
  applicantHasChildren: boolean;
  fl401TheHomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

interface CheckPageLoadsOptions {
  page: Page;
  applicantHasChildren: boolean;
  fl401TheHomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
}

interface CheckFilledInDataOptions {
  page: Page;
  applicantHasChildren: boolean;
  fl401TheHomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

export class Fl401TheHomeSubmitPage {
  public static async fl401TheHomeSubmitPage({
    page,
    accessibilityTest,
    applicantHasChildren,
    fl401TheHomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress,
  }: FL401HomeSubmitPageOptions): Promise<void> {
    await this.checkPageContent({
      page,
      accessibilityTest,
      applicantHasChildren,
      fl401TheHomeYesNo,
      fl401EverLivedAtAddress,
      fl401IntendToLiveAtAddress,
    });
    await this.fillInFields(page);
  }

  private static async checkPageContent({
    page,
    accessibilityTest,
    applicantHasChildren,
    fl401TheHomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress,
  }: CheckPageContentOptions): Promise<void> {
    await Promise.all([
      this.checkPageLoads({
        page,
        applicantHasChildren,
        fl401TheHomeYesNo,
        fl401EverLivedAtAddress,
      }),
      this.checkFilledInData({
        page,
        applicantHasChildren,
        fl401TheHomeYesNo,
        fl401EverLivedAtAddress,
        fl401IntendToLiveAtAddress,
      }),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageLoads({
    page,
    applicantHasChildren,
    fl401TheHomeYesNo,
    fl401EverLivedAtAddress,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${Fl401TheHomeSubmitContent.pageTitle}")`,
    );
    const textCount: number = fl401TheHomeYesNo ? 16 : 12;
    const buildingCount: number = fl401TheHomeYesNo ? 3 : 1;
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${Fl401TheHomeSubmitContent.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        textCount,
        Fl401TheHomeSubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.change}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.buildingAndStreet}")`,
        buildingCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.townOrCity}")`,
        buildingCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.postalCode}")`,
        buildingCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.addressCountry}")`,
        buildingCount,
      ),
    ]);
    if (applicantHasChildren) {
      await Helpers.checkGroup(
        page,
        6,
        Fl401TheHomeSubmitContent,
        "childText16",
        `${Selectors.GovukText16}`,
      );
    }
    if (fl401EverLivedAtAddress === "No") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.intendedAddress}")`,
        1,
      );
    }
  }

  private static async checkFilledInData({
    page,
    applicantHasChildren,
    fl401TheHomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress,
  }: CheckFilledInDataOptions): Promise<void> {
    let yesCount: number = 0;
    let noCount: number = 0;
    const bpCount = fl401TheHomeYesNo ? 3 : 1;
    const applicantRespondentCount = fl401TheHomeYesNo ? 3 : 1;
    const filledTextCount = fl401TheHomeYesNo ? 12 : 9;
    const spanCount = fl401TheHomeYesNo ? 3 : 2;
    yesCount += fl401TheHomeYesNo ? 4 : 0;
    noCount += fl401TheHomeYesNo ? 0 : 4;
    if (applicantHasChildren) {
      yesCount += 1;
      if (fl401TheHomeYesNo) {
        yesCount += 2;
      } else {
        noCount += 2;
      }
    } else {
      noCount += 1;
    }
    if (fl401EverLivedAtAddress === "No") {
      noCount += 1;
      if (fl401IntendToLiveAtAddress === "No") {
        noCount += 1;
      }
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.bpBuildingAndStreet}")`,
        bpCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.bpCity}")`,
        bpCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.bpCountry}")`,
        bpCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.bpPostalCode}")`,
        bpCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.theApplicant}")`,
        applicantRespondentCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.theRespondent}")`,
        applicantRespondentCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.someoneElsePleaseSpecify}")`,
        applicantRespondentCount,
      ),
      Helpers.checkGroup(
        page,
        filledTextCount,
        Fl401TheHomeSubmitContent,
        "filledText16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkGroup(
        page,
        spanCount,
        Fl401TheHomeSubmitContent,
        "textArea",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.yes}")`,
        yesCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.no}")`,
        noCount,
      ),
    ]);
    if (applicantHasChildren) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.childFullName}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.childAge}")`,
          1,
        ),
      ]);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${Fl401TheHomeSubmitContent.saveAndContinue}")`,
    );
  }
}
