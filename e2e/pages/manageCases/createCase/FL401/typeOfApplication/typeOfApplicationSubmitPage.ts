import { Page, selectors } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/typeOfApplication/submitContent";
import { Helpers } from "../../../../../common/helpers";

export class TypeOfApplicationSubmitPage {
  public static async typeOfApplicationSubmitPage(
    page: Page,
    isLinked: boolean,

  ): Promise<void> {

  }

  private static async checkPageLoads(
    page: Page
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${SubmitContent.pageTitle}`
    )
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.h2}:text-is("${SubmitContent.h2}")`,
          1
        ),
        Helpers.checkGroup(
          page,
          3,
          SubmitContent,
          'text16',
          `${Selectors.GovukText16}`
        )
      ]
    )
  }
}