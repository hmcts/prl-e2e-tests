import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseProgression/manageOrders/createAnOrder/OrderDA/manageOrders1DAContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { OccupationOrderManageOrders12Content } from "../../../../../fixtures/manageCases/caseProgression/manageOrders/individualManageOrders12/occupationOrderManageOrders12Content.ts";
import { C100RespondentDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/respondentDetails/c100RespondentDetails1Content.ts";

interface OccupationOrderManageOrders12PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  withOrWithoutNotice: boolean;
}

enum UniqueSelectors {
  postcodeInput = "#fl404CustomFields_fl404bAddressAppliedFor_fl404bAddressAppliedFor_postcodeInput",
  inputSpecificDate = ".datepicker-container > .mat-datepicker-input:visible",
  costOfApplication = "#fl404CustomFields_fl404bCostOfApplication",
  withNotice = "#fl404CustomFields_fl404bIsNoticeGiven-WithNotice",
  withoutNotice = "#fl404CustomFields_fl404bIsNoticeGiven-WithoutNotice",
  addressDropdown = "#fl404CustomFields_fl404bAddressAppliedFor_fl404bAddressAppliedFor_addressList",
}

enum UniqueSelectorsCheckBox {
  occupyAsHome = "#fl404CustomFields_fl404bApplicantIsEntitledToOccupy-occupyAsHome",
  rightsInAddress = "#fl404CustomFields_fl404bApplicantHasHomeRight-rightsInAddress",
  rightsToEnterAddress = "#fl404CustomFields_fl404bApplicantHasRightToEnter-rightsToEnterAddress",
  other1 = "#fl404CustomFields_fl404bApplicantHasOtherInstruction-other1",
  allowApplicantToOccupy = "#fl404CustomFields_fl404bApplicantAllowedToOccupy-allowApplicantToOccupy",
  mustNotOccupyAddress = "#fl404CustomFields_fl404bRespondentMustNotOccupyAddress-mustNotOccupyAddress",
  shallLeaveAddress = "#fl404CustomFields_fl404bRespondentShallLeaveAddress-shallLeaveAddress",
  attemptToEnterAddress = "#fl404CustomFields_fl404bRespondentMustNotEnterAddress-attemptToEnterAddress",
  obstructHarassOrInterfere = "#fl404CustomFields_fl404bRespondentObstructOrHarass-obstructHarassOrInterfere",
  other2 = "#fl404CustomFields_fl404bRespondentOtherInstructions-other2",
}

enum hiddenSelectors {
  fl404CustomFields_fl404bApplicantHomeInstruction = "#fl404CustomFields_fl404bApplicantHomeInstruction",
  fl404CustomFields_fl404bApplicantOtherInstruction = "#fl404CustomFields_fl404bApplicantOtherInstruction",
  fl404CustomFields_fl404bWhenRespondentShallLeave = "#fl404CustomFields_fl404bWhenRespondentShallLeave",
  fl404CustomFields_fl404bAddMoreDetails = "#fl404CustomFields_fl404bAddMoreDetails",
  fl404CustomFields_fl404bAddAnotherInstructions = "#fl404CustomFields_fl404bAddAnotherInstructions",
  fl404CustomFields_fl404bIsPowerOfArrest1_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest1_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest1_No = "#fl404CustomFields_fl404bIsPowerOfArrest1_No",
  fl404CustomFields_fl404bIsPowerOfArrest2_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest2_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest2_No = "#fl404CustomFields_fl404bIsPowerOfArrest2_No",
  fl404CustomFields_fl404bIsPowerOfArrest3_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest3_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest3_No = "#fl404CustomFields_fl404bIsPowerOfArrest3_No",
  fl404CustomFields_fl404bIsPowerOfArrest4_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest4_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest4_No = "#fl404CustomFields_fl404bIsPowerOfArrest4_No",
  fl404CustomFields_fl404bIsPowerOfArrest5_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest5_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest5_No = "#fl404CustomFields_fl404bIsPowerOfArrest5_No",
  fl404CustomFields_fl404bIsPowerOfArrest6_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest6_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest6_No = "#fl404CustomFields_fl404bIsPowerOfArrest6_No",
}

export class OccupationOrderManageOrders12Page {
  public static async occupationOrderManageOrders12Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
    withOrWithoutNotice,
  }: OccupationOrderManageOrders12PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      yesNoManageOrders,
      withOrWithoutNotice,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<OccupationOrderManageOrders12PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${OccupationOrderManageOrders12Content.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${OccupationOrderManageOrders12Content.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        OccupationOrderManageOrders12Content,
        "strong",
        Selectors.strong,
      ),
      Helpers.checkGroup(
        page,
        13,
        OccupationOrderManageOrders12Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OccupationOrderManageOrders12Content.formLabelEnterUKPostcode}"):visible`,
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
    withOrWithoutNotice,
  }: Partial<OccupationOrderManageOrders12PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.fill(
      UniqueSelectors.postcodeInput,
      OccupationOrderManageOrders12Content.postcode,
    );
    await page.click(
      `${Selectors.button}:text-is("${C100RespondentDetails1Content.findAddressButton}"):visible`,
    );
    await page.selectOption(
      `${UniqueSelectors.addressDropdown}`,
      C100RespondentDetails1Content.address,
    );
    await page.fill(
      UniqueSelectors.inputSpecificDate,
      OccupationOrderManageOrders12Content.date1,
    );
    for (const selector of Object.values(UniqueSelectorsCheckBox)) {
      await page.click(selector);
    }
    await this.hiddenFillInFields(page);
    if (yesNoManageOrders) {
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest1_Yes,
      );
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest2_Yes,
      );
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest3_Yes,
      );
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest4_Yes,
      );
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest5_Yes,
      );
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest6_Yes,
      );
    } else {
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest1_No,
      );
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest2_No,
      );
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest3_No,
      );
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest4_No,
      );
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest5_No,
      );
      await page.click(
        hiddenSelectors.fl404CustomFields_fl404bIsPowerOfArrest6_No,
      );
    }
    await page.fill(
      UniqueSelectors.costOfApplication,
      OccupationOrderManageOrders12Content.loremIpsum,
    );
    if (withOrWithoutNotice) {
      await page.check(UniqueSelectors.withNotice);
    } else {
      await page.check(UniqueSelectors.withoutNotice);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async hiddenFillInFields(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        6,
        OccupationOrderManageOrders12Content,
        "hiddenFormLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${OccupationOrderManageOrders12Content.hiddenFormLabelPower}"):visible`,
        6,
      ),
    ]);
    await page.fill(
      hiddenSelectors.fl404CustomFields_fl404bApplicantHomeInstruction,
      OccupationOrderManageOrders12Content.loremIpsum,
    );
    await page.fill(
      hiddenSelectors.fl404CustomFields_fl404bApplicantOtherInstruction,
      OccupationOrderManageOrders12Content.loremIpsum,
    );
    await page.fill(
      hiddenSelectors.fl404CustomFields_fl404bWhenRespondentShallLeave,
      OccupationOrderManageOrders12Content.loremIpsum,
    );
    await page.fill(
      hiddenSelectors.fl404CustomFields_fl404bAddMoreDetails,
      OccupationOrderManageOrders12Content.loremIpsum,
    );
    await page.fill(
      hiddenSelectors.fl404CustomFields_fl404bAddAnotherInstructions,
      OccupationOrderManageOrders12Content.loremIpsum,
    );
  }
}
