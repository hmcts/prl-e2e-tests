import { Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { CaseListPage } from "../../../../pages/manageCases/caseList/caseListPage.ts";
import { SolicitorCreatePage } from "../../../../pages/manageCases/createCase/initialJourney/solicitorCreatePage.ts";
import { SolicitorCreate2Page } from "../../../../pages/manageCases/createCase/initialJourney/solicitorCreate2Page.ts";
import { SolicitorCreate4Page } from "../../../../pages/manageCases/createCase/initialJourney/solicitorCreate4Page.ts";
import { SubmitPage } from "../../../../pages/manageCases/createCase/initialJourney/submitPage.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";
import { SolicitorCreate5Page } from "../../../../pages/manageCases/createCase/initialJourney/solicitorCreate5Page.ts";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";

export class DummyCreateInitial {
  public static async createDummyCase({
    page,
    solicitorCaseType,
  }: {
    page: Page;
    solicitorCaseType: solicitorCaseCreateType;
  }): Promise<void> {
    let caseName: string;
    await CaseListPage.navigateToCreateCasePage(page);
    await SolicitorCreatePage.solicitorCreatePage(page, false, true);
    await SolicitorCreate2Page.solicitorCreate2Page(
      page,
      false,
      false,
      solicitorCaseType,
      true,
    );
    switch (solicitorCaseType) {
      case "C100":
        caseName = await SolicitorCreate4Page.solicitorCreate4Page(
          page,
          false,
          false,
          true,
        );
        await SubmitPage.submitPage(page, false, caseName, true);
        if (
          await page
            .locator(
              `${Selectors.markdown} > ${Selectors.div} > ${Selectors.p} > ${Selectors.a}:text-is("Case name")`,
            )
            .isVisible()
        ) {
          await C100TasksTabPage.c100TasksTabPage(page, false);
        }
        break;
      case "FL401":
        caseName = await SolicitorCreate5Page.solicitorCreate5Page(
          page,
          false,
          false,
          true,
        );
        await SubmitPage.submitPage(page, false, caseName, true);
        if (
          await page
            .locator(
              `${Selectors.markdown} > ${Selectors.div} > ${Selectors.p} > ${Selectors.a}:text-is("Case name")`,
            )
            .isVisible()
        ) {
          await Fl401TasksTabPage.fl401TasksTabPage(page, false);
        }
        break;
      default:
        caseName = "null";
        console.error("An invalid case type was selected");
        await SubmitPage.submitPage(page, false, caseName, true);
    }
  }
}
