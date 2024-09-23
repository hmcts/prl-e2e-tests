import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RelationshipToRespondent1Content } from "../../../../../fixtures/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondent1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";

const respondentRelationshipSelector = "#respondentRelationObject_applicantRelationship-"

export type fl401RelationshipToRespondent =
  | "marriedOrCivil"
  | "formerlyMarriedOrCivil"
  | "engagedOrProposed"
  | "formerlyEngagedOrProposed"
  | "liveTogether"
  | "foremerlyLivedTogether"
  | "bfGfOrPartnerNotLivedTogether"
  | "formerBfGfOrPartnerNotLivedTogether"
  | "noneOfTheAbove";

interface relationshipToRespondent1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  relationshipToRespondent: fl401RelationshipToRespondent;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface fillInFieldsOptions {
  page: Page;
  relationshipToRespondent: fl401RelationshipToRespondent;
}

export class RelationshipToRespondent1Page {
  public static async relationshipToRespondent1Page({
    page,
    accessibilityTest,
    errorMessaging,
    relationshipToRespondent,
  }: relationshipToRespondent1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({
      page: page,
      relationshipToRespondent: relationshipToRespondent,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: checkPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${RelationshipToRespondent1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${RelationshipToRespondent1Content.p1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        10,
        RelationshipToRespondent1Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondent1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${RelationshipToRespondent1Content.errorSummaryTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${RelationshipToRespondent1Content.errorValidation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${RelationshipToRespondent1Content.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields({
    page,
    relationshipToRespondent,
  }: fillInFieldsOptions): Promise<void> {
    await page.click(
      `${respondentRelationshipSelector}${relationshipToRespondent}`
    );
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondent1Content.continue}")`,
    );
  }
}