import { Selectors } from "../../../../../../common/selectors.ts";
import { DraftAnOrder5Content } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/draftAnOrder/draftAnOrder5Content.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import {
  HowLongWillTheOrderBeInForce,
  orderTypesMap,
} from "../../../../../../journeys/manageCases/caseProgression/manageOrders/draftAnOrder/draftAnOrder.ts";
import { Page } from "@playwright/test";
import { NonMolestationOrder5Content } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/draftAnOrder/nonMolestationOrder/nonMolestationOrder5Content.ts";

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

export class NonMolestationOrder5Page {
  public static async checkPageLoads(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${NonMolestationOrder5Content.h1}")`,
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
        NonMolestationOrder5Content,
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

  public static async checkErrorMessaging(page: Page): Promise<void> {
    await this.continue(page);
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        NonMolestationOrder5Content,
        `errorMessage`,
        `${Selectors.GovukErrorValidation}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        NonMolestationOrder5Content,
        `errorMessage`,
        `${Selectors.GovukErrorMessage}`,
      ),
    ]);
  }

  public static async fillInFields(
    page: Page,
    yesNoToAll: boolean,
    howLongWillTheOrderBeInForce: HowLongWillTheOrderBeInForce,
  ): Promise<void> {
    if (yesNoToAll) {
      await page.check(`${UniqueSelectors.orderMentionsProperty}`);
      await page.fill(
        `${UniqueSelectors.propertyAddressTextBox}`,
        `${NonMolestationOrder5Content.propertyAddress}`,
      );
      for (const checkbox of Object.values(CheckboxIds)) {
        await page.check(checkbox);
      }
      await page.fill(
        `${UniqueSelectors.applicantTelephoneFurtherDetailsTextbox}`,
        `${NonMolestationOrder5Content.applicantTelephoneFurtherDetails}`,
      );
      await page.fill(
        `${UniqueSelectors.propertyFurtherDetailsTextbox}`,
        `${NonMolestationOrder5Content.propertyFurtherDetails}`,
      );
      await page.fill(
        `${UniqueSelectors.childTelephoneFurtherDetailsTextbox}`,
        `${NonMolestationOrder5Content.childTelephoneFurtherDetails}`,
      );
      await page.fill(
        `${UniqueSelectors.schoolNameTextBox}`,
        `${NonMolestationOrder5Content.schoolName}`,
      );
      await page.fill(
        `${UniqueSelectors.schoolFurtherDetailsTextbox}`,
        `${NonMolestationOrder5Content.schoolFurtherDetails}`,
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
      `${NonMolestationOrder5Content.costsOfApplication}`,
    );
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder5Content.continue}")`,
    );
  }
}
