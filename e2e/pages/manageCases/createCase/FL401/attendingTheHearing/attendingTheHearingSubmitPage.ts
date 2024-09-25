import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import {
  AttendingTheHearingSubmitContent
} from "../../../../../fixtures/manageCases/createCase/FL401/attendingTheHearing/attendingTheHearingSubmitContent";
import { Helpers } from "../../../../../common/helpers";

interface AttendingTheHearingSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  fl401AttendingTheHearingYesNo: boolean
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
  fl401AttendingTheHearingYesNo: boolean
}

interface CheckStaticContentOptions {
  page: Page;
  fl401AttendingTheHearingYesNo: boolean
}

interface CheckFilledInDataOptions {
  page: Page;
  fl401AttendingTheHearingYesNo: boolean
}

export class AttendingTheHearingSubmitPage {
  public static async attendingTheHearingSubmitPage({
    page,
    accessibilityTest,
    fl401AttendingTheHearingYesNo,
  }: AttendingTheHearingSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      fl401AttendingTheHearingYesNo
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    fl401AttendingTheHearingYesNo
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${AttendingTheHearingSubmitContent.pageHeading}")`
    );
    await Promise.all(
      [
        this.checkStaticContent({
          page,
          fl401AttendingTheHearingYesNo
        }),
        this.checkFilledInData({
          page,
          fl401AttendingTheHearingYesNo
        })
      ]
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async checkStaticContent({
    page,
    fl401AttendingTheHearingYesNo
  }: CheckStaticContentOptions): Promise<void> {
    const changeCount: number = (fl401AttendingTheHearingYesNo) ? 10 : 5
    const textCount: number = (fl401AttendingTheHearingYesNo) ? 12: 5
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukHeadingL}:text-is("${AttendingTheHearingSubmitContent.pageTitle}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          textCount,
          AttendingTheHearingSubmitContent,
          'text16',
          `${Selectors.GovukText16}`
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AttendingTheHearingSubmitContent.change}")`,
          changeCount
        )
      ]
    );
    if (fl401AttendingTheHearingYesNo) {
      await Helpers.checkGroup(
        page,
        4,
        AttendingTheHearingSubmitContent,
        'p',
        `${Selectors.p}`
      );
    }
  }

  private static async checkFilledInData({
    page,
    fl401AttendingTheHearingYesNo
  }: CheckFilledInDataOptions): Promise<void> {
    const booleanKey: keyof typeof AttendingTheHearingSubmitContent = (fl401AttendingTheHearingYesNo) ? 'yes' : 'no';
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${AttendingTheHearingSubmitContent[booleanKey]}")`,
      5
    )
    if (fl401AttendingTheHearingYesNo) {
      await Helpers.checkGroup(
        page,
        9,
        AttendingTheHearingSubmitContent,
        'filledText',
        `${Selectors.GovukText16}`
      );
      await Helpers.checkGroup(
        page,
        2,
        AttendingTheHearingSubmitContent,
        'filledSpanText',
        `${Selectors.Span}`
      );
    }
  }

  private static async fillInFields(
    page: Page
  ): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AttendingTheHearingSubmitContent.continue}")`
    );
  }
}