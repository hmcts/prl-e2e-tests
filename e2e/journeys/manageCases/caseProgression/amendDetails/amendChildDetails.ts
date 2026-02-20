import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { AmendChildDetailsRevised1Page } from "../../../../pages/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsRevised1Page";
import { AmendChildDetailsRevised2Page } from "../../../../pages/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsRevised2Page";
import { AmendChildDetailsSubmitPage } from "../../../../pages/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsSubmitPage";
import { C100ChildGender } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page";
import { yesNoDontKnow } from "../../../../common/types";
import config from "../../../../utils/config.utils";

interface AmendChildDetailsParams {
  page: Page;
  accessibilityTest: boolean;
  c100ChildGender: C100ChildGender;
  yesNoDontKnow: yesNoDontKnow;
  under18: boolean;
  caseRef: string;
}

export class AmendChildDetails {
  public static async amendChildDetails({
    page,
    accessibilityTest,
    c100ChildGender,
    yesNoDontKnow,
    under18,
    caseRef,
  }: AmendChildDetailsParams): Promise<void> {
    await Helpers.goToCase(
      page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await Helpers.chooseEventFromDropdown(page, "Amend Child details");
    await AmendChildDetailsRevised1Page.amendChildDetailsRevised1Page({
      page,
      accessibilityTest,
      c100ChildGender,
      under18,
    });
    await AmendChildDetailsRevised2Page.amendChildDetailsRevised2Page({
      page,
      accessibilityTest,
      yesNoDontKnow,
    });
    await AmendChildDetailsSubmitPage.amendChildDetailsSubmitPage({
      page,
      accessibilityTest,
      c100ChildGender,
      yesNoDontKnow,
      under18,
    });
  }
}
