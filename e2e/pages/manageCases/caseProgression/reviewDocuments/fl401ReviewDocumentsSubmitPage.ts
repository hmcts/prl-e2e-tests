import { Page, expect } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";
import {
  yesNoDontKnow,
  documentSubmittedBy,
} from "../../../../common/types.ts";
import { Fl401ReviewDocumentsSubmitContent } from "../../../../fixtures/manageCases/caseProgression/reviewDocuments/fl401ReviewDocumentsSubmitContent.ts";
import { Fl401ReviewDocuments2Content } from "../../../../fixtures/manageCases/caseProgression/reviewDocuments/fl401ReviewDocuments2Content.ts";

interface FL401ReviewDocumentsSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoNotSureRestrictDocs: yesNoDontKnow;
  documentSubmittedBy: documentSubmittedBy;
}

export class FL401ReviewDocumentsSubmitPage {
  public static async fl401ReviewDocumentsSubmitPage({
    page,
    accessibilityTest,
    yesNoNotSureRestrictDocs,
    documentSubmittedBy,
  }: FL401ReviewDocumentsSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      yesNoNotSureRestrictDocs: yesNoNotSureRestrictDocs,
      documentSubmittedBy,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    yesNoNotSureRestrictDocs,
    documentSubmittedBy,
  }: Partial<FL401ReviewDocumentsSubmitPageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const optionsMap: Record<string, string> = {
      yes: `${Selectors.GovukText16}:text-is("${CommonStaticText.yes}")`,
      no: `${Selectors.GovukText16}:text-is("${CommonStaticText.no}")`,
      dontKnow: `${Selectors.GovukText16}:text-is("${Fl401ReviewDocumentsSubmitContent.notSure}")`,
    };

    let yesNoNotSureSelector: string;
    if (yesNoNotSureRestrictDocs) {
      yesNoNotSureSelector = optionsMap[yesNoNotSureRestrictDocs];
    } else {
      throw new Error(
        `Unknown value for yesNoNotSureRestrictDocs: ${yesNoNotSureRestrictDocs}`,
      );
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${Fl401ReviewDocumentsSubmitContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    const documentLink =
      documentSubmittedBy == "CourtNav"
        ? Fl401ReviewDocuments2Content.testPdflink
        : Fl401ReviewDocuments2Content.mockPdflink;
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        Fl401ReviewDocumentsSubmitContent,
        "text16_",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${Fl401ReviewDocumentsSubmitContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(page, yesNoNotSureSelector, 1),
    ]);
    await expect(
      page.locator("ccd-read-dynamic-list-field span", {
        hasText: `${documentLink}`,
      }),
    ).toBeVisible();
    // if (accessibilityTest) {
    //   await new AxeUtils(page).audit(); #TODO Disabled pending ticket FPET-1209
    // }
  }

  private static async fillInFields({
    page,
  }: Partial<FL401ReviewDocumentsSubmitPageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
