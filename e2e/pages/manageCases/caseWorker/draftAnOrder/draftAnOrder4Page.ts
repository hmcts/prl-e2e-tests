import { Page } from "@playwright/test";
import {
  OrderType,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { DraftAnOrder4Content } from "../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrder4Content.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { orderTypesMap } from "../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder.ts";
import { Helpers } from "../../../../common/helpers.ts";

enum UniqueSelectors {
  dateOrderMadeDateLabels = "[field_id='dateOrderMade'] .form-label",
  orderByConsentLabels = "#isTheOrderByConsent .form-label",
  orderApprovedAtHearingLabels = "#wasTheOrderApprovedAtHearing .form-label",
  orderAboutTheChildrenLabels = "#isTheOrderAboutChildren .form-label",
  orderAboutAllTheChildrenLabels = "#isTheOrderAboutAllChildren .form-label",
  herHonourTitleRadio = "#judgeOrMagistrateTitle-herHonourJudge",
  magistrateTitleRadio = "#judgeOrMagistrateTitle-magistrate",
  orderByConsentYes = "#isTheOrderByConsent_Yes",
  orderByConsentNo = "#isTheOrderByConsent_No",
  orderApprovedAtHearingYes = "#wasTheOrderApprovedAtHearing_Yes",
  orderApprovedAtHearingNo = "#wasTheOrderApprovedAtHearing_No",
  hearingsTypeDropdown = "#hearingsType",
  orderAboutAllChildrenYes = "#isTheOrderAboutAllChildren_Yes",
  orderAboutAllChildrenNo = "#isTheOrderAboutAllChildren_No",
  orderAboutChildrenYes = "#isTheOrderAboutChildren_Yes",
  orderAboutChildrenNo = "#isTheOrderAboutChildren_No",
  day = "#dateOrderMade-day",
  month = "#dateOrderMade-month",
  year = "#dateOrderMade-year",
  c100FirstChildCheckbox = "#childOption .multiple-choice:nth-of-type(1) input",
  c100SecondChildCheckbox = "#childOption .multiple-choice:nth-of-type(2) input",
  judgeNameTextbox = "#judgeOrMagistratesLastName",
  legalAdviserNameTextbox = "#justiceLegalAdviserFullName",
  preambleTextbox = "#recitalsOrPreamble",
  directionsTextbox = "#orderDirections",
}

export class DraftAnOrder4Page {
  public static async draftAnOrder4Page(
    page: Page,
    caseType: solicitorCaseCreateType,
    orderType: OrderType,
    yesNoToAll: boolean,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, caseType, orderType, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page, caseType);
    }
    await this.fillInFields(page, caseType, yesNoToAll);
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
        21,
        DraftAnOrder4Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.orderByConsentLabels}:text-is("${DraftAnOrder4Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.orderByConsentLabels}:text-is("${DraftAnOrder4Content.formLabelNo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.orderApprovedAtHearingLabels}:text-is("${DraftAnOrder4Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.orderApprovedAtHearingLabels}:text-is("${DraftAnOrder4Content.formLabelNo}")`,
        1,
      ),

      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.dateOrderMadeDateLabels}:text-is("${DraftAnOrder4Content.formLabelDay}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.dateOrderMadeDateLabels}:text-is("${DraftAnOrder4Content.formLabelMonth}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.dateOrderMadeDateLabels}:text-is("${DraftAnOrder4Content.formLabelYear}")`,
        1,
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
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${DraftAnOrder4Content.formLabelOrderAboutAllChildren}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.orderAboutAllTheChildrenLabels}:text-is("${DraftAnOrder4Content.formLabelYes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.orderAboutAllTheChildrenLabels}:text-is("${DraftAnOrder4Content.formLabelNo}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${DraftAnOrder4Content.formLabelOrderAboutChildren}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.orderAboutTheChildrenLabels}:text-is("${DraftAnOrder4Content.formLabelYes}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${UniqueSelectors.orderAboutTheChildrenLabels}:text-is("${DraftAnOrder4Content.formLabelNo}")`,
          1,
        ),
      ]);
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkErrorMessaging(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await page.fill(UniqueSelectors.day, "");
    await this.continue(page);
    await this.validateErrorMessages(
      page,
      DraftAnOrder4Content.errorMessageOrderByConsent,
    );
    await this.validateErrorMessages(
      page,
      DraftAnOrder4Content.errorMessageOrderApprovedAtHearing,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorValidation}:text-is("${DraftAnOrder4Content.errorMessageOrderDateNotValidValidationError}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorMessage}:text-is("${DraftAnOrder4Content.errorMessageOrderDateNotValidErrorMessage}")`,
      1,
    );
    if ("C100" === caseType) {
      await this.validateErrorMessages(
        page,
        DraftAnOrder4Content.errorMessageOrderAboutAllChildren,
      );
    } else {
      await this.validateErrorMessages(
        page,
        DraftAnOrder4Content.errorMessageOrderAboutTheChildren,
      );
    }
    await page.check(`${UniqueSelectors.orderApprovedAtHearingYes}`);
    await page.check(`${UniqueSelectors.magistrateTitleRadio}`);
    if ("C100" === caseType) {
      await page.check(`${UniqueSelectors.orderAboutAllChildrenNo}`);
    } else {
      await page.check(`${UniqueSelectors.orderAboutChildrenYes}`);
    }
    await page.waitForSelector(
      `${Selectors.GovukFormLabel}:text-is("Which children are included in the order?")`,
    );
    await this.continue(page);
    await this.validateErrorMessages(
      page,
      DraftAnOrder4Content.errorMessageWhichHearingWasOrderApproved,
    );
    await this.validateErrorMessages(
      page,
      DraftAnOrder4Content.errorMessageMagistratesFullNameRequired,
    );
    await this.validateErrorMessages(
      page,
      DraftAnOrder4Content.errorMessageWhichChildrenAreIncluded,
    );
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
    // if statement needed because error message does not show correctly above this field - RAISE THIS
    if (
      errorMessage !== DraftAnOrder4Content.errorMessageWhichChildrenAreIncluded
    ) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${errorMessage}")`,
        1,
      );
    }
  }

  private static async fillInFields(
    page: Page,
    caseType: solicitorCaseCreateType,
    yesNoToAll: boolean,
  ): Promise<void> {
    if (yesNoToAll) {
      await page.check(`${UniqueSelectors.orderByConsentYes}`);
      await page.check(`${UniqueSelectors.orderApprovedAtHearingYes}`);
      await page.selectOption(
        `${UniqueSelectors.hearingsTypeDropdown}`,
        `${DraftAnOrder4Content.noHearingsAvailable}`,
      );
      if ("C100" === caseType) {
        await page.check(`${UniqueSelectors.orderAboutAllChildrenYes}`);
      } else {
        await page.check(`${UniqueSelectors.orderAboutChildrenYes}`);
        await page.getByLabel(`${DraftAnOrder4Content.childName1}`).check();
        await page.getByLabel(`${DraftAnOrder4Content.childName2}`).check();
      }
    } else {
      await page.check(`${UniqueSelectors.orderByConsentNo}`);
      await page.check(`${UniqueSelectors.orderApprovedAtHearingNo}`);
      if (caseType == "C100") {
        await page.check(`${UniqueSelectors.orderAboutAllChildrenNo}`);
        await page.check(`${UniqueSelectors.c100FirstChildCheckbox}`);
        await page.check(`${UniqueSelectors.c100SecondChildCheckbox}`);
      } else {
        await page.check(`${UniqueSelectors.orderAboutChildrenNo}`);
      }
    }
    await page.check(`${UniqueSelectors.herHonourTitleRadio}`);
    await page.fill(
      `${UniqueSelectors.judgeNameTextbox}`,
      `${DraftAnOrder4Content.judgeName}`,
    );
    await page.fill(
      `${UniqueSelectors.legalAdviserNameTextbox}`,
      `${DraftAnOrder4Content.legalAdviserName}`,
    );
    await this.inputDateOrderMade(page);
    await page.fill(
      `${UniqueSelectors.preambleTextbox}`,
      `${DraftAnOrder4Content.preamble}`,
    );
    await page.fill(
      `${UniqueSelectors.directionsTextbox}`,
      `${DraftAnOrder4Content.directions}`,
    );
  }

  private static async inputDateOrderMade(page: Page): Promise<void> {
    const todayDate: string = Helpers.getCurrentDateFormatted();
    const day: string = todayDate.substring(0, 2);
    const month: string = todayDate.substring(2, 4);
    const year: string = todayDate.substring(4);
    await page.fill(UniqueSelectors.day, day);
    await page.fill(UniqueSelectors.month, month);
    await page.fill(UniqueSelectors.year, year);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder4Content.continue}")`,
    );
  }
}
