import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Fl401ListWithoutNotice1Page } from "../../../../pages/manageCases/caseProgression/list/fl401ListWithoutNotice1Page.ts";
import { Fl401ListWithoutNoticeSubmitPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListWithoutNoticeSubmitPage.ts";
import { Fl401ListWithoutNoticeConfirmPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListWithoutNoticeConfirmPage.ts";
import { Fl401ListWithoutNoticeConfirmContent } from "../../../../fixtures/manageCases/caseProgression/List/fl401ListWithoutNoticeConfirmContent.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";

interface ListWithoutNoticeParams {
  page: Page;
  browser: Browser;
  ccdRef: string;
  caseType: solicitorCaseCreateType;
  accessibilityTest: boolean;
}

export class ListWithoutNotice {
  public static async listWithoutNotice({
    page,
    browser,
    ccdRef,
    caseType,
    accessibilityTest,
  }: ListWithoutNoticeParams): Promise<void> {
    switch (caseType) {
      case "C100":
        await Helpers.waitForTask(page, "Gatekeeping");
        await Helpers.chooseEventFromDropdown(page, "List without notice");
        //actions and page elements on list without notice is same for C100/FL401, so reusing to avoid duplication
        await Fl401ListWithoutNotice1Page.fl401ListWithoutNotice1Page(
          page,
          accessibilityTest,
        );
        await Fl401ListWithoutNoticeSubmitPage.fl401ListWithoutNoticeSubmitPage(
          page,
          accessibilityTest,
        );
        await Fl401ListWithoutNoticeConfirmPage.fl401ListWithoutNoticeConfirmPage(
          page,
          accessibilityTest,
        );

        //check if task gets auto-closed
        await Helpers.clickTab(page, "Tasks");
        await Helpers.waitForTaskToDisappear(page, "Gatekeeping");
        break;

      case "FL401":
        await Helpers.waitForTask(page, "Directions on Issue");
        await Helpers.assignTaskToMe(page, "Directions on Issue");
        await Helpers.chooseEventFromDropdown(page, "List without notice");
        await Fl401ListWithoutNotice1Page.fl401ListWithoutNotice1Page(
          page,
          accessibilityTest,
        );
        await Fl401ListWithoutNoticeSubmitPage.fl401ListWithoutNoticeSubmitPage(
          page,
          accessibilityTest,
        );
        await Fl401ListWithoutNoticeConfirmPage.fl401ListWithoutNoticeConfirmPage(
          page,
          accessibilityTest,
        );

        //check if task gets auto-closed
        await Helpers.clickTab(page, "Tasks");
        await Helpers.waitForTaskToDisappear(page, "Directions on Issue");
    }

    // check case notes are updated
    await this.checkCaseNotes(page);

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
