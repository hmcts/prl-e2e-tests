import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { WithoutNoticeOrder1Page } from "../../../../pages/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrder1Page";
import {
  WithoutNoticeOrderSubmitPage
} from "../../../../pages/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderSubmitPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

export class FL401WithoutNoticeOrder {
  public static async fl401WithoutNoticeOrder(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    isWithoutNotice: boolean
  ): Promise<void> {
    await Helpers.selectSolicitorEvent(
      page,
      "Without notice order"
    );
    console.log('Checking Static Text')

    await WithoutNoticeOrder1Page.withoutOrderNotice1Page(
      page, accessibilityTest, errorMessaging, isWithoutNotice
    );
    if (!isWithoutNotice) {

    }
    await WithoutNoticeOrderSubmitPage.withoutNoticeOrderSubmitPage(
      page, accessibilityTest, isWithoutNotice
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
    console.log("Checked")
  }
}