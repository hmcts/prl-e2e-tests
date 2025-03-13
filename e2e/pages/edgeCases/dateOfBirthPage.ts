import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors.ts";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../common/helpers.ts";
import { DateOfBirthContent } from "../../fixtures/edgeCases/dateOfBirthContent.ts";

interface DateOfBirthOptions {
    page: Page;
    accessibilityTest: boolean;
    under18: boolean;
}

enum UniqueSelectors {
    day = "#applicantDateOfBirth-day",
    month = "#applicantDateOfBirth-month",
    year = "#applicantDateOfBirth-year",
}

export class DateOfBirthPage {
    public static async dateOfBirth({
                                              page,
                                              accessibilityTest,
                                              under18,
                                          }: DateOfBirthOptions): Promise<void> {
        await this.checkPageLoads(page, accessibilityTest);
        if (under18){
            await this.fillInDOB(page, under18);
        }
        const continueButton = "#main-form-submit";
        await page.click(continueButton);
    }

    private static async checkPageLoads(
        page: Page,
        accessibilityTest?: boolean,
    ): Promise<void> {
        await page.waitForSelector(
            `${Selectors.h1}:text-is("${DateOfBirthContent.h1}")`,
        );
        await Promise.all([
            Helpers.checkGroup(
                page,
                3,
                DateOfBirthContent,
                "formLabel",
                `${Selectors.GovukLabel}`,
            ),
            Helpers.checkGroup(
                page,
                2,
                DateOfBirthContent,
                "hint",
                `${Selectors.GovukHint}`,
            ),
        ]);
        if (accessibilityTest) {
            await AccessibilityTestHelper.run(page);
        }
    }
    private static async fillInDOB(
        page: Page,
        under18: boolean,
    ): Promise<void> {
        const [day,month,year] = Helpers.generateDOB(under18);
        await page.fill(UniqueSelectors.day, day);
        await page.fill(UniqueSelectors.month, month);
        await page.fill(UniqueSelectors.year, year);
    }
}
