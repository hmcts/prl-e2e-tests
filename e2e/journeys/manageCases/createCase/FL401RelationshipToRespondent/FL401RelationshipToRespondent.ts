import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import {
  RelationshipToRespondent1Page
} from "../../../../pages/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondent1Page";
import {
  RelationshipToRespondent2Page
} from "../../../../pages/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondent2Page";
import {
  RelationshipToRespondentSubmitPage
} from "../../../../pages/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondentSubmitPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

export type relationshipToRespondent =
  | "Married or in a civil partnership"
  | "Formerly married or in a civil partnership"
  | "Engaged or proposed civil partnership"
  | "Formerly engaged or proposed civil partnership"
  | "Live together as a couple"
  | "Formerly lived together as a couple"
  | "Boyfriend, girlfriend or partner who does not live with them"
  | "Formerly boyfriend, girlfriend or partner who has not lived with them"
  | "None of the above";

export type respondentRelationshipOther =
  | "Father"
  | "Mother"
  | "Son"
  | "Daughter"
  | "Brother"
  | "Sister"
  | "Grandfather"
  | "Grandmother"
  | "Uncle"
  | "Aunt"
  | "Nephew"
  | "Niece"
  | "Cousin"
  | "Other";

interface fl401RelationshipToRespondentOptions {
  page: Page,
  accessibilityTest: boolean,
  errorMessaging: boolean,
  relationshipToRespondent: relationshipToRespondent,
  relationshipToRespondentOther?: respondentRelationshipOther,
  subJourney: boolean
}

export class FL401RelationshipToRespondent {
  public static async fl401RelationshipToRespondent({
    page,
    accessibilityTest,
    errorMessaging,
    relationshipToRespondent,
    relationshipToRespondentOther,
    subJourney
  }: fl401RelationshipToRespondentOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
    await Helpers.selectSolicitorEvent(
      page,
      "Relationship to respondent"
    );
    await RelationshipToRespondent1Page.relationshipToRespondent1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      relationshipToRespondent: relationshipToRespondent
    });
    console.log('p1 done')
    await RelationshipToRespondent2Page.relationshipToRespondent2Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      respondentRelationshipOther: relationshipToRespondentOther
    });
    await RelationshipToRespondentSubmitPage.relationshipToRespondentSubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      relationshipToRespondent: relationshipToRespondent,
      respondentRelationshipOther: relationshipToRespondentOther
    });
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
