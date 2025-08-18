import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { Page } from "@playwright/test";

export class SummaryPage extends CaseAccessViewPage {
  constructor(page: Page) {
    super(page);
  }
}
