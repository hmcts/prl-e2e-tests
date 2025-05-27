import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { ListOfApplications1Content } from "../../../../../fixtures/citizen/caseView/makeRequestToCourtAboutCase/applicant/listOfApplications1Content.ts";
import { Helpers } from "../../../../../common/helpers.ts";

export class ListOfApplications1Page {
  public static async listOfApplications1Page(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.next(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukHeadingL, {
        hasText: ListOfApplications1Content.GovukHeadingL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkGroup(
        page,
        7,
        ListOfApplications1Content,
        `GovukBody`,
        `${Selectors.GovukBody}`,
      ),
      Helpers.checkGroup(
        page,
        5,
        ListOfApplications1Content,
        `GovukAccordionSection`,
        `${Selectors.GovukAccordionSection}`,
      ),
      Helpers.checkGroup(
        page,
        7,
        ListOfApplications1Content,
        `GovukLink`,
        `${Selectors.GovukLink}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ListOfApplications1Content.GovukLinkC2}")`,
        2,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
  private static async next(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukLink}:has-text("${ListOfApplications1Content.next}")`,
    );
  }
}
