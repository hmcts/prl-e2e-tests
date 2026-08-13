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

  private readonly reviewDateInput: Locator = this.page.locator(
    ".mat-datepicker-input",
  );

  private readonly errorSummary: Locator = this.page.locator(
    ".error-summary-list",
  );

  private readonly reviewByDateRequiredError: Locator = this.page.locator(
    Selectors.GovukErrorValidation,
    {
      hasText: "Review by Date is required",
    },
  );

  private readonly reviewByDateRequiredMessage: Locator = this.page.locator(
    Selectors.GovukErrorMessage,
    {
      hasText: "Review by Date is required",
    },
  );

  private readonly requestFurtherInfoReasonsRequiredError: Locator =
    this.page.locator(Selectors.GovukErrorValidation, {
      hasText: "Request Further Information Reasons is required",
    });

  private readonly requestFurtherInfoReasonsRequiredMessage: Locator =
    this.page.locator(Selectors.GovukErrorMessage, {
      hasText: "Request Further Information Reasons is required",
    });

  private readonly futureDateError: Locator = this.page.locator(
    ".error-summary-list",
    {
      hasText: "Please enter a future date",
    },
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

  private readonly furtherInfoReasonApplicantConfidentialCheckbox: Locator =
    this.page.getByRole("checkbox", {
      name: "Applicant - clarify confidential details",
    });

  private readonly furtherInfoReasonRespondentCheckbox: Locator =
    this.page.getByRole("checkbox", {
      name: "Respondent - further information required",
    });

  private readonly furtherInfoReasonHelpWithFeesCheckbox: Locator =
    this.page.getByRole("checkbox", {
      name: "Help with Fees - further action required",
    });

  private readonly furtherInfoReasonCtscCheckbox: Locator = this.page.getByRole(
    "checkbox",
    {
      name: "CTSC - Refund required",
    },
  );

  private readonly reasonCheckboxes: Record<string, Locator> = {
    "MIAM - further information required": this.furtherInfoReasonMiamRCheckbox,
    "DWP/HMRC - whereabouts unknown": this.furtherInfoReasonDwpHmrcRCheckbox,
    "Applicant - further information required":
      this.furtherInfoReasonFurtherInfoCheckbox,
    "Applicant - clarify confidential details":
      this.furtherInfoReasonApplicantConfidentialCheckbox,
    "Respondent - further information required":
      this.furtherInfoReasonRespondentCheckbox,
    "Help with Fees - further action required":
      this.furtherInfoReasonHelpWithFeesCheckbox,
    "CTSC - Refund required": this.furtherInfoReasonCtscCheckbox,
  };

  constructor(page: Page) {
    super(page, "Request Further Information");
  }

  async assertPageContents(accessibilityTest = false): Promise<void> {
    await this.assertPageHeadings();
    await Promise.all([
      expect(this.heading2).toBeVisible(),
      expect(this.dateReviewLabel).toBeVisible(),
      expect(this.furtherInfoReasonLabel).toBeVisible(),
      expect(this.furtherInfoReasonMiamRCheckbox).toBeVisible(),
      expect(this.furtherInfoReasonDwpHmrcRCheckbox).toBeVisible(),
      expect(this.furtherInfoReasonFurtherInfoCheckbox).toBeVisible(),
      expect(this.furtherInfoReasonApplicantConfidentialCheckbox).toBeVisible(),
      expect(this.furtherInfoReasonRespondentCheckbox).toBeVisible(),
      expect(this.furtherInfoReasonHelpWithFeesCheckbox).toBeVisible(),
      expect(this.furtherInfoReasonCtscCheckbox).toBeVisible(),
    ]);
    if (accessibilityTest) await this.axeUtils.audit();
  }

  async checkErrorMessaging(): Promise<void> {
    await this.clickContinue();
    await Promise.all([
      expect(this.reviewByDateRequiredError).toBeVisible(),
      expect(this.reviewByDateRequiredMessage).toBeVisible(),
      expect(this.requestFurtherInfoReasonsRequiredError).toBeVisible(),
      expect(this.requestFurtherInfoReasonsRequiredMessage).toBeVisible(),
    ]);
    await this.reviewDateInput.fill("01-01-2025");
    await this.furtherInfoReasonMiamRCheckbox.check();
    await this.clickContinue();
    await expect(this.errorSummary).toBeVisible();
    await expect(this.futureDateError).toBeVisible();
    await this.furtherInfoReasonMiamRCheckbox.uncheck();
    await expect(this.furtherInfoReasonMiamRCheckbox).not.toBeChecked();
  }

  async provideInformationDetails(furtherInfoReasons: string[]): Promise<void> {
    await this.reviewDateInput.clear();
    const tomorrow = new DateHelperUtils().tomorrowDateDDMMYYYY();
    await this.reviewDateInput.fill(tomorrow);

    for (const reason of furtherInfoReasons) {
      await this.tickReason(reason);
    }
  }

  private async tickReason(reason: string): Promise<void> {
    const checkbox = this.reasonCheckboxes[reason];
    if (!checkbox) {
      return;
    }
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }
}
