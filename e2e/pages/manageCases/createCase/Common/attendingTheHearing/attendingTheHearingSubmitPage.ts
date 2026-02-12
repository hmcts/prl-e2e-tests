import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../common/selectors.ts";
import { AttendingTheHearingSubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/attendingTheHearing/attendingTheHearingSubmitContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { solicitorCaseCreateType } from "../../../../../common/types.ts";

interface AttendingTheHearingSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  attendingTheHearingYesNo: boolean;
  caseType: solicitorCaseCreateType;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
  attendingTheHearingYesNo: boolean;
  caseType: solicitorCaseCreateType;
}

interface CheckStaticContentOptions {
  page: Page;
  attendingTheHearingYesNo: boolean;
  caseType: solicitorCaseCreateType;
}

interface CheckFilledInDataOptions {
  page: Page;
  attendingTheHearingYesNo: boolean;
  caseType: solicitorCaseCreateType;
}

export class AttendingTheHearingSubmitPage {
  public static async attendingTheHearingSubmitPage({
    page,
    accessibilityTest,
    attendingTheHearingYesNo,
    caseType,
  }: AttendingTheHearingSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      attendingTheHearingYesNo,
      caseType,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    attendingTheHearingYesNo,
    caseType,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukText16}:text-is("${AttendingTheHearingSubmitContent.checkInfo}")`,
    );
    await Promise.all([
      this.checkStaticContent({
        page,
        attendingTheHearingYesNo,
        caseType,
      }),
      this.checkFilledInData({
        page,
        attendingTheHearingYesNo,
        caseType,
      }),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkStaticContent({
    page,
    attendingTheHearingYesNo,
  }: CheckStaticContentOptions): Promise<void> {
    const changeCount: number = attendingTheHearingYesNo ? 10 : 5;
    const textCount: number = attendingTheHearingYesNo ? 12 : 5;
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AttendingTheHearingSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        textCount,
        AttendingTheHearingSubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AttendingTheHearingSubmitContent.change}")`,
        changeCount,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${AttendingTheHearingSubmitContent.pageHeading}")`,
        1,
      ),
    ]);
    if (attendingTheHearingYesNo) {
      await Helpers.checkGroup(
        page,
        4,
        AttendingTheHearingSubmitContent,
        "p",
        `${Selectors.p}`,
      );
    }
  }

  private static async checkFilledInData({
    page,
    attendingTheHearingYesNo,
    caseType,
  }: CheckFilledInDataOptions): Promise<void> {
    const booleanKey: keyof typeof AttendingTheHearingSubmitContent =
      attendingTheHearingYesNo ? "yes" : "no";
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${AttendingTheHearingSubmitContent[booleanKey]}")`,
      5,
    );
    if (attendingTheHearingYesNo) {
      if (caseType === "FL401") {
        await Helpers.checkGroup(
          page,
          7,
          AttendingTheHearingSubmitContent,
          "filledText",
          `${Selectors.GovukText16}`,
        );
        await Helpers.checkGroup(
          page,
          2,
          AttendingTheHearingSubmitContent,
          "fl401filledText",
          `${Selectors.GovukText16}`,
        );
        await Helpers.checkGroup(
          page,
          2,
          AttendingTheHearingSubmitContent,
          "filledSpanText",
          `${Selectors.Span}`,
        );
      } else {
        await Helpers.checkGroup(
          page,
          7,
          AttendingTheHearingSubmitContent,
          "filledText",
          `${Selectors.GovukText16}`,
        );
        await Helpers.checkGroup(
          page,
          2,
          AttendingTheHearingSubmitContent,
          "c100filledText",
          `${Selectors.GovukText16}`,
        );
        await Helpers.checkGroup(
          page,
          2,
          AttendingTheHearingSubmitContent,
          "filledSpanText",
          `${Selectors.Span}`,
        );
      }
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AttendingTheHearingSubmitContent.continue}")`,
    );
  }
}
