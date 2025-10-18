import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.js";
import { CommonStaticText } from "../../../../../common/commonStaticText.js";
import {
  NonMolestationRespondentMustNotDoOptions,
  NonMolestationRespondentMustNotDoOptionsArray,
  OrderTypes,
} from "../../../../../common/types.js";

export type OrderLengthOptions =
  | "No fixed end date"
  | "Until the next hearing"
  | "Specific date and time";

interface DraftAnOrderParams {
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

export class DraftAnOrder5Page extends EventPage {
  private readonly yesAndNoLabels: string[] = ["Yes", "No"];
  private readonly doesOrderMentionPropertyLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "Does the order mention a property?" },
  );
  private readonly addPropertyAddressLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Add the address of the property",
    },
  );
  private readonly respondentMustNotDoFollowingTitle: Locator =
    this.page.locator(Selectors.h1, {
      hasText: "The respondent must not do the following:",
    });
  private readonly selectAnyThatApplyLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Select any that apply (Optional)",
    },
  );
  private readonly addNewButton: Locator = this.page.locator(Selectors.button, {
    hasText: CommonStaticText.addNew,
  });
  private readonly howLongWillOrderBeInForceLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "How long will the order be in force?" },
  );
  private readonly orderEndDateTimeOptionsArray: OrderLengthOptions[] = [
    "No fixed end date",
    "Until the next hearing",
    "Specific date and time",
  ];
  private readonly costsOfThisApplicationLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "Costs of this application (Optional)" },
  );
  private readonly orderMadeWithOrWithoutNoticeLabel: Locator =
    this.page.locator(Selectors.GovukFormLabel, {
      hasText: "Is this order made with or without notice?",
    });
  private readonly withOrWithoutNoticeOptions: string[] = [
    "With notice",
    "Without notice",
  ];
  private readonly continueButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.continue,
    },
  );
  private readonly previousButton: Locator = this.page.locator(
    Selectors.button,
    {
      hasText: CommonStaticText.previous,
    },
  );

  constructor(page: Page) {
    super(page, "Draft an order");
  }

  async assertPageContents(orderType: OrderTypes): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.locator(Selectors.headingH3, { hasText: orderType }),
    ).toBeVisible();
    await expect(this.doesOrderMentionPropertyLabel).toBeVisible();
    await this.checkStrings(
      `#fl404CustomFields_fl404bMentionedProperty ${Selectors.GovukFormLabel}`,
      this.yesAndNoLabels,
    );
    await expect(this.respondentMustNotDoFollowingTitle).toBeVisible();
    await expect(this.selectAnyThatApplyLabel).toBeVisible();
    await this.checkStrings(
      Selectors.GovukFormLabel,
      NonMolestationRespondentMustNotDoOptionsArray,
    );
    await expect(this.addNewButton).toBeVisible();
    await expect(this.howLongWillOrderBeInForceLabel).toBeVisible();
    await this.checkStrings(
      Selectors.GovukFormLabel,
      this.orderEndDateTimeOptionsArray,
    );
    await expect(this.costsOfThisApplicationLabel).toBeVisible();
    await expect(this.orderMadeWithOrWithoutNoticeLabel).toBeVisible();
    await this.checkStrings(
      Selectors.GovukFormLabel,
      this.withOrWithoutNoticeOptions,
    );
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
  }: DraftAnOrderParams): Promise<void> {
    await this.page
      .locator("#fl404CustomFields_fl404bMentionedProperty")
      .getByRole("radio", { name: doesOrderMentionProperty ? "Yes" : "No" })
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
            .locator("#fl404CustomFields_fl404bAddSchool")
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
        .locator("#orderSpecifiedDateTime")
        .getByLabel("Please enter a date and time")
        .fill(specificDateAndTime);
    }
    if (costsOfApplication) {
      await this.page
        .getByRole("textbox", { name: "Costs of this application (Optional)" })
        .fill(costsOfApplication);
    }
    await this.page
      .locator("#fl404CustomFields_fl404bIsNoticeGiven")
      .getByRole("radio", {
        name: withNotice ? "With notice" : "Without notice",
      })
      .check();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
