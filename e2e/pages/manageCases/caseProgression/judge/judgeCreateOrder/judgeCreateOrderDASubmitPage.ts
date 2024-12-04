import { Page } from "@playwright/test";
import { createOrderFL401Options } from "../../../../../common/types";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1DAContent";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { JudgeCreateOrderDASubmitContent } from "../../../../../fixtures/manageCases/caseProgression/judge/judgeCreateOrder/judgeCreateOrderDASubmitContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface JudgeDACaseProgressionJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  createOrderFL401Options: createOrderFL401Options;
}

export class judgeCreateODAManageOrderSubmitPage {
  public static async judgeDAManageOrderSubmitPage({
    page,
    accessibilityTest,
    createOrderFL401Options,
  }: JudgeDACaseProgressionJourneyParams): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      createOrderFL401Options,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    createOrderFL401Options,
  }: JudgeDACaseProgressionJourneyParams): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(page, 3, JudgeCreateOrderDASubmitContent, "h2", Selectors.h2),
      Helpers.checkGroup(page, 2, JudgeCreateOrderDASubmitContent, "p", Selectors.p),
      Helpers.checkGroup(
        page,
        15,
        JudgeCreateOrderDASubmitContent,
        "text16",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${JudgeCreateOrderDASubmitContent.strong}")`,
        1,
      ),
    ]);
    switch (createOrderFL401Options) {
      case "power of arrest":
        await Promise.all([
          Helpers.checkGroup(
            page,
            5,
            JudgeCreateOrderDASubmitContent,
            "text16A",
            Selectors.GovukText16,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:text-is("${JudgeCreateOrderDASubmitContent.spanPowerOfArrest}")`,
            4,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${JudgeCreateOrderDASubmitContent.powerOfArrestA}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${CommonStaticText.no}")`,
            4,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:text-is("${JudgeCreateOrderDASubmitContent.text16LoremIpsum}")`,
            3,
          ),
        ]);
        break;
      case "occupation order":
        await Promise.all([
          Helpers.checkGroup(
            page,
            11,
            JudgeCreateOrderDASubmitContent,
            "text16B",
            Selectors.GovukText16,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:text-is("${JudgeCreateOrderDASubmitContent.spanOccupationOrder}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${JudgeCreateOrderDASubmitContent.occupationOrderA}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${CommonStaticText.no}")`,
            4,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:text-is("${JudgeCreateOrderDASubmitContent.text16LoremIpsum}")`,
            2,
          ),
        ]);
        break;
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<JudgeDACaseProgressionJourneyParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
