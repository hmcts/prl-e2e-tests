import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../../../common/selectors.ts";
import { ChildConcernsAboutContent } from "../../../../../../fixtures/citizen/createCase/C100/safetyConcerns/childConcerns/childConcernsAboutContent.ts";
import { Helpers } from "../../../../../../common/helpers.ts";
import { CommonStaticText } from "../../../../../../common/commonStaticText.ts";
import { SafetyConcernHelpers } from "../safetyConcernHelpers.ts";

enum CheckboxInputIds {
  physicalAbuse = "#c1A_concernAboutChild",
  psychologicalAbuse = "#c1A_concernAboutChild-2",
  emotionalAbuse = "#c1A_concernAboutChild-3",
  sexualAbuse = "#c1A_concernAboutChild-4",
  financialAbuse = "#c1A_concernAboutChild-5",
  abduction = "#c1A_concernAboutChild-6",
  witnessingDomesticAbuse = "#c1A_concernAboutChild-7",
  somethingElse = "#c1A_concernAboutChild-8",
}

interface ChildConcernsAboutPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

export class ChildConcernsAboutPage {
  public static async childConcernsAboutPage({
    page,
    accessibilityTest,
    errorMessaging,
  }: ChildConcernsAboutPageOptions): Promise<void> {
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
      `${Selectors.GovukHeadingXL}:text-is("${ChildConcernsAboutContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukCaptionXL}:text-is("${ChildConcernsAboutContent.caption}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLink}:text-is("${ChildConcernsAboutContent.link}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukBodyM}:text-is("${ChildConcernsAboutContent.bodyM}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        8,
        ChildConcernsAboutContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        9,
        ChildConcernsAboutContent,
        "formHint",
        `${Selectors.GovukHint}`,
      ),
    ]);
    await SafetyConcernHelpers.checkSidebarChild(page);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
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
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorList} ${Selectors.a}:text-is("${ChildConcernsAboutContent.errorSummaryList}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${ChildConcernsAboutContent.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(page: Page): Promise<void> {
    for (const checkbox of Object.values(CheckboxInputIds)) {
      await page.check(checkbox);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
