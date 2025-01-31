import { Helpers } from "../../../../../../common/helpers.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { DraftAnOrder16Content } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/draftAnOrder/draftAnOrder16Content.ts";
import { orderTypesMap } from "../../../../../../journeys/manageCases/caseProgression/manageOrders/draftAnOrder/draftAnOrder.ts";
import { Page } from "@playwright/test";
import { NonMolestationOrder16Content } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/draftAnOrder/nonMolestationOrder/nonMolestationOrder16Content.ts";
import { CommonContent } from "../../../../../../fixtures/manageCases/commonContent.ts";

enum UniqueSelectors {
  judgeHasProvidedHearingDetails = "#hasJudgeProvidedHearingDetails_Yes",
  judgeHasNotProvidedHearingDetails = "#hasJudgeProvidedHearingDetails_No",
  allPartiesWillAttendHearing = "#ordersHearingDetails_0_allPartiesAttendHearingSameWayYesOrNo_Yes",
  notAllPartiesWillAttendHearing = "#ordersHearingDetails_0_allPartiesAttendHearingSameWayYesOrNo_No",
  hearingTypeDropDown = "#ordersHearingDetails_0_hearingTypes",
  minDays = "#ordersHearingDetails_0_hearingEstimatedDays",
  minHours = "#ordersHearingDetails_0_hearingEstimatedHours",
  minMinutes = "#ordersHearingDetails_0_hearingEstimatedMinutes",
  inPersonHearingRadio = "#ordersHearingDetails_0_hearingChannelsEnum-INTER",
  courtLocationDropdown = "#ordersHearingDetails_0_courtList",
  legalAdviserRadio = "#ordersHearingDetails_0_hearingAuthority-legalAdviser",
  hearingJudgeTextbox = "#ordersHearingDetails_0_hearingJudgeNameAndEmail",
  joiningInstructionsTextbox = "#ordersHearingDetails_0_instructionsForRemoteHearing",
  additionalHearingDetailsTextbox = "#ordersHearingDetails_0_additionalHearingDetails",
  applicantAttendanceDropdown = "#ordersHearingDetails_0_applicantHearingChannel",
  solicitorAttendanceDropdown = "#ordersHearingDetails_0_applicantSolicitorHearingChannel",
  respondentAttendanceDropdown = "#ordersHearingDetails_0_respondentHearingChannel",
  localAuthorityAttendanceDropdown = "#ordersHearingDetails_0_localAuthorityHearingChannel",
  hasJudgeProvidedHearingDetailsLabels = "#hasJudgeProvidedHearingDetails .form-label",
}

export class NonMolestationOrder16Page {
  public static async checkPageLoads(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${DraftAnOrder16Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${orderTypesMap.get("nonMolestation")?.journeyName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.hasJudgeProvidedHearingDetailsLabels}:text-is("${DraftAnOrder16Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.hasJudgeProvidedHearingDetailsLabels}:text-is("${DraftAnOrder16Content.formLabelNo}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder16Content.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${DraftAnOrder16Content.continue}")`,
        1,
      ),
    ]);
  }

  public static async checkErrorMessaging(page: Page): Promise<void> {
    await this.continue(page);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${NonMolestationOrder16Content.errorMessageHasJudgeProvidedHearingDetailsRequired}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${NonMolestationOrder16Content.errorMessageHasJudgeProvidedHearingDetailsRequired}")`,
        1,
      ),
    ]);
    await page.check(`${UniqueSelectors.judgeHasProvidedHearingDetails}`);
    await this.continue(page);
    await Promise.all([
      Helpers.checkGroup(
        page,
        3,
        NonMolestationOrder16Content,
        `errorMessage`,
        `${Selectors.GovukErrorValidation}`,
      ),
      Helpers.checkGroup(
        page,
        3,
        NonMolestationOrder16Content,
        `errorMessage`,
        `${Selectors.GovukErrorMessage}`,
      ),
    ]);
  }

  public static async fillInFields(
    page: Page,
    yesNoToAll: boolean,
    willAllPartiesAttendHearing: boolean,
  ): Promise<void> {
    if (yesNoToAll) {
      await page.check(`${UniqueSelectors.judgeHasProvidedHearingDetails}`);
      await this.checkOptionalHearingLoads(page);
      // hearing type is optional on screen but is required - RAISE THIS
      await page.selectOption(
        `${UniqueSelectors.hearingTypeDropDown}`,
        `${NonMolestationOrder16Content.hearingType}`,
      );
      await page.fill(
        `${Selectors.GovukInput}`,
        `${Helpers.getCurrentDateFormatted()}`,
      );
      await page.fill(`${UniqueSelectors.minDays}`, "1");
      await page.fill(`${UniqueSelectors.minHours}`, "1");
      await page.fill(`${UniqueSelectors.minMinutes}`, "1");
      await page.check(`${UniqueSelectors.inPersonHearingRadio}`);
      if (willAllPartiesAttendHearing) {
        await page.check(`${UniqueSelectors.allPartiesWillAttendHearing}`);
      } else {
        await page.check(`${UniqueSelectors.notAllPartiesWillAttendHearing}`);
        // I don't think it should be optional how the parties are attending if parties will be attending in different ways, also looks wierd on PDF - RAISE THIS
        await page.selectOption(
          `${UniqueSelectors.applicantAttendanceDropdown}`,
          "In Person",
        );
        await page.selectOption(
          `${UniqueSelectors.solicitorAttendanceDropdown}`,
          "Video",
        );
        await page.selectOption(
          `${UniqueSelectors.respondentAttendanceDropdown}`,
          "Telephone",
        );
        await page.selectOption(
          `${UniqueSelectors.localAuthorityAttendanceDropdown}`,
          "On the Papers",
        );
      }
      await page.selectOption(
        `${UniqueSelectors.courtLocationDropdown}`,
        `${NonMolestationOrder16Content.swanseaCourtLocation}`,
      );
      await page.check(`${UniqueSelectors.legalAdviserRadio}`);
      await page.fill(
        `${UniqueSelectors.hearingJudgeTextbox}`,
        `${CommonContent.judgeNameAndEmail}`,
      );
      await page.fill(
        `${UniqueSelectors.joiningInstructionsTextbox}`,
        `${NonMolestationOrder16Content.joiningInstructions}`,
      );
      await page.fill(
        `${UniqueSelectors.additionalHearingDetailsTextbox}`,
        `${NonMolestationOrder16Content.additionalHearingDetails}`,
      );
    } else {
      await page.check(`${UniqueSelectors.judgeHasNotProvidedHearingDetails}`);
    }
  }

  private static async checkOptionalHearingLoads(page: Page): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${NonMolestationOrder16Content.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${NonMolestationOrder16Content.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        NonMolestationOrder16Content,
        `p`,
        `${Selectors.p}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${NonMolestationOrder16Content.h3Heading}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${NonMolestationOrder16Content.strong}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        21,
        NonMolestationOrder16Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${DraftAnOrder16Content.continue}")`,
    );
  }
}
