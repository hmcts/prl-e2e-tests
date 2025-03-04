import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { Selectors } from "../../../../common/selectors";
import { Fl401ListWithoutNotice1Page } from "../../../../pages/manageCases/caseProgression/list/fl401ListWithoutNotice1Page";
import { Fl401ListWithoutNoticeSubmitPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListWithoutNoticeSubmitPage";
import { Fl401ListWithoutNoticeConfirmPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListWithoutNoticeConfirmPage";
import { Fl401ListWithoutNoticeConfirmContent } from "../../../../fixtures/manageCases/caseProgression/List/fl401ListWithoutNoticeConfirmContent";
import { completeCheckApplicationAndSendToGatekeeper } from "../../../../common/caseHelpers/caseEventsHelper.ts";

interface ListWithoutNoticeParams {
  page: Page;
  browser: Browser;
  ccdRef: string;
  accessibilityTest: boolean;
}

export class ListWithoutNotice {
  public static async listWithoutNotice({
    page,
    browser,
    ccdRef,
    accessibilityTest,
  }: ListWithoutNoticeParams): Promise<void> {
    await completeCheckApplicationAndSendToGatekeeper(page, ccdRef);
    const judgePage: Page = await Helpers.openNewBrowserWindow(
      browser,
      "judge",
    );
    await Helpers.goToCase(
      judgePage,
      config.manageCasesBaseURLCase,
      ccdRef,
      "tasks",
    );
    await Helpers.waitForTask(judgePage, "Directions on Issue");
    await Helpers.chooseEventFromDropdown(judgePage, "List without notice");
    await Fl401ListWithoutNotice1Page.fl401ListWithoutNotice1Page(
      judgePage,
      accessibilityTest,
    );
    await Fl401ListWithoutNoticeSubmitPage.fl401ListWithoutNoticeSubmitPage(
      judgePage,
      accessibilityTest,
    );
    await Fl401ListWithoutNoticeConfirmPage.fl401ListWithoutNoticeConfirmPage(
      judgePage,
      accessibilityTest,
    );
    // check case notes are updated
    await this.checkCaseNotes(judgePage);
  }

  private static async checkCaseNotes(page: Page): Promise<void> {
    await page
      .locator(Selectors.daTasklist, {
        hasText: "Case Notes",
      })
      .click();
    await Helpers.checkGroup(
      page,
      2,
      Fl401ListWithoutNoticeConfirmContent,
      "text16",
      Selectors.GovukText16,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Span}:text-is("${Fl401ListWithoutNoticeConfirmContent.span1}")`,
      1,
    );
  }
}
