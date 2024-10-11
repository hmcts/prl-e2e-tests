import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors";
import { ContactRepresentativeContent } from "../../fixtures/citizen/createCase/C100/c100ScreeningSections/contactRepresentativeContent";
import { Helpers } from "../../common/helpers";
import AccessibilityTestHelper from "../../common/accessibilityTestHelper";

interface ContactRepresentativePageOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ContactRepresentativePage {
  public static async contactRepresentativePage({
    page,
    accessibilityTest,
  }: ContactRepresentativePageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ContactRepresentativeContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${ContactRepresentativeContent.body}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ContactRepresentativeContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ContactRepresentativeContent.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        ContactRepresentativeContent,
        "list",
        `${Selectors.li}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ContactRepresentativeContent.closeApplication}")`,
    );
  }
}
