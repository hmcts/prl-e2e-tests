import { Page } from "@playwright/test";

export type respondentRelationship =
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
  relationshipToRespondent: respondentRelationship,
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
    if (relationshipToRespondent) {

    }
  }
}
