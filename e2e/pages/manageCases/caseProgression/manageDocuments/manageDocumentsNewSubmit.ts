import { Page, expect } from "@playwright/test";
import { ManageDocumentsNewSubmitContent } from "../../../../fixtures/manageCases/caseProgression/manageDocuments/manageDocumentsNewSubmitContent.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

import { ManageDocumentsNew1Content } from "../../../../fixtures/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Content.ts";
import { AxeUtils } from "@hmcts/playwright-common";

interface ManageDocumentsNewSubmitPageParams {
  page: Page;
  accessibilityTest: boolean;
  documentParty: string;
  documentCategory: string;
  restrictDocument: boolean;
  confidentialDocument: boolean;
}

export class ManageDocumentsNewSubmitPage {
  public static async manageDocumentsNewSubmitPage({
    page,
    accessibilityTest,
    documentParty,
    documentCategory,
    restrictDocument,
    confidentialDocument,
  }: ManageDocumentsNewSubmitPageParams): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      documentParty,
      documentCategory,
      restrictDocument,
      confidentialDocument,
    });

    await this.saveAndContinue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    documentParty,
    documentCategory,
    restrictDocument,
    confidentialDocument,
  }: Partial<ManageDocumentsNewSubmitPageParams>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.headingH2}:text-is("${ManageDocumentsNewSubmitContent.headingH2}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ManageDocumentsNewSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        11,
        ManageDocumentsNewSubmitContent,
        "text16_",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${documentParty}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${documentCategory}")`,
        1,
      ),
    ]);
    if (confidentialDocument) {
      await expect(
        page
          .getByRole("row", {
            name: `${ManageDocumentsNewSubmitContent.text16_9} ${CommonStaticText.yes}`,
            exact: true,
          })
          .locator("td"),
      ).toBeVisible();
    } else {
      await expect(
        page
          .getByRole("row", {
            name: `${ManageDocumentsNewSubmitContent.text16_9} ${CommonStaticText.no}`,
            exact: true,
          })
          .locator("td"),
      ).toBeVisible();
    }
    if (restrictDocument) {
      await Promise.all([
        expect(
          page
            .getByRole("row", {
              name: `${ManageDocumentsNewSubmitContent.text16_10} ${CommonStaticText.yes}`,
              exact: true,
            })
            .locator("td"),
        ).toBeVisible(),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageDocumentsNewSubmitContent.text16_a}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${ManageDocumentsNew1Content.inputText}")`,
          1,
        ),
      ]);
    } else {
      await expect(
        page
          .getByRole("row", {
            name: `${ManageDocumentsNewSubmitContent.text16_10} ${CommonStaticText.no}`,
            exact: true,
          })
          .locator("td"),
      ).toBeVisible();
    }

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async saveAndContinue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
