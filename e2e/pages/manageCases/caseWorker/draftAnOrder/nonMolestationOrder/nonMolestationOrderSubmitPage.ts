import { Selectors } from "../../../../../common/selectors.ts";
import { Page } from "@playwright/test";
import { NonMolestationOrderSubmitContent } from "../../../../../fixtures/manageCases/caseWorker/draftAnOrder/nonMolestationOrder/nonMolestationOrderSubmitContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import {
  HowLongWillTheOrderBeInForce,
  orderTypesMap,
} from "../../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder.ts";
import { DraftAnOrderSubmitContent } from "../../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrderSubmitContent.ts";

enum UniqueSelectors {
  yesNoSelector1 = "body > exui-root > exui-case-home > div > exui-case-details-home > ccd-case-event-trigger > div > ccd-case-edit > ccd-case-edit-submit > div > form > div.ng-star-inserted > table.form-table.ng-star-inserted > tbody > tr:nth-child(4) > td.form-cell.case-field-content > ccd-field-read > div > ccd-field-read-label > div > ccd-read-yes-no-field > span",
  yesNoSelector2 = "body > exui-root > exui-case-home > div > exui-case-details-home > ccd-case-event-trigger > div > ccd-case-edit > ccd-case-edit-submit > div > form > div.ng-star-inserted > table.form-table.ng-star-inserted > tbody > tr:nth-child(5) > td.form-cell.case-field-content > ccd-field-read > div > ccd-field-read-label > div > ccd-read-yes-no-field > span",
  yesNoSelector3 = "body > exui-root > exui-case-home > div > exui-case-details-home > ccd-case-event-trigger > div > ccd-case-edit > ccd-case-edit-submit > div > form > div.ng-star-inserted > table.form-table.ng-star-inserted > tbody > tr:nth-child(13) > td.form-cell.case-field-content > ccd-field-read > div > ccd-field-read-label > div > ccd-read-yes-no-field > span",
  yesNoSelector4 = "body > exui-root > exui-case-home > div > exui-case-details-home > ccd-case-event-trigger > div > ccd-case-edit > ccd-case-edit-submit > div > form > div.ng-star-inserted > table.form-table.ng-star-inserted > tbody > tr:nth-child(17) > td.form-cell.case-field-content > ccd-field-read > div > ccd-field-read-label > div > ccd-read-complex-field > ccd-read-complex-field-table > div > table > tbody > tr:nth-child(1) > td > span > ccd-field-read > div > ccd-field-read-label > div > ccd-read-yes-no-field > span",
  yesNoSelector5 = "body > exui-root > exui-case-home > div > exui-case-details-home > ccd-case-event-trigger > div > ccd-case-edit > ccd-case-edit-submit > div > form > div.ng-star-inserted > table.form-table.ng-star-inserted > tbody > tr:nth-child(18) > td.form-cell.case-field-content > ccd-field-read > div > ccd-field-read-label > div > ccd-read-collection-field > table > tbody > tr > td > ccd-field-read > div > ccd-field-read-label > div > ccd-read-complex-field > ccd-read-complex-field-table > div > table > tbody > tr:nth-child(8) > td > span > ccd-field-read > div > ccd-field-read-label > div > ccd-read-yes-no-field > span",
}

export class NonMolestationOrderSubmitPage {
  public static async checkPageContent(
    page: Page,
    yesToAll: boolean,
    howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce,
    willAllPartiesBeAttendingHearing: boolean,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page),
      this.checkFilledData(
        page,
        yesToAll,
        howLongWillOrderBeInForce,
        willAllPartiesBeAttendingHearing,
      ),
    ]);
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${NonMolestationOrderSubmitContent.checkYourAnswers}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h1}:text-is("${DraftAnOrderSubmitContent.h1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        20,
        NonMolestationOrderSubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        NonMolestationOrderSubmitContent,
        "span",
        `${Selectors.Span}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${NonMolestationOrderSubmitContent.strong1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${this.getFormattedDate()}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        NonMolestationOrderSubmitContent,
        "p",
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${orderTypesMap.get("nonMolestation")}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${NonMolestationOrderSubmitContent.previewTheOrder}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        NonMolestationOrderSubmitContent,
        "pdfLink",
        `${Selectors.a}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrderSubmitContent.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrderSubmitContent.submit}")`,
        1,
      ),
    ]);
  }

  private static async checkFilledData(
    page: Page,
    yesToAll: boolean,
    howLongWillOrderBeInForce: HowLongWillTheOrderBeInForce,
    willAllPartiesBeAttendingHearing: boolean,
  ): Promise<void> {
    if (yesToAll) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          33,
          NonMolestationOrderSubmitContent,
          "yesToAllAdditionalText16",
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkGroup(
          page,
          7,
          NonMolestationOrderSubmitContent,
          "yesToAllAdditionalSpan",
          `${Selectors.Span}`,
        ),
        Helpers.checkGroup(
          page,
          3,
          NonMolestationOrderSubmitContent,
          "yesToAllAdditionalP",
          `${Selectors.p}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${NonMolestationOrderSubmitContent.yesToAllRepeatedTest161}")`,
          4,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${NonMolestationOrderSubmitContent.yesToAllRepeatedTest162}")`,
          4,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.strong}:text-is("${NonMolestationOrderSubmitContent.yesToAllStrong}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.yesNoSelector1}:text-is("${DraftAnOrderSubmitContent.yes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.yesNoSelector2}:text-is("${DraftAnOrderSubmitContent.yes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.yesNoSelector3}:text-is("${DraftAnOrderSubmitContent.yes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.yesNoSelector4}:text-is("${DraftAnOrderSubmitContent.yes}")`,
          1,
        ),
      ]);
      if (howLongWillOrderBeInForce === "specifiedDateAndTime") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${this.getFormattedDate()}, 12:00:00 AM")`,
          2,
        );
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${this.getFormattedDate()}, 12:00:00 AM")`,
          1,
        );
      }
      if (willAllPartiesBeAttendingHearing) {
        await Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.yesNoSelector5}:text-is("${DraftAnOrderSubmitContent.yes}")`,
          1,
        );
      } else {
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${UniqueSelectors.yesNoSelector5}:text-is("${DraftAnOrderSubmitContent.no}")`,
            1,
          ),
          Helpers.checkGroup(
            page,
            2,
            NonMolestationOrderSubmitContent,
            "allPartiesWillNotBeAttendingInTheSameWayText16",
            `${Selectors.GovukText16}`,
          ),
        ]);
      }
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${DraftAnOrderSubmitContent.no}")`,
          4,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${NonMolestationOrderSubmitContent.withoutNotice}")`,
          1,
        ),
      ]);
    }
    switch (howLongWillOrderBeInForce) {
      case "noEndDate":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${NonMolestationOrderSubmitContent.noFixedEndDate}")`,
          1,
        );
        break;
      case "specifiedDateAndTime":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${NonMolestationOrderSubmitContent.specificDateAndTime}")`,
          1,
        );
        if (yesToAll) {
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${this.getFormattedDate()}, 12:00:00 AM")`,
            2,
          );
        } else {
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${this.getFormattedDate()}, 12:00:00 AM")`,
            1,
          );
        }
        break;
      default:
        console.error(
          "No such option exists for how lon an order will be in force,",
        );
        break;
    }
  }

  private static getFormattedDate(): string {
    const todayDate: string = Helpers.getCurrentDateFormatted();
    const day: string = todayDate.substring(0, 2);
    const month: string = todayDate.substring(2, 4);
    const year: string = todayDate.substring(4);
    const abbreviatedDate: string = Helpers.dayAbbreviatedMonthYear(
      day,
      month,
      year,
    );
    if (abbreviatedDate.startsWith("0")) {
      return abbreviatedDate.slice(1);
    }
    return abbreviatedDate;
  }
}
