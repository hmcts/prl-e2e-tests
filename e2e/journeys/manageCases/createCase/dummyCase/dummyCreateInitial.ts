import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";
import { Fl401TasksTabPage } from "../../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";
import { CaseFilterPage } from "../../../../pageObjects/pages/exui/createCase/caseFilter.po.ts";
import { TypeOfApplicationPage } from "../../../../pageObjects/pages/exui/createCase/typeOfApplication.po.ts";
import { C100CaseNamePage } from "../../../../pageObjects/pages/exui/createCase/c100CaseName.po.ts";
import { Fl401CaseNamePage } from "../../../../pageObjects/pages/exui/createCase/fl401CaseName.po.ts";
import { CreateCaseSubmitPage } from "../../../../pageObjects/pages/exui/createCase/createCaseSubmit.po.ts";

/**
 * Creates a case via the dummy ("TS-Solicitor application") event, which
 * reuses the solicitor create-case screens but asks for the case name and
 * ends on a check your answers page.
 */
export class DummyCreateInitial {
  public static async createDummyCase({
    page,
    solicitorCaseType,
  }: {
    page: Page;
    solicitorCaseType: solicitorCaseCreateType;
  }): Promise<void> {
    const caseFilterPage: CaseFilterPage = new CaseFilterPage(page);
    await caseFilterPage.goToPage();
    await caseFilterPage.selectSolicitorApplication(true);
    await caseFilterPage.clickStart();

    const typeOfApplicationPage: TypeOfApplicationPage =
      new TypeOfApplicationPage(page);
    await typeOfApplicationPage.assertPageContents(true);
    await typeOfApplicationPage.selectCaseType(solicitorCaseType);
    await typeOfApplicationPage.clickContinue();

    const caseName: string = Helpers.generateCaseName();
    const submitPage: CreateCaseSubmitPage = new CreateCaseSubmitPage(page);

    switch (solicitorCaseType) {
      case "C100": {
        const caseNamePage: C100CaseNamePage = new C100CaseNamePage(page);
        await caseNamePage.assertDummyPageContents();
        await caseNamePage.fillCaseName(caseName);
        await caseNamePage.clickContinue();
        await submitPage.assertPageContents(caseName);
        await submitPage.clickCreateMyDummyCase();
        if (await this.hasReachedTasksTab(page)) {
          await C100TasksTabPage.c100TasksTabPage(page, false);
        }
        break;
      }
      case "FL401": {
        const caseNamePage: Fl401CaseNamePage = new Fl401CaseNamePage(page);
        await caseNamePage.assertDummyPageContents();
        await caseNamePage.fillCaseName(caseName);
        await caseNamePage.clickContinue();
        await submitPage.assertPageContents(caseName);
        await submitPage.clickCreateMyDummyCase();
        if (await this.hasReachedTasksTab(page)) {
          await Fl401TasksTabPage.fl401TasksTabPage(page, false);
        }
        break;
      }
      default:
        console.error("An invalid case type was selected");
    }
  }

  private static async hasReachedTasksTab(page: Page): Promise<boolean> {
    return page
      .locator(
        `${Selectors.markdown} > ${Selectors.div} > ${Selectors.p} > ${Selectors.a}:text-is("Case name")`,
      )
      .isVisible();
  }
}
