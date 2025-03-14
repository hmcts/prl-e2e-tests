import { Page, expect } from "@playwright/test";
import { Selectors } from "../../common/selectors.ts";
// import AccessibilityTestHelper from "../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../common/helpers.ts";
import { UploadYourDocumentsContent } from "../../fixtures/edgeCases/uploadYourDocumentsContent.ts";

import config from "../../config.ts";
import { EdgeCaseApplicationType } from "../../common/types.ts";

interface UploadYourDocumentsPageOptions {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
}

enum UniqueSelectors {
  fileUpload = "#applicationUpload",
}

export class UploadYourDocumentsPage {
  public static async uploadApplication({
    page,
    accessibilityTest,
    typeOfApplication,
  }: UploadYourDocumentsPageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest, typeOfApplication });
    await this.uploadFile({ page });
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    typeOfApplication,
  }: UploadYourDocumentsPageOptions): Promise<void> {
    const h1Locator = page.locator(
      `${Selectors.h1}:text("${UploadYourDocumentsContent.h1}")`,
    );
    await h1Locator.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        UploadYourDocumentsContent,
        "p",
        `${Selectors.p}`,
      ),
      expect(
        page
          .locator(Selectors.GovukLink)
          .filter({ hasText: UploadYourDocumentsContent.link1 }),
      ).toBeVisible(),
      expect(
        page
          .locator(Selectors.GovukSummaryText)
          .filter({ hasText: UploadYourDocumentsContent.details }),
      ).toBeVisible(),
    ]);
    if (typeOfApplication === "FGM" || typeOfApplication === "FMPO") {
      await expect(
        page
          .locator(Selectors.GovukWarningText)
          .filter({ hasText: UploadYourDocumentsContent.warning }),
      ).toBeVisible();
      await expect(
        page
          .locator(Selectors.p)
          .filter({ hasText: UploadYourDocumentsContent.p_optional }),
      ).toBeVisible();
    }
    await page.getByText(UploadYourDocumentsContent.details).click();
    await Helpers.checkGroup(
      page,
      4,
      UploadYourDocumentsContent,
      "li",
      `${Selectors.li}`,
    );
    if (accessibilityTest) {
      // await AccessibilityTestHelper.run(page);
    }
  }

  private static async uploadFile({ page }: { page: Page }): Promise<void> {
    if (!page) {
      throw new Error("Page is undefined in uploadFile.");
    }
    const fileInput = page.locator(UniqueSelectors.fileUpload);
    await fileInput.setInputFiles(config.testPdfFile);
    await page
      .getByRole("button", { name: UploadYourDocumentsContent.buttonText })
      .click();
    await expect(page.getByText("mockFile.pdf")).toBeVisible();
    await expect(
      page.getByRole("link", { name: UploadYourDocumentsContent.link2 }),
    ).toBeVisible();
  }
}
