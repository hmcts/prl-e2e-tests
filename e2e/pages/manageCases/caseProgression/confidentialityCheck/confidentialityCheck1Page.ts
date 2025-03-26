import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import { ConfidentialityCheck1Content } from "../../../../fixtures/manageCases/caseProgression/confidentialityCheck/confidentialityCheck1Content.ts";
import {
  clippingCoords,
  ExuiMediaViewerPage,
} from "../../exuiMediaViewer.po.ts";

interface ConfidentialityCheck1PageParams {
  page: Page;
  browserName: string;
  accessibilityTest: boolean;
  isApplicationServedAfterConfidentialityCheck: boolean;
}

enum UniqueSelectors {
  yes = "#applicationServedYesNo_Yes",
  no = "#applicationServedYesNo_No",
  inputText = "#rejectionReason",
}

export class ConfidentialityCheck1Page {
  public static async confidentialityCheck1Page({
    page,
    browserName,
    accessibilityTest,
    isApplicationServedAfterConfidentialityCheck,
  }: ConfidentialityCheck1PageParams): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    // only run the pdf check in chromium because the test is not run often enough to produce snapshots for all browsers
    if (browserName === "chromium") {
      await this.checkConfidentialContactDetailsNoticePdfContents(page);
    }
    await this.fillInFields(page, isApplicationServedAfterConfidentialityCheck);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(
        `${Selectors.GovukHeadingL}:text-is("${ConfidentialityCheck1Content.pageTitle}")`,
      )
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukWarningText}:text-is("${ConfidentialityCheck1Content.warningText}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        4,
        ConfidentialityCheck1Content,
        "text16",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ConfidentialityCheck1Content.documentText16}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ConfidentialityCheck1Content.servedByText16}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ConfidentialityCheck1Content.prlCourtAdminText16}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ConfidentialityCheck1Content.packCreatedDateText16}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ConfidentialityCheck1Content.respondentsPackText16}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.annex1Anchor}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.powerOfArrestAnchor}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.mockFileAnchor}")`,
        3,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.privacyNoticeAnchor}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.finalDocumentAnchor}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.coverLetterAnchor}"):visible`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        ConfidentialityCheck1Content,
        "caseFieldLabel",
        Selectors.GovukTextFieldLabel,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.c8DocumentAnchor}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ConfidentialityCheck1Content.formLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkConfidentialContactDetailsNoticePdfContents(
    page: Page,
  ): Promise<void> {
    // check applicant pdf
    await this.pdfCheck(page, true);
    // check respondent pdf
    await this.pdfCheck(page, false);
  }

  private static async pdfCheck(
    page: Page,
    isApplicant: boolean,
  ): Promise<void> {
    const locatorText: string = isApplicant
      ? "Applicants pack"
      : "Respondents pack";
    const packLocator = page.locator("ccd-read-complex-field-table", {
      hasText: locatorText,
    });
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      packLocator
        .locator(Selectors.a, {
          hasText: "Annex 1 - Confidential contact details notice.pdf",
        })
        .click(),
    ]);
    const pdfName: string = `${isApplicant ? "applicant" : "respondent"}-confidential-contact-details-notice`;
    await pdfPage.waitForLoadState();
    const mediaViewerPage = new ExuiMediaViewerPage(pdfPage);
    await mediaViewerPage.runVisualTestOnAllPages(
      pdfPage,
      pdfName,
      clippingCoords.centeredPageWithoutToolbar,
    );
  }

  private static async fillInFields(
    page: Page,
    yesNoConfidentialityCheck: boolean,
  ): Promise<void> {
    if (yesNoConfidentialityCheck) {
      await page.click(UniqueSelectors.yes);
    } else {
      await page.click(UniqueSelectors.no);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ConfidentialityCheck1Content.hiddenFormLabel}")`,
        1,
      );
      await page.fill(
        UniqueSelectors.inputText,
        ConfidentialityCheck1Content.inputText,
      );
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
