import { Page } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../../../common/selectors";
import { YourselfConcernsAboutContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/yourselfConcernsAboutContent";
import { Helpers } from "../../../../../../common/helpers";
import { CommonStaticText } from "../../../../../../common/commonStaticText";
import { SafetyConcernHelpers } from "../safetyConcernHelpers";

enum CheckboxInputIds {
  physicalAbuse = "#c1A_concernAboutYourself",
  psychologicalAbuse = "#c1A_concernAboutYourself-2",
  emotionalAbuse = "#c1A_concernAboutYourself-3",
  sexualAbuse = "#c1A_concernAboutYourself-4",
  financialAbuse = "#c1A_concernAboutYourself-5",
  abduction = "#c1A_concernAboutYourself-6",
  witnessingDomesticAbuse = "#c1A_concernAboutYourself-7",
  somethingElse = "#c1A_concernAboutYourself-8",
}

interface YourselfConcernsAboutPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class YourselfConcernsAboutPage {
  public static async yourselfConcernsAboutPage({
                                               page,
                                               accessibilityTest,
                                               errorMessaging,
                                             }: YourselfConcernsAboutPageOptions): Promise<void> {
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
      `${Selectors.GovukHeadingXL}:text-is("${YourselfConcernsAboutContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${YourselfConcernsAboutContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${YourselfConcernsAboutContent.link}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${YourselfConcernsAboutContent.bodyM}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        6,
        YourselfConcernsAboutContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        7,
        YourselfConcernsAboutContent,
        "formHint",
        `${Selectors.GovukHint}`,
      ),
    ]);
    await SafetyConcernHelpers.checkSidebarYourself(page);
    await SafetyConcernHelpers.checkContactDetailsText(page);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${YourselfConcernsAboutContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.ErrorMessage}:text-is("${YourselfConcernsAboutContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    for (let checkbox of Object.values(CheckboxInputIds)) {
      await page.check(checkbox);
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
