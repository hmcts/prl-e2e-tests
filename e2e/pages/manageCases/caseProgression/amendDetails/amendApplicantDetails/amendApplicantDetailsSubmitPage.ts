import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { amendApplicantDetailsSubmitContent } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendApplicantDetails/amendApplicantDetailsSubmitContent.ts";
import { Helpers } from "../../../../../common/helpers";
import { ApplicantGender } from "../../../../../common/types";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { AmendApplicantDetails2Content } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendApplicantDetails/AmendApplicantDetails2Content.ts";

interface AmendApplicantDetailsSubmitOptions {
  page: Page;
  accessibilityTest: boolean;
  nameChange: boolean;
  dobChange: boolean;
  dobChangeDay: string;
  dobChangeMonth: string;
  dobChangeYear: string;
  genderChange: boolean;
  gender: ApplicantGender;
  liveInRefuge: boolean;
  changeApplicantAddress: boolean;
  keepDetailsConfidential: boolean;
  solicitorDetailsChange: boolean;
}

export class AmendApplicantDetailsSubmitPage {
  public static async amendApplicantDetailsSubmitPage({
    page,
    accessibilityTest,
    nameChange,
    dobChange,
    dobChangeDay,
    dobChangeMonth,
    dobChangeYear,
    genderChange,
    gender,
    liveInRefuge,
    changeApplicantAddress,
    keepDetailsConfidential,
    solicitorDetailsChange,
  }: AmendApplicantDetailsSubmitOptions): Promise<void> {
    await this.checkStaticContent(page, solicitorDetailsChange);
    await this.checkDynamicContent({
      page,
      nameChange,
      dobChange,
      dobChangeDay,
      dobChangeMonth,
      dobChangeYear,
      genderChange,
      gender,
      liveInRefuge,
      changeApplicantAddress,
      keepDetailsConfidential,
      solicitorDetailsChange,
      accessibilityTest,
    });
    if (accessibilityTest) {
      //await new AxeUtils(page).audit(); #TODO run accessibility test once EXUI-2726 ticket is fixed
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }

  private static async checkStaticContent(
    page: Page,
    solicitorDetailsChange: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${amendApplicantDetailsSubmitContent.pageTitle}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h2}:text-is("${amendApplicantDetailsSubmitContent.h2}")`,
      1,
    );

    if (solicitorDetailsChange) {
      //if there is a change in solicitor details, the will be two instances of the address labels.
      await Promise.all([
        Helpers.checkGroup(
          page,
          10,
          amendApplicantDetailsSubmitContent,
          `text16_`,
          `${Selectors.GovukText16}`,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${amendApplicantDetailsSubmitContent.text16_11}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${amendApplicantDetailsSubmitContent.text16_12}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${amendApplicantDetailsSubmitContent.text16_13}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${amendApplicantDetailsSubmitContent.text16_14}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${amendApplicantDetailsSubmitContent.text16_15}")`,
          2,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${amendApplicantDetailsSubmitContent.text16_16}")`,
          2,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkGroup(
          page,
          16,
          amendApplicantDetailsSubmitContent,
          `text16_`,
          `${Selectors.GovukText16}`,
        ),
      ]);
    }
  }

  private static async checkDynamicContent({
    page,
    nameChange,
    dobChange,
    genderChange,
    gender,
    liveInRefuge,
    changeApplicantAddress,
    keepDetailsConfidential,
    solicitorDetailsChange,
    dobChangeDay,
    dobChangeMonth,
    dobChangeYear,
  }: AmendApplicantDetailsSubmitOptions): Promise<void> {
    if (nameChange) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AmendApplicantDetails2Content.firstNameInput}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AmendApplicantDetails2Content.lastNameInput}")`,
          1,
        ),
      ]);
    }
    if (dobChange) {
      //change the month to short form
      const dobChangeMonthShort: string = new Date(
        0,
        parseInt(dobChangeMonth) - 1,
      ).toLocaleString("en", { month: "short" });
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${dobChangeDay} ${dobChangeMonthShort} ${dobChangeYear}")`,
          1,
        ),
      ]);
    }
    if (genderChange) {
      switch (gender) {
        case "female":
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${CommonStaticText.female}")`,
            1,
          );
          break;
        case "male":
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${CommonStaticText.male}")`,
            1,
          );
          break;
        case "other":
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AmendApplicantDetails2Content.applicantGenderOtherInput}")`,
            1,
          );
          break;
      }
    }
    if (liveInRefuge) {
      await expect(
        page
          .getByRole("row", {
            name: `${amendApplicantDetailsSubmitContent.text16_refugeYes}`,
            exact: true,
          })
          .locator("div")
          .nth(1),
      ).toBeVisible();
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${amendApplicantDetailsSubmitContent.text16_hidden1}")`,
        1,
      );
    }
    if (changeApplicantAddress) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendApplicantDetails2Content.postcodeInput1}")`,
        1,
      );
    }
    if (keepDetailsConfidential) {
      await Promise.all([
        expect(
          page
            .getByRole("row", {
              name: `${amendApplicantDetailsSubmitContent.text16_6} ${CommonStaticText.yes}`,
              exact: true,
            })
            .locator("td"),
        ).toBeVisible(),
        expect(
          page
            .getByRole("row", {
              name: `${amendApplicantDetailsSubmitContent.text16_10} ${CommonStaticText.yes}`,
              exact: true,
            })
            .locator("td"),
        ).toBeVisible(),
        expect(
          page
            .getByRole("row", {
              name: `${amendApplicantDetailsSubmitContent.text16_email} ${CommonStaticText.yes}`,
              exact: true,
            })
            .locator("td"),
        ).toBeVisible(),
      ]);
    }
    if (solicitorDetailsChange) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendApplicantDetails2Content.postcodeInput2}")`,
        1,
      );
    }
  }
}
