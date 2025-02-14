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
  tsSolicitorApplication = "TS-Solicitor application",
}

export class SolicitorCreatePage {
  public static async solicitorCreatePage(
    page: Page,
    accessibilityTest: boolean,
    isDummyCase: boolean = false,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, isDummyCase);
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

  private static async fillInFields(
    page: Page,
    isDummyCase: boolean,
  ): Promise<void> {
    await page.selectOption(fieldIds.jurisdiction, options.familyPrivateLaw);
    await page.selectOption(fieldIds.caseType, options.caseType);
    // If event dropdown fails to load then fail the test fast - interim solution until the underlying problem is fixed
    const eventDropdown = page.locator(fieldIds.event);
    const eventOptions = await eventDropdown.evaluate((el: HTMLSelectElement) =>
      Array.from(el.options).map((option) => option.value),
    );
    if (eventOptions.length <= 1) {
      throw new Error(
        "Could not create a case - unable to select an event from the dropdown",
      );
    }
    if (isDummyCase) {
      await page.selectOption(fieldIds.event, options.tsSolicitorApplication);
    } else {
      await page.selectOption(fieldIds.event, options.solicitorApplication);
    }
    await page.click(
      `${Selectors.button}:text-is("${SolicitorCreateContent.button}")`,
    );
  }
}
