import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { SolicitorCreateContent } from "../../../../fixtures/manageCases/createCase/initialJourney/solicitorCreateContent";
import { Helpers } from "../../../../common/helpers";

enum fieldIds {
  jurisdiction = "#cc-jurisdiction",
  caseType = "#cc-case-type",
  event = "#cc-event",
}

enum options {
  familyPrivateLaw = "Family Private Law",
  caseType = "C100 & FL401 Applications",
  solicitorApplication = "Solicitor application",
}

export class SolicitorCreatePage {
  public static async solicitorCreatePage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${SolicitorCreateContent.pageTitle}")`,
    );
    await Helpers.checkGroup(
      page,
      3,
      SolicitorCreateContent,
      "formLabel",
      Selectors.GovukFormLabel,
    );
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.selectOption(fieldIds.jurisdiction, options.familyPrivateLaw);
    await page.selectOption(fieldIds.caseType, options.caseType);
    await page.selectOption(fieldIds.event, options.solicitorApplication);
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreateContent.button}")`,
    );
  }
}
