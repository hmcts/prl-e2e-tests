import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { Fl401ListOnNotice2Page } from "../../../../pages/manageCases/caseProgression/list/fl401ListOnNotice2Page.ts";
import { Fl401ListOnNoticeSubmitPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListOnNoticeSubmitPage.ts";
import { Fl401ListOnNoticeConfirmPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListOnNoticeConfirmPage.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { C100ListOnNotice1Page } from "../../../../pages/manageCases/caseProgression/list/c100ListOnNotice1Page.ts";
import { C100ListOnNotice2Page } from "../../../../pages/manageCases/caseProgression/list/c100ListOnNotice2Page.ts";
import { C100ListOnNotice3Page } from "../../../../pages/manageCases/caseProgression/list/c100ListOnNotice3Page.ts";
import { FL401CaseNotesTabContent } from "../../../../fixtures/manageCases/caseTabs/FL401/fl401CaseNotesTabContent.ts";
import { C100CaseNotesTabContent } from "../../../../fixtures/manageCases/caseTabs/C100/c100CaseNotesTabContent.ts";

interface ListWithNoticeParams {
  page: Page;
  browser: Browser;
  ccdRef: string;
  caseType: solicitorCaseCreateType;
  accessibilityTest: boolean;
}

export class ListWithNotice {
  public static async listWithNotice({
    page,
    browser,
    ccdRef,
    caseType,
    accessibilityTest,
  }: ListWithNoticeParams): Promise<void> {
    switch (caseType) {
      case "C100":
        await Helpers.waitForTask(page, "Gatekeeping");
        await Helpers.chooseEventFromDropdown(page, "List on notice");
        await C100ListOnNotice1Page.c100ListOnNotice1Page(
          page,
          accessibilityTest,
        );
        await C100ListOnNotice2Page.c100ListOnNotice2Page(
          page,
          accessibilityTest,
        );
        await C100ListOnNotice3Page.c100ListOnNotice3Page(
          page,
          accessibilityTest,
        );

        await Helpers.clickTab(page, "Tasks");
        await Helpers.waitForTaskToDisappear(page, "Gatekeeping");
        break;

      case "FL401":
        await Helpers.waitForTask(page, "Directions on Issue");
        await Helpers.assignTaskToMe(page, "Directions on Issue");
        await Helpers.chooseEventFromDropdown(page, "List on notice");
        await Fl401ListOnNotice2Page.fl401ListOnNotice2Page(
          page,
          accessibilityTest,
        );
        await Fl401ListOnNoticeSubmitPage.fl401ListOnNoticeSubmitPage(
          page,
          accessibilityTest,
        );
        await Fl401ListOnNoticeConfirmPage.fl401ListOnNoticeConfirmPage(
          page,
          accessibilityTest,
        );

        await Helpers.clickTab(page, "Tasks");
        await Helpers.waitForTaskToDisappear(page, "Directions on Issue");
        break;
    }

    // check case notes are updated
    await this.checkCaseNotes(page, caseType);

    //check if list on notice task is getting initiated for HCA and Case manager
    await Helpers.checkTaskAppearsForUser(
      browser,
      "caseWorker",
      ccdRef,
      "Listing instructions (refer to case notes)",
    );
    await Helpers.checkTaskAppearsForUser(
      browser,
      "caseManager",
      ccdRef,
      "Listing instructions (refer to case notes)",
    );
  }

  private static async checkCaseNotes(
    page: Page,
    caseType: string,
  ): Promise<void> {
    await page
      .locator(Selectors.tab, {
        hasText: "Case Notes",
      })
      .click();
    if (caseType === "FL401") {
      await Helpers.checkGroup(
        page,
        2,
        FL401CaseNotesTabContent,
        "text16",
        Selectors.GovukText16,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${FL401CaseNotesTabContent.span1}")`,
        1,
      );
    } else {
      await Helpers.checkGroup(
        page,
        2,
        C100CaseNotesTabContent,
        "text16",
        Selectors.GovukText16,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${C100CaseNotesTabContent.span1}")`,
        1,
      );
    }
  }
}
