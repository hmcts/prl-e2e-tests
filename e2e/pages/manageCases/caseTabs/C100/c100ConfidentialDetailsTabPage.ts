import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { C100ConfidentialDetailsTabContent } from "../../../../fixtures/manageCases/caseTabs/C100/c100ConfidentialDetailsTabContent";

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
      await AccessibilityTestHelper.run(page);
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
}
