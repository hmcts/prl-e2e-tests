import { Page } from "@playwright/test";
import {
  JudgeOrMagistratesTitle,
  OrderType,
  solicitorCaseCreateType,
} from "../../../common/types";
import { Selectors } from "../../../common/selectors";
import {
  DraftAnOrder4Content,
  orderTypesMap,
} from "../../../fixtures/manageCases/caseWorker/draftAnOrder4Content";
import { Helpers } from "../../../common/helpers";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";

enum UniqueSelectors {
  orderByConsentYes = "isTheOrderByConsent_Yes",
  orderByConsentNo = "isTheOrderByConsent_No",
  orderApprovedAtHearingYes = "#wasTheOrderApprovedAtHearing_Yes",
  orderApprovedAtHearingNo = "#wasTheOrderApprovedAtHearing_No",
  hearingsTypeDropdown = "#hearingsType",
  judeOrMagistratesTitleSelectorPrefix = "#judgeOrMagistrateTitle-",
  orderAboutAllChildrenYes = "#isTheOrderAboutAllChildren_Yes",
  orderAboutAllChildrenNo = "#isTheOrderAboutAllChildren_No",
  orderAboutChildrenYes = "#isTheOrderAboutChildren_Yes",
  orderAboutChildrenNo = "#isTheOrderAboutChildren_No",
  magistrateLastName = "#magistrateLastName_0_lastName",
  day = "#dateOrderMade-day",
  month = "#dateOrderMade-month",
  year = "#dateOrderMade-year",
  c100FirstChildCheckbox = "#childOption_a46a2fde-3b7e-4406-882e-b159bc2bb0b3",
  fl401FirstChildCheckbox = "#childOption_b16b8b27-849a-4220-b1c2-1d9b0fd311c7",
}

export class DraftAnOrder4Page {
  public static async draftAnOrder4Page(
    page: Page,
    caseType: solicitorCaseCreateType,
    orderType: OrderType,
    isOrderByConsent: boolean,
    isOrderApprovedAtHearing: boolean,
    judgeOrMagistratesTitle: JudgeOrMagistratesTitle,
    isOrderAboutAllChildren: boolean,
    isOrderAboutChildren: boolean,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType, orderType, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page, caseType);
    }
    await this.fillInFields(
      page,
      caseType,
      isOrderByConsent,
      isOrderApprovedAtHearing,
      judgeOrMagistratesTitle,
      isOrderAboutAllChildren,
      isOrderAboutChildren,
    );
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
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
        24,
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
    if ("C100" === caseType) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${DraftAnOrder4Content.formLabelOrderAboutAllChildren}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${DraftAnOrder4Content.formLabelOrderAboutChildren}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.continue(page);
    await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage1);
    await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage2);
    await this.validateErrorMessages(page, DraftAnOrder4Content.errorMessage3);
    await page.check(`${UniqueSelectors.orderApprovedAtHearingYes}`);
    await page.check(
      `${UniqueSelectors.judeOrMagistratesTitleSelectorPrefix}magistrate`,
    );
    if ("C100" === caseType) {
      await page.check(`${UniqueSelectors.orderAboutAllChildrenNo}`);
    } else {
      await page.check(`${UniqueSelectors.orderAboutChildrenYes}`);
    }
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
    if (errorMessage !== DraftAnOrder4Content.errorMessage6) {
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
    // check day validation
    const invalidDays: string[] = ["", "100", "&", "a"];
    for (const invalidDay of invalidDays) {
      await page.fill(UniqueSelectors.day, invalidDay);
      await this.continue(page);
      await this.validateErrorMessages(
        page,
        DraftAnOrder4Content.errorMessage7,
      );
    }
    await this.inputDateOrderMade(page);
    // check month validation
    const invalidMonths: string[] = ["", "100", "&", "a"];
    for (const invalidMonth of invalidMonths) {
      await page.fill(UniqueSelectors.month, invalidMonth);
      await this.continue(page);
      await this.validateErrorMessages(
        page,
        DraftAnOrder4Content.errorMessage7,
      );
    }
    await this.inputDateOrderMade(page);
    // check year validation
    const invalidYears: string[] = ["", "0", "&", "a", "1899", "2100"];
    for (const invalidYear of invalidYears) {
      await page.fill(UniqueSelectors.year, invalidYear);
      await this.continue(page);
      await this.validateErrorMessages(
        page,
        DraftAnOrder4Content.errorMessage7,
      );
    }
    // check impossible yet valid date
    await page.fill(UniqueSelectors.day, "32");
    await page.fill(UniqueSelectors.month, "13");
    await page.fill(UniqueSelectors.year, "2099");
    await this.continue(page);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.ErrorSummaryList}:text-is("${DraftAnOrder4Content.errorMessage8}")`,
      1,
    );
  }

  private static async fillInFields(
    page: Page,
    caseType: solicitorCaseCreateType,
    isOrderByConsent: boolean,
    isOrderApprovedAtHearing: boolean,
    judgeOrMagistratesTitle: JudgeOrMagistratesTitle,
    isOrderAboutAllChildren: boolean,
    isOrderAboutChildren: boolean,
  ): Promise<void> {
    if (isOrderByConsent) {
      await page.check(`${UniqueSelectors.orderByConsentYes}`);
    } else {
      await page.check(`${UniqueSelectors.orderByConsentNo}`);
    }
    if (isOrderApprovedAtHearing) {
      await page.check(`${UniqueSelectors.orderApprovedAtHearingYes}`);
      await page.selectOption(
        `${UniqueSelectors.hearingsTypeDropdown}`,
        "No hearings available",
      );
    } else {
      await page.check(`${UniqueSelectors.orderApprovedAtHearingNo}`);
    }
    await page.check(
      `${UniqueSelectors.judeOrMagistratesTitleSelectorPrefix}${judgeOrMagistratesTitle}`,
    );
    if (judgeOrMagistratesTitle == "magistrate") {
      await page.waitForSelector(
        `${Selectors.GovukFormLabel}:text-is("${DraftAnOrder4Content.formLabelMagistratesFullName}")`,
      );
      await page.fill(`${UniqueSelectors.magistrateLastName}`, `Lastname`);
    }
    await this.inputDateOrderMade(page);
    if ("C100" === caseType) {
      if (isOrderAboutAllChildren) {
        await page.check(`${UniqueSelectors.orderAboutAllChildrenYes}`);
      } else {
        await page.check(`${UniqueSelectors.orderAboutAllChildrenNo}`);
        await page.check(`${UniqueSelectors.c100FirstChildCheckbox}`);
      }
    } else {
      if (isOrderAboutChildren) {
        await page.check(`${UniqueSelectors.orderAboutChildrenYes}`);
        await page.check(`${UniqueSelectors.fl401FirstChildCheckbox}`);
      } else {
        await page.check(`${UniqueSelectors.orderAboutChildrenNo}`);
      }
    }
  }

  private static async inputDateOrderMade(page: Page): Promise<void> {
    const todayDate: string = Helpers.todayDate();
    const splitDate: string[] = todayDate.split(" ");
    await page.fill(UniqueSelectors.day, splitDate[0]);
    await page.fill(UniqueSelectors.month, splitDate[1]);
    await page.fill(UniqueSelectors.year, splitDate[2]);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder4Content.continue}")`,
    );
  }
}
