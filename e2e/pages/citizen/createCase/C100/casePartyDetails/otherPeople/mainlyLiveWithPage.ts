import { AxeUtils } from "@hmcts/playwright-common";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../../common/selectors.ts";
import { MainlyLiveWithContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/mainlyLiveWithContent.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { typeOfPerson } from "../../../../../../common/types.ts";

interface mainlyLiveWithOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ChildMainlyLivesWith: typeOfPerson;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  c100ChildMainlyLivesWith: typeOfPerson;
}

enum radioIDs {
  applicant = "#mainlyLiveWith",
  respondent = "#mainlyLiveWith-2",
  otherPerson = "#mainlyLiveWith-3",
}

export class MainlyLiveWithPage {
  public static async mainlyLiveWithPage({
    page,
    accessibilityTest,
    errorMessaging,
    c100ChildMainlyLivesWith,
  }: mainlyLiveWithOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields({
      page,
      c100ChildMainlyLivesWith,
    });
  }
  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await Promise.all([
      page.waitForSelector(
        `${Selectors.GovukHeadingXL}:has-text("${MainlyLiveWithContent.pageTitlePart1}")`,
      ),
      page.waitForSelector(
        `${Selectors.GovukHeadingXL}:has-text("${MainlyLiveWithContent.pageTitlePart2}")`,
      ),
    ]);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${MainlyLiveWithContent.hint1}")`,
        1,
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
      await new AxeUtils(page).audit();
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
    c100ChildMainlyLivesWith,
  }: fillInFieldsOptions): Promise<void> {
    if (!(c100ChildMainlyLivesWith in radioIDs)) {
      throw new Error(
        `Unrecognised person: ${c100ChildMainlyLivesWith}. Should be applicant, respondent or other.`,
      );
    }
    await page.click(radioIDs[c100ChildMainlyLivesWith]);
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
