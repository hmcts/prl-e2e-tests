import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";
import { OrderType } from "../../../common/types";
import { Selectors } from "../../../common/selectors";
import { DraftAnOrder5Content } from "../../../fixtures/manageCases/caseWorker/draftAnOrder5Content";
import { Helpers } from "../../../common/helpers";
import {
  HowLongWillTheOrderBeInForce,
  orderTypesMap,
} from "../../../journeys/manageCases/caseWorker/draftAnOrder";

enum UniqueSelectors {
  orderMentionsProperty = "#fl404CustomFields_fl404bMentionedProperty_Yes",
  orderDoesNotMentionProperty = "#fl404CustomFields_fl404bMentionedProperty_No",
  propertyAddressTextBox = "#fl404CustomFields_fl404bAddressOfProperty",
  orderMadeWithNotice = "#fl404CustomFields_fl404bIsNoticeGiven-WithNotice",
  orderMadeWithoutNotice = "#fl404CustomFields_fl404bIsNoticeGiven-WithoutNotice",
  schoolNameTextBox = "#fl404CustomFields_fl404bAddSchool",
  applicantTelephoneFurtherDetailsTextbox = "#fl404CustomFields_fl404bAddMoreDetailsTelephone",
  childTelephoneFurtherDetailsTextbox = "#fl404CustomFields_fl404bAddMoreDetailsPhoneChild",
  propertyFurtherDetailsTextbox = "#fl404CustomFields_fl404bAddMoreDetailsProperty",
  schoolFurtherDetailsTextbox = "#fl404CustomFields_fl404bAddMoreDetailsSchool",
  costsOfApplicationTextbox = "#fl404CustomFields_fl404bCostOfApplication",
  datePicker = ".mat-datepicker-input",
  doesOrderMentionPropertyLabels = "#fl404CustomFields_fl404bMentionedProperty .form-label",
  noFixedEndDateRadio = "#fl404CustomFields_orderEndDateAndTimeOptions-noEndDate",
  specificDateAndTimeRadio = "#fl404CustomFields_orderEndDateAndTimeOptions-specifiedDateAndTime",
}

enum CheckboxIds {
  checkbox1 = "#fl404CustomFields_fl404bRespondentNotToThreat-respondentNotToThreat",
  checkbox2 = "#fl404CustomFields_fl404bRespondentNotIntimidate-respondentMustNotIntimidate",
  checkbox3 = "#fl404CustomFields_fl404bRespondentNotToTelephone-respondentMustNotTelephone",
  checkbox4 = "#fl404CustomFields_fl404bRespondentNotToDamageOrThreat-respondentMustNotDamageOrThreat",
  checkbox5 = "#fl404CustomFields_fl404bRespondentNotToDamage-respondentMustNotDamage",
  checkbox6 = "#fl404CustomFields_fl404bRespondentNotToEnterProperty-respondentMustNotEnter",
  checkbox7 = "#fl404CustomFields_fl404bRespondentNotToThreatChild-respondentMustNotThreatChild",
  checkbox8 = "#fl404CustomFields_fl404bRespondentNotHarassOrIntimidate-respondentMustNotHarassChild",
  checkbox9 = "#fl404CustomFields_fl404bRespondentNotToTelephoneChild-respondentMustNotTelephoneChild",
  checkbox10 = "#fl404CustomFields_fl404bRespondentNotToEnterSchool-respondentMustNotEnterSchool",
}

export class DraftAnOrder5Page {
  public static async draftAnOrder5Page(
    page: Page,
    orderType: OrderType,
    yesNoToAll: boolean,
    howLongWillTheOrderBeInForce: HowLongWillTheOrderBeInForce,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, orderType, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page, orderType);
    }
    await this.fillInFields(
      page,
      orderType,
      yesNoToAll,
      howLongWillTheOrderBeInForce,
    );
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    orderType: OrderType,
    accessibilityTest: boolean,
  ): Promise<void> {
    switch (orderType) {
      case "nonMolestation":
        await this.checkNonMolestationOrderPage(page);
        break;
      default:
        console.error("Unknown order type");
        break;
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkNonMolestationOrderPage(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${DraftAnOrder5Content.h1}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${DraftAnOrder5Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${orderTypesMap.get("nonMolestation")?.journeyName}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        20,
        DraftAnOrder5Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.doesOrderMentionPropertyLabels}:text-is("${DraftAnOrder5Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.doesOrderMentionPropertyLabels}:text-is("${DraftAnOrder5Content.formLabelNo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder5Content.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder5Content.continue}")`,
        1,
      ),
    ]);
  }

  private static async checkErrorMessaging(
    page: Page,
    orderType: OrderType,
  ): Promise<void> {
    switch (orderType) {
      case "nonMolestation":
        await this.checkNonMolestationOrderErrorMessaging(page);
        break;
      default:
        console.error("Unknown order type");
        break;
    }
  }

  private static async checkNonMolestationOrderErrorMessaging(
    page: Page,
  ): Promise<void> {
    await this.continue(page);
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        DraftAnOrder5Content,
        `errorMessage`,
        `${Selectors.GovukErrorValidation}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        DraftAnOrder5Content,
        `errorMessage`,
        `${Selectors.GovukErrorMessage}`,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    orderType: OrderType,
    yesNoToAll: boolean,
    howLongWillTheOrderBeInForce: HowLongWillTheOrderBeInForce,
  ): Promise<void> {
    switch (orderType) {
      case "nonMolestation":
        await this.fillInNonMolestationOrder(
          page,
          yesNoToAll,
          howLongWillTheOrderBeInForce,
        );
        break;
      default:
        console.error("Unknown order type");
        break;
    }
  }

  private static async fillInNonMolestationOrder(
    page: Page,
    yesNoToAll: boolean,
    howLongWillTheOrderBeInForce: HowLongWillTheOrderBeInForce,
  ): Promise<void> {
    if (yesNoToAll) {
      await page.check(`${UniqueSelectors.orderMentionsProperty}`);
      await page.fill(
        `${UniqueSelectors.propertyAddressTextBox}`,
        `${DraftAnOrder5Content.propertyAddress}`,
      );
      // tick all respondent check boxes
      for (let checkbox of Object.values(CheckboxIds)) {
        await page.check(checkbox);
      }
      await page.fill(
        `${UniqueSelectors.applicantTelephoneFurtherDetailsTextbox}`,
        `${DraftAnOrder5Content.applicantTelephoneFurtherDetails}`,
      );
      await page.fill(
        `${UniqueSelectors.propertyFurtherDetailsTextbox}`,
        `${DraftAnOrder5Content.propertyFurtherDetails}`,
      );
      await page.fill(
        `${UniqueSelectors.childTelephoneFurtherDetailsTextbox}`,
        `${DraftAnOrder5Content.childTelephoneFurtherDetails}`,
      );
      await page.fill(
        `${UniqueSelectors.schoolNameTextBox}`,
        `${DraftAnOrder5Content.schoolName}`,
      );
      await page.fill(
        `${UniqueSelectors.schoolFurtherDetailsTextbox}`,
        `${DraftAnOrder5Content.schoolFurtherDetails}`,
      );
      await page.check(`${UniqueSelectors.orderMadeWithNotice}`);
    } else {
      await page.check(`${UniqueSelectors.orderDoesNotMentionProperty}`);
      await page.check(`${UniqueSelectors.orderMadeWithoutNotice}`);
    }
    if (howLongWillTheOrderBeInForce === "specifiedDateAndTime") {
      await page.check(`${UniqueSelectors.specificDateAndTimeRadio}`);
      const todayDate: string = Helpers.getCurrentDateFormatted();
      const day: string = todayDate.substring(0, 2);
      const month: string = todayDate.substring(2, 4);
      const year: string = todayDate.substring(4);
      const formattedDate: string = `${day}-${month}-${year} 12:00 am`;
      await page.fill(`${UniqueSelectors.datePicker}`, formattedDate);
    } else {
      await page.check(`${UniqueSelectors.noFixedEndDateRadio}`);
    }
    await page.fill(
      `${UniqueSelectors.costsOfApplicationTextbox}`,
      `${DraftAnOrder5Content.costsOfApplication}`,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder5Content.continue}")`,
    );
  }
}
