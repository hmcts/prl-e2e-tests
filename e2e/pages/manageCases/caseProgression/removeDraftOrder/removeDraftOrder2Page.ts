import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { RemoveDraftOrder2Content } from "../../../../fixtures/manageCases/caseProgression/removeDraftOrder/removeDraftOrder2Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import {CommonStaticText} from "../../../../common/commonStaticText.ts";

interface RemoveDraftOrder2PageParams {
    page: Page;
    accessibilityTest: boolean;
}

enum UniqueSelectors {
    inputTextField = "#removeDraftOrderText",
}

export class RemoveDraftOrder2Page {
    public static async removeDraftOrder2Page({
                                                  page,
                                                  accessibilityTest,
                                              }: RemoveDraftOrder2PageParams): Promise<void> {
        await this.checkPageLoads(page, accessibilityTest);
        await this.fillInField(page);
        await this.continue(page);
    }

    private static async checkPageLoads(page: Page, accessibilityTest: boolean) {
        const pageH2 = page.locator(
            `${Selectors.h2}:text-is("${RemoveDraftOrder2Content.h2}")`
        );
        await pageH2.waitFor();
        await Promise.all([
            await Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.GovukHeadingL}:text-is("${RemoveDraftOrder2Content.pageTitle}")`,
                1
            ),
            await Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.GovukFormLabel}:text-is("${RemoveDraftOrder2Content.formLabel}")`,
                1
            ),
            await Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.p}:text-is("${RemoveDraftOrder2Content.p}")`,
                1
            ),
        ])

        if (accessibilityTest) {
            await AccessibilityTestHelper.run(page);
        }
    }

    private static async fillInField(page: Page) {
        await page.fill(UniqueSelectors.inputTextField, RemoveDraftOrder2Content.inputText);
    }

    private static async continue(page: Page) {
        await page.click(
            `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        );
    }
}
