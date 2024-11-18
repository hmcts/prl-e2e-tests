import { Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../../common/types";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { TestingSupportDummyAdminCreateNoc3Content } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/initialJourney/TestingSupportDummyAdminCreateNoc3Content";
import { CommonStaticText } from "../../../../../common/commonStaticText";

interface testingSupportDummyAdminCreateNocPage3Options {
  page: Page;
  accessibilityTest: boolean;
  solicitorCaseCreateType: solicitorCaseCreateType;
}

enum caseName {
  fieldID = "#applicantCaseName",
}

export class TestingSupportDummyAdminCreateNoc3Page {
  public static async testingSupportDummyAdminCreateNoc3Page({
    page,
    accessibilityTest,
    solicitorCaseCreateType,
  }: testingSupportDummyAdminCreateNocPage3Options): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({
      page,
      accessibilityTest,
      solicitorCaseCreateType,
    });
    await this.fillInFields({ page });
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
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${TestingSupportDummyAdminCreateNoc3Content.formLabel1}")`,
      1,
    );
    if (solicitorCaseCreateType === "C100") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${TestingSupportDummyAdminCreateNoc3Content.formHintC100}")`,
        1,
      );
    } else if (solicitorCaseCreateType === "FL401") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${TestingSupportDummyAdminCreateNoc3Content.formHintFL401}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<testingSupportDummyAdminCreateNocPage3Options>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const generatedName: string = Helpers.generateCaseName();
    await page.fill(`${caseName.fieldID}`, generatedName);
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
