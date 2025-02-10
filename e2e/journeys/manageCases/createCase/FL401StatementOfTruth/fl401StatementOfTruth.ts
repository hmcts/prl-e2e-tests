import { Page } from "@playwright/test";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { FL401TypeOfApplication } from "../FL401TypeOfApplication/FL401TypeOfApplication";
import { FL401WithoutNoticeOrder } from "../FL401WithoutNoticeOrder/FL401WIthoutNoticeOrder";
import { FL401ApplicantDetails } from "../FL401ApplicantDetails/FL401ApplicantDetails";
import { FL401RespondentDetails } from "../FL401RespondentDetails/FL401RespondentDetails";
import { FL401ApplicantsFamily } from "../FL401ApplicantsFamily/FL401ApplicantsFamily";
import { FL401RelationshipToRespondent } from "../FL401RelationshipToRespondent/FL401RelationshipToRespondent";
import { FL401RespondentsBehaviour } from "../FL401RespondentsBehaviour/FL401RespondentsBehaviour";
import { FL401OtherProceedings } from "../FL401OtherProceedings/FL401OtherProceedings";
import { FL401TheHome } from "../FL401TheHome/fl401TheHome";
import { StatementOfTruth1Page } from "../../../../pages/manageCases/createCase/FL401/statementOfTruth/statementOfTruth1Page";
import { Helpers } from "../../../../common/helpers";
import { StatementOfTruth2Page } from "../../../../pages/manageCases/createCase/FL401/statementOfTruth/statementOfTruth2Page";
import { StatementOfTruth3Page } from "../../../../pages/manageCases/createCase/FL401/statementOfTruth/statementOfTruth3Page";
import { StatementOfTruthSummaryPage } from "../../../../pages/manageCases/createCase/FL401/statementOfTruth/statementOfTruthSummaryPage";

interface Fl401StatementOfTruthOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  fl401YesNoToEverything: boolean;
  subJourney: boolean;
}

export class Fl401StatementOfTruth {
  public static async fl401StatementOfTruth(
    {
      page,
      accessibilityTest,
      errorMessaging,
      fl401YesNoToEverything,
      subJourney,
    }: Fl401StatementOfTruthOptions,
    isDummyCase: boolean = false,
  ): Promise<void> {
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
      "Statement of truth and submit",
    );
    await StatementOfTruth1Page.statementOfTruth1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await StatementOfTruth2Page.statementOfTruth2Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    await StatementOfTruth3Page.statementOfTruth3Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
    });
    if (!isDummyCase) {
      await StatementOfTruthSummaryPage.statementOfTruthSummaryPage({
        page,
        accessibilityTest,
        fl401YesNoToEverything,
      });
    }
  }
}
