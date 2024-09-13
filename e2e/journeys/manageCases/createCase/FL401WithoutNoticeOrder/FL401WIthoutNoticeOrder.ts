import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { WithoutNoticeOrder1Page } from "../../../../pages/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrder1Page";
import { WithoutNoticeOrderSubmitPage } from "../../../../pages/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrderSubmitPage";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { WithoutOrderNotice2Page } from "../../../../pages/manageCases/createCase/FL401/withoutNoticeOrder/withoutOrderNotice2Page";
import { WithoutNoticeOrder3Page } from "../../../../pages/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrder3Page";
import { WithoutNoticeOrder4Page } from "../../../../pages/manageCases/createCase/FL401/withoutNoticeOrder/withoutNoticeOrder4Page";
import { bailConditionRadios } from "../FL401";

export class FL401WithoutNoticeOrder {
  public static async fl401WithoutNoticeOrder(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    isWithoutNotice: boolean,
    bailConditions: bailConditionRadios,
  ): Promise<void> {
    await Helpers.selectSolicitorEvent(page, "Without notice order");

    await WithoutNoticeOrder1Page.withoutOrderNotice1Page(
      page,
      accessibilityTest,
      errorMessaging,
      isWithoutNotice,
    );
    if (isWithoutNotice) {
      await WithoutOrderNotice2Page.withoutOrderNotice2Page(
        page,
        accessibilityTest,
        errorMessaging,
      );
      await WithoutNoticeOrder3Page.withoutNoticeOrder3Page(
        page,
        accessibilityTest,
        errorMessaging,
        bailConditions,
      );
      await WithoutNoticeOrder4Page.withoutNoticeOrder4Page(
        page,
        accessibilityTest,
      );
    }
    await WithoutNoticeOrderSubmitPage.withoutNoticeOrderSubmitPage(
      page,
      accessibilityTest,
      isWithoutNotice,
      bailConditions,
    );
    await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
  }
}
