import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import {
  NonMolestationRespondentMustNotDoOptions,
  NonMolestationRespondentMustNotDoOptionsArray,
  OrderTypes,
} from "../../../../../common/types.js";
import { PageUtils } from "../../../../../utils/page.utils.js";

export type OrderLengthOptions =
  | "No fixed end date"
  | "Until the next hearing"
  | "Specific date and time";

export interface DraftAnOrder6Params {
  doesOrderMentionProperty: boolean;
  propertyAddress?: string;
  respondentMustNotDoOptions?: NonMolestationRespondentMustNotDoOptions[];
  mustNotContactApplicantFurtherDetails?: string;
  mustNotEnterPropertyFurtherDetails?: string;
  mustNotContactChildrenFurtherDetails?: string;
  schoolName?: string;
  mustNotGoToSchoolFurtherDetails?: string;
  orderLength: OrderLengthOptions;
  specificDateAndTime?: string;
  costsOfApplication?: string;
  withNotice: boolean;
}

export class DraftAnOrder6Page extends EventPage {
  private readonly yesAndNoLabels: string[] = ["Yes", "No"];
  private readonly doesOrderMentionPropertyLabel: Locator = this.page.getByText(
    "Does the order mention a property?",
  );
  private readonly addPropertyAddressLabel: Locator = this.page.getByText(
    "Add the address of the property",
  );
  private readonly respondentMustNotDoFollowingTitle: Locator =
    this.page.getByRole("heading", {
      name: "The respondent must not do the following:",
    });
  private readonly selectAnyThatApplyLabel: Locator = this.page.getByText(
    "Select any that apply (Optional)",
  );
  private readonly addNewButton: Locator = this.page.getByRole("button", {
    name: "Add new",
  });
  private readonly howLongWillOrderBeInForceLabel: Locator =
    this.page.getByText("How long will the order be in force?");
  private readonly orderEndDateTimeOptionsArray: OrderLengthOptions[] = [
    "No fixed end date",
    "Until the next hearing",
    "Specific date and time",
  ];
  private readonly costsOfThisApplicationLabel: Locator = this.page.getByText(
    "Costs of this application (Optional)",
  );
  private readonly orderMadeWithOrWithoutNoticeLabel: Locator =
    this.page.getByText("Is this order made with or without notice?");
  private readonly withOrWithoutNoticeOptions: string[] = [
    "With notice",
    "Without notice",
  ];
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "Create/upload draft order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.page.getByText(orderType)).toBeVisible();
    await expect(this.doesOrderMentionPropertyLabel).toBeVisible();
    await this.pageUtils.assertStrings(
      this.yesAndNoLabels,
      this.page.locator(
        `#fl404CustomFields_fl404bMentionedProperty ${Selectors.GovukFormLabel}`,
      ),
    );
    await expect(this.respondentMustNotDoFollowingTitle).toBeVisible();
    await expect(this.selectAnyThatApplyLabel).toBeVisible();
    await this.pageUtils.assertStrings(
      NonMolestationRespondentMustNotDoOptionsArray,
    );
    await expect(this.addNewButton).toBeVisible();
    await expect(this.howLongWillOrderBeInForceLabel).toBeVisible();
    await this.pageUtils.assertStrings(this.orderEndDateTimeOptionsArray);
    await expect(this.costsOfThisApplicationLabel).toBeVisible();
    await expect(this.orderMadeWithOrWithoutNoticeLabel).toBeVisible();
    await this.pageUtils.assertStrings(this.withOrWithoutNoticeOptions);
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields({
    doesOrderMentionProperty,
    propertyAddress,
    respondentMustNotDoOptions,
    mustNotContactApplicantFurtherDetails,
    mustNotEnterPropertyFurtherDetails,
    mustNotContactChildrenFurtherDetails,
    schoolName,
    mustNotGoToSchoolFurtherDetails,
    orderLength,
    specificDateAndTime,
    costsOfApplication,
    withNotice,
  }: DraftAnOrder6Params): Promise<void> {
    await this.page
      .getByRole("radio", {
        name: doesOrderMentionProperty ? "Yes" : "No",
        exact: true,
      })
      .check();
    if (doesOrderMentionProperty) {
      await expect(this.addPropertyAddressLabel).toBeVisible();
      await this.page
        .getByRole("textbox", { name: "Add the address of the property" })
        .fill(propertyAddress);
    }
    if (respondentMustNotDoOptions) {
      for (const option of respondentMustNotDoOptions) {
        await this.page.getByRole("checkbox", { name: option }).check();
        if (
          option ===
          "must not telephone, text, email or otherwise contact or attempt to contact the applicant"
        ) {
          await this.page
            .locator("#fl404CustomFields_fl404bAddMoreDetailsTelephone")
            .fill(mustNotContactApplicantFurtherDetails);
        }
        if (
          option === "must not go to, enter or attempt to enter the property"
        ) {
          await this.page
            .locator("#fl404CustomFields_fl404bAddMoreDetailsProperty")
            .fill(mustNotEnterPropertyFurtherDetails);
        }
        if (
          option ===
          "must not telephone, text, email or otherwise contact or attempt to contact the relevant children"
        ) {
          await this.page
            .locator("#fl404CustomFields_fl404bAddMoreDetailsPhoneChild")
            .fill(mustNotContactChildrenFurtherDetails);
        }
        if (option === "must not go to, enter or attempt to enter the school") {
          await this.page
            .getByRole("textbox", { name: "Add school name" })
            .fill(schoolName);
          await this.page
            .locator("#fl404CustomFields_fl404bAddMoreDetailsSchool")
            .fill(mustNotGoToSchoolFurtherDetails);
        }
      }
    }
    await this.page.getByRole("radio", { name: orderLength }).check();
    if (specificDateAndTime) {
      await this.page
        .getByRole("textbox", { name: "Please enter a date and time" })
        .fill(specificDateAndTime);
    }
    if (costsOfApplication) {
      await this.page
        .getByRole("textbox", { name: "Costs of this application (Optional)" })
        .fill(costsOfApplication);
    }
    await this.page
      .getByRole("radio", {
        name: withNotice ? "With notice" : "Without notice",
      })
      .check();
  }
}
