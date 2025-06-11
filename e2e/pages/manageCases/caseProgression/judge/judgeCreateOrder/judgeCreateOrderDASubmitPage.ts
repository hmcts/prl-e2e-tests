import { Page } from "@playwright/test";
import { createOrderFL401Options } from "../../../../../common/types.ts";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1DAContent.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { JudgeCreateOrderDASubmitContent } from "../../../../../fixtures/manageCases/caseProgression/judge/judgeCreateOrder/judgeCreateOrderDASubmitContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

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
    await this.fillInFields({ page,
      createOrderFL401Options,
    });
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
      Helpers.checkGroup(
        page,
        3,
        JudgeCreateOrderDASubmitContent,
        "h2",
        Selectors.h2,
      ),
      Helpers.checkGroup(
        page,
        2,
        JudgeCreateOrderDASubmitContent,
        "p",
        Selectors.p,
      ),
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
            4,
            JudgeCreateOrderDASubmitContent,
            "text16A",
            Selectors.GovukText16,
          ),
          // checks for 2 elements as the same element is nested twice but only shows as one on the page
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:has-text("${JudgeCreateOrderDASubmitContent.spanDateAndTime}"):visible`,
            2,
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
      case "amend discharge varied order":
        await Promise.all([
            Helpers.checkGroup(
              page,
              8,
              JudgeCreateOrderDASubmitContent,
              "text16C",
              Selectors.GovukText16,
            ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:text-is("${JudgeCreateOrderDASubmitContent.spanAmendDischargedVaried}")`,
            4,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.a}:text-is("${JudgeCreateOrderDASubmitContent.amendDischargedVariedOrderA}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${CommonStaticText.no}")`,
            3,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:text-is("${JudgeCreateOrderDASubmitContent.text16LoremIpsum}")`,
            3,
          ),
        ]);
        break;
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    createOrderFL401Options,
  }: Partial<JudgeDACaseProgressionJourneyParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );

    switch (createOrderFL401Options) {
      case "amend discharge varied order":
        await page.locator(Selectors.alertMessage, {
        hasText: JudgeCreateOrderDASubmitContent.confirmationMessage,
      }).waitFor();
      break;
    }
  }
}
