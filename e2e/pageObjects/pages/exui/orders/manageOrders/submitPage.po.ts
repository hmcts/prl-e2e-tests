import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

export class SubmitPage extends CheckYourAnswersPage {
  accessibilityTest: boolean;
  constructor(page: Page, accessibilityTest = false) {
    super(page, "Manage orders", CommonStaticText.submit);
    this.accessibilityTest = accessibilityTest;
  }

  async validateAccessibility(): Promise<void> {
    if (this.accessibilityTest) {
      await new AxeUtils(this.page).audit();
    }
  }
}
