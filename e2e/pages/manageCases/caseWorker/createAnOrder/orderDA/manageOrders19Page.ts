import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { createOrderFL401Options } from "../../../../../common/types.ts";
import { CreateOrderFL401Options } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/createOrderManageOrders5Content.ts";
import { ManageOrders19DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders19DAContent.ts";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderDA/manageOrders1DAContent.ts";
// import { AxeUtils } from "@hmcts/playwright-common";
interface ManageOrders19PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
  createOrderFL401Options: createOrderFL401Options;
  userRole?: string;
}

export type createOrderManageOrders19Options =
  | "dateReserved"
  | "dateConfirmed"
  | "dateToBeConfirmed"
  | "dateToBeFixed";

enum UniqueSelectors {
  Dropdown = "#ordersHearingDetails_0_hearingTypes",
  dateReserved = "#ordersHearingDetails_0_hearingDateConfirmOptionEnum-dateReservedWithListAssit",
  dateConfirmed = "#ordersHearingDetails_0_hearingDateConfirmOptionEnum-dateConfirmedInHearingsTab",
  dateToBeConfirmed = "#ordersHearingDetails_0_hearingDateConfirmOptionEnum-dateConfirmedByListingTeam",
  dateToBeFixed = "#ordersHearingDetails_0_hearingDateConfirmOptionEnum-dateToBeFixed",
  inputSpecificDate = ".datepicker-container > .mat-datepicker-input:visible",
  days = "#ordersHearingDetails_0_hearingEstimatedDays",
  hours = "#ordersHearingDetails_0_hearingEstimatedHours",
  minutes = "#ordersHearingDetails_0_hearingEstimatedMinutes",
  inPerson = "#ordersHearingDetails_0_hearingChannelsEnum-INTER",
  telephone = "#ordersHearingDetails_0_hearingChannelsEnum-TEL",
  video = "#ordersHearingDetails_0_hearingChannelsEnum-VID",
  onThePapers = "#ordersHearingDetails_0_hearingChannelsEnum-ONPPRS",
  partiesAttendYes = "#ordersHearingDetails_0_allPartiesAttendHearingSameWayYesOrNo_Yes",
  partiesAttendNo = "#ordersHearingDetails_0_allPartiesAttendHearingSameWayYesOrNo_No",
  courtLocationSelectOption = "#ordersHearingDetails_0_courtList",
  legalAdviser = "#ordersHearingDetails_0_hearingAuthority-legalAdviser",
  magistrates = "#ordersHearingDetails_0_hearingAuthority-magistrates",
  districtJudge = "#ordersHearingDetails_0_hearingAuthority-districtJudge",
  circuitJudge = "#ordersHearingDetails_0_hearingAuthority-circuitJudge",
  hearingJudge = "#ordersHearingDetails_0_hearingJudgeNameAndEmail",
  hearingListedSelectOption = "#ordersHearingDetails_0_hearingListedLinkedCases",
  insertJoiningInstructions = "#ordersHearingDetails_0_instructionsForRemoteHearing",
  additionalDetails = "#ordersHearingDetails_0_additionalHearingDetails",
}

enum dateConfirmedHidden {
  selectOption = "#ordersHearingDetails_0_confirmedHearingDates",
  insertInstruction = "#ordersHearingDetails_0_instructionsForRemoteHearing",
  additionalDetails = "#ordersHearingDetails_0_additionalHearingDetails",
}

enum dateToBeConfirmedHidden {
  ordersHearingDetails_0_additionalDetailsForHearingDateOptions = "#ordersHearingDetails_0_additionalDetailsForHearingDateOptions",
  hearingOnSpecificDate_yes = "#ordersHearingDetails_0_hearingSpecificDatesOptionsEnum-Yes",
  hearingOnSpecificDate_no = "#ordersHearingDetails_0_hearingSpecificDatesOptionsEnum-No",
  hearingBetweenSpecificDates = "#ordersHearingDetails_0_hearingSpecificDatesOptionsEnum-HearingRequiredBetweenCertainDates",
  standardPriority = "#ordersHearingDetails_0_hearingPriorityTypeEnum-StandardPriority",
  urgentPriority = "#ordersHearingDetails_0_hearingPriorityTypeEnum-UrgentPriority",
}

enum dateOfHearing {
  day = "#firstDateOfTheHearing-day",
  month = "#firstDateOfTheHearing-month",
  year = "#firstDateOfTheHearing-year",
  hearingHour = "#ordersHearingDetails_0_hearingMustTakePlaceAtHour",
  hearingMinute = "#ordersHearingDetails_0_hearingMustTakePlaceAtMinute",
  estimateHearingDays = "#ordersHearingDetails_0_hearingEstimatedDays",
  estimateHearingHours = "#ordersHearingDetails_0_hearingEstimatedHours",
  estimateHearingMinutes = "#ordersHearingDetails_0_hearingEstimatedMinutes",
}
export class ManageOrders19Page {
  public static async manageOrders19Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
    createOrderFL401Options,
    createOrderManageOrders19Options,
    userRole,
  }: ManageOrders19PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      createOrderFL401Options,
    });
    await this.fillInFields({
      page,
      yesNoManageOrders,
      createOrderManageOrders19Options,
      userRole,
    });
  }

  private static async checkPageLoads({
    page,
    createOrderFL401Options,
    accessibilityTest,
  }: Partial<ManageOrders19PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    switch (createOrderFL401Options) {
      case "power of arrest":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanPowerOfArrest}")`,
          1,
        );
        break;
      case "occupation order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanOccupationOrder}")`,
          1,
        );
        break;
      case "non-molestation":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanNonMolestation}")`,
          1,
        );
        break;
      case "amend discharge varied order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanAmendDischargeVariedOrder}")`,
          1,
        );
        break;
      case "blank order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanBlankOrder}")`,
          1,
        );
        break;
      case "general form of undertaking":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanGeneralFormOfUndertaking}")`,
          1,
        );
        break;
      case "notice of proceedings":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${CreateOrderFL401Options.spanNoticeOfProceedings}")`,
          1,
        );
        break;
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ManageOrders19DAContent.h2}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders19DAContent.p}"):visible`,
        1,
      ),
      Helpers.checkGroup(page, 2, ManageOrders19DAContent, "h3", Selectors.h3),
      Helpers.checkGroup(
        page,
        2,
        ManageOrders19DAContent,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
    ]);
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); //accessibility bug ticket raised: FPET-1210 (still failing 18/06/25)
    }
  }

  private static async fillInFields({
    page,
    yesNoManageOrders,
    createOrderManageOrders19Options,
    userRole,
  }: Partial<ManageOrders19PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const date = Helpers.todayDate(false, true);
    await page.selectOption(
      UniqueSelectors.Dropdown,
      ManageOrders19DAContent.judgement,
    );
    switch (createOrderManageOrders19Options) {
      case "dateReserved":
        await page.click(UniqueSelectors.dateReserved);
        await this.hiddenFormLabels(page, "dateReserved");
        await page.fill(
          UniqueSelectors.inputSpecificDate,
          ManageOrders19DAContent.date1,
        );
        await page.fill(UniqueSelectors.days, ManageOrders19DAContent.day);
        await page.fill(UniqueSelectors.hours, ManageOrders19DAContent.hour);
        await page.fill(
          UniqueSelectors.minutes,
          ManageOrders19DAContent.minute,
        );
        await page.click(UniqueSelectors.inPerson);
        if (yesNoManageOrders) {
          await page.click(UniqueSelectors.partiesAttendYes);
        } else {
          await page.click(UniqueSelectors.partiesAttendNo);
        }
        await page.selectOption(UniqueSelectors.courtLocationSelectOption, {
          index: 1,
        });
        await page.click(UniqueSelectors.legalAdviser);
        await page.selectOption(UniqueSelectors.hearingListedSelectOption, {
          index: 0,
        });
        await page.fill(
          UniqueSelectors.insertJoiningInstructions,
          ManageOrders19DAContent.loremIpsum,
        );
        await page.fill(
          UniqueSelectors.additionalDetails,
          ManageOrders19DAContent.loremIpsum,
        );
        break;
      case "dateConfirmed":
        await page.click(UniqueSelectors.dateConfirmed);
        await this.hiddenFormLabels(page, "dateConfirmed");
        await page.selectOption(dateConfirmedHidden.selectOption, { index: 0 });
        await page.fill(
          dateConfirmedHidden.insertInstruction,
          ManageOrders19DAContent.lorem,
        );
        await page.fill(
          dateConfirmedHidden.additionalDetails,
          ManageOrders19DAContent.lorem,
        );
        break;
      case "dateToBeConfirmed":
        await page.click(UniqueSelectors.dateToBeConfirmed);
        await this.hiddenFormLabels(page, "dateToBeConfirmed");
        await page.click(dateToBeConfirmedHidden.hearingOnSpecificDate_yes);
        await page.click(dateToBeConfirmedHidden.standardPriority);
        await page.click(UniqueSelectors.video);
        await page.click(UniqueSelectors.partiesAttendYes);
        await page.fill(dateOfHearing.day, date[0]);
        await page.fill(dateOfHearing.month, date[1]);
        await page.fill(dateOfHearing.year, date[2]);
        await page.fill(dateOfHearing.estimateHearingHours, "4");
        await page.click(UniqueSelectors.magistrates);
        break;
      case "dateToBeFixed":
        await page.click(UniqueSelectors.dateToBeFixed);
        await this.hiddenFormLabels(page, "dateToBeFixed");
        if (userRole != "judge") {
          await page.click(dateToBeConfirmedHidden.hearingOnSpecificDate_yes);
          await page.click(dateToBeConfirmedHidden.standardPriority);
          await page.click(UniqueSelectors.video);
          await page.click(UniqueSelectors.partiesAttendYes);
          await page.fill(dateOfHearing.day, date[0]);
          await page.fill(dateOfHearing.month, date[1]);
          await page.fill(dateOfHearing.year, date[2]);
          await page.fill(dateOfHearing.estimateHearingHours, "4");
          await page.click(UniqueSelectors.magistrates);
        }
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }

  private static async hiddenFormLabels(
    page: Page,
    createOrderManageOrders19Options: createOrderManageOrders19Options,
  ): Promise<void> {
    switch (createOrderManageOrders19Options) {
      case "dateReserved":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.h2}:text-is("${ManageOrders19DAContent.dateReservedH2Hidden}"):visible`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.h3}:text-is("${ManageOrders19DAContent.dateReservedH3Hidden}"):visible`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.strong}:text-is("${ManageOrders19DAContent.dateReservedStrongHidden}"):visible`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.p}:text-is("${ManageOrders19DAContent.dateReservedPHidden}"):visible`,
            1,
          ),
          Helpers.checkGroup(
            page,
            20,
            ManageOrders19DAContent,
            "dateReservedFormLabelHidden",
            Selectors.GovukFormLabel,
          ),
        ]);
        break;
      case "dateConfirmed":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.strong}:text-is("${ManageOrders19DAContent.dateConfirmedStrongHidden}"):visible`,
            1,
          ),
          Helpers.checkGroup(
            page,
            3,
            ManageOrders19DAContent,
            "dateConfirmedFormLabelHidden",
            Selectors.GovukFormLabel,
          ),
        ]);
        break;
      case "dateToBeConfirmed":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.strong}:text-is("${ManageOrders19DAContent.dateToBeConfirmedStrongHidden}"):visible`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormLabel}:text-is("${ManageOrders19DAContent.customDetailsFormLabel}"):visible`,
            1,
          ),
        ]);
        break;
      case "dateToBeFixed":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.strong}:has-text("${ManageOrders19DAContent.dateToBeFixedStrong}"):visible`,
            1,
          ),
        ]);
    }
  }
}
