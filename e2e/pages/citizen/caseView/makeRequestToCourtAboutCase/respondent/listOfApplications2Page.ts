import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ListOfApplications2Content } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/respondent/listOfApplications2Content.ts";
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
        5,
        ListOfApplications2Content,
        `GovukBody`,
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        ListOfApplications2Content,
        `GovukAccordionSection`,
        `${Selectors.GovukAccordionSection}`,
      ),
      Helpers.checkGroup(
        page,
        4,
        ListOfApplications2Content,
        `GovukLink`,
        `${Selectors.GovukLink}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
