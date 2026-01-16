import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { CaseFlagSectionComponent } from "../../../components/exui/caseFlagSection.component.js";
import { Page } from "@playwright/test";

export class CaseFlagsPage extends CaseAccessViewPage {
  readonly caseFlagSection: CaseFlagSectionComponent =
    new CaseFlagSectionComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
    await this.page.getByRole("tab", { name: "Case Flags" }).click();
  }
}
