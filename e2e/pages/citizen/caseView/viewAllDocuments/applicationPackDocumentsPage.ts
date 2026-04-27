import { AxeUtils } from "@hmcts/playwright-common";
import { ApplicationPackDocumentsContent } from "../../../../fixtures/citizen/caseView/viewAllDocuments/applicationPackDocumentsContent.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";

interface ApplicationPackDocumentsParams {
  page: Page;
  accessibilityTest: boolean;
  isApplicant: boolean;
}

export class ApplicationPackDocumentsPage {
  public static async applicationPackDocumentsPage({
    page,
    accessibilityTest,
    isApplicant,
  }: ApplicationPackDocumentsParams): Promise<void> {
    await this.checkPageLoads({ page, isApplicant, accessibilityTest });
  }

  private static async checkPageLoads({
    page,
    isApplicant,
    accessibilityTest,
  }: Partial<ApplicationPackDocumentsParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined)");
    }
    await page
      .locator(Selectors.h1, {
        hasText: ApplicationPackDocumentsContent.pageTitle,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ApplicationPackDocumentsContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${ApplicationPackDocumentsContent.p1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:has-text("${ApplicationPackDocumentsContent.p2}")`,
        1,
      ),
    ]);

    if (isApplicant) {
      await Helpers.checkGroup(
        page,
        13,
        ApplicationPackDocumentsContent,
        "applicantLink",
        Selectors.a,
      );
    } else {
      await Helpers.checkGroup(
        page,
        18,
        ApplicationPackDocumentsContent,
        "respondentLink",
        Selectors.a,
      );
    }

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
}
