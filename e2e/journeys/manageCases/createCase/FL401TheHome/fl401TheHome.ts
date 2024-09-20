import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import { Page } from "@playwright/test";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { addressRadios, Fl401Home1Page } from "../../../../pages/manageCases/createCase/FL401/theHome/fl401Home1Page";

interface FL401TheHomeOptions {
  page: Page;
  accessibilityTest: boolean;
  fl401HomeYesNo: boolean;
  fl401EverLiveAtAddress: addressRadios;
  fl401IntendToLiveAtAddress: addressRadios;
  subJourney: boolean;
}

export class FL401TheHome {
  public static async fl401TheHome({
    page,
    accessibilityTest,
    fl401HomeYesNo,
    fl401EverLiveAtAddress,
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
    await Helpers.selectSolicitorEvent(page, "The home");
    await Fl401Home1Page.fl401Home1Page({
      page,
      accessibilityTest,
      fl401HomeYesNo,
      fl401EverLivedAtAddress: fl401EverLiveAtAddress,
      fl401IntendToLiveAtAddress
    });

    // await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}