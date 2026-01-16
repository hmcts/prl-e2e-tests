import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";
import { EventPage } from "../eventPage.po.js";
import { Selectors } from "../../../../common/selectors.js";
import config from "../../../../utils/config.utils.js";

export class UploadAdditionalApplications2Page extends EventPage {
  readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "C2 application",
  });
  readonly c2ApplicationFileUpload: Locator = this.page.locator(
    "#temporaryC2Document_document",
  );
  readonly yesDocumentRelatesToCaseCheckbox: Locator = this.page.locator(
    "#temporaryC2Document_documentAcknowledge-ACK_RELATED_TO_CASE",
  );
  readonly c100OtherReasonCheckbox: Locator = this.page.locator(
    "#temporaryC2Document_caReasonsForC2Application-OTHER",
  );
  readonly fl401OtherReasonCheckbox: Locator = this.page.locator(
    "#temporaryC2Document_daReasonsForC2Application-OTHER",
  );
  readonly otherReasonTextbox: Locator = this.page.locator(
    "#temporaryC2Document_otherReasonsFoC2Application",
  );
  readonly sameDayRadio: Locator = this.page.locator(
    "#temporaryC2Document_urgencyTimeFrameType-SAME_DAY",
  );
  readonly CAheading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Supplements (Optional)",
  });

  readonly yesFormLabel = this.page.getByText("Yes", { exact: true }).first();
  readonly formHint: Locator = this.page.locator(Selectors.GovukFormHint, {
    hasText: "Select all that apply",
  });

  readonly warningText: Locator = this.page.locator(
    Selectors.GovukWarningText,
    {
      hasText: "Check if this document is related to",
    },
  );

  readonly otherReasonFormLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Other reasons for C2 Application",
    },
  );

  readonly addButton = this.page
    .getByRole("button", { name: "Add new" })
    .first();

  readonly uploadFormLabels: string[] = [
    "Upload C2 application",
    "Tick to confirm this document is related to this case",
    "Are you using the C2 to apply for any of the below?",
    "Please state how soon you want the judge to consider your application? (Optional)",
    "On the same day",
    "Within 2 days",
    "Within 5 days",
  ];

  readonly uploadH2: string[] = [
    "Draft Orders (Optional)",
    "Supporting Documents (Optional)",
  ];

  readonly CAFormLabels: string[] = [
    "Change surname or remove from jurisdiction.",
    "Appointment of a guardian",
    "Termination of appointment of a guardian",
    "Parental responsibility",
    "Requesting an adjournment for a scheduled hearing",
    "Other",
  ];

  readonly DAFormLabels: string[] = [
    "Requesting an adjournment for a scheduled hearing",
    "Other",
  ];

  constructor(page: Page) {
    super(page, "Upload additional applications");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(caseType: string): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading2).toBeVisible();
    await this.pageUtils.assertStrings(this.uploadFormLabels);
    await expect(this.warningText).toBeVisible();
    await expect(this.formHint).toBeVisible();
    await expect(this.yesFormLabel).toBeVisible();
    await expect(this.addButton).toBeVisible();
    await this.pageUtils.assertStrings(this.uploadH2);
    if (caseType === "C100") {
      await this.pageUtils.assertStrings(this.CAFormLabels);
      await expect(this.CAheading2).toBeVisible();
    } else {
      await this.pageUtils.assertStrings(this.DAFormLabels);
    }
  }

  async fillInFields(caseType: string): Promise<void> {
    await this.c2ApplicationFileUpload.setInputFiles(config.testPdfFile);
    await this.page
      .locator(".error-message", { hasText: " Uploading..." })
      .waitFor({ state: "hidden" });
    await this.yesDocumentRelatesToCaseCheckbox.check();

    if (caseType === "C100") {
      await this.c100OtherReasonCheckbox.check();
    } else {
      await this.fl401OtherReasonCheckbox.check();
    }
    await expect(this.otherReasonTextbox).toBeVisible();
    await this.otherReasonTextbox.fill("test reason");
    await this.sameDayRadio.check();
  }
}
