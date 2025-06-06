import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { OtherProceedingsPage } from "../../../../pages/manageCases/createCase/FL401/otherProceedings/otherProceedingsPage.ts";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";
import { OtherProceedingsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/otherProceedings/otherProceedingsSubmitPage.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";

import { otherProceedingsRadios } from "../../../../common/types.ts";

interface fl401OtherProceedingsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  otherProceedingsRadios: otherProceedingsRadios;
  subJourney: boolean;
}

export class FL401OtherProceedings {
  public static async fl401OtherProceedings({
    page,
    accessibilityTest,
    errorMessaging,
    otherProceedingsRadios,
    subJourney,
  }: fl401OtherProceedingsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(page, "Other proceedings");
    await OtherProceedingsPage.otherProceedingsPage({
      page,
      errorMessaging,
      accessibilityTest,
      otherProceedingsRadios,
    });
    await OtherProceedingsSubmitPage.otherProceedingsSubmitPage(
      page,
      accessibilityTest,
      otherProceedingsRadios,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
