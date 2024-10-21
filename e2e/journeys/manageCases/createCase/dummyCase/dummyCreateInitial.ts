import { Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../common/types";
import { CaseList } from "../../caseList/caseList";
import { CaseListPage } from "../../../../pages/manageCases/caseList/caseListPage";
import { SolicitorCreatePage } from "../../../../pages/manageCases/createCase/initialJourney/solicitorCreatePage";
import { SolicitorCreate2Page } from "../../../../pages/manageCases/createCase/initialJourney/solicitorCreate2Page";
import { SolicitorCreate4Page } from "../../../../pages/manageCases/createCase/initialJourney/solicitorCreate4Page";
import { SubmitPage } from "../../../../pages/manageCases/createCase/initialJourney/submitPage";
import { Selectors } from "../../../../common/selectors";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";
import { SolicitorCreate5Page } from "../../../../pages/manageCases/createCase/initialJourney/solicitorCreate5Page";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage";

export class DummyCreateInitial {
  public static async createDummyCase({
    page,
    solicitorCaseType,
  }: {
    page: Page;
    solicitorCaseType: solicitorCaseCreateType;
  }): Promise<void> {
    let caseName: string;
    await CaseList.caseList(page, "solicitor", false);
    await CaseListPage.startCreateCaseEvent(page);
    await SolicitorCreatePage.solicitorCreatePage(page, true, false);
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
          true,
          false,
          false,
        );
        await SubmitPage.submitPage(page, true, false, caseName);
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
          true,
          false,
          false,
        );
        await SubmitPage.submitPage(page, true, false, caseName);
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
        await SubmitPage.submitPage(page, true, false, caseName);
    }
  }
}
