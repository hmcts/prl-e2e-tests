import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RespondentsBehaviourContent } from "../../../../../fixtures/manageCases/createCase/FL401/respondentsBehaviour/respondentsBehaviourContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { solicitorCaseCreateType } from "../../../../../common/types";

enum checkBoxIds {
  applicantStopFromRespondentEnum_Value_1 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_1",
  applicantStopFromRespondentEnum_Value_2 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_2",
  applicantStopFromRespondentEnum_Value_3 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_3",
  applicantStopFromRespondentEnum_Value_4 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_4",
  applicantStopFromRespondentEnum_Value_5 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_5",
  applicantStopFromRespondentEnum_Value_6 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_6",
  applicantStopFromRespondentEnum_Value_7 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_7",
  applicantStopFromRespondentEnum_Value_8 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_8",
  applicantStopFromRespondentEnum_Value_9 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoing-applicantStopFromRespondentEnum_Value_9",
  applicantStopFromRespondentDoingToChildEnum_Value_1 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoingToChild-applicantStopFromRespondentDoingToChildEnum_Value_1",
  applicantStopFromRespondentDoingToChildEnum_Value_2 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoingToChild-applicantStopFromRespondentDoingToChildEnum_Value_2",
  applicantStopFromRespondentDoingToChildEnum_Value_3 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoingToChild-applicantStopFromRespondentDoingToChildEnum_Value_3",
  applicantStopFromRespondentDoingToChildEnum_Value_4 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoingToChild-applicantStopFromRespondentDoingToChildEnum_Value_4",
  applicantStopFromRespondentDoingToChildEnum_Value_5 = "#respondentBehaviourData_applicantWantToStopFromRespondentDoingToChild-applicantStopFromRespondentDoingToChildEnum_Value_5",
}

enum inputIds {
  otherReasonApplicantWantToStopFromRespondentDoing = "#respondentBehaviourData_otherReasonApplicantWantToStopFromRespondentDoing",
}

export class RespondentsBehaviourPage {
  public static async respondentsBehaviourPage(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(
      page,
    );
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${RespondentsBehaviourContent.title}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${RespondentsBehaviourContent.textOnPage}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        17,
        RespondentsBehaviourContent,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields(
    page: Page,
  ): Promise<void> {
    for (let selector of Object.values(checkBoxIds)) {
      await page.click(selector);
    }
    await page.fill(
      `${inputIds.otherReasonApplicantWantToStopFromRespondentDoing}`,
      RespondentsBehaviourContent.exampleText,
    );
    await page.click(
      `${Selectors.button}:text-is("${RespondentsBehaviourContent.continue}")`,
    );
  }
}
