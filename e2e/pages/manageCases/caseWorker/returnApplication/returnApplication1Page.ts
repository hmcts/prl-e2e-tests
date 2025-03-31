import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ReturnApplication1Content } from "../../../../fixtures/manageCases/caseWorker/returnApplication/returnApplication1Content";
import { Helpers } from "../../../../common/helpers";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { solicitorCaseCreateType } from "../../../../common/types";

interface ReturnApplication1PageOptions {
  page: Page;
  caseType: solicitorCaseCreateType;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  c100rejectReasonDiv = "div#rejectReason",
  fl401rejectReasonDiv = "div#fl401RejectReason",
}

export class ReturnApplication1Page {
  public static async returnApplication1Page({
    page,
    caseType,
    accessibilityTest,
  }: ReturnApplication1PageOptions): Promise<void> {
    await this.checkPageLoads({ page, caseType, accessibilityTest });
    await this.fillInFields(page);
    await Helpers.clickButton(page, CommonStaticText.continue);
  }

  private static async checkPageLoads({
    page,
    caseType,
    accessibilityTest,
  }: Partial<ReturnApplication1PageOptions>) {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ReturnApplication1Content.govUkHeadingL}")`,
    );
    await pageTitle.waitFor({ state: "visible" });
    const rejectReasonDiv =
      caseType == "C100"
        ? UniqueSelectors.c100rejectReasonDiv
        : UniqueSelectors.fl401rejectReasonDiv;
    await Helpers.checkGroup(
      page,
      2,
      ReturnApplication1Content,
      "h3",
      Selectors.h3,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.p}:has-text("${ReturnApplication1Content.p}")`,
      1,
    );
    if (caseType == "C100") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:has-text("${ReturnApplication1Content.miamCertificateformLabel}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:has-text("${ReturnApplication1Content.miamExemptionLabel}")`,
        1,
      );
    }
    if (caseType == "FL401") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:has-text("${ReturnApplication1Content.witnessStatemeentLabel}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:has-text("${ReturnApplication1Content.applicationIncorrectLabel}")`,
        1,
      );
    }
    await Helpers.checkGroupHasText(
      page,
      8,
      ReturnApplication1Content,
      "formLabel",
      `${rejectReasonDiv} ${Selectors.GovukFormLabel}`,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await Helpers.clickCheckbox(page, ReturnApplication1Content.formLabel6);
  }
}
