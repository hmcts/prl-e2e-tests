import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { HearingUrgencySubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/hearingUrgency/hearingUrgencySubmitContent";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";
import { HearingUrgency1Content } from "../../../../../fixtures/manageCases/createCase/C100/hearingUrgency/hearingUrgency1Content";

export class C100HearingUrgencySubmitPage {
  public static async C100HearingUrgencySubmitPage(
    page: Page,
    accessibilityTest: boolean,
    yesNo: boolean,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page, accessibilityTest, yesNo),
      this.checkFilledFields(page, yesNo),
    ]);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    yesNo: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${HearingUrgencySubmitContent.pageSubTitle}")`,
    );
    let changeAbleFields: number = yesNo ? 8 : 4;
    await Promise.all([
      Helpers.checkGroup(
        page,
        changeAbleFields + 1,
        HearingUrgencySubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${HearingUrgencySubmitContent.text16Change}")`,
        changeAbleFields,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${HearingUrgencySubmitContent.p}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkFilledFields(
    page: Page,
    yesNo: boolean,
  ): Promise<void> {
    let yesOrNo: string = yesNo ? "Yes" : "No";
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${yesOrNo}")`,
      4,
    );
    if (yesNo) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${HearingUrgency1Content.loremIpsum}")`,
        4,
      );
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${HearingUrgencySubmitContent.continue}")`,
    );
  }
}
