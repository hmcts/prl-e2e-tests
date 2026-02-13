import { expect, Page } from "@playwright/test";
import { test } from "../../../../../tests/fixtures.ts";
import config from "../../../../../utils/config.utils.ts";
import { EventPage } from "../../eventPage.po.ts";

type OrderDetails = {
  orderApprovedAtHearing: "Yes" | "No";
  hearingApprovedAt?: string; // e.g. "No hearings available"
  judgeTitle: string; // e.g. "Her Honour Judge"
  judgeFullName: string; // e.g. "Judge PC"
  legalAdviserFullName?: string; // optional
  dateOrderMade: { day: string; month: string; year: string };
  orderAboutAllChildren: "Yes" | "No";
  uploadOrder: true | false;
};
enum UniqueSelectors {
  fileUpload = "#uploadOrderDoc",
}
enum radioIds {
  wasTheOrderApprovedAtHearing_Yes = "#wasTheOrderApprovedAtHearing_Yes",
  judgeOrMagistrateTitle_herHonourJudge = "#judgeOrMagistrateTitle-herHonourJudge",
  isTheOrderAboutAllChildren_Yes = "#isTheOrderAboutAllChildren_Yes",
}
enum dateOrderMadeInputIds {
  day = "#dateOrderMade-day",
  month = "#dateOrderMade-month",
  year = "#dateOrderMade-year",
}

export class DraftAnOrder5PageC21 extends EventPage {
  private readonly accessibilityTest: boolean;
  private readonly isUploadOrder: boolean;
  private readonly solicitorCaseCreateType: string;

  private readonly headings: string[] = ["Create/upload draft order"];
  private readonly labelsAndText: string[] = [

    // Questions / sections
    "Was the order approved at a hearing?",
    "Judge or Magistrate's title",
    "Select or amend the title of the Judge or magistrate (Optional)",
    "Judge's full name (Optional)",
    "Full name of Justices' Legal Adviser (Optional)",
    "Date order made",
    "Is the order about all the children?",
    "Upload Order",
  ];
  private readonly radioOptions: string[] = [
    // Judge titles
    "Her Honour Judge",
    "His Honour Judge",
    "Circuit Judge",
    "Deputy Circuit Judge",
    "Recorder",
    "District Judge",
    "Deputy District Judge",
    "District Judge Magistrates Court",
    "Magistrates",
    "Justices' Legal Adviser",
    "Justices' Clerk",
    "The Honourable Mrs Justice",
    "The Honourable Mr Justice",
  ];

  private readonly dateFields: string[] = ["Day", "Month", "Year"];

  private readonly fileUploadControls: string[] = [
    "Choose file",
    "No file chosen",
    "Cancel upload",
  ];

  private readonly navigationButtons: string[] = [
    "Previous",
    "Continue",
    "Cancel",
  ];

  constructor(
    page: Page,
    accessibilityTest = false,
    isUploadOrder = false,
    solicitorCaseCreateType?: string,
  ) {
    super(page, "Create/upload draft order");
    this.accessibilityTest = accessibilityTest;
    this.isUploadOrder = isUploadOrder;
    this.solicitorCaseCreateType = solicitorCaseCreateType ?? "";
  }

  async assertPageContentsToBeVisible(): Promise<void> {
    for (const heading of this.headings) {
      await expect(
        this.page.getByRole("heading", { name: heading }),
        `Expected heading "${heading}" to be visible`,
      ).toBeVisible();
    }

    for (const labelsAndText of this.labelsAndText) {
      await expect(
        this.page.getByText(labelsAndText),
        `Expected text "${labelsAndText}" to be visible`,
      ).toBeVisible();
    }

    for (const radioOption of this.radioOptions) {
        await expect(
          this.page.getByRole("radio", { name: radioOption, exact: true }),
          `Radio with accessible name "${radioOption}" was not visible (or not found)`,
        ).toBeVisible();
    }

    for (const navigationButton of this.navigationButtons) {
      await expect(
        this.page.getByRole("button", { name: navigationButton, exact: true }),
        `Expected navigation button "${navigationButton}" to be visible`,
      ).toBeVisible();
    }
  }

  async assertC21RadiosAreSelectable(): Promise<void> {
    for (const option of this.radioOptions) {
      const radio = this.page.getByRole("radio", { name: option, exact: true });

      try {
        await radio.check();
        await expect(radio).toBeChecked();
        await expect(
          this.page.getByRole("radio", { checked: true }),
        ).toHaveCount(1);
      } catch (error) {
        throw new Error(`Radio option failed: "${option}". Error: ${error}`);
      }
    }
  }

  async fillOrderDetails(details: OrderDetails): Promise<void> {
    // --- 1) Was the order approved at a hearing? ---
    await this.page
      .locator(radioIds.wasTheOrderApprovedAtHearing_Yes)
      .check();
    await expect(
      this.page.locator(radioIds.wasTheOrderApprovedAtHearing_Yes),
    ).toBeChecked();

    // --- 2) At which hearing was the order approved? (if provided) ---
    if (details.hearingApprovedAt !== undefined) {
      const hearingSelect = this.page.getByRole("combobox").first();
      await hearingSelect.selectOption({
        label: details.hearingApprovedAt,
      });
      await expect(hearingSelect).toHaveValue(/.*/);
    }

    // --- 3) Select or amend the title of the Judge or magistrate ---
    const radio = this.page.getByRole("radio", {
      name: details.judgeTitle,
      exact: true,
    });
    await radio.check();
    await expect(radio).toBeChecked();

    // --- 4) Judge's full name ---
    const judgeNameInput = this.page.getByLabel("Judge's full name (Optional)", {
      exact: true,
    });
    await judgeNameInput.fill(details.judgeFullName);
    await expect(judgeNameInput).toHaveValue(details.judgeFullName);

    // --- 5) Full name of Justices' Legal Adviser (Optional) ---
    if (details.legalAdviserFullName !== undefined) {
      const legalAdviserInput = this.page.getByLabel(
        "Full name of Justices' Legal Adviser (Optional)",
        {
          exact: true,
        },
      );
      await legalAdviserInput.fill(details.legalAdviserFullName ?? "");
      await expect(legalAdviserInput).toHaveValue(details.legalAdviserFullName ?? "");
    }

    // --- 6) Date order made ---
    const dayInput = this.page.locator(dateOrderMadeInputIds.day);
    const monthInput = this.page.locator(dateOrderMadeInputIds.month);
    const yearInput = this.page.locator(dateOrderMadeInputIds.year);

    await dayInput.fill(details.dateOrderMade.day);
    await monthInput.fill(details.dateOrderMade.month);
    await yearInput.fill(details.dateOrderMade.year);

    await expect(dayInput).toHaveValue(details.dateOrderMade.day);
    await expect(monthInput).toHaveValue(details.dateOrderMade.month);
    await expect(yearInput).toHaveValue(details.dateOrderMade.year);

    // --- 7) Is the order about all the children? ---
    await this.page
      .locator(radioIds.isTheOrderAboutAllChildren_Yes)
      .check();
    await expect(
      this.page.locator(radioIds.isTheOrderAboutAllChildren_Yes),
    ).toBeChecked();

    // --- 8) Upload Order (if this is the upload journey) ---
    if (details.uploadOrder) {
      await this.page.waitForTimeout(5000);
      const fileInput = this.page.locator(`${UniqueSelectors.fileUpload}`);
      await fileInput.setInputFiles(config.testPdfFile);
      await this.page.waitForTimeout(5000);
    }
  }
}
