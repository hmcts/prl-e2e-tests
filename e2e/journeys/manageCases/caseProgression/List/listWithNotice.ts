import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../utils/config.utils";
import { Fl401ListOnNotice2Page } from "../../../../pages/manageCases/caseProgression/list/fl401ListOnNotice2Page";
import { Fl401ListOnNoticeSubmitPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListOnNoticeSubmitPage";
import { Fl401ListOnNoticeConfirmPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListOnNoticeConfirmPage";
import { Selectors } from "../../../../common/selectors";
import { completeCheckApplicationAndSendToGatekeeper } from "../../../../common/caseHelpers/caseEventsHelper";
import { solicitorCaseCreateType } from "../../../../common/types.js";
import { C100ListOnNotice1Page } from "../../../../pages/manageCases/caseProgression/list/c100ListOnNotice1Page.js";
import { C100ListOnNotice2Page } from "../../../../pages/manageCases/caseProgression/list/c100ListOnNotice2Page.js";
import { C100ListOnNotice3Page } from "../../../../pages/manageCases/caseProgression/list/c100ListOnNotice3Page.js";
import { FL401CaseNotesTabContent } from "../../../../fixtures/manageCases/caseTabs/FL401/fl401CaseNotesTabContent.js";
import { C100CaseNotesTabContent } from "../../../../fixtures/manageCases/caseTabs/C100/c100CaseNotesTabContent.js";

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
    if (caseType === "FL401") {
      await completeCheckApplicationAndSendToGatekeeper(page, ccdRef);
    }

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

    switch (caseType) {
      case "C100":
        await Helpers.waitForTask(judgePage, "Gatekeeping");
        await Helpers.chooseEventFromDropdown(judgePage, "List on notice");
        await C100ListOnNotice1Page.c100ListOnNotice1Page(
          judgePage,
          accessibilityTest,
        );
        await C100ListOnNotice2Page.c100ListOnNotice2Page(
          judgePage,
          accessibilityTest,
        );
        await C100ListOnNotice3Page.c100ListOnNotice3Page(
          judgePage,
          accessibilityTest,
        );

        await Helpers.clickTab(judgePage, "Tasks");
        await Helpers.waitForTaskToDisappear(judgePage, "Gatekeeping");
        break;

      case "FL401":
        await Helpers.waitForTask(judgePage, "Directions on Issue");
        await Helpers.assignTaskToMe(judgePage, "Directions on Issue");
        await Helpers.chooseEventFromDropdown(judgePage, "List on notice");
        await Fl401ListOnNotice2Page.fl401ListOnNotice2Page(
          judgePage,
          accessibilityTest,
        );
        await Fl401ListOnNoticeSubmitPage.fl401ListOnNoticeSubmitPage(
          judgePage,
          accessibilityTest,
        );
        await Fl401ListOnNoticeConfirmPage.fl401ListOnNoticeConfirmPage(
          judgePage,
          accessibilityTest,
        );

        await Helpers.clickTab(judgePage, "Tasks");
        await Helpers.waitForTaskToDisappear(judgePage, "Directions on Issue");
        break;
    }

    // check case notes are updated
    await this.checkCaseNotes(judgePage, caseType);

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
