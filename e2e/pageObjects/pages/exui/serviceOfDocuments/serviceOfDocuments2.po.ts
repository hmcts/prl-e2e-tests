import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { PageUtils } from "../../../../utils/page.utils.js";
import { yesNoNA } from "../../../../common/types.js";

export class ServiceOfDocuments2Page extends EventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  private readonly formLabelsContainer: Locator = this.page.locator(
    Selectors.GovukFormLabel,
  );
  private readonly formLabels: string[] = [
    "Does this document need to be personally served on the respondent?",
    "Yes",
    "No",
    "Not applicable",
    "Select additional recipients who needs to be served (Optional)",
    "Additional recipients (optional)",
  ];
  private readonly formHint: Locator = this.page.locator(
    `${Selectors.GovukFormHint}:text-is("For example, Cafcass, Local authority and Other organization")`,
  );

  private readonly personallyServedYes: Locator = this.page.locator(
    "#sodServeToRespondentOptions-Yes",
  );
  private readonly personallyServedNo: Locator = this.page.locator(
    "#sodServeToRespondentOptions-No",
  );
  private readonly personallyServedNotApplicable: Locator = this.page.locator(
    "#sodServeToRespondentOptions-NotApplicable",
  );
  private readonly applicantLegalRepresentative: Locator = this.page.locator(
    "#sodSolicitorServingRespondentsOptions-applicantLegalRepresentative",
  );
  private readonly applicantRecipientLabel: Locator = this.page.locator(
    "label",
    { hasText: "(Applicant)" },
  );
  private readonly respondentRecipientLabel: Locator = this.page.locator(
    "label",
    { hasText: "(Respondent)" },
  );

  private readonly additionalRecipientsCheckbox: Locator = this.page.locator(
    "#sodAdditionalRecipients-additionalRecipients",
  );
  private readonly recipientHeading2: Locator = this.page.locator(
    `${Selectors.headingH2}:text-is("Recipient")`,
  );
  private readonly recipientHeading3: Locator = this.page.locator(
    `${Selectors.headingH3}:text-is("Recipient")`,
  );
  private readonly addNewRecipientButton: Locator = this.page.getByRole(
    "button",
    { name: CommonStaticText.addNew },
  );
  private readonly recipientServeMethodLabels: string[] = ["Post", "Email"];

  private readonly serveByPostRadio: Locator = this.page.locator(
    "#sodAdditionalRecipientsList_0_serveByPostOrEmail-post",
  );
  private readonly serveByEmailRadio: Locator = this.page.locator(
    "#sodAdditionalRecipientsList_0_serveByPostOrEmail-email",
  );
  private readonly postalRecipientName: Locator = this.page.locator(
    "#sodAdditionalRecipientsList_0_postalInformation_postalName",
  );
  private readonly postalRecipientPostcode: Locator = this.page.locator(
    "#sodAdditionalRecipientsList_0_postalInformation_postalAddress_postalAddress_postcodeInput",
  );
  private readonly postalRecipientAddressSelect: Locator = this.page.locator(
    "#sodAdditionalRecipientsList_0_postalInformation_postalAddress_postalAddress_addressList",
  );
  private readonly emailRecipientName: Locator = this.page.locator(
    "#sodAdditionalRecipientsList_0_emailInformation_emailName",
  );
  private readonly emailRecipientAddress: Locator = this.page.locator(
    "#sodAdditionalRecipientsList_0_emailInformation_emailAddress",
  );

  private readonly addressFormLabels: string[] = [
    "Select an address",
    "Building and Street",
    "Address Line 2 (Optional)",
    "Address Line 3 (Optional)",
    "Town or City (Optional)",
    "County (Optional)",
    "Postcode/Zipcode",
    "Country (Optional)",
  ];

  constructor(page: Page) {
    super(page, "Service of documents");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await this.pageUtils.assertStrings(
      this.formLabels,
      this.formLabelsContainer,
    );
    await expect(this.formHint).toBeVisible();
  }

  async selectPersonalService(personallyServed: yesNoNA): Promise<void> {
    switch (personallyServed) {
      case "Yes":
        await this.personallyServedYes.click();
        await this.applicantLegalRepresentative.click();
        break;
      case "No":
        await this.personallyServedNo.click();
        // Match labels containing "(Applicant)" and "(Respondent)"
        await this.applicantRecipientLabel.check();
        await this.respondentRecipientLabel.check();
        break;
      case "Not applicable":
        await this.personallyServedNotApplicable.click();
        break;
    }
  }

  async addAdditionalRecipient({
    servedByPost,
  }: {
    servedByPost: boolean;
  }): Promise<void> {
    await this.additionalRecipientsCheckbox.click();
    await expect(this.recipientHeading2).toBeVisible();
    await this.addNewRecipientButton.click();
    await expect(this.recipientHeading3).toBeVisible();
    await this.pageUtils.assertStrings(
      this.recipientServeMethodLabels,
      this.formLabelsContainer,
    );

    if (servedByPost) {
      await this.fillPostalRecipient();
    } else {
      await this.fillEmailRecipient();
    }
  }

  private async fillPostalRecipient(): Promise<void> {
    await this.serveByPostRadio.click();
    await this.serveByPostRadio.click();
    await this.postalRecipientName.fill("John Doe");
    await this.postalRecipientPostcode.fill("SA1 1AD");
    await this.page
      .getByRole("button", { name: CommonStaticText.findAddress })
      .click();
    await this.postalRecipientAddressSelect.selectOption({ index: 1 });
    await this.pageUtils.assertStrings(
      this.addressFormLabels,
      this.formLabelsContainer,
    );
  }

  private async fillEmailRecipient(): Promise<void> {
    await this.serveByEmailRadio.click();
    await this.serveByEmailRadio.check();
    await this.emailRecipientName.fill("John Doe");
    await this.emailRecipientAddress.fill("test@test.com");
  }
}
