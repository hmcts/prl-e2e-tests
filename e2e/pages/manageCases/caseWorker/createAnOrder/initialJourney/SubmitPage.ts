import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/initialJourney/submitContent";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface SubmitPageContent {
  page: Page;
  accessibilityTest: boolean;
  generatedName: string;
}

export class TestingSupportDummyAdminCreateNoc2Page {
  public static async testingSupportDummyAdminCreateNoc2Page({
    page,
    accessibilityTest,
    generatedName,
  }: SubmitPageContent): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest, generatedName });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    generatedName,
  }: Partial<SubmitPageContent>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is(${SubmitContent.pageTitle})`,
    );
    await pageTitle.waitFor();
    await Helpers.checkGroup(
      page,
      2,
      SubmitContent,
      "text16",
      Selectors.GovukText16,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${generatedName}")`,
      1,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<SubmitPageContent>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.click(
      `${Selectors.button}:text-is(${SubmitContent.createMyDummyCase})`,
    );
  }
}
