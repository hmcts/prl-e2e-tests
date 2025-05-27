import { C100ChildGender } from "./childDetailsRevised1Page";
import { yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions } from "./childDetailsRevised2Page";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { ChildDetailsSubmitPageContent } from "../../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsSubmitPageContent";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../../../../common/helpers";
import { ChildDetailsRevised1Content } from "../../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsRevised1Content";
import { ChildDetailsRevised2Content } from "../../../../../fixtures/manageCases/createCase/C100/childDetails/childDetailsRevised2Content";

interface c100ChildDetailsSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  c100ChildGender: C100ChildGender;
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions;
}

interface checkFilledData {
  page: Page;
  c100ChildGender: C100ChildGender;
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions;
}

export class C100ChildDetailsSubmitPage {
  public static async c100ChildDetailsSubmitPage({
    page: page,
    accessibilityTest: accessibilityTest,
    c100ChildGender: c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
  }: c100ChildDetailsSubmitPageOptions): Promise<void> {
    await this.checkPageContent({
      page: page,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    });
    await this.continueOn(page);
  }

  private static async checkPageContent({
    page: page,
    accessibilityTest: accessibilityTest,
    c100ChildGender: c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
  }: c100ChildDetailsSubmitPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${ChildDetailsSubmitPageContent.h2}")`,
    );
    await Promise.all([
      await this.checkPageLabels({
        page: page,
        accessibilityTest: accessibilityTest,
        c100ChildGender: c100ChildGender,
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
          yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
      }),
      this.checkFilledData({
        page: page,
        c100ChildGender: c100ChildGender,
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
          yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
      }),
    ]);
  }

  private static async checkPageLabels({
    page: page,
    accessibilityTest: accessibilityTest,
    c100ChildGender: c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
  }: c100ChildDetailsSubmitPageOptions): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ChildDetailsSubmitPageContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ChildDetailsSubmitPageContent.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        11,
        ChildDetailsSubmitPageContent,
        `text16`,
        `${Selectors.GovukText16}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildDetailsSubmitPageContent,
        `strong`,
        `${Selectors.strong}`,
      ),
    ]);
    if (c100ChildGender === "other") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.text16ChildGender}")`,
        1,
      );
    }
    if (yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions === "yes") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.text16ChildKnown}")`,
        1,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkFilledData({
    page: page,
    c100ChildGender: c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
  }: checkFilledData): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildDetailsRevised1Content.childFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildDetailsRevised1Content.childLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(ChildDetailsRevised1Content.childDayOfBirth, ChildDetailsRevised1Content.childMonthOfBirth, ChildDetailsRevised1Content.childYearOfBirth)}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildDetailsRevised1Content.childLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.childArrangementsOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.prohibitedStepsOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.specificIssueOrder}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.Span}:text-is("${ChildDetailsRevised1Content.parentalResponsibility}")`,
        1,
      ),
    ]);
    switch (c100ChildGender) {
      case "male":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.male}")`,
          1,
        );
        break;
      case "female":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.female}")`,
          1,
        );
        break;
      case "other":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.other}")`,
          1,
        );
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildDetailsRevised1Content.optionalChildGender}")`,
          1,
        );
        break;
    }
    switch (yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions) {
      case "yes":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.yes}")`,
            2,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.Span}:text-is("${ChildDetailsRevised2Content.childNameAndLocalAuthority}")`,
            1,
          ),
        ]);
        break;
      case "no":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.no}")`,
          2,
        );
        break;
      case "dontKnow":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ChildDetailsSubmitPageContent.dontKnow}")`,
          2,
        );
        break;
    }
  }

  private static async continueOn(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ChildDetailsSubmitPageContent.continue}")`,
    );
  }
}
