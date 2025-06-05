import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { typeOfPerson } from "../../../../../../common/types.ts";
import { LivingArrangementsContent } from "../../../../../../fixtures/citizen/createCase/C100/casePartyDetails/otherPeople/livingArrangementsContent.ts";

interface livingArrangementsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoOtherPersonDetails: boolean;
  c100ChildMainlyLivesWith: typeOfPerson;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  errorMessaging: boolean;
  yesNoOtherPersonDetails: boolean;
}

enum checkboxIDs {
  applicant = "#liveWith",
  respondent = "#liveWith-2",
  otherPerson = "#liveWith-3",
}

export class LivingArrangementsPage {
  public static async livingArrangementsPage({
    page,
    accessibilityTest,
    errorMessaging,
    yesNoOtherPersonDetails,
    c100ChildMainlyLivesWith,
  }: livingArrangementsOptions): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest });
    if (errorMessaging) {
      await this.triggerErrorMessages(page, c100ChildMainlyLivesWith);
    }
    await this.fillInFields({
      page,
      errorMessaging,
      yesNoOtherPersonDetails,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:has-text("${LivingArrangementsContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBody}:text-is("${LivingArrangementsContent.body}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${LivingArrangementsContent.legend}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(
    page: Page,
    c100ChildMainlyLivesWith: typeOfPerson,
  ): Promise<void> {
    if (c100ChildMainlyLivesWith in checkboxIDs) {
      await page.uncheck(checkboxIDs[c100ChildMainlyLivesWith]);
    } else {
      throw new Error(
        `Unrecognised type of person: ${c100ChildMainlyLivesWith}`,
      );
    }
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
        `${Selectors.a}:text-is("${LivingArrangementsContent.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${LivingArrangementsContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    yesNoOtherPersonDetails,
  }: fillInFieldsOptions): Promise<void> {
    const checkboxSlice: number = yesNoOtherPersonDetails ? 2 : 1;
    for (const checkboxID of Object.values(checkboxIDs).slice(
      0,
      checkboxSlice,
    )) {
      await page.check(checkboxID);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
