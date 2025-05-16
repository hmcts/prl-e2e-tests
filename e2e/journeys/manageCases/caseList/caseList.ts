import { Page } from "@playwright/test";
import { UserRole } from "../../../common/types";
import config from "../../../utils/config";
import { CaseListPage } from "../../../pages/manageCases/caseList/caseListPage";

export class CaseList {
  public static async caseList(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.goto(config.manageCasesBaseURLCase);
    await CaseListPage.casesListPage(page, accessibilityTest);
  }
}
