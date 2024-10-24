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
import { ChildLocationPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/childLocationPage";
import { PassportOfficePage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/passportOfficePage";
import { PassportAmountPage } from "../../../../../pages/citizen/createCase/C100/safetyConcerns/passportAmountPage";

interface C100SafetyConcernsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ChildrenSafetyConcerns: boolean;
  c100ReportAbuseYesNoToAll: boolean;
  c100EmotionalAbuseYesNoToAll: boolean;
  c100SexualAbuseYesNoToAll: boolean;
  c100FinancialAbuseYesNoToAll: boolean;
  c100ChildrenHavePassport: boolean;
  c100MoreThanOnePassport: boolean;
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
    c100ChildrenHavePassport,
    c100MoreThanOnePassport,
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
      }
    }
  }
}
