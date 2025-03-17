import { Page, expect } from "@playwright/test";
import { Selectors } from "../../common/selectors.ts";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../common/helpers.ts";

interface PayYourFeePageOptions {
    page: Page;
    accessibilityTest: boolean;
}

export class PayYourFeePage {
    public async payYourFeePage({ page, accessibilityTest }: PayYourFeePageOptions): Promise<void> {
        await this.checkPageLoads(page, accessibilityTest);
        await page.click(Selectors.edgeCaseContinue);
    }

    private async checkPageLoads({ page, accessibilityTest }: PayYourFeePageOptions): Promise<void> {

    }
}