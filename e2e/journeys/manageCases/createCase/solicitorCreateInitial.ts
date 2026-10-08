import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { solicitorCaseCreateType, UserRole } from "../../../common/types.ts";
import { C100TasksTabPage } from "../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";
import { Fl401TasksTabPage } from "../../../pages/manageCases/caseTabs/fl401TasksTabPage.ts";
import { CaseFilterPage } from "../../../pageObjects/pages/exui/createCase/caseFilter.po.ts";
import { TypeOfApplicationPage } from "../../../pageObjects/pages/exui/createCase/typeOfApplication.po.ts";
import { C100ConfidentialityStatementPage } from "../../../pageObjects/pages/exui/createCase/c100ConfidentialityStatement.po.ts";
import { Fl401ConfidentialityStatementPage } from "../../../pageObjects/pages/exui/createCase/fl401ConfidentialityStatement.po.ts";
import { SelectFamilyCourtPage } from "../../../pageObjects/pages/exui/createCase/selectFamilyCourt.po.ts";
import { C100CaseNamePage } from "../../../pageObjects/pages/exui/createCase/c100CaseName.po.ts";
import { Fl401CaseNamePage } from "../../../pageObjects/pages/exui/createCase/fl401CaseName.po.ts";

/**
 * Drives the solicitor create-case screens so that downstream journeys start
 * from a freshly created draft case. The screens themselves live in
 * `pageObjects/pages/exui/createCase`.
 */
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
    await this.startApplication(page, accessibilityTest);
    await this.chooseTypeOfApplication(
      page,
      solicitorCaseType,
      accessibilityTest,
      errorMessaging,
    );

    switch (solicitorCaseType) {
      case "C100":
        await this.completeC100(page, accessibilityTest, errorMessaging);
        if (await this.hasReachedTasksTab(page)) {
          await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
        }
        break;
      case "FL401":
        await this.completeFl401(page, accessibilityTest, errorMessaging);
        if (await this.hasReachedTasksTab(page)) {
          await Fl401TasksTabPage.fl401TasksTabPage(page, accessibilityTest);
        }
        break;
      default:
        console.error("An invalid case type was selected");
    }
  }

  private static async startApplication(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    const caseFilterPage: CaseFilterPage = new CaseFilterPage(page);
    await caseFilterPage.goToPage();
    await caseFilterPage.assertPageContents();
    if (accessibilityTest) await caseFilterPage.verifyAccessibility();
    await caseFilterPage.selectSolicitorApplication();
    await caseFilterPage.clickStart();
  }

  private static async chooseTypeOfApplication(
    page: Page,
    solicitorCaseType: solicitorCaseCreateType,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    const typeOfApplicationPage: TypeOfApplicationPage =
      new TypeOfApplicationPage(page);
    await typeOfApplicationPage.assertPageContents();
    if (accessibilityTest) await typeOfApplicationPage.verifyAccessibility();
    if (errorMessaging) {
      await typeOfApplicationPage.assertValidationError(
        typeOfApplicationPage.fieldRequiredError,
      );
    }
    await typeOfApplicationPage.selectCaseType(solicitorCaseType);
    if (solicitorCaseType === "FL401") {
      await typeOfApplicationPage.assertCourtNavQuestion();
      if (errorMessaging) {
        await typeOfApplicationPage.assertValidationError(
          typeOfApplicationPage.courtNavRequiredError,
        );
      }
      await typeOfApplicationPage.selectReceivedFromCourtNav();
    }
    await typeOfApplicationPage.clickContinue();
  }

  private static async completeC100(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    const confidentialityPage: C100ConfidentialityStatementPage =
      new C100ConfidentialityStatementPage(page);
    await confidentialityPage.assertPageContents();
    if (accessibilityTest) await confidentialityPage.verifyAccessibility();
    if (errorMessaging) {
      await confidentialityPage.assertValidationError(
        confidentialityPage.fieldRequiredError,
      );
    }
    await confidentialityPage.confirmStatementUnderstood();
    await confidentialityPage.clickContinue();

    const caseNamePage: C100CaseNamePage = new C100CaseNamePage(page);
    await caseNamePage.assertPageContents();
    if (accessibilityTest) await caseNamePage.verifyAccessibility();
    await caseNamePage.clickSaveAndContinue();
  }

  private static async completeFl401(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
  ): Promise<void> {
    const confidentialityPage: Fl401ConfidentialityStatementPage =
      new Fl401ConfidentialityStatementPage(page);
    await confidentialityPage.assertPageContents();
    if (accessibilityTest) await confidentialityPage.verifyAccessibility();
    if (errorMessaging) {
      await confidentialityPage.assertValidationError(
        confidentialityPage.fieldRequiredError,
      );
    }
    await confidentialityPage.confirmStatementUnderstood();
    await confidentialityPage.clickContinue();

    const familyCourtPage: SelectFamilyCourtPage = new SelectFamilyCourtPage(
      page,
    );
    await familyCourtPage.assertPageContents("FL401");
    if (accessibilityTest) await familyCourtPage.verifyAccessibility();
    await familyCourtPage.selectFamilyCourt();
    await familyCourtPage.clickContinue();

    const caseNamePage: Fl401CaseNamePage = new Fl401CaseNamePage(page);
    await caseNamePage.assertPageContents();
    if (accessibilityTest) await caseNamePage.verifyAccessibility();
    await caseNamePage.clickSaveAndContinue();
  }

  private static async hasReachedTasksTab(page: Page): Promise<boolean> {
    return page
      .locator(
        `${Selectors.markdown} > ${Selectors.div} > ${Selectors.p} > ${Selectors.a}:text-is("Type of application / Math o gais")`,
      )
      .isVisible();
  }
}
