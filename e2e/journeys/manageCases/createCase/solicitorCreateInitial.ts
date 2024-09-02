import { Page } from "@playwright/test";
import { solicitorCaseCreateType, UserRole } from "../../../common/types";
import { CaseList } from "../caseList/caseList";
import { CaseListPage } from "../../../pages/manageCases/caseList/caseListPage";
import { SolicitorCreatePage } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreatePage";
import { SolicitorCreate2Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate2Page";
import { SolicitorCreate6Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate6Page";
import { SolicitorCreate4Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate4Page";

export class SolicitorCreateInitial {
  public static async createInitialCase(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    solicitorCaseType: solicitorCaseCreateType,
    errorMessaging: boolean,
  ): Promise<void> {
    await CaseList.caseList(page, user, false);
    await CaseListPage.startCreateCaseEvent(page);
    await SolicitorCreatePage.solicitorCreatePage(page, accessibilityTest);
    await SolicitorCreate2Page.solicitorCreate2Page(
      page,
      errorMessaging,
      accessibilityTest,
      solicitorCaseType,
    );
    switch (solicitorCaseType) {
      case "C100":
        await SolicitorCreate6Page.solicitorCreate6Page(
          page,
          accessibilityTest,
          errorMessaging,
        );
        await SolicitorCreate4Page.solicitorCreate4Page(
          page,
          errorMessaging,
          accessibilityTest,
        );
        break;
      case "FL401":
        break;
      default:
        console.error("An invalid case type was selected");
    }
  }
}
