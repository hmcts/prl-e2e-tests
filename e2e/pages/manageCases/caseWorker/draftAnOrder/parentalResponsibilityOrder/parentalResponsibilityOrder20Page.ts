import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ParentalResponsibilityOrder20Content } from "../../../../../fixtures/manageCases/caseWorker/draftAnOrder/parentalResponsibilityOrder/parentalResponsibilityOrder20Content";
import { DraftAnOrderPdfHelper } from "../draftAnOrderPdfHelper";

export class ParentalResponsibilityOrder20Page {
  public static async checkPdfLinks(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ParentalResponsibilityOrder20Content.welshPdfLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ParentalResponsibilityOrder20Content.pdfLink}")`,
        1,
      ),
    ]);
  }

  public static async checkPdfContent(
    page: Page,
    yesNoToAll: boolean,
  ): Promise<void> {
    await this.checkWelshPdfContent(page, yesNoToAll);
    await this.checkEnglishPdfContent(page, yesNoToAll);
  }

  private static async checkWelshPdfContent(
    page: Page,
    yesNoToAll: boolean,
  ): Promise<void> {
    const pdfPage: Page = await DraftAnOrderPdfHelper.openMediaViewer(
      page,
      "Welsh",
    );
    await Promise.all([
      await Helpers.checkGroup(
        pdfPage,
        24,
        ParentalResponsibilityOrder20Content,
        "welshSpan",
        `${Selectors.Span}`,
      ),
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("${this.formatDate()}'")`,
        1,
      ),
    ]);
    if (yesNoToAll) {
      await Helpers.checkGroup(
        pdfPage,
        19,
        ParentalResponsibilityOrder20Content,
        "welshYesToAllSpan",
        `${Selectors.Span}`,
      );
    } else {
      await Helpers.checkGroup(
        pdfPage,
        10,
        ParentalResponsibilityOrder20Content,
        "welshNoToAllSpan",
        `${Selectors.Span}`,
      );
    }
  }

  private static async checkEnglishPdfContent(
    page: Page,
    yesNoToAll: boolean,
  ): Promise<void> {
    const pdfPage: Page = await DraftAnOrderPdfHelper.openMediaViewer(
      page,
      "English",
    );
    await Promise.all([
      await Helpers.checkGroup(
        pdfPage,
        19,
        ParentalResponsibilityOrder20Content,
        "span",
        `${Selectors.Span}`,
      ),
      await Helpers.checkVisibleAndPresent(
        pdfPage,
        `${Selectors.Span}:text-is("Ordered on ${this.formatDate()} by Her Honour Judge Test judge name sitting with Justices'")`,
        1,
      ),
    ]);
    if (yesNoToAll) {
      await Helpers.checkGroup(
        pdfPage,
        19,
        ParentalResponsibilityOrder20Content,
        "yesToAllSpan",
        `${Selectors.Span}`,
      );
    } else {
      await Helpers.checkGroup(
        pdfPage,
        10,
        ParentalResponsibilityOrder20Content,
        "noToAllSpan",
        `${Selectors.Span}`,
      );
    }
  }

  private static formatDate(): string {
    const todayDate: string = Helpers.getCurrentDateFormatted();
    const day: string = todayDate.substring(0, 2);
    const month: string = todayDate.substring(2, 4);
    const year: string = todayDate.substring(4);
    return Helpers.dayLongMonthYear(day, month, year);
  }
}
