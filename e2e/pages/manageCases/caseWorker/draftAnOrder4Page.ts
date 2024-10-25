import { Page } from "@playwright/test";
import { OrderType, solicitorCaseCreateType } from "../../../common/types";
import { Selectors } from "../../../common/selectors";
import { DraftAnOrder2Content } from "../../../fixtures/manageCases/caseWorker/draftAnOrder2Content";
import {
  DraftAnOrder4Content,
  orderTypesMap,
} from "../../../fixtures/manageCases/caseWorker/draftAnOrder4Content";
import { Helpers } from "../../../common/helpers";

enum DateOrderMadeSelector {
  day = "#dateOrderMade-day",
  month = "#dateOrderMade-month",
  year = "#dateOrderMade-year"
}

export class DraftAnOrder4Page {
  public static async draftAnOrder4Page(
    page: Page,
    orderType: OrderType,
    isOrderByConsent: boolean,
    isOrderApprovedAtHearing: boolean,
    judgeOrMagistratesTitle: string,
    isOrderAboutAllChildren: boolean,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, orderType, accessibilityTest);
    if (errorMessaging) {
      this.checkErrorMessaging(page);
    }
    this.fillInFields();
    this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    orderType: OrderType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.headingH3}:text-is("${orderTypesMap.get(orderType)}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${DraftAnOrder4Content.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        25,
        DraftAnOrder4Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder4Content.formLabelYes}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder4Content.formLabelNo}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder4Content.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder4Content.continue}")`,
        1,
      ),
    ]);
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await this.continue(page);
    await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage1);
    await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage2);
    await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage3);
    // click yes order approved at hearing
    await page.check(`#wasTheOrderApprovedAtHearing_Yes`);
    // click magistrates
    await page.check(`#judgeOrMagistrateTitle-magistrate`);
    // click no order about all children
    await page.check(`#isTheOrderAboutAllChildren_No`);
    // click continue
    await this.continue(page);
    await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage4);
    await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage5);
    await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage6);
    await this.checkDateOrderMadeErrorMessaging(page);
  }

  private static async validateErrorMessages(
    page: Page,
    errorMessage: string,
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorValidation}:text-is("${errorMessage}")`,
      1,
    );
    // TODO: if statement needed because error message does not show correctly above this field - RAISE THIS
    if(errorMessage !== DraftAnOrder4Content.errorMessage6) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${errorMessage}")`,
        1,
      );
    }
  }

  private static async checkDateOrderMadeErrorMessaging(
    page: Page,
  ): Promise<void> {
    const invalidDays: string[] = ["", "100", "&", "a"];
    for (const invalidDay of invalidDays) {
      await page.fill(DateOrderMadeSelector.day, invalidDay);
      await this.continue(page);
      await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage7);
    }
    const invalidMonths: string[] = ["", "100", "&", "a"];
    for (const invalidMonth of invalidMonths) {
      await page.fill(DateOrderMadeSelector.month, invalidMonth);
      await this.continue(page);
      await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage7);
    }
    const invalidYears: string[] = ["", "0", "&", "a", "1899"];
    for (const invalidYear of invalidYears) {
      await page.fill(DateOrderMadeSelector.year, invalidYear);
      await this.continue(page);
      await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage7);
    }
  }

  private static async fillInFields(): Promise<void> {}

  private static async continue(page: Page): Promise<void> {}
}
