import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { OtherPartyNotSeeDocumentContent } from "../../../../../fixtures/citizen/caseView/uploadDocuments/witnessStatementsAndEvidence/otherPartyNotSeeDocumentContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";

export enum UniqueSelectors {
  reasonToRestrictDoc = "#reasonsToRestrictDocument",
}

export class OtherPartyNotSeeDocumentPage {
  public static async otherPartyNotSeeDocumentPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingXL, {
        hasText: OtherPartyNotSeeDocumentContent.GovukHeadingXL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${OtherPartyNotSeeDocumentContent.GovukCaptionL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${OtherPartyNotSeeDocumentContent.GovukLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${OtherPartyNotSeeDocumentContent.GovukLabel2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${OtherPartyNotSeeDocumentContent.GovukHint1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${OtherPartyNotSeeDocumentContent.GovukHint2}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.check('input[type="checkbox"][value="hasConfidentailDetails"]');
    await page.check(
      'input[type="checkbox"][value="containsSentsitiveInformation"]',
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukLabel}:text-is("${OtherPartyNotSeeDocumentContent.GovukLabel3}")`,
      1,
    );
    await page.fill(
      `${UniqueSelectors.reasonToRestrictDoc}`,
      OtherPartyNotSeeDocumentContent.reasonToRestrictDocTextBox,
    );
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
