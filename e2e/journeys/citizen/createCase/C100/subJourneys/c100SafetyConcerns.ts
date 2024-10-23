import { Page } from "@playwright/test";
import { ConcernGuidancePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/concernGuidancePage";
import { ConcernsForSafetyPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/concernsForSafetyPage";
import { ConcernAboutPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/concernAboutPage";
import { ChildConcernsAboutPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcernsAboutPage";
import { PhysicalAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/physicalAbusePage";
import { PsychologicalAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/psychologicalAbusePage";
import { EmotionalAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/emotionalAbusePage";
import { SexualAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/sexualAbusePage";
import { FinancialAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/financialAbusePage";

export enum reportAbuseCheckboxIDs {
  child1 = "#childrenConcernedAbout",
}

export enum reportAbuseInputIDs {
  ongoingBehaviorYes = "#isOngoingBehaviour",
  ongoingBehaviorNo = "#isOngoingBehaviour-2",
  seekHelpYes = "#seekHelpFromPersonOrAgency",
  seekHelpNo = "#seekHelpFromPersonOrAgency-2",
  behaviourDetails = "#behaviourDetails",
  behaviourStartDate = "#behaviourStartDate",
  seekHelpDetails = "#seekHelpDetails",
}

interface C100SafetyConcernsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ChildrenSafetyConcerns: boolean;
  c100ReportAbuseYesNoToAll: boolean;
  c100EmotionalAbuseYesNoToAll: boolean;
  c100SexualAbuseYesNoToAll: boolean;
  c100FinancialAbuseYesNoToAll: boolean;
}

export class C100SafetyConcerns {
  public static async c100SafetyConcerns({
    page,
    accessibilityTest,
    errorMessaging,
    c100ChildrenSafetyConcerns,
    c100ReportAbuseYesNoToAll,
    c100EmotionalAbuseYesNoToAll,
    c100SexualAbuseYesNoToAll,
    c100FinancialAbuseYesNoToAll,
  }: C100SafetyConcernsOptions): Promise<void> {
    await ConcernGuidancePage.concernGuidancePage({
      page: page,
      accessibilityTest: accessibilityTest,
    });
    await ConcernsForSafetyPage.concernsForSafetyPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100ChildrenSafetyConcerns: c100ChildrenSafetyConcerns,
    });
    if (c100ChildrenSafetyConcerns) {
      await ConcernAboutPage.concernAboutPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await ChildConcernsAboutPage.childConcernsAboutPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await PhysicalAbusePage.physicalAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100PhysicalAbuseYesNoToAll: c100ReportAbuseYesNoToAll,
      });
      await PsychologicalAbusePage.psychologicalAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100PsychologicalAbuseYesNoToAll: c100ReportAbuseYesNoToAll,
      });
      // PRL-6401
      await EmotionalAbusePage.emotionalAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100EmotionalAbuseYesNoToAll: c100EmotionalAbuseYesNoToAll,
      });
      await SexualAbusePage.sexualAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100SexualAbuseYesNoToAll: c100SexualAbuseYesNoToAll,
      });
      await FinancialAbusePage.financialAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100FinancialAbuseYesNoToAll: c100FinancialAbuseYesNoToAll,
      });
    }
  }
}
