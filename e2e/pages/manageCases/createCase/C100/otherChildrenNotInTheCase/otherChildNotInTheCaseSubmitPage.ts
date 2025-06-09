import { C100OtherChildGender } from "./otherChildNotInTheCase1Page.ts";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { OtherChildNotInTheCaseSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/otherChildrenNotInTheCase/otherChildNotInTheCaseSubmitContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { OtherChildNotInTheCase1Content } from "../../../../../fixtures/manageCases/createCase/C100/otherChildrenNotInTheCase/otherChildNotInTheCase1Content.ts";

interface C100OtherChildNotInTheCase1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  otherChildPresent: boolean;
  otherChildGender: C100OtherChildGender;
  otherChildDOBKnown: boolean;
}

export class OtherChildNotInTheCaseSubmitPage {
  public static async otherChildNotInTheCaseSubmitPage({
    page: page,
    accessibilityTest: accessibilityTest,
    otherChildPresent: otherChildPresent,
    otherChildGender: otherChildGender,
    otherChildDOBKnown: otherChildDOBKnown,
  }: C100OtherChildNotInTheCase1PageOptions): Promise<void> {
    await Promise.all([
      this.checkExpectedFields({
        page: page,
        accessibilityTest: accessibilityTest,
        otherChildPresent: otherChildPresent,
        otherChildGender: otherChildGender,
        otherChildDOBKnown: otherChildDOBKnown,
      }),
      this.checkFilledData({
        page: page,
        accessibilityTest: accessibilityTest,
        otherChildPresent: otherChildPresent,
        otherChildGender: otherChildGender,
        otherChildDOBKnown: otherChildDOBKnown,
      }),
    ]);
    await this.fillInFields(page);
  }

  private static async checkExpectedFields({
    page: page,
    accessibilityTest: accessibilityTest,
    otherChildPresent: otherChildPresent,
    otherChildGender: otherChildGender,
    otherChildDOBKnown: otherChildDOBKnown,
  }: C100OtherChildNotInTheCase1PageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${OtherChildNotInTheCaseSubmitContent.subTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        OtherChildNotInTheCaseSubmitContent,
        "text16",
        `${Selectors.GovukText16}`,
      ),
    ]);
    if (otherChildPresent) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          6,
          OtherChildNotInTheCaseSubmitContent,
          "text16Yes",
          `${Selectors.GovukText16}`,
        ),
      ]);
      if (otherChildGender === "They identify in another way") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCaseSubmitContent.text16GenderOther}")`,
          1,
        );
      }
      if (otherChildDOBKnown) {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCaseSubmitContent.text16DOB}")`,
          1,
        );
      }
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async checkFilledData({
    page: page,
    otherChildPresent: otherChildPresent,
    otherChildGender: otherChildGender,
    otherChildDOBKnown: otherChildDOBKnown,
  }: C100OtherChildNotInTheCase1PageOptions): Promise<void> {
    if (!otherChildPresent) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCaseSubmitContent.text16No}")`,
        1,
      );
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCase1Content.otherChildFirstName}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCase1Content.otherChildLastName}")`,
          1,
        ),
      ]);
      switch (otherChildGender) {
        case "Female":
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCase1Content.genderOptionFemale}")`,
            1,
          );
          break;
        case "Male":
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCase1Content.genderOptionMale}")`,
            1,
          );
          break;
        case "They identify in another way":
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCase1Content.genderOptionOtherValue}")`,
            1,
          );
          break;
      }
      if (otherChildDOBKnown) {
        await Promise.all([
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCaseSubmitContent.text16Yes}")`,
            2,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${Helpers.dayAbbreviatedMonthYear(OtherChildNotInTheCase1Content.dateOfBirthDayValue, OtherChildNotInTheCase1Content.dateOfBirthMonthValue, OtherChildNotInTheCase1Content.dateOfBirthYearValue)}")`,
            1,
          ),
        ]);
      } else {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCaseSubmitContent.text16No}")`,
          1,
        );
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${OtherChildNotInTheCaseSubmitContent.text16Yes}")`,
          1,
        );
      }
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${OtherChildNotInTheCaseSubmitContent.button}")`,
    );
  }
}
