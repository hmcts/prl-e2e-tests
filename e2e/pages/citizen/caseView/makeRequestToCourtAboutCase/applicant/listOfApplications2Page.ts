import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";
import { ListOfApplications2Content } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/listOfApplications2Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";

export class ListOfApplications2Page {
  public static async listOfApplications2Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ListOfApplications2Content.GovukHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        7,
        ListOfApplications2Content,
        `GovukBody`,
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        ListOfApplications2Content,
        `GovukAccordionSection`,
        `${Selectors.GovukAccordionSection}`,
      ),
      Helpers.checkGroup(
        page,
        6,
        ListOfApplications2Content,
        `GovukLink`,
        `${Selectors.GovukLink}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
}
