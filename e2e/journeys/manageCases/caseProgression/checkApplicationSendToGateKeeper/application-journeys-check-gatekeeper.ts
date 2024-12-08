import { Page } from "@playwright/test";
import { SendToGateKeeperJourney } from "./sendToGateKeeper/sendToGateKeeperJourney";
import { CheckApplicationJourney } from "./checkApplication/checkApplicationJourney";

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
    await CheckApplicationJourney.checkApplication({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
      ccdRef,
    });
    await SendToGateKeeperJourney.sendToGateKeeper({
      page,
      accessibilityTest,
      yesNoSendToGateKeeper,
      ccdRef,
    });
  }
}
