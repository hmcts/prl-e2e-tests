import { C100ChildGender } from "./amendChildDetailsRevised1Page";
import { yesNoDontKnow } from "../../../../../common/types";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { AmendChildDetailsSubmitContent } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsSubmitContent";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers";
import { AmendChildDetailsRevised1Content } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsRevised1Content";
import { AmendChildDetailsRevised2Content } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsRevised2Content";

interface c100ChildDetailsSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100ChildGender: C100ChildGender;
  yesNoDontKnow: yesNoDontKnow;
  under18: boolean;
}

interface checkFilledData {
  page: Page;
  c100ChildGender: C100ChildGender;
  yesNoDontKnow: yesNoDontKnow;
  under18: boolean;
}

export class AmendChildDetailsSubmitPage {
  public static async amendChildDetailsSubmitPage({
    page,
    accessibilityTest,
    c100ChildGender,
    yesNoDontKnow,
    under18,
  }: c100ChildDetailsSubmitPageOptions): Promise<void> {
    await this.checkPageContent({
      page,
      accessibilityTest,
      c100ChildGender,
      yesNoDontKnow,
      under18,
    });
    await this.continueOn(page);
  }

  private static async checkPageContent({
    page,
    accessibilityTest,
    c100ChildGender,
    yesNoDontKnow,
    under18,
  }: c100ChildDetailsSubmitPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${AmendChildDetailsSubmitContent.h2}")`,
    );
    await Promise.all([
      await this.checkPageLabels({
        page,
        accessibilityTest,
        c100ChildGender,
        yesNoDontKnow,
        under18,
      }),
      this.checkFilledData({
        page,
        c100ChildGender,
        yesNoDontKnow,
        under18,
      }),
    ]);
  }

  private static async checkPageLabels({
    page,
    accessibilityTest,
    c100ChildGender,
    yesNoDontKnow,
  }: c100ChildDetailsSubmitPageOptions): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AmendChildDetailsSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${AmendChildDetailsSubmitContent.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${AmendChildDetailsSubmitContent.h3}")`,
        5,
      ),
      Helpers.checkGroup(
        page,
        9,
        AmendChildDetailsSubmitContent,
        `text16`,
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.text16FirstName}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.text16LastName}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.text16DOB}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.text16Gender}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.text16OrderApplied}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.text16ParentalResponsibility}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.text16ParentalResponsibility2}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${AmendChildDetailsSubmitContent.strong1}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.strong}:text-is("${AmendChildDetailsSubmitContent.strong2}")`,
        1,
      ),
    ]);
    if (c100ChildGender === "other") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.text16ChildGender}")`,
        1,
      );
    }
    if (yesNoDontKnow === "yes") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.text16ChildKnown}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkFilledData({
    page,
    yesNoDontKnow,
    under18,
  }: checkFilledData): Promise<void> {
    const [day, month, year] = Helpers.generateDOB(under18);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsRevised1Content.childFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsRevised1Content.childLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(day, month, year)}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.childArrangementsOrder}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.prohibitedStepsOrder}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.specificIssueOrder}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${AmendChildDetailsRevised1Content.parentalResponsibility3}")`,
        1,
      ),
    ]);
    switch (yesNoDontKnow) {
      case "yes":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.yes}")`,
            2,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:text-is("${AmendChildDetailsRevised2Content.childNameAndLocalAuthority}")`,
            1,
          ),
        ]);
        break;
      case "no":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.no}")`,
          2,
        );
        break;
      case "dontKnow":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AmendChildDetailsSubmitContent.dontKnow}")`,
          2,
        );
        break;
    }
  }

  private static async continueOn(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${AmendChildDetailsSubmitContent.continue}")`,
    );
  }
}
