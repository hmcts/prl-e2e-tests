import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { addressRadios } from "./fl401TheHome1Page";
import { Fl401TheHomeSubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/theHome/fl401TheHomeSubmitContent";

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

interface CheckPageLoadsOptions{
  page: Page;
  applicantHasChildren: boolean;
  fl401TheHomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
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
      fl401IntendToLiveAtAddress
    });
    console.log('Pause')
    // await this.fillInFields(page);
  }

  private static async checkPageContent({
    page,
    accessibilityTest,
    applicantHasChildren,
    fl401TheHomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress
  }: CheckPageContentOptions): Promise<void> {
    await Promise.all([
      this.checkPageLoads({
        page,
        applicantHasChildren,
        fl401TheHomeYesNo,
        fl401EverLivedAtAddress,
      }),
      // this.checkFilledInDatalledInData(page, respondentDetailsAllOptionsYes),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
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
    const textCount: number = (fl401TheHomeYesNo) ? 12 : 16
    const buildingCount: number = (fl401TheHomeYesNo) ? 3 : 1
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
        'text16',
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
        'childText16',
        `${Selectors.GovukText16}`
      );
    }
    if (fl401EverLivedAtAddress === 'No') {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.intendedAddress}")`,
        1
      );
    }
  }

  // private static async checkFilledInData(
  //   page: Page,
  //   respondentDetailsAllOptionsYes: boolean,
  // ): Promise<void> {
  //   await Promise.all([
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.text162}")`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.text163}")`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.text164}")`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.text166}")`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.text167}")`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.text168}")`,
  //       1,
  //     ),
  //     Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.text170}")`,
  //       1,
  //     ),
  //   ]);
  //
  //   if (respondentDetailsAllOptionsYes) {
  //     await Promise.all([
  //       Helpers.checkVisibleAndPresent(
  //         page,
  //         `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.text165}")`,
  //         1,
  //       ),
  //       Helpers.checkVisibleAndPresent(
  //         page,
  //         `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.text169}")`,
  //         1,
  //       ),
  //       Helpers.checkVisibleAndPresent(
  //         page,
  //         `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.yes}")`,
  //         5,
  //       ),
  //       Helpers.checkVisibleAndPresent(
  //         page,
  //         `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(RespondentDetailsContent.exampleDay, RespondentDetailsContent.exampleMonth, RespondentDetailsContent.exampleYear)}")`,
  //         1,
  //       ),
  //       Helpers.checkVisibleAndPresent(
  //         page,
  //         `${Selectors.a}:text-is("${RespondentDetailsContent.exampleEmailAddress}")`,
  //         1,
  //       ),
  //     ]);
  //   } else {
  //     await Helpers.checkVisibleAndPresent(
  //       page,
  //       `${Selectors.GovukText16}:text-is("${Fl401TheHomeSubmitContent.no}")`,
  //       5,
  //     );
  //   }
  // }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${Fl401TheHomeSubmitContent.saveAndContinue}")`,
    );
  }
}