import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { WithdrawApplicationEventSubmitContent } from "../../../../fixtures/manageCases/caseProgression/withdrawApplication/withdrawApplicationEventSubmitContent.ts";
import { WithdrawApplicationEvent1Content} from "../../../../fixtures/manageCases/caseProgression/withdrawApplication/withdrawApplicationEvent1Content.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";


interface WithdrawApplicationEventSubmitPageOptions {
    page: Page;
    accessibilityTest: boolean;
    withdrawApplication: boolean;
}

export class WithdrawApplicationEventSubmitPage {
    public static async withdrawApplicationEventSubmitPage({
                                                                page,
                                                                accessibilityTest,
                                                                withdrawApplication,
                                                            }: WithdrawApplicationEventSubmitPageOptions): Promise<void> {
        await this.checkPageLoads(page, accessibilityTest, withdrawApplication);
        await this.saveAndContinue(page);
    }

    private static async checkPageLoads({
                                            page,
                                            accessibilityTest,
                                        }: WithdrawApplicationEventSubmitPageOptions) {
        if (!page) {
            throw new Error("No page found");
        }
        const pageTitle = page.locator(
            `${Selectors.GovukHeadingL}:text-is("${WithdrawApplicationEventSubmitContent.govUkHeadingL}")`,
        );
        await pageTitle.waitFor();
        await Promise.all([
            Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.h2}:text-is("${WithdrawApplicationEventSubmitContent.headingH2}")`,
                1,
            ),
            Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.p}:text-is("${WithdrawApplicationEventSubmitContent.p}")`,
                1,
            ),
            Helpers.checkGroup(
                page,
                2,
                StatementOfService1Content,
                "formLabel",
                Selectors.GovukFormLabel,
            ),
        ]);
        if (accessibilityTest) {
            await AccessibilityTestHelper.run(page);
        }
    }


    private static async saveAndContinue(page: Page) {
        await page.click(
            `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
        );
    }
}
