import { expect, Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import { ApplicantGender } from "../../../../../common/types";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { AmendApplicantDetails1Content } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendApplicantDetails/AmendApplicantDetails1Content.js";
import { c100AmendApplicantDetailsSubmitContent } from "../../../../../fixtures/manageCases/caseProgression/amendDetails/amendApplicantDetails/c100AmendApplicantDetailsSubmitContent.js";

interface C100AmendApplicantDetailsSubmitOptions {
  page: Page;
  accessibilityTest: boolean;
  nameChange: boolean;
  dobChange: boolean;
  pobChange: boolean;
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

export class C100AmendApplicantDetailsSubmitPage {
  public static async c100AmendApplicantDetailsSubmitPage({
    page,
    accessibilityTest,
    nameChange,
    dobChange,
    pobChange,
    dobChangeDay,
    dobChangeMonth,
    dobChangeYear,
    genderChange,
    gender,
    liveInRefuge,
    changeApplicantAddress,
    keepDetailsConfidential,
    solicitorDetailsChange,
  }: C100AmendApplicantDetailsSubmitOptions): Promise<void> {
    await this.checkStaticContent(page, solicitorDetailsChange);
    await this.checkDynamicContent({
      page,
      nameChange,
      dobChange,
      pobChange,
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
    await expect(
      page.locator(
        `${Selectors.alertMessage}:has-text("${c100AmendApplicantDetailsSubmitContent.confirmationMessage}")`,
      ),
    ).toBeVisible();
  }

  private static async checkStaticContent(
    page: Page,
    solicitorDetailsChange: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${c100AmendApplicantDetailsSubmitContent.pageTitle}")`,
    );
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h2}:text-is("${c100AmendApplicantDetailsSubmitContent.h2}")`,
      1,
    );

    if (solicitorDetailsChange) {
      //if there is a change in solicitor details, there will be two instances of the address labels.
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_2}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_19}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_20}"):visible`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_3}"):visible`,
          3,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_4}"):visible`,
          3,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_5}"):visible`,
          3,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_6}"):visible`,
          3,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_7}"):visible`,
          3,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_11}"):visible`,
          3,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_14}")`,
          4,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_15}")`,
          3,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_16}")`,
          4,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_17}")`,
          4,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_18}")`,
          4,
        ),
      ]);
    } else {
      const texts = Object.entries(c100AmendApplicantDetailsSubmitContent)
        .filter(([key]) => key.startsWith("text16_"))
        .map(([, value]) => value); // extract label text

      await Promise.all(
        texts.map(async (text) => {
          const locator = page.getByText(text, { exact: true });
          const count = await locator.count();

          await Promise.all(
            Array.from({ length: count }).map((_, i) =>
              expect.soft(locator.nth(i)).toBeVisible(),
            ),
          );
        }),
      );
    }
  }

  private static async checkDynamicContent({
    page,
    nameChange,
    dobChange,
    pobChange,
    genderChange,
    gender,
    liveInRefuge,
    changeApplicantAddress,
    keepDetailsConfidential,
    solicitorDetailsChange,
    dobChangeDay,
    dobChangeMonth,
    dobChangeYear,
  }: C100AmendApplicantDetailsSubmitOptions): Promise<void> {
    if (nameChange) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AmendApplicantDetails1Content.firstNameInput}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${AmendApplicantDetails1Content.lastNameInput}")`,
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
    if (pobChange) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendApplicantDetails1Content.placeOfBirthInput}")`,
        1,
      );
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
            2,
          );
          break;
        case "other":
          await Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${AmendApplicantDetails1Content.applicantGenderOtherInput}")`,
            1,
          );
          break;
      }
    }
    if (liveInRefuge) {
      await expect(
        page
          .getByRole("row", {
            name: `${c100AmendApplicantDetailsSubmitContent.text16_refugeYes}`,
            exact: true,
          })
          .locator("div")
          .nth(1),
      ).toBeVisible();
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${c100AmendApplicantDetailsSubmitContent.text16_hidden1}")`,
        1,
      );
    }
    if (changeApplicantAddress) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendApplicantDetails1Content.postcodeInput1}")`,
        1,
      );
    }
    if (keepDetailsConfidential) {
      await Promise.all([
        expect(
          page
            .getByRole("row", {
              name: `${c100AmendApplicantDetailsSubmitContent.text16_8} ${CommonStaticText.yes}`,
              exact: true,
            })
            .locator("td"),
        ).toBeVisible(),
        expect(
          page
            .getByRole("row", {
              name: `${c100AmendApplicantDetailsSubmitContent.text16_12} ${AmendApplicantDetails1Content.applicantPhoneNumberInput}`,
              exact: true,
            })
            .locator("td"),
        ).toBeVisible(),
        expect(
          page
            .getByRole("row", {
              name: `${c100AmendApplicantDetailsSubmitContent.text16_10} ${CommonStaticText.no}`,
              exact: true,
            })
            .locator("td")
            .nth(1),
        ).toBeVisible(),
        expect(
          page
            .getByRole("row", {
              name: `${c100AmendApplicantDetailsSubmitContent.text16_13} ${CommonStaticText.yes}`,
              exact: true,
            })
            .locator("td")
            .nth(1),
        ).toBeVisible(),
        expect(
          page
            .getByRole("row", {
              name: `${c100AmendApplicantDetailsSubmitContent.text16_9} ${CommonStaticText.yes}`,
              exact: true,
            })
            .locator("td")
            .nth(1),
        ).toBeVisible(),
        expect(
          page
            .getByRole("row", {
              name: `${c100AmendApplicantDetailsSubmitContent.text16_email} ${CommonStaticText.yes}`,
              exact: true,
            })
            .locator("td")
            .nth(1),
        ).toBeVisible(),
      ]);
    }
    if (solicitorDetailsChange) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AmendApplicantDetails1Content.postcodeInput2}")`,
        1,
      );
    }
  }
}
