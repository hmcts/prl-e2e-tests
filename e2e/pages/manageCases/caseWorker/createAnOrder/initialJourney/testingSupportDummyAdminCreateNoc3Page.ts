import { Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../../common/types.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { TestingSupportDummyAdminCreateNoc3Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/initialJourney/TestingSupportDummyAdminCreateNoc3Content.ts";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";

interface testingSupportDummyAdminCreateNocPage3Options {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

enum caseName {
  fieldIDFL401 = "#applicantOrRespondentCaseName",
  fieldIDC100 = "#applicantCaseName",
}

enum CaseNameFormLabel {
  formLabelSelector = "span.form-label",
}

export class TestingSupportDummyAdminCreateNoc3Page {
  public static async testingSupportDummyAdminCreateNoc3Page({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
  }: testingSupportDummyAdminCreateNocPage3Options): Promise<string> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({
      page,
      accessibilityTest,
      solicitorCaseCreateType,
    });
    return await this.fillInFields({ page, solicitorCaseCreateType });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
  }: Partial<testingSupportDummyAdminCreateNocPage3Options>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${TestingSupportDummyAdminCreateNoc3Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    if (solicitorCaseCreateType === "C100") {
      const firstNthFormLabel = page
        .locator(
          `${CaseNameFormLabel.formLabelSelector}:text-is("${TestingSupportDummyAdminCreateNoc3Content.formLabel1}")`,
        )
        .nth(0);
      await firstNthFormLabel.waitFor();
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${TestingSupportDummyAdminCreateNoc3Content.formHintC100}")`,
        1,
      );
    } else if (solicitorCaseCreateType === "FL401") {
      const firstNthFormLabel = page
        .locator(
          `${CaseNameFormLabel.formLabelSelector}:text-is("${TestingSupportDummyAdminCreateNoc3Content.formLabel1}")`,
        )
        .nth(1);
      await firstNthFormLabel.waitFor();
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${TestingSupportDummyAdminCreateNoc3Content.formHintFL401}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
    solicitorCaseCreateType,
  }: Partial<testingSupportDummyAdminCreateNocPage3Options>): Promise<string> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const generatedName: string = Helpers.generateCaseName();

    if (solicitorCaseCreateType == "FL401") {
      await page.fill(`${caseName.fieldIDFL401}`, generatedName);
    } else if (solicitorCaseCreateType == "C100") {
      await page.fill(`${caseName.fieldIDC100}`, generatedName);
    } else {
      throw new Error("Need to select a solicitorCaseCreateType");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    return generatedName;
  }
}
