import {
  C100RespondentAddress5Years,
  C100RespondentGender,
  C100RespondentLegalRepresentation,
} from "./respondentDetails1Page";
import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { C100RespondentDetailsSubmitContent } from "../../../../../fixtures/manageCases/createCase/C100/respondentDetails/c100RespondentDetailsSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import {
  C100RespondentDetails1Content
} from "../../../../../fixtures/manageCases/createCase/C100/respondentDetails/c100RespondentDetails1Content";

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
  accessibilityTest: boolean;
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
    await this.checkDefaultContent({
      page,
      accessibilityTest,
      yesNoRespondentDetailsC100,
    });
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
          `text16Yes`,
          `${Selectors.GovukText16}`,
        ),
      ]);
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkFilledData({
    page: page,
    accessibilityTest: accessibilityTest,
    yesNoRespondentDetailsC100: yesNoRespondentDetailsC100,
    respondentGender: respondentGender,
    respondentAddress5Years: respondentAddress5Years,
    respondentLegalRepresentation: respondentLegalRepresentation,
  }: CheckFilledDataOptions): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(page, `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.respondentFirstName}")`, 1,),
      Helpers.checkVisibleAndPresent(page, `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.respondentLastName}")`, 1,),
      Helpers.checkVisibleAndPresent(page, `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.respondentPrevName}")`, 1,),
      Helpers.checkVisibleAndPresent(page, `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.no}")`, 7),
    ]);
    switch (respondentGender) {
      case "male":
        await Helpers.checkVisibleAndPresent(page, `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.male}")`, 1);
        break;
      case "female":
        await Helpers.checkVisibleAndPresent(page, `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.female}")`, 1);
        break;
      case "other":
        await Promise.all([
          Helpers.checkVisibleAndPresent(page, `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.text16otherGender}")`, 1),
          Helpers.checkVisibleAndPresent(page, `${Selectors.GovukText16}:text-is("${C100RespondentDetailsSubmitContent.other}")`, 1),
          Helpers.checkVisibleAndPresent(page, `${Selectors.GovukText16}:text-is("${C100RespondentDetails1Content.otherGender}")`, 1),
        ]);
        break;
    }
    switch (respondentAddress5Years) {
      case "yes":

        break;

    }
  }
}
