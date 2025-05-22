import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { FL401ConfidentialDetailsTabContent } from "../../../../fixtures/manageCases/caseTabs/FL401/fl401ConfidentialDetailsTabContent.ts";
import { ManageDocumentsNew1Content } from "../../../../fixtures/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Content.ts";

enum UniqueSelectors {
  refugeDocumentsSection = "td#case-viewer-field-read--refugeDocuments",
}

export class FL401ConfidentialDetailsTabPage {
  public static async fl401ConfidentialDetailsTabPageC8Refuge(
    page: Page,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await this.clickTab(page);
    await this.checkPageLoadsC8Refuge(
      page,
      accessibilityTest,
      applicantLivesInRefuge,
    );
  }

  private static async checkPageLoadsC8Refuge(
    page: Page,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.div}${Selectors.GovukText16}:text-is("${FL401ConfidentialDetailsTabContent.applicantSection}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.div}${Selectors.GovukText16}:text-is("${FL401ConfidentialDetailsTabContent.c8DraftDocumentSection}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.div}${Selectors.GovukText16}:text-is("${FL401ConfidentialDetailsTabContent.c8DraftDocumentWelshSection}")`,
      1,
    );
    if (applicantLivesInRefuge) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}${Selectors.GovukText16}:text-is("${FL401ConfidentialDetailsTabContent.refugeSection}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${FL401ConfidentialDetailsTabContent.refugeSectionPartyType}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${FL401ConfidentialDetailsTabContent.refugeSectionPartyName}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${FL401ConfidentialDetailsTabContent.refugeSectionDocumentName}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${FL401ConfidentialDetailsTabContent.refugeSectionUploadedDate}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${FL401ConfidentialDetailsTabContent.refugeSectionDocument}")`,
        1,
      );
      await Helpers.checkGroup(
        page,
        2,
        FL401ConfidentialDetailsTabContent,
        "refugeSectionApplicantDetailsText16",
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}`,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${FL401ConfidentialDetailsTabContent.refugeSectionFile}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${FL401ConfidentialDetailsTabContent.link}")`,
        1,
      );
    }

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async clickTab(page: Page): Promise<void> {
    await page
      .getByRole("tab", {
        name: FL401ConfidentialDetailsTabContent.tabName,
        exact: true,
      })
      .click();
  }

  public static async fl401ConfidentialDetailsTabPageManageDocuments(
    page: Page,
    documentParty: string,
    documentCategory: string,
    restrictDocument: boolean,
    confidentialDocument: boolean,
  ): Promise<void> {
    const confidentialDocsSection = page.locator(
      "#case-viewer-field-read--confidentialDocuments",
    );
    const restrictedDocsSection = page.locator(
      "#case-viewer-field-read--restrictedDocuments",
    );
    if (restrictDocument) {
      await page
        .locator("ccd-field-read-label")
        .filter({ hasText: new RegExp(`^${documentCategory}$`) })
        .locator("div")
        .click();
      await Promise.all([
        expect(
          restrictedDocsSection.getByText(
            FL401ConfidentialDetailsTabContent.text16_restrictedDoc,
          ),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByText(
            FL401ConfidentialDetailsTabContent.text16_docCategory,
          ),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByRole("columnheader", {
            name: "Uploaded by",
          }),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByText(
            FL401ConfidentialDetailsTabContent.text16_submittedDate,
          ),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByText(
            FL401ConfidentialDetailsTabContent.text16_submittedBy,
          ),
        ).toBeVisible(),
        expect(
          page
            .locator("ccd-field-read-label")
            .filter({ hasText: new RegExp(`^${documentCategory}$`) })
            .locator("div"),
        ).toBeVisible(),
        expect(
          page
            .locator("ccd-field-read-label")
            .filter({ hasText: new RegExp(`^${documentParty}$`) })
            .locator("div"),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByRole("columnheader", {
            name: "Document",
            exact: true,
          }),
        ).toBeVisible(),
        expect(
          page.getByRole("link", {
            name: FL401ConfidentialDetailsTabContent.testPdf,
          }),
        ).toBeVisible(),
        expect(
          restrictedDocsSection
            .getByRole("columnheader", {
              name: FL401ConfidentialDetailsTabContent.text16_uploadedBy,
            })
            .locator("span"),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByRole("columnheader", {
            name: FL401ConfidentialDetailsTabContent.text16_reasonRestrict,
          }),
        ).toBeVisible(),
        expect(
          page
            .locator("ccd-field-read-label")
            .filter({ hasText: `${ManageDocumentsNew1Content.inputText}` })
            .locator("div")
            .nth(0),
        ).toBeVisible(),
      ]);
    } else if (confidentialDocument && !restrictDocument) {
      await confidentialDocsSection.getByText(documentCategory).click();
      await Promise.all([
        expect(
          confidentialDocsSection.getByText(
            FL401ConfidentialDetailsTabContent.text16_confidentialDoc,
          ),
        ).toBeVisible(),
        expect(
          confidentialDocsSection.getByText(
            FL401ConfidentialDetailsTabContent.text16_docCategory,
          ),
        ).toBeVisible(),
        expect(
          confidentialDocsSection.getByText(
            FL401ConfidentialDetailsTabContent.text16_submittedBy,
          ),
        ).toBeVisible(),
        expect(
          confidentialDocsSection.getByText(
            FL401ConfidentialDetailsTabContent.text16_submittedDate,
          ),
        ).toBeVisible(),
        expect(
          page
            .getByRole("cell", {
              name: `${FL401ConfidentialDetailsTabContent.refugeSectionDocument} ${FL401ConfidentialDetailsTabContent.testPdf} Uploaded by`,
            })
            .getByRole("link")
            .filter({ hasText: FL401ConfidentialDetailsTabContent.testPdf }),
        ).toBeVisible(),
        expect(
          confidentialDocsSection.getByText(
            FL401ConfidentialDetailsTabContent.text16_uploadedBy,
            { exact: true },
          ),
        ).toBeVisible(),
        expect(
          confidentialDocsSection.getByText(documentCategory),
        ).toBeVisible(),
        expect(confidentialDocsSection.getByText(documentParty)).toBeVisible(),
      ]);
    }
  }
}
