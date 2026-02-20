import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { JudgeOrderAction, OrderType } from "../../../../common/types";
import { EditAndApproveAnOrderSubmitContent } from "../../../../fixtures/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrderSubmitContent";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../common/helpers";
import { EditAndApproveAnOrder2Page } from "./editAndApproveAnOrder2Page";
import { orderTypesMap } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";
import { EditAndApproveAnOrder21Content } from "../../../../fixtures/manageCases/caseWorker/editAndApproveAnOrder/editAndApproveAnOrder21Content";

enum UniqueSelectors {
  welshPdfAnchor = "body > exui-root > exui-case-home > div > exui-case-details-home > ccd-case-event-trigger > div > ccd-case-edit > ccd-case-edit-submit > div > form > div:nth-child(1) > table.form-table > tbody > tr:nth-child(3) > td.form-cell.case-field-content > ccd-field-read > div > ccd-field-read-label > div > ccd-read-document-field > .govuk-js-link",
  englishPdfAnchor = "body > exui-root > exui-case-home > div > exui-case-details-home > ccd-case-event-trigger > div > ccd-case-edit > ccd-case-edit-submit > div > form > div:nth-child(1) > table.form-table > tbody > tr:nth-child(4) > td.form-cell.case-field-content > ccd-field-read > div > ccd-field-read-label > div > ccd-read-document-field > .govuk-js-link",
}

export class EditAndApproveAnOrderSubmitPage {
  public static async editAndApproveAnOrderSubmitPage(
    page: Page,
    orderType: OrderType,
    judgeOrderAction: JudgeOrderAction,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, orderType, accessibilityTest);
    await this.checkFilledData(page, orderType, judgeOrderAction);
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    orderType: OrderType,
    accessibilityTest: boolean,
  ) {
    await page
      .locator(`${Selectors.headingH2}`, {
        hasText: `${EditAndApproveAnOrderSubmitContent.headingH2}`,
      })
      .waitFor();
    const anchorStrings:
      | {
          welshPdfAnchor: string;
          englishPdfAnchor: string;
        }
      | undefined =
      EditAndApproveAnOrder2Page.getAnchorStringsFromOrderType(orderType);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${EditAndApproveAnOrderSubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${EditAndApproveAnOrderSubmitContent.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.welshPdfAnchor}:text-is("${anchorStrings?.welshPdfAnchor}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.englishPdfAnchor}:text-is("${anchorStrings?.englishPdfAnchor}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        EditAndApproveAnOrderSubmitContent,
        `text16`,
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkFilledData(
    page: Page,
    orderType: OrderType,
    judgeOrderAction: JudgeOrderAction,
  ) {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${judgeOrderAction}")`,
      1,
    );
    if (judgeOrderAction === "Give admin further directions then serve") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.headingH3}:text-is("${orderTypesMap.get(orderType)}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${EditAndApproveAnOrderSubmitContent.text16DirectionsToAdmin}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${EditAndApproveAnOrder21Content.directionsText}")`,
          1,
        ),
      ]);
    }
  }

  private static async submit(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
