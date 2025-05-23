import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { LinkCases2Content } from "../../../../fixtures/manageCases/caseLinking/linkCases/linkCases2Conent";
import { Helpers } from "../../../../common/helpers";
// import { AxeUtils } from "@hmcts/playwright-common";

interface LinkCases2PageOptions {
  page: Page;
  linkedCaseNumber: string;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  caseReferenceInput = "div#caseNumber input",
  commentsInput = "#otherDescription",
}

export class LinkCases2Page {
  public static async linkCases2Page({
    page,
    linkedCaseNumber,
    accessibilityTest,
  }: LinkCases2PageOptions): Promise<void> {
    linkedCaseNumber = Helpers.getHyphenatedCaseReference(linkedCaseNumber);
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page, linkedCaseNumber });
    await this.continue(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<LinkCases2PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${LinkCases2Content.h1}")`,
    );
    await pageTitle.waitFor({ state: "visible" });
    await Promise.all([
      Helpers.checkGroup(page, 2, LinkCases2Content, "h3", Selectors.h3),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.div}:text-is("${LinkCases2Content.div}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        17,
        LinkCases2Content,
        "label",
        Selectors.GovukLabel,
      ),
    ]);
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); //#TODO: Awaiting for accessibility ticket FPVTL-338 to be resolved
    }
  }

  private static async fillInFields({
    page,
    linkedCaseNumber,
  }: Partial<LinkCases2PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (!linkedCaseNumber) {
      throw new Error("Cannot link case without the case number");
    }
    await page.fill(UniqueSelectors.caseReferenceInput, linkedCaseNumber);
    await Helpers.clickCheckbox(page, LinkCases2Content.label2);
    await Helpers.clickCheckbox(page, LinkCases2Content.label17);
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h3}:text-is("${LinkCases2Content.otherReasonsCommentsH3}")`,
      1,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukHint}:text-is("${LinkCases2Content.hint}")`,
      1,
    );
    await page.fill(
      UniqueSelectors.commentsInput,
      LinkCases2Content.otherReasonInput,
    );
    await Helpers.clickButton(page, CommonStaticText.proposeCaseLink);
    await this.verifyProposedCaseLinkDetails(page, linkedCaseNumber);
  }

  private static async verifyProposedCaseLinkDetails(
    page: Page,
    caseNumber: string,
  ): Promise<void> {
    await Helpers.checkGroup(
      page,
      5,
      LinkCases2Content,
      "tableHeading",
      Selectors.th,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Span}:has-text("${caseNumber}")`,
      1,
    );
    await Helpers.checkGroup(
      page,
      3,
      LinkCases2Content,
      "proposedCaseDetailsTd",
      Selectors.td,
    );
    await Helpers.checkGroup(
      page,
      2,
      LinkCases2Content,
      "proposedCaseDetailsSpan",
      Selectors.Span,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukLink}:has-text("${LinkCases2Content.removeLink}")`,
      1,
    );
  }

  private static async continue(page: Page) {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
