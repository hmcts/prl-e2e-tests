import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../../common/selectors";
import { ChildLocationContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/childLocationContent";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { SafetyConcernHelpers } from "../safetyConcernHelpers";

enum inputIDs {
  abductionReason = "#c1A_abductionReasonOutsideUk",
  childLocation = "#c1A_childsCurrentLocation",
}

interface ChildLocationPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ChildLocationPage {
  public static async childLocationPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: ChildLocationPageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${ChildLocationContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionL}:text-is("${ChildLocationContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ChildLocationContent.span}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${ChildLocationContent.strong}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingS}:text-is("${ChildLocationContent.headingS}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${ChildLocationContent.locationLabel}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${ChildLocationContent.locationHint}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildLocationContent,
        "li",
        `${Selectors.li}`,
      ),
    ]);
    await SafetyConcernHelpers.checkPassportSidebar(page);
    await SafetyConcernHelpers.checkContactDetailsText(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildLocationContent,
        "errorSummaryList",
        `${Selectors.GovukErrorList} ${Selectors.a}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildLocationContent,
        "errorMessage",
        `${Selectors.GovukErrorMessageCitizen}`,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    const inputKeys: [string, string] = ["abductionReason", "childLocation"];
    for (let key of inputKeys) {
      let inputKey = key as keyof typeof inputIDs;
      let contentKey = key as keyof typeof ChildLocationContent;
      await page.fill(inputIDs[inputKey], ChildLocationContent[contentKey]);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
