import { EventPage } from "../../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import {
  NonMolestationRespondentMustNotDoOptions,
  NonMolestationRespondentMustNotDoOptionsArray,
  OrderTypes,
} from "../../../../../common/types.ts";
import { PageUtils } from "../../../../../utils/page.utils.ts";

export type OrderLengthOptions =
  "No fixed end date" | "Until the next hearing" | "Specific date and time";

export interface EditReturnedOrder5Params {
  doesOrderMentionProperty: boolean;
  propertyAddress?: string;
  respondentMustNotDoOptions?: NonMolestationRespondentMustNotDoOptions;
  mustNotDoOptionContactTheApplicant?: string;
  mustNotDoOptionApplicantsStreetAddress?: string;
  mustNotDoOptionSendingDocumentsToApplicantSolicitor?: string;
  orderLength: OrderLengthOptions;
  specificDateAndTime?: string;
  costsOfApplication?: string;
  withNotice: boolean;
}

export class EditReturnedOrder5Page extends EventPage {
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
    "Select all that apply (Optional)",
    { exact: true },
  ).first();
  private readonly mustNotDoOptionContactTheApplicantDefaultText: Locator =
    this.page.getByText(
      "[The respondent must not] contact or try to contact or communicate with the applicant in any way or by any means except that (i) you can contact the applicant through solicitors and/or through an agreed third party to make child contact arrangements (ii) you can contact the applicant directly by [means of communication] to make arrangements about the child/ren. (delete whichever of (i) and (ii) do not apply)",
    );
  private readonly mustNotDoOptionApplicantsStreetAddressDefaultText: Locator =
    this.page.getByText(
      "Go to or travel on [road name] but (i) you can enter [road name] to facilitate contact arrangements for the child/ren which must be agreed in writing or ordered by the court (ii) but otherwise you cannot park your vehicle or leave your bicycle/motorbike or scooter in [road name]. (delete as appropriate)",
    );
  private readonly mustNotDoOptionSendingDocumentsToApplicantSolicitorDefaultText: Locator =
    this.page.getByText(
      "If the applicant does not have solicitors, this order does not prevent you from sending documents in respect of these or any other proceedings directly to them. If the applicant has solicitors, you should send any documents to the solicitors.",
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
    super(page, "Edit a returned order");
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
    mustNotDoOptionContactTheApplicant,
    mustNotDoOptionApplicantsStreetAddress,
    mustNotDoOptionSendingDocumentsToApplicantSolicitor,
    orderLength,
    specificDateAndTime,
    costsOfApplication,
    withNotice,
  }: EditReturnedOrder5Params): Promise<void> {
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
        if (option === "Contact the applicant") {
          await expect(
            this.mustNotDoOptionContactTheApplicantDefaultText,
          ).toBeVisible();
          await this.page
            .locator(
              "#fl404CustomFields_fl404bRespondentNotToContactApplicantText",
            )
            .fill(mustNotDoOptionContactTheApplicant);
        }
        if (option === "Go to the applicant’s street address") {
          await expect(
            this.mustNotDoOptionApplicantsStreetAddressDefaultText,
          ).toBeVisible();
          await this.page
            .locator(
              "#fl404CustomFields_fl404bRespondentNotToStreetAddressText",
            )
            .fill(mustNotDoOptionApplicantsStreetAddress);
        }
        if (
          option === "Sending documents to the applicant or their solicitor"
        ) {
          await expect(
            this.mustNotDoOptionSendingDocumentsToApplicantSolicitorDefaultText,
          ).toBeVisible();
          await this.page
            .locator(
              "#fl404CustomFields_fl404bRespondentNotToSendDocumentsText",
            )
            .fill(mustNotDoOptionSendingDocumentsToApplicantSolicitor);
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
