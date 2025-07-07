import { Helpers } from "../../common/helpers.ts";
import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors.ts";
import { CommonContent } from "../../fixtures/manageCases/commonContent.ts";

export class CommonPage {
  protected static async checkCommonContent(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLogo}:text-is("${CommonContent.logo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeaderLink}:text-is("${CommonContent.manageCases}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeaderNavigationLink}:text-is("${CommonContent.signOut}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukNavigationLink}:text-is("${CommonContent.caseList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukNavigationLink}:text-is("${CommonContent.createCase}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukNavigationLink}:text-is("${CommonContent.noticeOfChange}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukNavigationLink}:text-is("${CommonContent.findCase}")`,
        1,
      ),
    ]);
  }
}
