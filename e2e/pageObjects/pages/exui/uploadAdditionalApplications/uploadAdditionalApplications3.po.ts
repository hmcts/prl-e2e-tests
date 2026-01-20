import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { PageUtils } from "../../../../utils/page.utils.js";
import config from "../../../../utils/config.utils.js";

export class UploadAdditionalApplications3Page extends EventPage {
  readonly heading2: Locator = this.page.locator(Selectors.headingH2, {
    hasText: "Other applications",
  });
  readonly applicationFileUpload: Locator = this.page.locator(
    "#temporaryOtherApplicationsBundle_document",
  );
  readonly yesDocumentRelatesToCaseCheckbox: Locator = this.page.locator(
    "#temporaryOtherApplicationsBundle_documentAcknowledge-ACK_RELATED_TO_CASE",
  );
  readonly daApplicationDropdown: Locator = this.page.locator(
    "#temporaryOtherApplicationsBundle_daApplicantApplicationType",
  );
  readonly caApplicationDropdown: Locator = this.page.locator(
    "#temporaryOtherApplicationsBundle_caApplicantApplicationType",
  );
  readonly sameDayRadio: Locator = this.page.locator(
    "#temporaryOtherApplicationsBundle_urgencyTimeFrameType-SAME_DAY",
  );
  readonly twoDayRadio: Locator = this.page.locator(
    "#temporaryOtherApplicationsBundle_urgencyTimeFrameType-WITHIN_2_DAYS",
  );
  readonly fiveDayRadio: Locator = this.page.locator(
    "#temporaryOtherApplicationsBundle_urgencyTimeFrameType-WITHIN_5_DAYS",
  );
  readonly CAheading2: Locator = this.page.locator(Selectors.headingH2, {
    hasText: "Supplements (Optional)",
  });
  readonly headingH2SupportingDocuments: Locator = this.page.locator(
    Selectors.headingH2,
    {
      hasText: "Supporting Documents (Optional)",
    },
  );

  readonly caSelectAppLabel = this.page
    .locator(
      'select[id="temporaryOtherApplicationsBundle_caApplicantApplicationType"]:not([disabled])',
    )
    .locator("xpath=preceding-sibling::label[1]");
  readonly daSelectAppLabel = this.page
    .locator(
      'select[id="temporaryOtherApplicationsBundle_daApplicantApplicationType"]:not([disabled])',
    )
    .locator("xpath=preceding-sibling::label[1]");
  readonly yesFormLabel = this.page.getByText("Yes", { exact: true }).first();

  readonly warningText: Locator = this.page.locator(
    Selectors.GovukWarningText,
    {
      hasText: "Check if this document is related to",
    },
  );

  readonly addButton = this.page
    .getByRole("button", { name: "Add new" })
    .first();

  readonly uploadFormLabels: string[] = [
    "Upload application",
    "Tick to confirm this document is related to this case",
    "Please state how soon you want the judge to consider your application? (Optional)",
  ];

  constructor(page: Page) {
    super(page, "Upload additional applications");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(caseType: string): Promise<void> {
    await this.assertPageHeadings();
    await this.heading2.waitFor();
    await this.pageUtils.assertStrings(this.uploadFormLabels);
    await this.sameDayRadio.getByText("On the same day").isVisible();
    await this.twoDayRadio.getByText("Within 2 days").isVisible();
    await this.fiveDayRadio.getByText("Within 5 days").isVisible();
    await expect(this.warningText).toBeVisible();
    await expect(this.yesFormLabel).toBeVisible();
    await expect(this.headingH2SupportingDocuments).toBeVisible();
    await expect(this.addButton).toBeVisible();
    if (caseType === "C100") {
      await expect(this.CAheading2).toBeVisible();
      await expect(this.caSelectAppLabel).toBeVisible();
    } else {
      await expect(this.daSelectAppLabel).toBeVisible();
    }
  }

  async fillInFields(caseType: string): Promise<void> {
    if (caseType === "C100") {
      await this.caApplicationDropdown.selectOption(
        "C1 - Apply for certain orders under the Children Act",
      );
    } else {
      await this.daApplicationDropdown.selectOption(
        "FL403 - Application to vary, discharge or extend an order",
      );
    }

    // upload application file
    await this.applicationFileUpload.setInputFiles(config.testPdfFile);
    await this.page
      .locator(".error-message", { hasText: " Uploading..." })
      .waitFor({ state: "hidden" });
    await this.yesDocumentRelatesToCaseCheckbox.check();
    await this.sameDayRadio.check();
  }
}
