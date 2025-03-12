import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors";
import { solicitorCaseCreateType, UserRole } from "../../../common/types";
import { CaseListPage } from "../../../pages/manageCases/caseList/caseListPage";
import { C100TasksTabPage } from "../../../pages/manageCases/caseTabs/c100TasksTabPage";
import { Fl401TasksTabPage } from "../../../pages/manageCases/caseTabs/fl401TasksTabPage";
import { SolicitorCreate2Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate2Page";
import { SolicitorCreate3Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate3Page";
import { SolicitorCreate4Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate4Page";
import { SolicitorCreate5Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate5Page";
import { SolicitorCreate6Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate6Page";
import { SolicitorCreate7Page } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreate7Page";
import { SolicitorCreatePage } from "../../../pages/manageCases/createCase/initialJourney/solicitorCreatePage";
import { SubmitPage } from "../../../pages/manageCases/createCase/initialJourney/submitPage";
import IdamLoginHelper from "../../../common/userHelpers/idamLoginHelper.ts";
import Config from "../../../config.ts";
import { Helpers } from "../../../common/helpers.ts";
import { CommonStaticText } from "../../../common/commonStaticText.ts";
import {FL401WithoutNoticeOrder} from "./FL401WithoutNoticeOrder/FL401WIthoutNoticeOrder.ts";

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
  public static async createUserAndCase({
    page,
    solicitorCaseType,
  }: {
    page: Page;
    solicitorCaseType: solicitorCaseCreateType;
  }): Promise<void> {
    await IdamLoginHelper.createAndSignInUser(
      page,
      Config.manageCasesBaseURLCase,
      "solicitor",
    );
    await SolicitorCreateInitial.createInitialCase({
      page: page,
      user: "solicitor",
      accessibilityTest: false,
      solicitorCaseType: solicitorCaseType,
      errorMessaging: false,
    });
    //this is a work around as tasks aren't loaded
    if (solicitorCaseType === "C100") {
      await Helpers.chooseEventFromDropdown(page, "Case name");
      await page
        .locator(Selectors.button, { hasText: CommonStaticText.continue })
        .click();
      await page
        .locator(Selectors.button, {
          hasText: CommonStaticText.saveAndContinue,
        })
        .click();
    }
    if (solicitorCaseType === "FL401") {
      await Helpers.chooseEventFromDropdown(page, "Without notice order");
      await FL401WithoutNoticeOrder.fl401WithoutNoticeOrder({
        page: page,
        accessibilityTest: false,
        errorMessaging: false,
        isWithoutNoticeDetailsYes: true,
        isWithoutNoticeDetailsBailConditions: "Yes",
      });
    }
  }
}
