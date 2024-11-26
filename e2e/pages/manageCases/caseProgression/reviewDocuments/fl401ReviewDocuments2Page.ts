import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Fl401ReviewDocuments2Content } from "../../../../fixtures/manageCases/caseProgression/reviewDocuments/fl401ReviewDocuments2Content";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { yesNoDontKnow } from "../../../../common/types";

interface FL401ReviewDocuments2PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoNotSureReviewDocs: yesNoDontKnow;
}

enum radioIds {
  yes = "#reviewDecisionYesOrNo-yes",
  no = "#reviewDecisionYesOrNo-no",
  notSure = "#reviewDecisionYesOrNo-notSure",
}

export class FL401ReviewDocuments2Page {
  public static async fl401ReviewDocuments2Page({
    page,
    accessibilityTest,
    yesNoNotSureReviewDocs,
  }: FL401ReviewDocuments2PageOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, yesNoNotSureReviewDocs });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<FL401ReviewDocuments2PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${Fl401ReviewDocuments2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        Fl401ReviewDocuments2Content,
        "h3_",
        `${Selectors.h3}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        Fl401ReviewDocuments2Content,
        "li_",
        `${Selectors.li}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CommonStaticText.yes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${Fl401ReviewDocuments2Content.govHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${Fl401ReviewDocuments2Content.formHint}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${Fl401ReviewDocuments2Content.label}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${Fl401ReviewDocuments2Content.link}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${Fl401ReviewDocuments2Content.p}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    yesNoNotSureReviewDocs,
  }: Partial<FL401ReviewDocuments2PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    switch (yesNoNotSureReviewDocs) {
      case "yes":
        await page.click(radioIds.yes);
        break;
      case "no":
        await page.click(radioIds.no);
        break;
      case "dontKnow":
        await page.click(radioIds.notSure);
        break;
      default:
        throw new Error(`Unknown value for yesNoNotSureReviewDocs: ${yesNoNotSureReviewDocs}`);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
