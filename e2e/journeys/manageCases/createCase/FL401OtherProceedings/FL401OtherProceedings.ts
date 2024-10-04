import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { OtherProceedingsPage } from "../../../../pages/manageCases/createCase/FL401/otherProceedings/otherProceedingsPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { OtherProceedingsSubmitPage } from "../../../../pages/manageCases/createCase/FL401/otherProceedings/otherProceedingsSubmitPage";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";

import { otherProceedingsRadios } from "../../../../common/types";

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
    await Helpers.selectSolicitorEvent(page, "Other proceedings");
    await OtherProceedingsPage.otherProceedingsPage(
      page,
      errorMessaging,
      accessibilityTest,
      otherProceedingsRadios,
    );
    await OtherProceedingsSubmitPage.otherProceedingsSubmitPage(
      page,
      accessibilityTest,
      otherProceedingsRadios,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
