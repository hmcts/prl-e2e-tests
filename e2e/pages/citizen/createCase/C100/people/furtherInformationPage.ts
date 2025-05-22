import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { yesNoDontKnow } from "../../../../../common/types";
import { FurtherInformationContent } from "../../../../../fixtures/citizen/createCase/C100/people/furtherInformationContent.ts";
import { uniqueSelectors } from "../urgencyAndWithoutNotice/urgentFirstHearingPage";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper.ts";

interface FurtherInformationPageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100PeopleYesNoDontKnow: yesNoDontKnow;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
  c100PeopleYesNoDontKnow: yesNoDontKnow;
}

interface fillInFieldsOptions {
  page: Page;
  c100PeopleYesNoDontKnow: yesNoDontKnow;
}

enum radioIds {
  childrenKnownToSocialServices = "#cd_childrenKnownToSocialServices",
  childrenKnownToSocialServices_2 = "#cd_childrenKnownToSocialServices-2",
  childrenKnownToSocialServices_3 = "#cd_childrenKnownToSocialServices-3",
  childrenSubjectOfProtectionPlan = "#cd_childrenSubjectOfProtectionPlan",
  childrenSubjectOfProtectionPlan_2 = "#cd_childrenSubjectOfProtectionPlan-2",
  childrenSubjectOfProtectionPlan_3 = "#cd_childrenSubjectOfProtectionPlan-3",
}

enum inputIds {
  childrenKnownToSocialServicesDetails = "#cd_childrenKnownToSocialServicesDetails",
}

export class FurtherInformationPage {
  public static async furtherInformationPage({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
  }: FurtherInformationPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
    });
    if (errorMessaging) {
      await this.triggerErrorMessages(page, c100PeopleYesNoDontKnow);
    }
    await this.fillInFields({
      page: page,
      c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
    });
  }

  private static async checkPageLoads({
    page: page,
    accessibilityTest: accessibilityTest,
    c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingXL}:text-is("${FurtherInformationContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        FurtherInformationContent,
        "legend",
        `${uniqueSelectors.legend}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.yes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.no}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukLabel}:text-is("${CommonStaticText.dontKnow}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHint}:text-is("${FurtherInformationContent.hint2}")`,
        1,
      ),
    ]);
    if (c100PeopleYesNoDontKnow === "yes") {
      await page.click(radioIds.childrenKnownToSocialServices);
      await page.waitForSelector(
        `${Selectors.GovukLabel}:text-is("${FurtherInformationContent.hint1}")`,
      );
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page, [
        radioIds.childrenKnownToSocialServices,
      ]); //false-positive (https://github.com/alphagov/govuk-frontend/issues/979, https://github.com/w3c/aria/issues/1404)
    }
  }

  private static async triggerErrorMessages(
    page: Page,
    c100PeopleYesNoDontKnow: yesNoDontKnow,
  ): Promise<void> {
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
    await page.waitForSelector(
      `${Selectors.GovukErrorSummaryTitle}:text-is("${CommonStaticText.errorSummaryTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${FurtherInformationContent.errorLink2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessageCitizen}:text-is("${FurtherInformationContent.errorLink2}")`,
        1,
      ),
    ]);
    if (c100PeopleYesNoDontKnow === "yes") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${FurtherInformationContent.errorLink3}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessageCitizen}:text-is("${FurtherInformationContent.errorLink3}")`,
          1,
        ),
      ]);
    } else {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.a}:text-is("${FurtherInformationContent.errorLink1}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessageCitizen}:text-is("${FurtherInformationContent.errorLink1}")`,
          1,
        ),
      ]);
    }
  }

  private static async fillInFields({
    page: page,
    c100PeopleYesNoDontKnow: c100PeopleYesNoDontKnow,
  }: fillInFieldsOptions): Promise<void> {
    switch (c100PeopleYesNoDontKnow) {
      case "yes":
        await page.click(radioIds.childrenKnownToSocialServices);
        await page.fill(
          `${inputIds.childrenKnownToSocialServicesDetails}`,
          FurtherInformationContent.exampleText,
        );
        await page.click(radioIds.childrenSubjectOfProtectionPlan);
        break;
      case "no":
        await page.click(radioIds.childrenKnownToSocialServices_2);
        await page.click(radioIds.childrenSubjectOfProtectionPlan_2);
        break;
      case "dontKnow":
        await page.click(radioIds.childrenKnownToSocialServices_3);
        await page.click(radioIds.childrenSubjectOfProtectionPlan_3);
        break;
      default:
        throw new Error(
          `Unexpected value for c100PeopleYesNoDontKnow: ${c100PeopleYesNoDontKnow}`,
        );
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
