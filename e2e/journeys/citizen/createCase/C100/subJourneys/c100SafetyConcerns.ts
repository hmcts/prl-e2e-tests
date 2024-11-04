import { Page } from "@playwright/test";
import { ConcernGuidancePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/concernGuidancePage";
import { ConcernsForSafetyPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/concernsForSafetyPage";
import { ConcernAboutPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/concernAboutPage";
import { ChildConcernsAboutPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/childConcernsAboutPage";
import { PhysicalAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/physicalAbusePage";
import { PsychologicalAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/psychologicalAbusePage";
import { EmotionalAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/emotionalAbusePage";
import { SexualAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/sexualAbusePage";
import { FinancialAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/financialAbusePage";
import { ChildLocationPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/childLocationPage";
import { PassportOfficePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/passportOfficePage";
import { PassportAmountPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/passportAmountPage";
import { PassportOfficeNotifiedPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/passportOfficeNotifiedPage";
import { AbductionThreatsPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/abductionThreatsPage";
import { YourselfConcernsAboutPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/yourselfConcerns/yourselfConcernsAboutPage";
import { PhysicalAbuseYourselfPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/yourselfConcerns/physicalAbuseYourselfPage";
import { PsychologicalAbuseYourselfPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/yourselfConcerns/psychologicalAbuseYourselfPage";
import { EmotionalAbuseYourselfPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/yourselfConcerns/emotionalAbuseYourselfPage";
import { SexualAbuseYourselfPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/yourselfConcerns/sexualAbuseYourselfPage";
import { FinancialAbuseYourselfPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/yourselfConcerns/financialAbuseYourselfPage";
import { OtherAbusePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/yourselfConcerns/otherAbusePage";
import { DrugConcernsPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/drugConcernsPage";
import { OtherIssuesPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/otherIssuesPage";
import {
  c100ChildrenSupervisionRadios,
  UnsupervisedPage,
} from "../../../../../pages/citizen/createCase/C100/safetyConcerns/unsupervisedPage";
import { PreviousAbductionsPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childConcerns/previousAbductionsPage";

interface C100SafetyConcernsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ChildrenSafetyConcerns: boolean;
  c100SafetyConcernsYesNoToAll: boolean; // Applies to all booleans that don't affect the journey
  c100ChildrenHavePassport: boolean; // If yes -> passport amount
  c100MoreThanOnePassport: boolean;
  c100PassportOfficeNotified: boolean;
  c100ChildrenAbductedBefore: boolean; // if yes -> previous abductions page
  c100ChildrenSupervision: c100ChildrenSupervisionRadios;
}

export class C100SafetyConcerns {
  public static async c100SafetyConcerns({
    page,
    accessibilityTest,
    errorMessaging,
    c100ChildrenSafetyConcerns,
    c100SafetyConcernsYesNoToAll,
    c100ChildrenHavePassport,
    c100MoreThanOnePassport,
    c100PassportOfficeNotified,
    c100ChildrenAbductedBefore,
    c100ChildrenSupervision,
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
        c100PhysicalAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await PsychologicalAbusePage.psychologicalAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100PsychologicalAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await EmotionalAbusePage.emotionalAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100EmotionalAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await SexualAbusePage.sexualAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100SexualAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await FinancialAbusePage.financialAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100FinancialAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await ChildLocationPage.childLocationPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await PassportOfficePage.passportOfficePage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100ChildrenHavePassport: c100ChildrenHavePassport,
      });
      if (c100ChildrenHavePassport) {
        await PassportAmountPage.passportAmountPage({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          c100MoreThanOnePassport: c100MoreThanOnePassport,
        });
        await PassportOfficeNotifiedPage.passportOfficeNotifiedPage({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          c100PassportOfficeNotified: c100PassportOfficeNotified,
        });
      }
      await AbductionThreatsPage.abductionThreatsPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100ChildrenAbductedBefore: c100ChildrenAbductedBefore,
      });
      if (c100ChildrenAbductedBefore) {
        await PreviousAbductionsPage.previousAbductionsPage({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          c100YesNoPreviousAbductions: c100SafetyConcernsYesNoToAll,
        });
      }
      await YourselfConcernsAboutPage.yourselfConcernsAboutPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await PhysicalAbuseYourselfPage.physicalAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100PhysicalAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await PsychologicalAbuseYourselfPage.psychologicalAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100PsychologicalAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await EmotionalAbuseYourselfPage.emotionalAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100EmotionalAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await SexualAbuseYourselfPage.sexualAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100SexualAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await FinancialAbuseYourselfPage.financialAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100FinancialAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await OtherAbusePage.otherAbusePage({
        page: page,
        accessibilityTest: accessibilityTest,
        c100OtherAbuseYesNoToAll: c100SafetyConcernsYesNoToAll,
      });
      await DrugConcernsPage.drugConcernsPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100YesNoDrugConcerns: c100SafetyConcernsYesNoToAll,
      });
      await OtherIssuesPage.otherIssuesPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100YesNoOtherIssues: c100SafetyConcernsYesNoToAll,
      });
      await UnsupervisedPage.unsupervisedPage({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        c100ChildrenSupervision: c100ChildrenSupervision,
        c100ChildrenInTouch: c100SafetyConcernsYesNoToAll,
      });
    }
  }
}
