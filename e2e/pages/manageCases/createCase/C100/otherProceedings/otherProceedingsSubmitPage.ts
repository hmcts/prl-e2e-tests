import { otherProceedingsRadios } from "../../../../../common/types";
import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../common/selectors";
import { OtherProceedingsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/otherProceedings/otherProceedingsSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import Config from "../../../../../utils/config.utils";
import path from "path";

interface OtherProceedingsSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100OtherProceedings: otherProceedingsRadios;
  c100OngoingProceedingsAndDocX?: boolean;
}

interface CheckPageContentOptions {
  page: Page;
  accessibilityTest: boolean;
  c100OtherProceedings: otherProceedingsRadios;
  c100OngoingProceedingsAndDocX?: boolean;
}

interface CheckStaticContentOptions {
  page: Page;
  c100OtherProceedings: otherProceedingsRadios;
}

interface CheckFilledContentOptions {
  page: Page;
  c100OtherProceedings: otherProceedingsRadios;
  c100OngoingProceedingsAndDocX?: boolean;
}

interface CheckOtherProceedingsOptions {
  page: Page;
  c100OngoingProceedingsAndDocX: boolean;
}

export class OtherProceedingsSubmitPage {
  public static async otherProceedingsSubmitPage({
    page,
    accessibilityTest,
    c100OtherProceedings,
    c100OngoingProceedingsAndDocX,
  }: OtherProceedingsSubmitPageOptions): Promise<void> {
    await this.checkPageContent({
      page,
      accessibilityTest,
      c100OtherProceedings,
      c100OngoingProceedingsAndDocX,
    });
    await this.fillInFields(page);
  }

  private static async checkPageContent({
    page,
    accessibilityTest,
    c100OtherProceedings,
    c100OngoingProceedingsAndDocX,
  }: CheckPageContentOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${OtherProceedingsSubmitContent.pageHeading}")`,
    );
    await Promise.all([
      this.checkStaticContent({
        page,
        c100OtherProceedings,
      }),
      this.checkFilledContent({
        page,
        c100OtherProceedings,
        c100OngoingProceedingsAndDocX,
      }),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkStaticContent({
    page,
    c100OtherProceedings,
  }: CheckStaticContentOptions): Promise<void> {
    let changeCount: number;
    let labelCount: number;
    switch (c100OtherProceedings) {
      case "Yes":
        changeCount = 2;
        labelCount = 15;
        break;
      case "No":
        changeCount = 1;
        labelCount = 1;
        break;
      case "Don't know":
        changeCount = 1;
        labelCount = 1;
        break;
      default:
        throw new Error(
          `Unrecognised proceedings radio: ${c100OtherProceedings}`,
        );
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherProceedingsSubmitContent.checkInfo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherProceedingsSubmitContent.change}")`,
        changeCount,
      ),
      Helpers.checkGroup(
        page,
        labelCount,
        OtherProceedingsSubmitContent,
        "labelText16",
        `${Selectors.GovukText16}`,
      ),
    ]);
  }

  private static async checkFilledContent({
    page,
    c100OtherProceedings,
    c100OngoingProceedingsAndDocX,
  }: CheckFilledContentOptions): Promise<void> {
    switch (c100OtherProceedings) {
      case "No":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherProceedingsSubmitContent.no}")`,
          1,
        );
        break;
      case "Don't know":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherProceedingsSubmitContent.dontKnow}")`,
          1,
        );
        break;
      case "Yes":
        if (typeof c100OngoingProceedingsAndDocX !== "boolean") {
          throw new Error(
            "c100OtherProceedings must be boolean if c100OtherProceedings is Yes",
          );
        }
        await this.checkOtherProceedings({
          page,
          c100OngoingProceedingsAndDocX,
        });
    }
  }

  private static async checkOtherProceedings({
    page,
    c100OngoingProceedingsAndDocX,
  }: CheckOtherProceedingsOptions): Promise<void> {
    const ongoingProceedingsText: string = c100OngoingProceedingsAndDocX
      ? OtherProceedingsSubmitContent.ongoing
      : OtherProceedingsSubmitContent.previous;
    const filePath: string = c100OngoingProceedingsAndDocX
      ? path.basename(Config.testWordFile)
      : path.basename(Config.testPdfFile);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ongoingProceedingsText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        25,
        OtherProceedingsSubmitContent,
        "filledText16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${filePath}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${OtherProceedingsSubmitContent.childSpan}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${OtherProceedingsSubmitContent.continue}")`,
    );
  }
}
