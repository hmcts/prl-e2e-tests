import {
  C100RespondentAddress5Years,
  C100RespondentGender,
  C100RespondentLegalRepresentation,
} from "./respondentDetails1Page.ts";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors.ts";
import { C100RespondentDetailsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/respondentDetails/c100RespondentDetailsSubmitContent.ts";
import { Helpers } from "../../../../../common/helpers.ts";
import { C100RespondentDetails1Content } from "../../../../../fixtures/manageCases/createCase/C100/respondentDetails/c100RespondentDetails1Content.ts";

interface RespondentDetailsSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoRespondentDetailsC100: boolean;
  respondentGender: C100RespondentGender;
  respondentAddress5Years: C100RespondentAddress5Years;
  respondentLegalRepresentation: C100RespondentLegalRepresentation;
}

interface CheckDefaultContentOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoRespondentDetailsC100: boolean;
}

interface CheckFilledDataOptions {
  page: Page;
  yesNoRespondentDetailsC100: boolean;
  respondentGender: C100RespondentGender;
  respondentAddress5Years: C100RespondentAddress5Years;
  respondentLegalRepresentation: C100RespondentLegalRepresentation;
}

export class RespondentDetailsSubmitPage {
  public static async RespondentDetailsSubmitPage({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoRespondentDetailsC100: yesNoRespondentDetailsC100,
    respondentGender: respondentGender,
    respondentAddress5Years: respondentAddress5Years,
    respondentLegalRepresentation: respondentLegalRepresentation,
  }: RespondentDetailsSubmitPageOptions): Promise<void> {
    await this.checkPageContent({
      page,
      accessibilityTest,
      yesNoRespondentDetailsC100,
      respondentGender,
      respondentAddress5Years,
      respondentLegalRepresentation,
    });
  }

  private static async checkPageContent({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoRespondentDetailsC100: yesNoRespondentDetailsC100,
    respondentGender: respondentGender,
    respondentAddress5Years: respondentAddress5Years,
    respondentLegalRepresentation: respondentLegalRepresentation,
  }: RespondentDetailsSubmitPageOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${C100RespondentDetailsSubmitContent.h21}")`,
    );
    await Promise.all([
      this.checkDefaultContent({
        page,
        accessibilityTest,
        yesNoRespondentDetailsC100,
      }),
      this.checkFilledData({
        page,
        yesNoRespondentDetailsC100,
        respondentGender,
        respondentAddress5Years,
        respondentLegalRepresentation,
      }),
    ]);
    await this.continueOn(page);
  }

  private static async checkDefaultContent({
    page,
    accessibilityTest,
    yesNoRespondentDetailsC100,
  }: CheckDefaultContentOptions): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${C100RespondentDetailsSubmitContent.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${C100RespondentDetailsSubmitContent.h22}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        14,
        C100RespondentDetailsSubmitContent,
        `text16`,
        `${Selectors.GovukText16}`,
      ),
    ]);
    if (yesNoRespondentDetailsC100) {
      await Promise.all([
        Helpers.checkGroup(
          page,
          12,
          C100RespondentDetailsSubmitContent,
          `text16yes`,
          `${Selectors.GovukText16}`,
        ),
      ]);
    }
    if (accessibilityTest) {
      // await new AxeUtils(page).audit(); //bug ticket raised: EXUI-3000
    }
  }

  private static async checkFilledData({
    page: page,
    yesNoRespondentDetailsC100: yesNoRespondentDetailsC100,
    respondentGender: respondentGender,
    respondentAddress5Years: respondentAddress5Years,
    respondentLegalRepresentation: respondentLegalRepresentation,
  }: CheckFilledDataOptions): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.respondentFirstName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.respondentLastName}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.respondentPrevName}")`,
        1,
      ),
    ]);
    switch (respondentGender) {
      case "male":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.male}")`,
          1,
        );
        break;
      case "female":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.female}")`,
          1,
        );
        break;
      case "other":
        await Promise.all([
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.text16otherGender}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.other}")`,
            1,
          ),
          Helpers.checkVisibleAndPresent(
            page,
            `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.otherGender}")`,
            1,
          ),
        ]);
        break;
    }
    switch (respondentAddress5Years) {
      case "yes":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.Span}:text-is("${C100RespondentDetails1Content.last5Years}")`,
          1,
        );
        break;
      case "dontKnow":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.dontKnow}")`,
          2,
        );
        break;
      default:
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.no}")`,
          7,
        );
        break;
    }
    if (yesNoRespondentDetailsC100 && respondentLegalRepresentation === "yes") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.yes}")`,
          7,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.placeOfBirth}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.phoneNumber}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.representativeFirstName}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.representativeLastName}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.dxNumber}")`,
          1,
        ),
      ]);
    }
  }

  private static async continueOn(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${C100RespondentDetailsSubmitContent.continue}")`,
    );
  }
}
