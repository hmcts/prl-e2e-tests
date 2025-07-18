import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";
import { FL401TypeOfApplication } from "../FL401TypeOfApplication/FL401TypeOfApplication.ts";
import { FL401WithoutNoticeOrder } from "../FL401WithoutNoticeOrder/FL401WIthoutNoticeOrder.ts";
import { FL401ApplicantDetails } from "../FL401ApplicantDetails/FL401ApplicantDetails.ts";
import { FL401RespondentDetails } from "../FL401RespondentDetails/FL401RespondentDetails.ts";
import { FL401ApplicantsFamily } from "../FL401ApplicantsFamily/FL401ApplicantsFamily.ts";
import { FL401RelationshipToRespondent } from "../FL401RelationshipToRespondent/FL401RelationshipToRespondent.ts";
import { FL401RespondentsBehaviour } from "../FL401RespondentsBehaviour/FL401RespondentsBehaviour.ts";
import { FL401OtherProceedings } from "../FL401OtherProceedings/FL401OtherProceedings.ts";
import { FL401TheHome } from "../FL401TheHome/fl401TheHome.ts";
import { StatementOfTruth1Page } from "../../../../pages/manageCases/createCase/FL401/statementOfTruth/statementOfTruth1Page.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { StatementOfTruth2Page } from "../../../../pages/manageCases/createCase/FL401/statementOfTruth/statementOfTruth2Page.ts";
import { StatementOfTruth3Page } from "../../../../pages/manageCases/createCase/FL401/statementOfTruth/statementOfTruth3Page.ts";

interface Fl401StatementOfTruthOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  fl401YesNoToEverything: boolean;
  subJourney: boolean;
}

export class Fl401StatementOfTruth {
  public static async fl401StatementOfTruth({
    page,
    accessibilityTest,
    errorMessaging,
    fl401YesNoToEverything,
    subJourney,
  }: Fl401StatementOfTruthOptions): Promise<void> {
    const otherProceedingsRadioSelection = fl401YesNoToEverything
      ? "Yes"
      : "No";
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
      await FL401TypeOfApplication.fl401TypeOfApplication({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        isLinkedToC100: fl401YesNoToEverything,
        subJourney: false,
      });
      await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        isWithoutNoticeDetailsYes: fl401YesNoToEverything,
        isWithoutNoticeDetailsBailConditions: "Yes",
        subJourney: false,
      });
      await FL401ApplicantDetails.fl401ApplicantDetails({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        yesNoFL401ApplicantDetails: fl401YesNoToEverything,
        applicantGender: "female",
        subJourney: false,
      });
      await FL401RespondentDetails.fl401RespondentDetails({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        respondentDetailsAllOptionsYes: fl401YesNoToEverything,
        subJourney: false,
      });
      await FL401ApplicantsFamily.fl401ApplicantsFamily({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        applicantHasChildren: fl401YesNoToEverything,
        subJourney: false,
      });
      await FL401RelationshipToRespondent.fl401RelationshipToRespondent({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        relationshipToRespondent: "noneOfTheAbove",
        relationshipToRespondentOther: "Father",
        subJourney: false,
      });
      await FL401RespondentsBehaviour.fl401RespondentsBehaviour({
        page: page,
        accessibilityTest: false,
        subJourney: false,
      });
      await FL401TheHome.fl401TheHome({
        page: page,
        accessibilityTest: false,
        applicantHasChildren: false,
        fl401TheHomeYesNo: fl401YesNoToEverything,
        fl401EverLivedAtAddress: "No",
        fl401IntendToLiveAtAddress: "No",
        subJourney: false,
      });
      await FL401OtherProceedings.fl401OtherProceedings({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        otherProceedingsRadios: otherProceedingsRadioSelection,
        subJourney: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(
      page,
      "Statement of Truth and submit",
    );
    await StatementOfTruth1Page.statementOfTruth1Page({
      page: page,
      isResubmit: false,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await StatementOfTruth2Page.statementOfTruth2Page({
      page: page,
      isResubmit: false,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await StatementOfTruth3Page.statementOfTruth3Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
  }
}
