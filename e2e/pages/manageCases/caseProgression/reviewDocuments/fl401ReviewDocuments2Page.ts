import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { Helpers } from "../../../../common/helpers";
import { Selectors } from "../../../../common/selectors";
import {
  yesNoDontKnow,
  documentSubmittedBy,
  documentCategory,
} from "../../../../common/types";
import { Fl401ReviewDocuments2Content } from "../../../../fixtures/manageCases/caseProgression/reviewDocuments/fl401ReviewDocuments2Content";

interface FL401ReviewDocuments2PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoNotSureRestrictDocs: yesNoDontKnow;
  documentSubmittedBy: documentSubmittedBy;
  documentCategory: documentCategory;
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
    yesNoNotSureRestrictDocs,
    documentSubmittedBy,
    documentCategory,
  }: FL401ReviewDocuments2PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      documentSubmittedBy,
      documentCategory,
    });
    await this.fillInFields({
      page,
      yesNoNotSureRestrictDocs: yesNoNotSureRestrictDocs,
    });
  }

  private static async checkPageLoads({
    page,
    documentSubmittedBy,
    documentCategory,
  }: Partial<FL401ReviewDocuments2PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${Fl401ReviewDocuments2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    const documentLink =
      documentSubmittedBy == "CourtNav"
        ? Fl401ReviewDocuments2Content.testPdflink
        : Fl401ReviewDocuments2Content.mockPdflink;
    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        Fl401ReviewDocuments2Content,
        "h3_",
        `${Selectors.h3}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${documentSubmittedBy}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${documentCategory}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.li}:text-is("${CommonStaticText.yes}")`,
        documentCategory == "Position statements" ? 2 : 1,
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
        `${Selectors.a}:text-is("${documentLink}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${Fl401ReviewDocuments2Content.p}")`,
        1,
      ),
    ]);
    // if (accessibilityTest) {
    //   await AccessibilityTestHelper.run(page); #TODO Disabled pending ticket FPET-1209
    // }
  }

  private static async fillInFields({
    page,
    yesNoNotSureRestrictDocs,
  }: Partial<FL401ReviewDocuments2PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    switch (yesNoNotSureRestrictDocs) {
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
        throw new Error(
          `Unknown value for yesNoNotSureRestrictDocs: ${yesNoNotSureRestrictDocs}`,
        );
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
