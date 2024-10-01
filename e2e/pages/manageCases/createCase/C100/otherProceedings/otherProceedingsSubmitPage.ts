import { otherProceedingsRadios } from "../../../../../common/types";
import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import {
  OtherProceedingsSubmitContent
} from "../../../../../fixtures/manageCases/createCase/C100/otherProceedings/otherProceedingsSubmitContent";
import { Helpers } from "../../../../../common/helpers";

interface OtherProceedingsSubmitPageOptions {
  page: Page,
  accessibilityTest: boolean,
  c100OtherProceedings: otherProceedingsRadios;
  c100OtherProceedingsOngoing?: boolean;
}

interface CheckPageContentOptions {
  page: Page,
  accessibilityTest: boolean,
  c100OtherProceedings: otherProceedingsRadios;
  c100OtherProceedingsOngoing?: boolean;
}

interface CheckStaticContentOptions {
  page: Page,
  c100OtherProceedings: otherProceedingsRadios;
}

interface CheckFilledContentOptions {
  page: Page,
  c100OtherProceedings: otherProceedingsRadios;
  c100OtherProceedingsOngoing?: boolean;
}

export class OtherProceedingsSubmitPage {
  public static async otherProceedingsSubmitPage({
    page,
    accessibilityTest,
    c100OtherProceedings,
    c100OtherProceedingsOngoing
  }: OtherProceedingsSubmitPageOptions): Promise<void> {

  }

  private static async checkPageContent({
    page,
    accessibilityTest,
    c100OtherProceedings,
    c100OtherProceedingsOngoing
  }: CheckPageContentOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${OtherProceedingsSubmitContent.pageHeading}")`
    );
    await Promise.all([
      this.checkStaticContent({
        page,
        c100OtherProceedings
      }),
      this.checkFilledContent({
        page,
        c100OtherProceedings,
        c100OtherProceedingsOngoing
      })
    ])
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async checkStaticContent({
    page,
    c100OtherProceedings,
  }: CheckStaticContentOptions): Promise<void> {
    let changeCount: number;
    let labelCount: number
    switch (c100OtherProceedings) {
      case 'Yes':
        changeCount = 2;
        labelCount = 15;
        break
      case 'No':
        changeCount = 1;
        labelCount = 1;
        break
      case "Don't know":
        changeCount = 1;
        labelCount = 1
        break
      default:
        throw new Error(
          `Unrecognised proceedings radio: ${c100OtherProceedings}`
        )
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherProceedingsSubmitContent.checkInfo}")`,
        1
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherProceedingsSubmitContent.change}")`,
        changeCount
      ),
      Helpers.checkGroup(
        page,
        labelCount,
        OtherProceedingsSubmitContent,
        'labelText16',
        `${Selectors.GovukText16}`
      )
    ])
  }

  private static async checkFilledContent({
    page,
    c100OtherProceedings,
    c100OtherProceedingsOngoing
  }: CheckFilledContentOptions): Promise<void> {

  }
}