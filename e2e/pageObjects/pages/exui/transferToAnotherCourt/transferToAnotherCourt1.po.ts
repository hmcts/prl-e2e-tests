import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { PageUtils } from "../../../../utils/page.utils.js";

export class TransferToAnotherCourt1Page extends EventPage {
  readonly warningText: Locator = this.page.locator(Selectors.strong, {
    hasText:
      "You must have served any relevant orders before making this transfer as you will lose access to this case.",
  });

  readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Court details",
  });

  readonly cannotFindCourt: Locator = this.page.locator(
    "#cantFindCourtCheck-cantFindCourt",
  );
  readonly inputCourtName: Locator = this.page.locator("#anotherCourt");
  readonly inputCourtEmailAddress: Locator =
    this.page.locator("#courtEmailAddress");
  readonly caReasonForTransferAnotherJurisdiction: Locator = this.page.locator(
    "#reasonForTransferToAnotherCourt-anotherJurisdiction",
  );
  readonly daReasonForTransferAnotherJurisdiction: Locator = this.page.locator(
    "#reasonForTransferToAnotherCourtDa-anotherJurisdiction",
  );
  readonly caReasonForTransferAnotherReason: Locator = this.page.locator(
    "#reasonForTransferToAnotherCourt-anotherReason",
  );
  readonly daReasonForTransferAnotherReason: Locator = this.page.locator(
    "#reasonForTransferToAnotherCourtDa-anotherReason",
  );
  readonly inputAnotherReasonToTransferDetails: Locator = this.page.locator(
    "#anotherReasonToTransferDetails",
  );
  readonly caFormLabelAnotherReasonForTransfer = this.page.locator(
    'label[for="reasonForTransferToAnotherCourt-anotherReason"]',
  );
  readonly daFormLabelAnotherReasonForTransfer = this.page.locator(
    'label[for="reasonForTransferToAnotherCourtDa-anotherReason"]',
  );

  readonly transferFormLabels: string[] = [
    "Select from the list of courts (Optional)",
    "I can't find the court",
  ];

  readonly caReasonForTransferLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "The child lives in another jurisdiction.",
    },
  );
  readonly daReasonForTransferLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "A party lives in a different court's jurisdiction",
    },
  );

  readonly formLabelCourtName: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Enter court's name (Optional)",
    },
  );
  readonly formLabelCourtEmailAddress: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Enter email address (Optional)",
    },
  );
  readonly formLabelAnotherReasonForTransferDetails: Locator =
    this.page.locator(Selectors.GovukFormLabel, {
      hasText: "State why this case should be transferred to another court.",
    });

  constructor(page: Page) {
    super(page, "Transfer to another court");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(caseType: string): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading2).toBeVisible();
    await expect(this.warningText).toBeVisible();
    await this.pageUtils.assertStrings(this.transferFormLabels);

    if (caseType === "C100") {
      await expect(this.caReasonForTransferLabel).toBeVisible();
      await expect(this.caFormLabelAnotherReasonForTransfer).toBeVisible();
    } else {
      await expect(this.daReasonForTransferLabel).toBeVisible();
      await expect(this.daFormLabelAnotherReasonForTransfer).toBeVisible();
    }
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectCourt(
    caseType: string,
    courtIsListed: boolean,
    courtName: string,
  ): Promise<void> {
    if (courtIsListed) {
      await this.selectCourtWhenListed(courtName);
    } else {
      await this.selectCourtWhenNotListed(courtName);
    }
    if (caseType === "C100") {
      await this.caReasonForTransferAnotherJurisdiction.check();
      await this.caReasonForTransferAnotherReason.check();
    } else {
      await this.daReasonForTransferAnotherJurisdiction.check();
      await this.daReasonForTransferAnotherReason.check();
    }

    await expect(this.formLabelAnotherReasonForTransferDetails).toBeVisible();
    await this.inputAnotherReasonToTransferDetails.fill("Test");
  }

  async selectCourtWhenListed(courtName: string): Promise<void> {
    await this.page.locator("#courtList").selectOption(courtName);
  }

  async selectCourtWhenNotListed(courtName: string): Promise<void> {
    await this.cannotFindCourt.check();
    await expect(this.formLabelCourtName).toBeVisible();
    await expect(this.formLabelCourtEmailAddress).toBeVisible();
    await this.inputCourtName.fill(courtName);
    await this.inputCourtEmailAddress.fill("testcourt@test.com");
  }
}
