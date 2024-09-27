import { Page } from "@playwright/test";
import config from "../../../config";
import { UserRole } from "../../../common/types";
import { CaseListPage } from "../../../pages/manageCases/caseList/caseListPage";

export class CaseList {
  public static async caseList(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.goto(config.manageCasesBaseURL);
    await CaseListPage.casesListPage(page, accessibilityTest);
  }
}
