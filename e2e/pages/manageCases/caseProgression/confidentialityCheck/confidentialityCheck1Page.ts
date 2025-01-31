import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Helpers } from "../../../../common/helpers.ts";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";
import {
  ConfidentialityCheck1Content
} from "../../../../fixtures/manageCases/caseProgression/confidentialityCheck/confidentialityCheck1Content.ts";

interface ConfidentialityCheck1PageParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoConfidentialityCheck: boolean;
}

enum UniqueSelectors {
  yes = "#applicationServedYesNo_Yes",
  no = "#applicationServedYesNo_No",
  inputText = "#rejectionReason"
}

export class ConfidenitalityCheck1Page {
  public static async confidentialityCheck1Page({
    page,
    accessibilityTest,
    yesNoConfidentialityCheck,
  }: ConfidentialityCheck1PageParams): Promise<void> {
    await this.checkPageLoads({page, accessibilityTest});
    await this.fillInFields({page, yesNoConfidentialityCheck});
  }

  private static async checkPageLoads({page, accessibilityTest}: Partial<ConfidentialityCheck1PageParams>): Promise<void> {
    if (!page) {
      throw new Error("No page specified");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ConfidentialityCheck1Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.annexA}")`,
        2,
        ),
      Helpers.checkVisibleAndPresent(page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.powerOfArrestA}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.mockFileA}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(page,
        `${Selectors.a}:text-is("${ConfidentialityCheck1Content.privacyNoticeA}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(page,
        `${Selectors.strong}:text-is("${ConfidentialityCheck1Content.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ConfidentialityCheck1Content,
        "a",
        Selectors.a
      ),
      Helpers.checkGroup(
        page,
        16,
        ConfidentialityCheck1Content,
        "text16",
        Selectors.GovukText16
      ),
      Helpers.checkGroup(
        page,
        16,
        ConfidentialityCheck1Content,
        "caseFieldLabel",
        Selectors.GovukTextFieldLabel
      ),
      Helpers.checkVisibleAndPresent(page,
        `${Selectors.GovukFormLabel}:text-is("${ConfidentialityCheck1Content.formLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(page,
        `${Selectors.GovukFormLabel}:text-is("${CommonStaticText.no}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({page, yesNoConfidentialityCheck}: Partial<ConfidentialityCheck1PageParams>): Promise<void> {
    if (!page) {
      throw new Error("No page specified");
    }
    if (yesNoConfidentialityCheck) {
      await page.click(UniqueSelectors.yes);
    } else {
      await page.click(UniqueSelectors.no);
      await Helpers.checkVisibleAndPresent(page,
      `${Selectors.GovukFormLabel}:text-is("${ConfidentialityCheck1Content.hiddenFormLabel}")`,
        1,
      );
      await page.fill(UniqueSelectors.inputText, ConfidentialityCheck1Content.inputText);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}