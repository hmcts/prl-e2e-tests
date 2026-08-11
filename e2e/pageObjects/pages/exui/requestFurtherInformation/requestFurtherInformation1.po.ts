import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { EventPage } from "../eventPage.po.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.ts";

export class RequestFurtherInformation1Page extends EventPage {
  readonly heading2: Locator = this.page.locator(Selectors.h2, {
    hasText: "Awaiting Information Details",
  });
  readonly dateReviewLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Review by Date",
    },
  );
  readonly furtherInfoReasonLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Request Further Information Reasons",
    },
  );
  readonly furtherInfoReasonMiamLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "MIAM - further information required",
    },
  );
  readonly furtherReasonDwpHmrcLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "DWP/HMRC - whereabouts unknown",
    },
  );
  readonly furtherReasonFurtherInfoLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Applicant - further information required",
    },
  );
  readonly furtherReasonApplicantConfidentialLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Applicant - clarify confidential details",
    },
  );
  readonly furtherReasonRespondentLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Respondent - further information required",
    },
  );
  readonly furtherReasonHelpWithFeesLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Help with Fees - further action required",
    },
  );
  readonly furtherReasonCTSCLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "CTSC - Refund required",
    },
  );

  private readonly reviewDateInput: Locator = this.page.locator(
    ".mat-datepicker-input",
  );

  private readonly errorSummary: Locator = this.page.locator(
    ".error-summary-list",
  );

  private readonly furtherInfoReasonMiamRCheckbox: Locator =
    this.page.getByRole("checkbox", {
      name: "MIAM - further information required",
    });

  private readonly furtherInfoReasonDwpHmrcRCheckbox: Locator =
    this.page.getByRole("checkbox", {
      name: "DWP/HMRC - whereabouts unknown",
    });

  private readonly furtherInfoReasonFurtherInfoCheckbox: Locator =
    this.page.getByRole("checkbox", {
      name: "Applicant - further information required",
    });

  constructor(page: Page) {
    super(page, "Request Further Information");
  }

  async assertPageContents(accessibilityTest = false): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading2).toBeVisible();
    await expect(this.dateReviewLabel).toBeVisible();
    await expect(this.furtherInfoReasonLabel).toBeVisible();
    await expect(this.furtherInfoReasonMiamLabel).toBeVisible();
    await expect(this.furtherReasonDwpHmrcLabel).toBeVisible();
    await expect(this.furtherReasonFurtherInfoLabel).toBeVisible();
    await expect(this.furtherReasonApplicantConfidentialLabel).toBeVisible();
    await expect(this.furtherReasonRespondentLabel).toBeVisible();
    await expect(this.furtherReasonHelpWithFeesLabel).toBeVisible();
    await expect(this.furtherReasonCTSCLabel).toBeVisible();

    if (accessibilityTest) {
      await this.axeUtils.audit();
    }
  }

  async checkErrorMessaging(): Promise<void> {
    await this.clickContinue();
    await Promise.all([
      expect(
        this.page.locator(Selectors.GovukErrorValidation, {
          hasText: "Review by Date is required",
        }),
      ).toBeVisible(),
      expect(
        this.page.locator(Selectors.GovukErrorMessage, {
          hasText: "Review by Date is required",
        }),
      ).toBeVisible(),
      expect(
        this.page.locator(Selectors.GovukErrorValidation, {
          hasText: "Request Further Information Reasons is required",
        }),
      ).toBeVisible(),
      expect(
        this.page.locator(Selectors.GovukErrorMessage, {
          hasText: "Request Further Information Reasons is required",
        }),
      ).toBeVisible(),
    ]);

    await this.reviewDateInput.fill("01-01-2025");
    await this.furtherInfoReasonMiamRCheckbox.check();
    await this.clickContinue();
    await expect(this.errorSummary).toBeVisible();
    await expect(this.errorSummary).toContainText("Please enter a future date");
    await this.furtherInfoReasonMiamRCheckbox.uncheck();
    await expect(this.furtherInfoReasonMiamRCheckbox).not.toBeChecked();
  }

  async provideInformationDetails(): Promise<void> {
    await this.reviewDateInput.clear();
    const tomorrow = new DateHelperUtils().tomorrowDateDDMMYYYY();
    await this.reviewDateInput.fill(tomorrow);
    await this.furtherInfoReasonFurtherInfoCheckbox.check();
    await this.furtherInfoReasonDwpHmrcRCheckbox.check();
    await expect(this.furtherInfoReasonFurtherInfoCheckbox).toBeChecked();
    await expect(this.furtherInfoReasonDwpHmrcRCheckbox).toBeChecked();
  }
}
