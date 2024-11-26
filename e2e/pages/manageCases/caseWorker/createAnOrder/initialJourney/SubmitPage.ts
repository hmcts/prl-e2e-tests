import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/initialJourney/submitContent";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

interface SubmitPageContent {
  page: Page;
  accessibilityTest: boolean;
}

export class CreateAnOrderSubmitPage {
  public static async createAnOrderSubmitPage({
    page,
    accessibilityTest,
  }: SubmitPageContent): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: Partial<SubmitPageContent>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${SubmitContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Helpers.checkGroup(
      page,
      2,
      SubmitContent,
      "text16",
      Selectors.GovukText16,
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
      `${Selectors.button}:text-is("${SubmitContent.createMyDummyCase}")`,
    );
  }
}
