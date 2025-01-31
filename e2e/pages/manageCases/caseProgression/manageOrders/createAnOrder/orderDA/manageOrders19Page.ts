import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { Selectors } from "../../../../../../common/selectors.ts";
import { createOrderFL401Options } from "../../../../../../common/types.ts";
import { CreateOrderFL401Options } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/createAnOrder/OrderDA/createOrderManageOrders5Content.ts";
import { ManageOrders19DAContent } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/createAnOrder/OrderDA/manageOrders19DAContent.ts";
import { ManageOrders1DAContent } from "../../../../../../fixtures/manageCases/caseProgression/manageOrders/createAnOrder/OrderDA/manageOrders1DAContent.ts";

interface ManageOrders19PageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  createOrderManageOrders19Options: createOrderManageOrders19Options;
  createOrderFL401Options: createOrderFL401Options;
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
}

enum dateReservedHidden {
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
}

enum dateToBeFixedHidden {
  ordersHearingDetails_0_additionalDetailsForHearingDateOptions = "#ordersHearingDetails_0_additionalDetailsForHearingDateOptions",
}

export class ManageOrders19Page {
  public static async manageOrders19Page({
    page,
    accessibilityTest,
    yesNoManageOrders,
    createOrderFL401Options,
    createOrderManageOrders19Options,
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
    });
  }

  private static async checkPageLoads({
    page,
    createOrderFL401Options,
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
    // if (accessibilityTest) {                         accessibility bug ticket raised: FPET-1210
    //   await AccessibilityTestHelper.run(page);
    // }
  }

  private static async fillInFields({
    page,
    yesNoManageOrders,
    createOrderManageOrders19Options,
  }: Partial<ManageOrders19PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.selectOption(
      UniqueSelectors.Dropdown,
      ManageOrders19DAContent.judgement,
    );
    switch (createOrderManageOrders19Options) {
      case "dateReserved":
        await page.click(UniqueSelectors.dateReserved);
        await this.hiddenFormLabels(page, "dateReserved");
        await page.fill(
          dateReservedHidden.inputSpecificDate,
          ManageOrders19DAContent.date1,
        );
        await page.fill(dateReservedHidden.days, ManageOrders19DAContent.day);
        await page.fill(dateReservedHidden.hours, ManageOrders19DAContent.hour);
        await page.fill(
          dateReservedHidden.minutes,
          ManageOrders19DAContent.minute,
        );
        await page.click(dateReservedHidden.inPerson);
        if (yesNoManageOrders) {
          await page.click(dateReservedHidden.partiesAttendYes);
        } else {
          await page.click(dateReservedHidden.partiesAttendNo);
        }
        await page.selectOption(dateReservedHidden.courtLocationSelectOption, {
          index: 1,
        });
        await page.click(dateReservedHidden.legalAdviser);
        await page.selectOption(dateReservedHidden.hearingListedSelectOption, {
          index: 0,
        });
        await page.fill(
          dateReservedHidden.insertJoiningInstructions,
          ManageOrders19DAContent.loremIpsum,
        );
        await page.fill(
          dateReservedHidden.additionalDetails,
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
        await page.fill(
          dateToBeConfirmedHidden.ordersHearingDetails_0_additionalDetailsForHearingDateOptions,
          ManageOrders19DAContent.lorem,
        );
        break;
      case "dateToBeFixed":
        await page.click(UniqueSelectors.dateToBeFixed);
        await this.hiddenFormLabels(page, "dateToBeFixed");
        await page.fill(
          dateToBeFixedHidden.ordersHearingDetails_0_additionalDetailsForHearingDateOptions,
          ManageOrders19DAContent.lorem,
        );
        break;
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
            `${Selectors.GovukFormHint}:text-is("${ManageOrders19DAContent.dateToBeConfirmedFormHintHidden1}"):visible`,
            1,
          ),
        ]);
        break;
      case "dateToBeFixed":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.strong}:text-is("${ManageOrders19DAContent.dateToBeFixedStrong}"):visible`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukFormHint}:text-is("${ManageOrders19DAContent.dateToBeFixedHiddenFormHint}"):visible`,
            1,
          ),
        ]);
    }
  }
}
