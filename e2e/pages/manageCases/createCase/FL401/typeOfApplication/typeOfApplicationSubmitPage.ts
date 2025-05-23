import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/typeOfApplication/submitContent";
import { Helpers } from "../../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { dummyCaseNumber } from "./typeOfApplication2Page";

export class TypeOfApplicationSubmitPage {
  public static async typeOfApplicationSubmitPage(
    page: Page,
    isLinked: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageContent(page, isLinked, accessibilityTest);
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    isLinked: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page),
      this.checkFilledInData(page, isLinked),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${SubmitContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${SubmitContent.h2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        SubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.textChange}")`,
        2,
      ),
    ]);
  }

  private static async checkFilledInData(
    page: Page,
    isLinked: boolean,
  ): Promise<void> {
    if (isLinked) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.isLinkedText}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.caseNumberLinkQuestion}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${dummyCaseNumber}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${SubmitContent.isNotLinkedText}")`,
        1,
      );
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${SubmitContent.saveAndContinue}")`,
    );
  }
}
