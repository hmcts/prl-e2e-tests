import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { C100ConfidentialDetailsTabContent } from "../../../../fixtures/manageCases/caseTabs/C100/c100ConfidentialDetailsTabContent.ts";
import { ManageDocumentsNew1Content } from "../../../../fixtures/manageCases/caseProgression/manageDocuments/manageDocumentsNew1Content.js";

enum UniqueSelectors {
  refugeDocumentsSection = "td#case-viewer-field-read--refugeDocuments",
}

export class C100ConfidentialDetailsTabPage {
  public static async c100ConfidentialDetailsTabPage(
    page: Page,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
    otherPersonLivesInRefuge: boolean,
  ): Promise<void> {
    await this.clickTab(page);
    await this.checkPageLoads(
      page,
      accessibilityTest,
      applicantLivesInRefuge,
      otherPersonLivesInRefuge,
    );
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
    otherPersonLivesInRefuge: boolean,
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.div}${Selectors.GovukText16}:text-is("${C100ConfidentialDetailsTabContent.applicantSection}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.div}${Selectors.GovukText16}:text-is("${C100ConfidentialDetailsTabContent.c8DraftDocumentSection}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.div}${Selectors.GovukText16}:text-is("${C100ConfidentialDetailsTabContent.c8DraftDocumentWelshSection}")`,
      1,
    );
    if (applicantLivesInRefuge || otherPersonLivesInRefuge) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}${Selectors.GovukText16}:text-is("${C100ConfidentialDetailsTabContent.refugeSection}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${C100ConfidentialDetailsTabContent.refugeSectionPartyType}")`,
        applicantLivesInRefuge && otherPersonLivesInRefuge ? 2 : 1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${C100ConfidentialDetailsTabContent.refugeSectionPartyName}")`,
        applicantLivesInRefuge && otherPersonLivesInRefuge ? 2 : 1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${C100ConfidentialDetailsTabContent.refugeSectionDocumentName}")`,
        applicantLivesInRefuge && otherPersonLivesInRefuge ? 2 : 1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${C100ConfidentialDetailsTabContent.refugeSectionUploadedDate}")`,
        applicantLivesInRefuge && otherPersonLivesInRefuge ? 2 : 1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${C100ConfidentialDetailsTabContent.refugeSectionDocument}")`,
        applicantLivesInRefuge && otherPersonLivesInRefuge ? 2 : 1,
      );
      if (applicantLivesInRefuge) {
        await Helpers.checkGroup(
          page,
          2,
          C100ConfidentialDetailsTabContent,
          "refugeSectionApplicantDetailsText16",
          `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}`,
        );
      }
      if (otherPersonLivesInRefuge) {
        await Helpers.checkGroup(
          page,
          2,
          C100ConfidentialDetailsTabContent,
          "refugeSectionOtherPersonDetailsText16",
          `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}`,
        );
      }
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.refugeDocumentsSection} ${Selectors.Span}${Selectors.GovukText16}:text-is("${C100ConfidentialDetailsTabContent.refugeSectionFile}")`,
        applicantLivesInRefuge && otherPersonLivesInRefuge ? 2 : 1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${C100ConfidentialDetailsTabContent.link}")`,
        applicantLivesInRefuge && otherPersonLivesInRefuge ? 2 : 1,
      );
    }

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async clickTab(page: Page): Promise<void> {
    await page
      .getByRole("tab", {
        name: C100ConfidentialDetailsTabContent.tabName,
        exact: true,
      })
      .click();
  }

  public static async c100ConfidentialDetailsTabPageManageDocuments(
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
            C100ConfidentialDetailsTabContent.text16_restrictedDoc,
          ),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByText(
            C100ConfidentialDetailsTabContent.text16_docCategory,
          ),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByRole("columnheader", {
            name: "Uploaded by",
          }),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByText(
            C100ConfidentialDetailsTabContent.text16_submittedDate,
          ),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByText(
            C100ConfidentialDetailsTabContent.text16_submittedBy,
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
            name: C100ConfidentialDetailsTabContent.testPdf,
          }),
        ).toBeVisible(),
        expect(
          restrictedDocsSection
            .getByRole("columnheader", {
              name: C100ConfidentialDetailsTabContent.text16_uploadedBy,
            })
            .locator("span"),
        ).toBeVisible(),
        expect(
          restrictedDocsSection.getByRole("columnheader", {
            name: C100ConfidentialDetailsTabContent.text16_reasonRestrict,
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
            C100ConfidentialDetailsTabContent.text16_confidentialDoc,
          ),
        ).toBeVisible(),
        expect(
          confidentialDocsSection.getByText(
            C100ConfidentialDetailsTabContent.text16_docCategory,
          ),
        ).toBeVisible(),
        expect(
          confidentialDocsSection.getByText(
            C100ConfidentialDetailsTabContent.text16_submittedBy,
          ),
        ).toBeVisible(),
        expect(
          confidentialDocsSection.getByText(
            C100ConfidentialDetailsTabContent.text16_submittedDate,
          ),
        ).toBeVisible(),
        expect(
          page
            .getByRole("cell", {
              name: `${C100ConfidentialDetailsTabContent.refugeSectionDocument} ${C100ConfidentialDetailsTabContent.testPdf} Uploaded by`,
            })
            .getByRole("link")
            .filter({ hasText: C100ConfidentialDetailsTabContent.testPdf }),
        ).toBeVisible(),
        expect(
          confidentialDocsSection.getByText(
            C100ConfidentialDetailsTabContent.text16_uploadedBy,
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
