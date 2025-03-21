import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import {
  fl401RelationshipToRespondent,
  RelationshipToRespondent1Page,
} from "../../../../pages/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondent1Page";
import {
  RelationshipToRespondent2Page,
  fl401RespondentRelationshipOther,
} from "../../../../pages/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondent2Page";
import { RelationshipToRespondentSubmitPage } from "../../../../pages/manageCases/createCase/FL401/relationshipToRespondent/relationshipToRespondentSubmitPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

interface fl401RelationshipToRespondentOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  relationshipToRespondent: fl401RelationshipToRespondent;
  relationshipToRespondentOther?: fl401RespondentRelationshipOther;
}

export class FL401RelationshipToRespondent {
  public static async fl401RelationshipToRespondent({
    page,
    accessibilityTest,
    errorMessaging,
    relationshipToRespondent,
    relationshipToRespondentOther,
  }: fl401RelationshipToRespondentOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(
      page,
      "Relationship to respondent",
    );
    await RelationshipToRespondent1Page.relationshipToRespondent1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      relationshipToRespondent: relationshipToRespondent,
    });
    await RelationshipToRespondent2Page.relationshipToRespondent2Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      respondentRelationshipOther: relationshipToRespondentOther,
    });
    await RelationshipToRespondentSubmitPage.relationshipToRespondentSubmitPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        relationshipToRespondent: relationshipToRespondent,
        respondentRelationshipOther: relationshipToRespondentOther,
      },
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
