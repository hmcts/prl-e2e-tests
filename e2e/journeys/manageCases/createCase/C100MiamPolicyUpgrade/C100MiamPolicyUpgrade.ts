import { Page } from "@playwright/test";
import {
  C100MiamPolicyUpgrade1PageType,
  MiamPolicyUpgrade1Page,
} from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade1Page";
import {
  MiamPolicyUpgrade6Page,
  miamSelection,
} from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Page";
import { Helpers } from "../../../../common/helpers";
import { MiamPolicyUpgradeSubmitPage } from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgradeSubmitPage";
import { MiamPolicyUpgrade8Page } from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade8Page";
import { MiamPolicyUpgrade2Page } from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade2Page";
import { MiamPolicyUpgrade3Page } from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade3Page";
import { MiamPolicyUpgrade4Page } from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade4Page";
import { MiamPolicyUpgrade5Page } from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade5Page";
import { MiamPolicyUpgrade7Page } from "../../../../pages/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade7Page";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface c100MiamPolicyUpgradeOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType;
  yesNoMiamPolicyUpgrade: boolean;
  miamSelection: miamSelection;
}

export class C100MiamPolicyUpgrade {
  public static async c100MiamPolicyUpgrade({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
    yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
    miamSelection: miamSelection,
  }: c100MiamPolicyUpgradeOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "MIAM");
    await MiamPolicyUpgrade1Page.miamPolicyUpgrade1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
    });
    switch (C100MiamPolicyUpgrade1PageType) {
      case "yes":
        await MiamPolicyUpgradeSubmitPage.miamPolicyUpgradeSubmitPage({
          page: page,
          accessibilityTest: accessibilityTest,
          C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
          yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
          miamSelection: miamSelection,
        });
        break;
      case "yesAttendedMiam":
        await MiamPolicyUpgrade8Page.miamPolicyUpgrade8Page({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
        });
        await MiamPolicyUpgradeSubmitPage.miamPolicyUpgradeSubmitPage({
          page: page,
          accessibilityTest: accessibilityTest,
          C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
          yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
          miamSelection: miamSelection,
        });
        break;
      case "yesExemption":
        await MiamPolicyUpgrade2Page.miamPolicyUpgrade2Page({
          page: page,
          accessibilityTest: accessibilityTest,
        });
        await MiamPolicyUpgrade3Page.miamPolicyUpgrade3Page({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
        });
        await MiamPolicyUpgrade4Page.miamPolicyUpgrade4Page({
          page: page,
          accessibilityTest: accessibilityTest,
          yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
        });
        await MiamPolicyUpgrade5Page.miamPolicyUpgrade5Page({
          page: page,
          accessibilityTest: accessibilityTest,
          yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
        });
        await MiamPolicyUpgrade6Page.miamPolicyUpgrade6Page({
          page: page,
          accessibilityTest: accessibilityTest,
          errorMessaging: errorMessaging,
          yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
          miamSelection: miamSelection,
        });
        await MiamPolicyUpgrade7Page.miamPolicyUpgrade7Page({
          page: page,
          accessibilityTest: accessibilityTest,
          yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
        });
        await MiamPolicyUpgradeSubmitPage.miamPolicyUpgradeSubmitPage({
          page: page,
          accessibilityTest: accessibilityTest,
          C100MiamPolicyUpgrade1PageType: C100MiamPolicyUpgrade1PageType,
          yesNoMiamPolicyUpgrade: yesNoMiamPolicyUpgrade,
          miamSelection: miamSelection,
        });
        break;
    }
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
