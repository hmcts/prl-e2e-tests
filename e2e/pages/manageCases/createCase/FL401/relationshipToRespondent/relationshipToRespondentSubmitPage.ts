import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { RelationshipToRespondentSubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondentSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { fl401RelationshipToRespondent } from "./relationshipToRespondent1Page";
import { fl401RespondentRelationshipOther } from "./relationshipToRespondent2Page";

enum FL401RelationshipToRespondentValues {
  marriedOrCivil = "Married or in a civil partnership",
  formerlyMarriedOrCivil = "Formerly married or in a civil partnership",
  engagedOrProposed = "Engaged or proposed civil partnership",
  formerlyEngagedOrProposed = "Formerly engaged or proposed civil partnership",
  liveTogether = "Live together as a couple",
  foremerlyLivedTogether = "Formerly lived together as a couple",
  bfGfOrPartnerNotLivedTogether = "Boyfriend, girlfriend or partner who does not live with them",
  formerBfGfOrPartnerNotLivedTogether = "Formerly boyfriend, girlfriend or partner who has not lived with them",
  noneOfTheAbove = "None of the above",
}

interface relationshipToRespondentSubmitPageOptions {
  page: Page;
  accessibilityTest: boolean;
  relationshipToRespondent: fl401RelationshipToRespondent;
  respondentRelationshipOther?: fl401RespondentRelationshipOther;
}

interface checkPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
  respondentRelationship: fl401RelationshipToRespondent;
  respondentRelationshipOther?: fl401RespondentRelationshipOther;
}

interface checkStaticTextOptions {
  page: Page;
  relationshipToRespondent: fl401RelationshipToRespondent;
  respondentRelationshipOther?: fl401RespondentRelationshipOther;
}

interface checkFilledDataOptions {
  page: Page;
  relationshipToRespondent: fl401RelationshipToRespondent;
  respondentRelationshipOther?: fl401RespondentRelationshipOther;
}

export class RelationshipToRespondentSubmitPage {
  public static async relationshipToRespondentSubmitPage({
    page,
    accessibilityTest,
    relationshipToRespondent,
    respondentRelationshipOther,
  }: relationshipToRespondentSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      respondentRelationship: relationshipToRespondent,
      respondentRelationshipOther: respondentRelationshipOther,
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    respondentRelationship,
    respondentRelationshipOther,
  }: checkPageLoadsOptions): Promise<void> {
    await this.checkStaticText({
      page: page,
      relationshipToRespondent: respondentRelationship,
      respondentRelationshipOther: respondentRelationshipOther,
    });
    await this.checkFilledData({
      page: page,
      relationshipToRespondent: respondentRelationship,
      respondentRelationshipOther: respondentRelationshipOther,
    });
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkStaticText({
    page,
    relationshipToRespondent,
    respondentRelationshipOther,
  }: checkStaticTextOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${RelationshipToRespondentSubmitContent.h2}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${RelationshipToRespondentSubmitContent.text16Change}")`,
        2,
      ),
      Helpers.checkGroup(
        page,
        2,
        RelationshipToRespondentSubmitContent,
        "defaultText16",
        `${Selectors.GovukText16}`,
      ),
    ]);
    if (relationshipToRespondent === "noneOfTheAbove") {
      const staticTextCount = respondentRelationshipOther === "Other" ? 2 : 1;
      await Helpers.checkGroup(
        page,
        staticTextCount,
        RelationshipToRespondentSubmitContent,
        "isNoneText16Static",
        `${Selectors.GovukText16}`,
      );
    } else {
      await Helpers.checkGroup(
        page,
        4,
        RelationshipToRespondentSubmitContent,
        "relationshipPeriodText16",
        `${Selectors.GovukText16}`,
      );
    }
  }

  private static async checkFilledData({
    page,
    relationshipToRespondent,
    respondentRelationshipOther,
  }: checkFilledDataOptions): Promise<void> {
    const relationshipToRespondentKey =
      relationshipToRespondent as keyof typeof FL401RelationshipToRespondentValues;
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${FL401RelationshipToRespondentValues[relationshipToRespondentKey]}")`,
      1,
    );
    if (relationshipToRespondent === "noneOfTheAbove") {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${respondentRelationshipOther}")`,
        1,
      );
      if (respondentRelationshipOther === "Other") {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${RelationshipToRespondentSubmitContent.relationshipOtherInput}")`,
          1,
        );
      }
    } else {
      await Helpers.checkGroup(
        page,
        3,
        RelationshipToRespondentSubmitContent,
        "relationshipPeriodText16",
        `${Selectors.GovukText16}`,
      );
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondentSubmitContent.continue}")`,
    );
  }
}
