import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { ReferenceContent } from "../../../../fixtures/citizen/caseView/requestMoreTime/referenceContent.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

enum UniqueSelectors {
  haveRefNumberYes = "#awp_have_hwfReference",
  haveRefNumberNo = "#awp_have_hwfReference-2",
  addRefNumber = "#awp_hwf_referenceNumber",
}

export class ReferencePage {
  public static async referencePage(
    page: Page,
    accessibilityTest: boolean,
    haveRefNumber: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, haveRefNumber);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: ReferenceContent.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ReferenceContent.GovukHeadingL}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
  private static async fillInFields(
    page: Page,
    haveRefNumber: boolean,
  ): Promise<void> {
    if (haveRefNumber) {
      await page.check(`${UniqueSelectors.haveRefNumberYes}`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabelS}:text-is("${ReferenceContent.GovukHeadingS}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${ReferenceContent.GovukLabel}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ReferenceContent.GovukHint}")`,
        1,
      );
      await page.fill(
        `${UniqueSelectors.addRefNumber}`,
        ReferenceContent.refNumber,
      );
    } else {
      await page.check(`${UniqueSelectors.haveRefNumberNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
