import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { ManageOrders19CAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/orderCA/manageOrders19CAContent";

interface manageOrders19PageOptions {
  page: Page;
  accessibilityTest: boolean;
}

enum UniqueSelectors {
  inputId = "#ordersHearingDetails_0_hearingTypes",
  radioId = "#ordersHearingDetails_0_hearingDateConfirmOptionEnum-dateConfirmedByListingTeam",
  dateConfirmedListingNo = "#ordersHearingDetails_0_hearingSpecificDatesOptionsEnum-No",
  standardPriority = "#ordersHearingDetails_0_hearingPriorityTypeEnum-StandardPriority",
  estimatedTime_Hours = "#ordersHearingDetails_0_hearingEstimatedHours",
  attendInPerson = "#ordersHearingDetails_0_hearingChannelsEnum-INTER",
  partiesAttendSameWay_Yes = "#ordersHearingDetails_0_allPartiesAttendHearingSameWayYesOrNo_Yes",
  hearingBefore_LA = "#ordersHearingDetails_0_hearingAuthority-legalAdviser",
}
export class ManageOrders19Page {
  public static async manageOrders19Page({
    page,
    accessibilityTest,
  }: manageOrders19PageOptions): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await this.checkPageLoads({ page, accessibilityTest });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
  }: Partial<manageOrders19PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.GovukHeadingL}:text-is("${ManageOrders19CAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ManageOrders19CAContent.headingh3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ManageOrders19CAContent.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ManageOrders19CAContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH2}:text-is("${ManageOrders19CAContent.headingh2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${ManageOrders19CAContent.headingh2}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        ManageOrders19CAContent,
        "label",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    // if (accessibilityTest) {                     accessibility bug ticket raised: FPET-1210
    //   await new AxeUtils(page).audit();
    // }
  }

  private static async fillInFields({
    page,
  }: Partial<manageOrders19PageOptions>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    await page.selectOption(
      UniqueSelectors.inputId,
      ManageOrders19CAContent.hearingType,
    );
    await page.click(UniqueSelectors.radioId);
    await page.waitForSelector(
      `${Selectors.strong}:text-is("${ManageOrders19CAContent.strong}")`,
    );
    await page.click(UniqueSelectors.dateConfirmedListingNo);
    await page.click(UniqueSelectors.standardPriority);
    await page.fill(
      UniqueSelectors.estimatedTime_Hours,
      ManageOrders19CAContent.inputHours,
    );
    await page.click(UniqueSelectors.attendInPerson);
    await page.click(UniqueSelectors.partiesAttendSameWay_Yes);
    await page.click(UniqueSelectors.hearingBefore_LA);

    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
