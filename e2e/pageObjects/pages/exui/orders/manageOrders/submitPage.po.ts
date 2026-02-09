import { expect, Locator, Page } from "@playwright/test";
import { Base } from "../../../base.po.ts";
import { test } from "../../../../../tests/fixtures.ts";
import { AxeUtils } from "@hmcts/playwright-common";

type LabelValuePair = { label: string; value: string };

export class SubmitPage extends Base {
    accessibilityTest: boolean;
    private readonly headings: string[] = [
    "Manage orders",
    "Check your answers",
    "When do you want to serve the order?",
    ];

    private readonly labelsAndText: string[] = [
    "FamilyMan ID:",
    "Casenumber:",
    "Check the information below carefully.",
    ];

    private readonly navigationButtons: string[] = ["Previous", "Submit", "Cancel"];

    private readonly expectedLabelValues: LabelValuePair[] = [
    { label: "What do you want to do?", value: "Upload an order" },
    { label: "Child arrangement orders", value: "Blank order or directions (C21)" },
    { label: "Select the type of order", value: "Blank order or directions (C21): application refused" },
    { label: "At which hearing was the order approved?", value: "No hearings available" },
    { label: "Select or amend the title of the Judge or magistrate", value: "Her Honour Judge" },
    { label: "Does someone need to check the order?", value: "No checks are required" },
    { label: "Date order made", value: "10 Oct 2025" },
    { label: "What type of order is this?", value: "Interim" },
    { label: "Does Cafcass or Cafcass Cymru need to provide a report?", value: "No" },
    { label: "Do you want to serve the order now?", value: "No" },
    { label: "What would you like to do with the order?", value: "Save the order as a draft" },
    ];

    private readonly labelsThatMustHaveChangeLink: string[] = [
    "What do you want to do?",
    "Child arrangement orders",
    "Is the order by consent?",
    "Select the type of order",
    "Was the order approved at a hearing?",
    "At which hearing was the order approved?",
    "Select or amend the title of the Judge or magistrate",
    "Judge's full name",
    "Full name of Justices' Legal Adviser",
    "Date order made",  
    "Is the order about all the children?",
    "Upload Order",
    "Does someone need to check the order?",
    "What type of order is this?",
    "Does Cafcass or Cafcass Cymru need to provide a report?",
    "Does this order end the involvement of Cafcass or Cafcass Cymru in this case?",
    "Do you want to serve the order now?",
    "What would you like to do with the order?",
    ];
    

    constructor(page: Page, accessibilityTest = false) {
        super(page);
        this.accessibilityTest = accessibilityTest;
    }

    async assertPageContentsToBeVisible(): Promise<void> {
        for (const heading of this.headings) {
        await test.step(`Heading should be visible: "${heading}"`, async () => {
        await expect(this.page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
        });
        }

        for (const txt of this.labelsAndText) {
        await test.step(`Text should be visible: "${txt}"`, async () => {
        await expect(this.page.getByText(txt)).toBeVisible();
        });
        }

        //   Check Submit and Previous buttons 
        for (const nav of ["Submit", "Previous"]) {
        await test.step(`Button should be visible and enabled: "${nav}"`, async () => {
            const button = this.page.getByRole("button", { name: nav, exact: true });

            await expect(button, `Expected "${nav}" button to be visible`).toBeVisible();
            await expect(button, `Expected "${nav}" button to be enabled`).toBeEnabled();
        });
        }
        // Then check Cancel link
        await test.step(`Cancel link should be visible and clickable`, async () => {
        const cancelLink = this.page.getByRole("link", { name: "Cancel", exact: true });

        await expect(cancelLink, `Expected "Cancel" link to be visible`).toBeVisible();
        await expect(cancelLink, `Expected "Cancel" link to be enabled`).toBeEnabled();
        });

    }

    async assertExpectedLabelValuesPresent(
        expected: ReadonlyArray<LabelValuePair> = this.expectedLabelValues
        ): Promise<void> {
        // Ensure we are on the right page/section
        await expect(
            this.page.getByRole("heading", { name: "Check your answers", exact: true })
        ).toBeVisible();

        // Wait for the table to be present
        const checkYourAnswersTable = this.page.locator('table.form-table');
        await expect(checkYourAnswersTable).toBeVisible({ timeout: 30000 });

        // Wait for at least one row to be present
        const firstRow = this.page.locator('table.form-table tr.ng-star-inserted').first();
        await expect(firstRow).toBeVisible({ timeout: 30000 });

        // Get count of rows for debugging
        const rowCount = await this.page.locator('table.form-table tr.ng-star-inserted').count();
        console.log(`Found ${rowCount} table rows`);

        for (const { label, value } of expected) {
            await test.step(`Check answers row: "${label}" -> "${value}"`, async () => {
            // Find the row that contains the label in the <th> element
            const row = this.page.locator('table.form-table tr.ng-star-inserted').filter({
                has: this.page.locator('th.case-field-label', { hasText: label }),
            });

            await expect(
                row, 
                `Row not found for label: "${label}"`
            ).toHaveCount(1, { timeout: 10000 });

            // Within that row, assert the value is present in the <td> cell
            const valueCell = row.locator('td.case-field-content');

            await expect(
                valueCell,
                `Value mismatch for label "${label}". Expected: "${value}"`
            ).toContainText(value);

            // Verify the label text is in the <th> cell
            const keyCell = row.locator('th.case-field-label');
            await expect(keyCell).toContainText(label);
            });
        }
    }

    async assertChangeLinksPresentForLabels(): Promise<void> {
        // Wait for the table to be ready
        await expect(
            this.page.getByRole("button", { name: "Submit", exact: true })
        ).toBeVisible({ timeout: 30000 });

        console.log(`Checking Change links for ${this.labelsThatMustHaveChangeLink.length} labels...`);

        for (const label of this.labelsThatMustHaveChangeLink) {
            await test.step(`Verify Change link exists for: "${label}"`, async () => {
                // Find the row that contains this label in the <th> element
                const row = this.page.locator('table.form-table tr.ng-star-inserted').filter({
                    has: this.page.locator('th.case-field-label', { hasText: label }),
                });

                await expect(
                    row, 
                    `Row not found for label: "${label}"`
                ).toHaveCount(1, { timeout: 10000 });

                // Find the Change link in the <td class="case-field-change"> cell
                const changeLink = row.locator('td.case-field-change a');

                await expect(
                    changeLink,
                    `Missing Change link for label: "${label}"`
                ).toBeVisible({ timeout: 5000 });

                await expect(
                    changeLink,
                    `Expected exactly one Change link for label: "${label}"`
                ).toHaveCount(1);
            });
        }

        console.log(`✓ Successfully verified Change links for all ${this.labelsThatMustHaveChangeLink.length} labels`);
    }

    async validateAccessibility(): Promise<void> {
        if (this.accessibilityTest) {
        await new AxeUtils(this.page).audit();
        }
    }
   
}
