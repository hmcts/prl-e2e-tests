import { Page } from "@playwright/test";
import { ConcernGuidancePage } from "../../../../pages/citizen/createCase/C100/safetyConcerns/concernGuidancePage";
import { ConcernsForSafetyPage } from "../../../../pages/citizen/createCase/C100/safetyConcerns/concernsForSafetyPage";
import { ConcernAboutPage } from "../../../../pages/citizen/createCase/C100/safetyConcerns/concernAboutPage";

interface C100SafetyConcernsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100ChildrenSafetyConcerns: boolean;
}

export class C100SafetyConcerns {
  public static async c100SafetyConcerns({
    page,
    accessibilityTest,
    errorMessaging,
    c100ChildrenSafetyConcerns,
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
    }
  }
}
