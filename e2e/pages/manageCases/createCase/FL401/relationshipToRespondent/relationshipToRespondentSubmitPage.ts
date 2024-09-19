import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import {
  RelationshipToRespondentSubmitContent
} from "../../../../../fixtures/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondentSubmitContent";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { relationshipToRespondent } from "./relationshipToRespondent1Page";
import { respondentRelationshipOther } from "./relationshipToRespondent2Page";

interface relationshipToRespondentSubmitPageOptions {
  page: Page,
  accessibilityTest: boolean,
  relationshipToRespondent: relationshipToRespondent,
  respondentRelationshipOther?: respondentRelationshipOther
}

interface checkPageLoadsOptions {
  page: Page,
  accessibilityTest: boolean,
  respondentRelationship: relationshipToRespondent,
  respondentRelationshipOther?: respondentRelationshipOther
}

interface checkStaticTextOptions {
  page: Page,
  relationshipToRespondent: relationshipToRespondent,
  respondentRelationshipOther?: respondentRelationshipOther
}

interface checkFilledDataOptions {
  page: Page,
  relationshipToRespondent: relationshipToRespondent,
  respondentRelationshipOther?: respondentRelationshipOther
}

export class RelationshipToRespondentSubmitPage {
  public static async relationshipToRespondentSubmitPage({
     page,
     accessibilityTest,
     relationshipToRespondent,
     respondentRelationshipOther
  }: relationshipToRespondentSubmitPageOptions): Promise<void> {
    await this.checkPageLoads({
      page: page,
      accessibilityTest: accessibilityTest,
      respondentRelationship: relationshipToRespondent,
      respondentRelationshipOther: respondentRelationshipOther
    });
    await this.fillInFields(page);
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
    respondentRelationship,
    respondentRelationshipOther
  }: checkPageLoadsOptions): Promise<void> {
    await this.checkStaticText({
      page: page,
      relationshipToRespondent: respondentRelationship,
      respondentRelationshipOther: respondentRelationshipOther
    })
    await this.checkFilledData({
      page: page,
      relationshipToRespondent: respondentRelationship,
      respondentRelationshipOther: respondentRelationshipOther
    });
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page)
    }
  }

  private static async checkStaticText({
    page,
    relationshipToRespondent,
    respondentRelationshipOther
  }: checkStaticTextOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${RelationshipToRespondentSubmitContent.h2}")`
    );
    await Promise.all(
      [
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${RelationshipToRespondentSubmitContent.text16Change}")`,
          2
        ),
        Helpers.checkGroup(
          page,
          2,
          RelationshipToRespondentSubmitContent,
          'defaultText16',
          `${Selectors.GovukText16}`
        ),
      ]
    );
    if (relationshipToRespondent === 'None of the above') {
      let staticTextCount = (respondentRelationshipOther === 'Other') ? 2 : 1;
      await Helpers.checkGroup(
        page,
        staticTextCount,
        RelationshipToRespondentSubmitContent,
        'isNoneText16Static',
        `${Selectors.GovukText16}`
      );
    } else {
      await Helpers.checkGroup(
        page,
        4,
        RelationshipToRespondentSubmitContent,
        'relationshipPeriodText16',
        `${Selectors.GovukText16}`
      );
    }
  }
  
  private static async checkFilledData({
   page,
   relationshipToRespondent,
   respondentRelationshipOther
  }: checkFilledDataOptions): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukText16}:text-is("${relationshipToRespondent}")`,
      1
    );
    if (relationshipToRespondent === 'None of the above') {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${respondentRelationshipOther}")`,
        1
      );
      if (respondentRelationshipOther === 'Other') {
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${RelationshipToRespondentSubmitContent.relationshipOtherInput}")`,
          1
        );
      }
    } else {
      await Helpers.checkGroup(
        page,
        3,
        RelationshipToRespondentSubmitContent,
        'relationshipPeriodText16',
        `${Selectors.GovukText16}`
      )
    }
  }

  private static async fillInFields(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${RelationshipToRespondentSubmitContent.continue}")`
    )
  }
}