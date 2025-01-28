import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { OtherPersonDetailsConfidentialityContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/otherPersonDetailsConfidentialityContent.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper.ts";
interface otherPersonDetailsConfidentialityOptions {
    page: Page;
    accessibilityTest: boolean;
    C100YesNoConfidentiality: boolean;
}

enum UniqueSelectors {
    yes = "#confidentiality",
    no = "#confidentiality-2",
}

export class OtherPersonDetailsConfidentiality {
    public static async otherPersonDetailsConfidentiality({
                                                              page: page,
                                                              accessibilityTest: accessibilityTest,
                                                              C100YesNoConfidentiality: C100YesNoConfidentiality
                                                          }: otherPersonDetailsConfidentialityOptions): Promise<void> {
        await this.checkPageLoads({
            page: page,
            accessibilityTest: accessibilityTest,
        });
        await this.fillInFields({
            page: page,
            C100YesNoConfidentiality: C100YesNoConfidentiality,
        });
    }
    private static async checkPageLoads({
                                            page: page,
                                            accessibilityTest: accessibilityTest,
                                        }: Partial<otherPersonDetailsConfidentialityOptions>): Promise<void> {
        if (!page) {
            throw new Error("Missing the page object.");
        }
        await Promise.all([
            Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.GovukHeadingXL}:has-text("${OtherPersonDetailsConfidentialityContent.pageTitle1}")`,
                1,
            ),
            Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.GovukHeadingXL}:has-text("${OtherPersonDetailsConfidentialityContent.pageTitle2}")`,
                1,
            ),
            Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.p}:text-is("${OtherPersonDetailsConfidentialityContent.hint}")`,
                1,
            ),
            Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.GovukFieldsetLegend}:has-text("${OtherPersonDetailsConfidentialityContent.formLabel1}")`,
                1,
            ),
            Helpers.checkVisibleAndPresent(
                page,
                `${Selectors.GovukFieldsetLegend}:has-text("${OtherPersonDetailsConfidentialityContent.formLabel2}")`,
                1,
            ),
        ])
        if (accessibilityTest) {
            await AccessibilityTestHelper.run(page);
        }
    }

    private static async fillInFields({
                                          page: page,
                                          C100YesNoConfidentiality: C100YesNoConfidentiality
                                      }: Partial<otherPersonDetailsConfidentialityOptions>): Promise<void> {
        if (!page) {
            throw new Error("Page object not initialised.");
        }
        if (C100YesNoConfidentiality) {
            await page.check(UniqueSelectors.yes);
        } else {
            await page.check(UniqueSelectors.no);
        }
        await page.click(
            `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
        );
    }
}
