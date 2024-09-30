import { Page } from "@playwright/test";
import { otherProceedingsRadios } from "../../../../../common/types";
import { Selectors } from "../../../../../common/selectors";
import {
  OtherProceedingsContent
} from "../../../../../fixtures/manageCases/createCase/C100/otherProceedings/otherProceedingsContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

enum inputIDs {
  radioYes = '#previousOrOngoingProceedingsForChildren-yes',
  radioNo = '#previousOrOngoingProceedingsForChildren-no',
  radioDK = '#previousOrOngoingProceedingsForChildren-dontKnow',
}

interface C100OtherProceedings1PageOptions {
  page: Page,
  accessibilityTest: boolean,
  c100OtherProceedings: otherProceedingsRadios;
}

interface CheckPageLoadsOptions {
  page: Page,
  accessibilityTest: boolean,
}

interface FillInFieldsOptions {
  page: Page,
  c100OtherProceedings: otherProceedingsRadios;
}

export class OtherProceedings1Page {
  public static async otherProceedings1Page({
    page,
    accessibilityTest,
    c100OtherProceedings
  }: C100OtherProceedings1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      c100OtherProceedings
    });
  }
  
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${OtherProceedingsContent.pageTitle}")`
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${OtherProceedingsContent.p1}")`,
        1
      ),
      Helpers.checkGroup(
        page,
        4,
        OtherProceedingsContent,
        'formLabel',
        `${Selectors.GovukFormLabel}`
      )
    ])
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async fillInFields({
    page,
    c100OtherProceedings
  }: FillInFieldsOptions): Promise<void> {
    let radioKey: keyof typeof inputIDs
    switch (c100OtherProceedings) {
      case 'Yes':
        radioKey = 'radioYes'
        break
      case 'No':
        radioKey = 'radioNo'
        break
      case "Don't know":
        radioKey = 'radioDK'
        break
      default:
        throw new Error(
          `Unrecognised radio option: ${c100OtherProceedings}`
        )
    }
    await page.click(
      inputIDs[radioKey]
    );
    if (c100OtherProceedings === 'Yes') {

    }
    await page.click(
      `${Selectors.button}:text-is("${OtherProceedingsContent.continue}")`
    )
  }
}