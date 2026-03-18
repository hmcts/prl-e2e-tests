import { Locator, Page } from "@playwright/test";
import { EventPage } from "../../eventPage.po.ts";

export class ManageOrder26Page extends EventPage {
  readonly page: Page;

  // --- Selectors ---
  readonly orderTypeSelect: Locator;
  readonly dayInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly continueButton: Locator;

  // Dynamic Locators (using functions to handle Yes/No or specific text)
  readonly genericRadio: (groupName: string, value: "Yes" | "No") => Locator;
  readonly reportCheckbox: (label: string) => Locator;
  readonly actionRadio: (text: string) => Locator;

  constructor(page: Page) {
    super(page, "Manage orders");

    // Static Locators
    this.orderTypeSelect = page.getByLabel("What type of order is this?");
    this.dayInput = page.getByRole("textbox", { name: "Day" });
    this.monthInput = page.getByRole("textbox", { name: "Month" });
    this.yearInput = page.getByRole("textbox", { name: "Year" });
    this.continueButton = page.getByRole("button", { name: "Continue" });

    // Flexible Locators for Radios and Checkboxes
    this.genericRadio = (groupName, value) =>
      page.getByRole("group", { name: groupName }).getByLabel(value);

    this.reportCheckbox = (label) => page.getByText(label, { exact: true });

    this.actionRadio = (text) => page.getByText(text, { exact: false });
  }

  // --- Individual Action Methods ---

  async selectOrderType(value: "1: interim" | "2: general" | "3: finl") {
    await this.orderTypeSelect.selectOption(value);
  }

  async setClosesCase(choice: "Yes" | "No") {
    await this.genericRadio("Does this order close the", choice).check();
  }

  async setCafcassReportRequired(choice: "Yes" | "No") {
    await this.genericRadio("Does Cafcass or Cafcass Cymru", choice).check();
  }

  async selectReports(reportNames: string[]) {
    for (const name of reportNames) {
      await this.reportCheckbox(name).click();
    }
  }

  async fillReportDueDate(d: string, m: string, y: string) {
    await this.dayInput.fill(d);
    await this.monthInput.fill(m);
    await this.yearInput.fill(y);
  }

  async setEndInvolvement(choice: "Yes" | "No") {
    await this.genericRadio("Does this order end the", choice).check();
  }

  async setServeNow(choice: "Yes" | "No") {
    await this.genericRadio("Do you want to serve the", choice).check();
  }

  async selectFinalAction(
    action: "Finalise the order" | "Save the order as a draft",
  ) {
    await this.actionRadio(action).click();
  }

  async completeSimpleOrderFlow(
    orderType: "1: interim" | "2: general" | "3: finl",
  ) {
    await this.selectOrderType(orderType);
    await this.setCafcassReportRequired("No");
    await this.setEndInvolvement("No");
    await this.setServeNow("Yes");
    await this.clickContinue();
  }
}
