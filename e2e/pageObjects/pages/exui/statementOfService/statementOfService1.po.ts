import { expect, Locator, Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.js";
import { Selectors } from "../../../../common/selectors.js";
import config from "../../../../utils/config.utils.js";
import { DateHelperUtils } from "../../../../utils/dateHelpers.utils.js";

export class StatementOfService1Page extends EventPage {
  private readonly heading2: Locator = this.page
    .locator(Selectors.h2, {
      hasText: "Recipient",
    })
    .first();
  private readonly heading3: Locator = this.page.locator(Selectors.h3, {
    hasText: "Recipient",
  });
  private readonly sosText: Locator = this.page.getByText(
    "Statement of service document",
    {
      exact: true,
    },
  );
  private readonly addRecipient: Locator = this.page.getByText(
    "Add recipient",
    {
      exact: true,
    },
  );
  private readonly mulRecipientText: Locator = this.page.getByText(
    "Do this if there are multiple recipients",
    {
      exact: true,
    },
  );
  private readonly whoServedText: Locator = this.page.getByText(
    "Who was served?",
    {
      exact: true,
    },
  );
  private readonly whenServedText: Locator = this.page.getByText(
    "When were they served?",
    {
      exact: true,
    },
  );
  private readonly whatServedText: Locator = this.page.getByText(
    "What was served?",
    {
      exact: true,
    },
  );
  private readonly appText: Locator = this.page.getByText("Application pack", {
    exact: true,
  });
  private readonly orderText: Locator = this.page.getByText("Order", {
    exact: true,
  });
  private readonly uploadText: Locator = this.page
    .getByText("Upload document(PDF, .doc)", {
      exact: true,
    })
    .first();
  private readonly exampleText: Locator = this.page.getByText(
    "For example: 16 4 2021, 10:09",
    {
      exact: true,
    },
  );

  private readonly whoWasServedDropdown = this.page.locator(
    "#stmtOfServiceAddRecipient_0_respondentDynamicList",
  );
  readonly sosFileUpload: Locator = this.page.locator(
    "#stmtOfServiceAddRecipient_0_stmtOfServiceDocument",
  );

  private readonly dateHelpersUtils: DateHelperUtils = new DateHelperUtils();

  constructor(page: Page) {
    super(page, "Statement of service");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.heading2).toBeVisible();
    await expect(this.heading3).toBeVisible();
    await expect(this.whatServedText).toBeVisible();
    await expect(this.appText).toBeVisible();
    await expect(this.orderText).toBeVisible();
    await expect(this.mulRecipientText).toBeVisible();
    await expect(this.whoServedText).toBeVisible();
    await expect(this.whenServedText).toBeVisible();
    await expect(this.exampleText).toBeVisible();
    await expect(this.sosText).toBeVisible();
    await expect(this.uploadText).toBeVisible();
    await expect(this.addRecipient).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectServedDetails(whatServed: string, whoServed: string) {
    await this.page.getByRole("radio", { name: whatServed }).check();

    const option = this.whoWasServedDropdown.locator("option").filter({
      hasText: whoServed,
    });

    await this.whoWasServedDropdown.selectOption({
      label: (await option.textContent())!.trim(),
    });

    const date: string | string[] =
      this.dateHelpersUtils.getTodayFormattedDateTime();
    await this.page
      .locator(".datepicker-container > .mat-datepicker-input:visible")
      .fill(date);

    // upload statement of service file
    await this.sosFileUpload.setInputFiles(config.testPdfFile);
    await this.page
      .locator(".error-message", { hasText: " Uploading..." })
      .waitFor({ state: "hidden" });
  }
}
