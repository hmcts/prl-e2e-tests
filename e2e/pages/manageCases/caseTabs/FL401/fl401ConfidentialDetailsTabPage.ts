import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { FL401ConfidentialDetailsTabContent } from "../../../../fixtures/manageCases/caseTabs/FL401/fl401ConfidentialDetailsTabContent";

enum UniqueSelectors {
  refugeDocumentsSection = "td#case-viewer-field-read--refugeDocuments",
}

export class FL401ConfidentialDetailsTabPage {
  public static async fl401ConfidentialDetailsTabPage(
    page: Page,
    accessibilityTest: boolean,
    applicantLivesInRefuge: boolean,
  ): Promise<void> {
    await this.clickTab(page);
    await this.checkPageLoads(page, accessibilityTest, applicantLivesInRefuge);
  }

  private static async checkPageLoads(
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
}
