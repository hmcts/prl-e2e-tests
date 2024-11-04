import { Selectors } from "../../../../../common/selectors";
import { orderTypesMap } from "../../../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";
import { Helpers } from "../../../../../common/helpers";
import { DraftAnOrder4Content } from "../../../../../fixtures/manageCases/caseWorker/draftAnOrder/draftAnOrder4Content";
import { Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../../common/types";
import { NonMolestationOrder4Content } from "../../../../../fixtures/manageCases/caseWorker/draftAnOrder/nonMolestationOrder/nonMolestationOrder4Content";

enum UniqueSelectors {
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
  c100FirstChildCheckbox = "#childOption_a46a2fde-3b7e-4406-882e-b159bc2bb0b3",
  judgeNameTextbox = "#judgeOrMagistratesLastName",
  legalAdviserNameTextbox = "#justiceLegalAdviserFullName",
  preambleTextbox = "#recitalsOrPreamble",
  directionsTextbox = "#orderDirections",
  dateOrderMadeDateLabels = "[field_id='dateOrderMade'] .form-label",
  orderByConsentLabels = "#isTheOrderByConsent .form-label",
  orderApprovedAtHearingLabels = "#wasTheOrderApprovedAtHearing .form-label",
  orderAboutChildrenLabels = "#isTheOrderAboutChildren .form-label",
}

export class NonMolestationOrder4Page {
  public static async checkPageLoads(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.headingH3}:text-is("${orderTypesMap.get("nonMolestation")?.journeyName}")`,
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
        NonMolestationOrder4Content,
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
        `${UniqueSelectors.orderAboutChildrenLabels}:text-is("${DraftAnOrder4Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.orderAboutChildrenLabels}:text-is("${DraftAnOrder4Content.formLabelNo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.dateOrderMadeDateLabels}:text-is("${NonMolestationOrder4Content.formLabelDay}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.dateOrderMadeDateLabels}:text-is("${NonMolestationOrder4Content.formLabelMonth}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.dateOrderMadeDateLabels}:text-is("${NonMolestationOrder4Content.formLabelYear}")`,
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
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${NonMolestationOrder4Content.formLabelOrderAboutAllChildren}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${NonMolestationOrder4Content.formLabelOrderAboutChildren}")`,
        1,
      );
    }
  }

  public static async checkErrorMessaging(
    page: Page,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await page.fill(UniqueSelectors.day, "");
    await this.continue(page);
    await this.validateErrorMessages(
      page,
      NonMolestationOrder4Content.errorMessageOrderByConsent,
    );
    await this.validateErrorMessages(
      page,
      NonMolestationOrder4Content.errorMessageOrderApprovedAtHearing,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorValidation}:text-is("${NonMolestationOrder4Content.errorMessageOrderDateNotValidValidationError}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukErrorMessage}:text-is("${NonMolestationOrder4Content.errorMessageOrderDateNotValidErrorMessage}")`,
      1,
    );
    if ("C100" === caseType) {
      await this.validateErrorMessages(
        page,
        NonMolestationOrder4Content.errorMessageOrderAboutAllChildren,
      );
    } else {
      await this.validateErrorMessages(
        page,
        NonMolestationOrder4Content.errorMessageOrderAboutTheChildren,
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
      NonMolestationOrder4Content.errorMessageWhichHearingWasOrderApproved,
    );
    await this.validateErrorMessages(
      page,
      NonMolestationOrder4Content.errorMessageMagistratesFullNameRequired,
    );
    await this.validateErrorMessages(
      page,
      NonMolestationOrder4Content.errorMessageWhichChildrenAreIncluded,
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
      errorMessage !==
      NonMolestationOrder4Content.errorMessageWhichChildrenAreIncluded
    ) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${errorMessage}")`,
        1,
      );
    }
  }

  public static async fillInFields(
    page: Page,
    caseType: solicitorCaseCreateType,
    yesNoToAll: boolean,
  ): Promise<void> {
    if (yesNoToAll) {
      await page.check(`${UniqueSelectors.orderByConsentYes}`);
      await page.check(`${UniqueSelectors.orderApprovedAtHearingYes}`);
      await page.selectOption(
        `${UniqueSelectors.hearingsTypeDropdown}`,
        `${NonMolestationOrder4Content.noHearingsAvailable}`,
      );
      if ("C100" === caseType) {
        await page.check(`${UniqueSelectors.orderAboutAllChildrenYes}`);
      } else {
        await page.check(`${UniqueSelectors.orderAboutChildrenYes}`);
        await page
          .getByLabel(`${NonMolestationOrder4Content.childName1}`)
          .check();
        await page
          .getByLabel(`${NonMolestationOrder4Content.childName2}`)
          .check();
      }
    } else {
      await page.check(`${UniqueSelectors.orderByConsentNo}`);
      await page.check(`${UniqueSelectors.orderApprovedAtHearingNo}`);
      if (caseType == "C100") {
        await page.check(`${UniqueSelectors.orderAboutAllChildrenNo}`);
        await page.check(`${UniqueSelectors.c100FirstChildCheckbox}`);
      } else {
        await page.check(`${UniqueSelectors.orderAboutChildrenNo}`);
      }
    }
    await page.check(`${UniqueSelectors.herHonourTitleRadio}`);
    await page.fill(
      `${UniqueSelectors.judgeNameTextbox}`,
      `${NonMolestationOrder4Content.judgeName}`,
    );
    await page.fill(
      `${UniqueSelectors.legalAdviserNameTextbox}`,
      `${NonMolestationOrder4Content.legalAdviserName}`,
    );
    await this.inputDateOrderMade(page);
    await page.fill(
      `${UniqueSelectors.preambleTextbox}`,
      `${NonMolestationOrder4Content.preamble}`,
    );
    await page.fill(
      `${UniqueSelectors.directionsTextbox}`,
      `${NonMolestationOrder4Content.directions}`,
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
