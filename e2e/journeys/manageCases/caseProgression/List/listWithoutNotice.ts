import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Fl401ListWithoutNotice1Page } from "../../../../pages/manageCases/caseProgression/list/fl401ListWithoutNotice1Page.ts";
import { Fl401ListWithoutNoticeSubmitPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListWithoutNoticeSubmitPage.ts";
import { Fl401ListWithoutNoticeConfirmPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListWithoutNoticeConfirmPage.ts";
import { Fl401ListWithoutNoticeConfirmContent } from "../../../../fixtures/manageCases/caseProgression/List/fl401ListWithoutNoticeConfirmContent.ts";
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
    await Helpers.assignTaskToMe(judgePage, "Directions on Issue");
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

    //check if task gets auto-closed
    await Helpers.clickTab(judgePage, "Tasks");
    await Helpers.waitForTaskToDisappear(judgePage, "Directions on Issue");

    // check case notes are updated
    await this.checkCaseNotes(judgePage);

    //check if list on notice task is getting initiated for HCA and Case manager
    await Helpers.checkTaskAppearsForUser(
      browser,
      "caseWorker",
      ccdRef,
      "List without notice hearing (see case notes)",
    );
    await Helpers.checkTaskAppearsForUser(
      browser,
      "caseManager",
      ccdRef,
      "List without notice hearing (see case notes)",
    );
  }

  private static async checkCaseNotes(page: Page): Promise<void> {
    await page
      .locator(Selectors.tab, {
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
