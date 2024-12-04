import { Page } from "@playwright/test";
import { CheckApplication } from "../checkApplication/checkApplication";
import { SendToGateKeeper } from "./individualJourneys/sendToGateKeeper";

interface CheckApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  yesNoSendToGateKeeper: boolean;
  ccdRef: string;
}

export class ApplicationJourneysCheckGatekeeper {
  public static async applicationJourneysCheckGatekeeper({
    page,
    accessibilityTest,
    yesNoSendToGateKeeper,
    ccdRef,
  }: CheckApplicationParams): Promise<void> {
    await CheckApplication.checkApplication({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
      ccdRef,
    });
    await SendToGateKeeper.sendToGateKeeper({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
      ccdRef,
    });
  }
}
