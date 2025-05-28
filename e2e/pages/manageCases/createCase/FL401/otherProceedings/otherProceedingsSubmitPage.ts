import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/otherProceedings/submitContent";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { OtherProceedingsContent } from "../../../../../fixtures/manageCases/createCase/FL401/otherProceedings/otherProceedingsContent";
import Path from "path";
import { otherProceedingsRadios } from "../../../../../common/types";

export class OtherProceedingsSubmitPage {
  public static async otherProceedingsSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    otherProceedingsRadios: otherProceedingsRadios,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      otherProceedingsRadios,
    );
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    otherProceedingsRadios: otherProceedingsRadios,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page),
      this.checkFilledInData(page, otherProceedingsRadios),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${SubmitContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${SubmitContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.checkInfoLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.change}")`,
        1,
      ),
    ]);
  }

  private static async checkFilledInData(
    page: Page,
    otherProceedingsRadios: otherProceedingsRadios,
  ): Promise<void> {
    switch (otherProceedingsRadios) {
      case "Yes":
        await Promise.all([
          Helpers.checkGroup(
            page,
            7,
            SubmitContent,
            "text16",
            `${Selectors.GovukText16}`,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${SubmitContent.yes}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${OtherProceedingsContent.exampleNameOfCourt}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${OtherProceedingsContent.exampleCaseNumber}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${OtherProceedingsContent.exampleTypeOfCase}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:text-is("${OtherProceedingsContent.exampleOtherDetails}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${Path.basename("../../../../../assets/mockFile.pdf")}")`,
            1,
          ),
        ]);
        break;
      case "No":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${SubmitContent.text161}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${SubmitContent.no}")`,
            1,
          ),
        ]);
        break;
      case "Don't know":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${SubmitContent.text161}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${SubmitContent.dontKnow}")`,
            1,
          ),
        ]);
        break;
      default:
        console.log(
          "Unexpected input for otherProceedingsRadios: ",
          otherProceedingsRadios,
        );
        break;
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
    );
  }
}
