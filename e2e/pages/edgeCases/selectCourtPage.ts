import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors.ts";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../common/helpers.ts";
import { SelectCourtContent } from "../../fixtures/edgeCases/selectCourtContent.ts";

interface SelectCourtPageOptions {
    page: Page;
    accessibilityTest: boolean;
}

enum UniqueSelectors {
    court = "#selectedCourtId",
}

export class SelectCourtPage {
    public static async selectCourtPage({
        page,
        accessibilityTest,
    }: SelectCourtPageOptions): Promise<void> {
        await this.checkPageLoads(page, accessibilityTest);
        await this.fillInFields(page);
        await page.click(Selectors.edgeCaseContinue);
    }

    private static async checkPageLoads(
        page: Page,
        accessibilityTest?: boolean,
    ): Promise<void> {
        await page.waitForSelector(
            `${Selectors.h1}:text-is(${SelectCourtContent.h1}`,
        );
        await Promise.all([
            Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.GovukHint}:text-is(${SelectCourtContent.hint})`,
                1,
            ),
            Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.GovukLabel}:text-is(${SelectCourtContent.label})`,
                1,
            ),
        ]);
        if (accessibilityTest) {
            await AccessibilityTestHelper.run(page);
        }
    }
    private static async fillInFields(page: Page): Promise<void> {
        await page.selectOption(UniqueSelectors.court, { value: "1" });
    }
}