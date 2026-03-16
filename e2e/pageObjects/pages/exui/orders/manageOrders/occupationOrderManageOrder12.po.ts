import { EventPage } from "../../eventPage.po.js";
import { expect, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";
import { OrderTypes } from "../../../../../common/types.js";

export interface ManageOrder12Params {
  yesNoManageOrders: boolean;
  postcode: string;
  address: string;
  date1: string;
  loremIpsum: string;
  withOrWithoutNotice: boolean;
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

enum hiddenTextBoxSelectors {
  fl404CustomFields_fl404bApplicantHomeInstruction = "#fl404CustomFields_fl404bApplicantHomeInstruction",
  fl404CustomFields_fl404bApplicantOtherInstruction = "#fl404CustomFields_fl404bApplicantOtherInstruction",
  fl404CustomFields_fl404bWhenRespondentShallLeave = "#fl404CustomFields_fl404bWhenRespondentShallLeave",
  fl404CustomFields_fl404bAddMoreDetails = "#fl404CustomFields_fl404bAddMoreDetails",
  fl404CustomFields_fl404bAddAnotherInstructions = "#fl404CustomFields_fl404bAddAnotherInstructions",
}
enum hiddenYesCheckboxSelectors {
  fl404CustomFields_fl404bIsPowerOfArrest1_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest1_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest2_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest2_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest3_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest3_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest4_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest4_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest5_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest5_Yes",
  fl404CustomFields_fl404bIsPowerOfArrest6_Yes = "#fl404CustomFields_fl404bIsPowerOfArrest6_Yes",
}
enum hiddenNoCheckboxSelectors {
  fl404CustomFields_fl404bIsPowerOfArrest1_No = "#fl404CustomFields_fl404bIsPowerOfArrest1_No",
  fl404CustomFields_fl404bIsPowerOfArrest2_No = "#fl404CustomFields_fl404bIsPowerOfArrest2_No",
  fl404CustomFields_fl404bIsPowerOfArrest3_No = "#fl404CustomFields_fl404bIsPowerOfArrest3_No",
  fl404CustomFields_fl404bIsPowerOfArrest4_No = "#fl404CustomFields_fl404bIsPowerOfArrest4_No",
  fl404CustomFields_fl404bIsPowerOfArrest5_No = "#fl404CustomFields_fl404bIsPowerOfArrest5_No",
  fl404CustomFields_fl404bIsPowerOfArrest6_No = "#fl404CustomFields_fl404bIsPowerOfArrest6_No",
}

export class OccupationOrderManageOrders12Page extends EventPage {
  private readonly addressHeading = this.page.getByRole("heading", {
    name: "Address the order applies to",
  });
  private readonly strong1 = this.page.getByText(
    "The court declares that the applicant",
  );
  private readonly strong2 = this.page.getByText("The respondent", {
    exact: true,
  });
  private readonly postcodeInputLabel = this.page.getByRole("textbox", {
    name: "Enter a UK postcode",
    exact: true,
  });
  private readonly applyFormLabel = this.page
    .getByText("Select all that apply (Optional)", { exact: true })
    .first();
  private readonly uniqueFormLabels: string[] = [
    "is entitled to occupy the address as their home",
    "has home rights in the address",
    "has the right to enter into and occupy the address",
    "shall allow the applicant to occupy the address",
    "must not occupy the address",
    "shall leave the address",
    "having left, must not return to, enter or attempt to enter the address",
    "must not obstruct, harass, or interfere with the applicant's peaceful occupation of the address",
    "Date order ends",
    "Costs of this application (Optional)",
    "Is this order made with or without notice?",
    "With notice",
    "Without notice",
  ];
  private readonly hiddenFormLabels: string[] = [
    "Add details about home rights (Optional)",
    "between (Optional)",
    "and (Optional)",
    "Add when they shall leave (Optional)",
    "Add more details (Optional)",
    "Add another instruction relating to the respondent",
  ];
  private readonly hiddenGroups = this.page.getByRole("group", {
    name: "Is a power of arrest attached to this paragraph?",
    exact: true,
  });

  private readonly postcodeInput = this.page.locator(
    "#fl404CustomFields_fl404bAddressAppliedFor_fl404bAddressAppliedFor_postcodeInput",
  );
  private readonly findAddressButton = this.page.getByRole("button", {
    name: "Find address",
    exact: true,
  });
  private readonly addressDropdown = this.page.locator(
    "#fl404CustomFields_fl404bAddressAppliedFor_fl404bAddressAppliedFor_addressList",
  );
  private readonly inputSpecificDate = this.page.locator(
    ".datepicker-container > .mat-datepicker-input:visible",
  );
  private readonly costOfApplication = this.page.locator(
    "#fl404CustomFields_fl404bCostOfApplication",
  );
  private readonly withNotice = this.page.locator(
    "#fl404CustomFields_fl404bIsNoticeGiven-WithNotice",
  );
  private readonly withoutNotice = this.page.locator(
    "#fl404CustomFields_fl404bIsNoticeGiven-WithoutNotice",
  );

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType)).toBeVisible();
    await expect(this.addressHeading).toBeVisible();
    await expect(this.postcodeInputLabel).toBeVisible();
    await expect(this.strong1).toBeVisible();
    await expect(this.strong2).toBeVisible();
    await expect(this.applyFormLabel).toBeVisible();
    await this.pageUtils.assertStrings(this.uniqueFormLabels);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillOrderDetails(params: ManageOrder12Params): Promise<void> {
    await this.postcodeInput.fill(params.postcode);
    await this.findAddressButton.click();
    await this.addressDropdown.selectOption(params.address);
    await this.inputSpecificDate.fill(params.date1);

    for (const selector of Object.values(UniqueSelectorsCheckBox)) {
      await this.page.click(selector);
    }

    await this.pageUtils.assertStrings(this.hiddenFormLabels);
    await expect(this.hiddenGroups).toHaveCount(6);

    for (const selector of Object.values(hiddenTextBoxSelectors)) {
      await this.page.fill(selector, params.loremIpsum);
    }

    if (params.yesNoManageOrders) {
      for (const selector of Object.values(hiddenYesCheckboxSelectors)) {
        await this.page.click(selector);
      }
    } else {
      for (const selector of Object.values(hiddenNoCheckboxSelectors)) {
        await this.page.click(selector);
      }
    }

    await this.costOfApplication.fill(params.loremIpsum);
    if (params.withOrWithoutNotice) {
      await this.withNotice.check();
    } else {
      await this.withoutNotice.check();
    }
  }
}
