import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RelationshipToRespondent1Content } from "../../../../../fixtures/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondent1Content";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { relationshipToRespondent } from "../../../../../journeys/manageCases/createCase/FL401RelationshipToRespondent/FL401RelationshipToRespondent";

enum respondentRelationshipIDs {
  marriedOrCivil = "#respondentRelationObject_applicantRelationship-marriedOrCivil",
  formerlyMarriedOrCivil = "#respondentRelationObject_applicantRelationship-formerlyMarriedOrCivil",
  engagedOrProposed = "#respondentRelationObject_applicantRelationship-engagedOrProposed",
  formerlyEngagedOrProposed = "#respondentRelationObject_applicantRelationship-formerlyEngagedOrProposed",
  liveTogether = "#respondentRelationObject_applicantRelationship-liveTogether",
  formerlyLivedTogether = "#respondentRelationObject_applicantRelationship-foremerlyLivedTogether",
  bfGfOrPartner = "#respondentRelationObject_applicantRelationship-bfGfOrPartnerNotLivedTogether",
  formerlyBfGfOrPartner = "#respondentRelationObject_applicantRelationship-formerBfGfOrPartnerNotLivedTogether",
  noneOfTheAbove = "#respondentRelationObject_applicantRelationship-noneOfTheAbove",
}

interface relationshipToRespondent1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  relationshipToRespondent: relationshipToRespondent;
}

interface checkPageLoadsOptions {
  page: Page,
  accessibilityTest: boolean
}

interface fillInFieldsOptions {
  page: Page,
  relationshipToRespondent: relationshipToRespondent,
}

export class RelationshipToRespondent1Page {
  public static async relationshipToRespondent1Page({
    page,
    accessibilityTest,
    errorMessaging,
    relationshipToRespondent,
  }: relationshipToRespondent1PageOptions): Promise<void> {
    await this.checkPageLoads({ page: page, accessibilityTest: accessibilityTest });
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields({ page: page, relationshipToRespondent: relationshipToRespondent });
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
    relationshipToRespondent
  }: fillInFieldsOptions): Promise<void> {
    switch (relationshipToRespondent) {
      case "Married or in a civil partnership":
        await page.click(respondentRelationshipIDs.marriedOrCivil);
        break;
      case "Formerly married or in a civil partnership":
        await page.click(respondentRelationshipIDs.formerlyMarriedOrCivil);
        break;
      case "Engaged or proposed civil partnership":
        await page.click(respondentRelationshipIDs.engagedOrProposed);
        break;
      case "Formerly engaged or proposed civil partnership":
        await page.click(respondentRelationshipIDs.formerlyEngagedOrProposed);
        break;
      case "Live together as a couple":
        await page.click(respondentRelationshipIDs.liveTogether);
        break;
      case "Formerly lived together as a couple":
        await page.click(respondentRelationshipIDs.formerlyLivedTogether);
        break;
      case "Boyfriend, girlfriend or partner who does not live with them":
        await page.click(respondentRelationshipIDs.bfGfOrPartner);
        break;
      case "Formerly boyfriend, girlfriend or partner who has not lived with them":
        await page.click(respondentRelationshipIDs.formerlyBfGfOrPartner);
        break;
      case "None of the above":
        await page.click(respondentRelationshipIDs.noneOfTheAbove);
        break;
      default:
        console.log(
          `Unknown respondent relationship: ${relationshipToRespondent}`,
        );
    }
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondent1Content.continue}")`,
    );
  }
}