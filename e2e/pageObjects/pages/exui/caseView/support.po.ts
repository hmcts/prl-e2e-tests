import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { Page } from "@playwright/test";
import { CaseFlagSectionComponent } from "../../../components/exui/caseFlagSection.component.js";

export class SupportPage extends CaseAccessViewPage {
  readonly caseFlagSection: CaseFlagSectionComponent =
    new CaseFlagSectionComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Support" }).click();
  }
}
