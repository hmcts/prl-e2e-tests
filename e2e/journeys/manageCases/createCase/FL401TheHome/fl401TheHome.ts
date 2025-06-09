import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { Page } from "@playwright/test";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";
import {
  addressRadios,
  Fl401TheHome1Page,
} from "../../../../pages/manageCases/createCase/FL401/theHome/fl401TheHome1Page.ts";
import { Fl401TheHomeSubmitPage } from "../../../../pages/manageCases/createCase/FL401/theHome/fl401TheHomeSubmitPage.ts";

interface FL401TheHomeOptions {
  page: Page;
  accessibilityTest: boolean;
  applicantHasChildren: boolean;
  fl401TheHomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
  subJourney: boolean;
}

export class FL401TheHome {
  public static async fl401TheHome({
    page,
    accessibilityTest,
    applicantHasChildren,
    fl401TheHomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress,
    subJourney,
  }: FL401TheHomeOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        solicitorCaseType: "FL401",
        errorMessaging: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(page, "The home");
    await Fl401TheHome1Page.fl401TheHome1Page({
      page,
      accessibilityTest,
      applicantHasChildren,
      fl401TheHomeYesNo,
      fl401EverLivedAtAddress,
      fl401IntendToLiveAtAddress,
    });
    await Fl401TheHomeSubmitPage.fl401TheHomeSubmitPage({
      page,
      accessibilityTest,
      applicantHasChildren,
      fl401TheHomeYesNo,
      fl401EverLivedAtAddress,
      fl401IntendToLiveAtAddress,
    });
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
