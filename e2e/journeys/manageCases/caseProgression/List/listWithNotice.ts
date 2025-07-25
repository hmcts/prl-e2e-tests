import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import config from "../../../../utils/config.utils.ts";
import { Fl401ListOnNotice2Page } from "../../../../pages/manageCases/caseProgression/list/fl401ListOnNotice2Page.ts";
import { Fl401ListOnNoticeSubmitPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListOnNoticeSubmitPage.ts";
import { Fl401ListOnNoticeConfirmPage } from "../../../../pages/manageCases/caseProgression/list/fl401ListOnNoticeConfirmPage.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { Fl401ListOnNoticeConfirmContent } from "../../../../fixtures/manageCases/caseProgression/List/fl401ListOnNoticeConfirmContent.ts";
import { completeCheckApplicationAndSendToGatekeeper } from "../../../../common/caseHelpers/caseEventsHelper.ts";

interface ListWithNoticeParams {
  page: Page;
  browser: Browser;
  ccdRef: string;
  accessibilityTest: boolean;
}

export class ListWithNotice {
  public static async listWithNotice({
    page,
    browser,
    ccdRef,
    accessibilityTest,
  }: ListWithNoticeParams): Promise<void> {
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
    // check case notes are updated
    await this.checkCaseNotes(judgePage);
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
      Fl401ListOnNoticeConfirmContent,
      "text16",
      Selectors.GovukText16,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.Span}:text-is("${Fl401ListOnNoticeConfirmContent.span1}")`,
      1,
    );
  }
}
