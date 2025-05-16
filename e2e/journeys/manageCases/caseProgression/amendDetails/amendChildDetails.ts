import { Browser, Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { AmendChildDetailsRevised1Page } from "../../../../pages/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsRevised1Page.ts";
import { AmendChildDetailsRevised2Page } from "../../../../pages/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsRevised2Page.ts";
import { AmendChildDetailsSubmitPage } from "../../../../pages/manageCases/caseProgression/amendDetails/amendChildDetails/amendChildDetailsSubmitPage.ts";
import { C100ChildGender } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page.ts";
import { yesNoDontKnow } from "../../../../common/types.ts";
import Config from "../../../../utils/config.utils.ts";
import { DummyC100 } from "../../createCase/dummyCase/dummyC100.ts";

interface AmendChildDetailsParams {
  page: Page;
  accessibilityTest: boolean;
  c100ChildGender: C100ChildGender;
  yesNoDontKnow: yesNoDontKnow;
  browser: Browser;
  under18: boolean;
}

export class AmendChildDetails {
  public static async amendChildDetails({
    page,
    accessibilityTest,
    c100ChildGender,
    yesNoDontKnow,
    browser,
    under18,
  }: AmendChildDetailsParams): Promise<void> {
    await page.goto(Config.manageCasesBaseURLCase);
    const caseRef = await DummyC100.dummyC100({
      page: page,
      applicantLivesInRefuge: true,
      otherPersonLivesInRefuge: false,
    });
    // open new browser and sign in as court admin user
    page = await Helpers.openNewBrowserWindow(browser, "courtAdminStoke");
    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
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
