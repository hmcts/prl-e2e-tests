import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1DAContent";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { ManageOrders12DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders12DAContent";

interface ManageOrders5PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  howLongWillOrderBeInForce: howLongWillOrderBeInForce;
}

export type howLongWillOrderBeInForce =
  | "noEndDate"
  | "untilNextHearing"
  | "specificDate";

enum UniqueSelectors {
  fl404CustomFields_fl404bMentionedProperty_Yes = "#fl404CustomFields_fl404bMentionedProperty_Yes",
  fl404CustomFields_fl404bMentionedProperty_No = "#fl404CustomFields_fl404bMentionedProperty_No",
  fl404CustomFields_fl404bAddressOfProperty = "#fl404CustomFields_fl404bAddressOfProperty",
  noEndDate = "#fl404CustomFields_orderEndDateAndTimeOptions-noEndDate",
  untilNextHearing = "#fl404CustomFields_orderEndDateAndTimeOptions-untilNextHearing",
  specificDate = "#fl404CustomFields_orderEndDateAndTimeOptions-specifiedDateAndTime",
  withNotice = "#fl404CustomFields_fl404bIsNoticeGiven-WithNotice",
  withoutNotice = "#fl404CustomFields_fl404bIsNoticeGiven-WithoutNotice",
  costOfApplicationInput = "#fl404CustomFields_fl404bCostOfApplication",
  inputSpecificDate = "#orderSpecifiedDateTime .mat-datepicker-input",
}

enum UniqueSelectorsHiddenTextBoxes {
  fl404CustomFields_fl404bAddMoreDetailsTelephone = "#fl404CustomFields_fl404bAddMoreDetailsTelephone",
  fl404CustomFields_fl404bAddMoreDetailsProperty = "#fl404CustomFields_fl404bAddMoreDetailsProperty",
  fl404CustomFields_fl404bAddMoreDetailsPhoneChild = "#fl404CustomFields_fl404bAddMoreDetailsPhoneChild",
  fl404CustomFields_fl404bAddSchool = "#fl404CustomFields_fl404bAddSchool",
  fl404CustomFields_fl404bAddMoreDetailsSchool = "#fl404CustomFields_fl404bAddMoreDetailsSchool",
}

enum UniqueSelectorsRespondentMustNotDo {
  respondentNotToThreat = "#fl404CustomFields_fl404bRespondentNotToThreat-respondentNotToThreat",
  respondentMustNotIntimidate = "#fl404CustomFields_fl404bRespondentNotIntimidate-respondentMustNotIntimidate",
  respondentMustNotTelephone = "#fl404CustomFields_fl404bRespondentNotToTelephone-respondentMustNotTelephone",
  respondentMustNotDamageOrThreat = "#fl404CustomFields_fl404bRespondentNotToDamageOrThreat-respondentMustNotDamageOrThreat",
  respondentMustNotDamage = "#fl404CustomFields_fl404bRespondentNotToDamage-respondentMustNotDamage",
  respondentMustNotEnter = "#fl404CustomFields_fl404bRespondentNotToEnterProperty-respondentMustNotEnter",
  respondentMustNotThreatChild = "#fl404CustomFields_fl404bRespondentNotToThreatChild-respondentMustNotThreatChild",
  respondentMustNotHarassChild = "#fl404CustomFields_fl404bRespondentNotHarassOrIntimidate-respondentMustNotHarassChild",
  respondentMustNotTelephoneChild = "#fl404CustomFields_fl404bRespondentNotToTelephoneChild-respondentMustNotTelephoneChild",
  respondentMustNotEnterSchool = "#fl404CustomFields_fl404bRespondentNotToEnterSchool-respondentMustNotEnterSchool",
}

export class ManageOrders12Page {
  public static async manageOrders12Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
    howLongWillOrderBeInForce,
  }: ManageOrders5PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({
      page,
      yesNoManageOrders,
      howLongWillOrderBeInForce,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<ManageOrders5PageOptions>): Promise<void> {
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
        20,
        ManageOrders12DAContent,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}"):visible`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    yesNoManageOrders,
    howLongWillOrderBeInForce,
  }: Partial<ManageOrders5PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    for (const selector of Object.values(UniqueSelectorsRespondentMustNotDo)) {
      await page.click(selector);
    }
    await page.fill(
      UniqueSelectorsHiddenTextBoxes.fl404CustomFields_fl404bAddMoreDetailsTelephone,
      ManageOrders12DAContent.loremIpsum,
    );
    await page.fill(
      UniqueSelectorsHiddenTextBoxes.fl404CustomFields_fl404bAddMoreDetailsProperty,
      ManageOrders12DAContent.loremIpsum,
    );
    await page.fill(
      UniqueSelectorsHiddenTextBoxes.fl404CustomFields_fl404bAddMoreDetailsPhoneChild,
      ManageOrders12DAContent.loremIpsum,
    );
    await page.fill(
      UniqueSelectorsHiddenTextBoxes.fl404CustomFields_fl404bAddSchool,
      ManageOrders12DAContent.loremIpsum,
    );
    await page.fill(
      UniqueSelectorsHiddenTextBoxes.fl404CustomFields_fl404bAddMoreDetailsSchool,
      ManageOrders12DAContent.loremIpsum,
    );
    await page.fill(
      UniqueSelectors.costOfApplicationInput,
      ManageOrders12DAContent.loremIpsum,
    );
    if (yesNoManageOrders) {
      await page.click(
        UniqueSelectors.fl404CustomFields_fl404bMentionedProperty_Yes,
      );
      await page.fill(
        UniqueSelectors.fl404CustomFields_fl404bAddressOfProperty,
        ManageOrders12DAContent.loremIpsum,
      );
      await page.click(UniqueSelectors.withNotice);
      await this.hiddenFormLabels(page);
    } else {
      await page.click(
        UniqueSelectors.fl404CustomFields_fl404bMentionedProperty_No,
      );
      await page.click(UniqueSelectors.withoutNotice);
    }
    switch (howLongWillOrderBeInForce) {
      case "noEndDate":
        await page.click(UniqueSelectors.noEndDate);
        break;
      case "untilNextHearing":
        await page.click(UniqueSelectors.untilNextHearing);
        break;
      case "specificDate":
        await page.click(UniqueSelectors.specificDate); // #TODO: Add date
        await page.fill(
          UniqueSelectors.inputSpecificDate,
          ManageOrders12DAContent.specificDate,
        );
        break;
      default:
        throw new Error(
          `howLongWillOrderBeInForce: ${howLongWillOrderBeInForce} is not a valid option`,
        );
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async hiddenFormLabels(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        ManageOrders12DAContent,
        "hiddenFormLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ManageOrders12DAContent.hiddenFormLabelAddDetails}"):visible`,
        4,
      ),
    ]);
  }
}
