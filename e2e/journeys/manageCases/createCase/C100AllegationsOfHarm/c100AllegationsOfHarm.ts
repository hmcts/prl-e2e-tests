import { Page } from "@playwright/test";
import { AllegationsOfHarmRevised1Page } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised1Page";
import { AllegationsOfHarmRevised2Page } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised2Page";
import {
  AllegationsOfHarmRevised3Page,
  C100AllegationsOfHarmTypeOfDomesticAbuse,
} from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised3Page";
import { AllegationsOfHarmRevised4Page } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised4Page";
import { AllegationsOfHarmRevised5Page } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised5Page";
import { AllegationsOfHarmRevised6Page } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised6Page";
import { AllegationsOfHarmRevised7Page } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised7Page";
import { AllegationsOfHarmRevised8Page } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised8Page";
import { AllegationsOfHarmRevised9Page } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised9Page";
import { AllegationsOfHarmRevised10Page } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised10Page";
import { AllegationsOfHarmRevised11Page } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevised11Page";
import { AllegationsOfHarmRevisedSubmitPage } from "../../../../pages/manageCases/createCase/C100/allegationsOfHarm/allegationsOfHarmRevisedSubmitPage";
import { Helpers } from "../../../../common/helpers";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface C100AllegationsOfHarmOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100YesNoAllegationsOfHarm: boolean;
  c100DomesticAbuseTypePage3: C100AllegationsOfHarmTypeOfDomesticAbuse;
}

export class C100AllegationsOfHarm {
  public static async c100AllegationsOfHarm({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
    c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
  }: C100AllegationsOfHarmOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Allegations of harm");
    await AllegationsOfHarmRevised1Page.allegationsOfHarmRevised1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
    });
    if (c100YesNoAllegationsOfHarm) {
      await AllegationsOfHarmRevised2Page.allegationsOfHarmRevised2Page({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await AllegationsOfHarmRevised3Page.allegationsOfHarmRevised3Page({
        page: page,
        accessibilityTest: accessibilityTest,
        c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
      });
      await AllegationsOfHarmRevised4Page.allegationsOfHarmRevised4Page({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await AllegationsOfHarmRevised5Page.allegationsOfHarmRevised5Page({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await AllegationsOfHarmRevised6Page.allegationsOfHarmRevised6Page({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await AllegationsOfHarmRevised7Page.allegationsOfHarmRevised7Page({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await AllegationsOfHarmRevised8Page.allegationsOfHarmRevised8Page({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await AllegationsOfHarmRevised9Page.allegationsOfHarmRevised9Page({
        page: page,
        accessibilityTest: accessibilityTest,
      });
      await AllegationsOfHarmRevised10Page.allegationsOfHarmRevised10Page({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
      await AllegationsOfHarmRevised11Page.allegationsOfHarmRevised11Page({
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
      });
    }
    await AllegationsOfHarmRevisedSubmitPage.allegationsOfHarmRevisedSubmitPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        c100YesNoAllegationsOfHarm: c100YesNoAllegationsOfHarm,
        c100DomesticAbuseTypePage3: c100DomesticAbuseTypePage3,
      },
    );
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
