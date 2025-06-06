import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { solicitorCaseCreateType, UserRole } from "../../../common/types.ts";
import { CaseListPage } from "../../../pages/manageCases/caseList/caseListPage.ts";
import { C100TasksTabPage } from "../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";
import { Fl401TasksTabPage } from "../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";
import { SolicitorCreate2Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate2Page.ts";
import { SolicitorCreate3Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate3Page.ts";
import { SolicitorCreate4Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate4Page.ts";
import { SolicitorCreate5Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate5Page.ts";
import { SolicitorCreate6Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate6Page.ts";
import { SolicitorCreate7Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate7Page.ts";
import { SolicitorCreatePage } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreatePage.ts";
import { SubmitPage } from "../../../pages/manageCases/createCase/initialJourney/submitPage.ts";

export class SolicitorCreateInitial {
  public static async createInitialCase({
    page,
    accessibilityTest,
    solicitorCaseType,
    errorMessaging,
  }: {
    page: Page;
    user: UserRole;
    accessibilityTest: boolean;
    solicitorCaseType: solicitorCaseCreateType;
    errorMessaging: boolean;
  }): Promise<void> {
    let caseName: string;
    await CaseListPage.navigateToCreateCasePage(page);
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
        await SolicitorCreate7Page.solicitorCreate7Page(
          page,
          accessibilityTest,
          solicitorCaseType,
        );
        caseName = await SolicitorCreate4Page.solicitorCreate4Page(
          page,
          errorMessaging,
          accessibilityTest,
        );
        await SubmitPage.submitPage(page, accessibilityTest, caseName);
        if (
          await page
            .locator(
              `${Selectors.markdown} > ${Selectors.div} > ${Selectors.p} > ${Selectors.a}:text-is("Case name")`,
            )
            .isVisible()
        ) {
          await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
        }
        break;
      case "FL401":
        await SolicitorCreate3Page.solicitorCreate3Page(
          page,
          errorMessaging,
          accessibilityTest,
        );
        await SolicitorCreate7Page.solicitorCreate7Page(
          page,
          accessibilityTest,
          solicitorCaseType,
        );
        caseName = await SolicitorCreate5Page.solicitorCreate5Page(
          page,
          errorMessaging,
          accessibilityTest,
        );
        await SubmitPage.submitPage(page, accessibilityTest, caseName);
        if (
          await page
            .locator(
              `${Selectors.markdown} > ${Selectors.div} > ${Selectors.p} > ${Selectors.a}:text-is("Case name")`,
            )
            .isVisible()
        ) {
          await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
        }
        break;
      default:
        caseName = "null";
        console.error("An invalid case type was selected");
        await SubmitPage.submitPage(page, accessibilityTest, caseName);
    }
  }
}
