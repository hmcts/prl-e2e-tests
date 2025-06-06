import { Page } from "@playwright/test";
import { UserRole } from "../../../common/types.ts";
import config from "../../../utils/config.utils.ts";
import { CaseListPage } from "../../../pages/manageCases/caseList/caseListPage.ts";

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
