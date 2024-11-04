import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors";
import { MainlyLiveWithContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/mainlyLiveWithContent";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";

interface mainlyLiveWithOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  errorMessaging: boolean;
}

const radioId = "#mainlyLiveWith";

export class MainlyLiveWithPage {
  public static async mainlyLiveWithPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: mainlyLiveWithOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      errorMessaging,
    });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${MainlyLiveWithContent.pageTitlePart1} ${MainlyLiveWithContent.firstNameLastName} ${MainlyLiveWithContent.pageTitlePart2}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        MainlyLiveWithContent,
        "hint",
        `${Selectors.GovukHint}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${MainlyLiveWithContent.body}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${MainlyLiveWithContent.link}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${MainlyLiveWithContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${MainlyLiveWithContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
  }: fillInFieldsOptions): Promise<void> {
    await page.click(radioId);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
