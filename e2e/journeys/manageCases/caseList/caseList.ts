import { Page } from "@playwright/test";
import IdamLoginHelper from "../../../common/idamLoginHelper";
import config from "../../../config";
import { UserRole } from "../../../common/types";
import { CaseListPage } from "../../../pages/manageCases/caseList/caseListPage";

export class CaseList {
  public static async caseList(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
  ): Promise<void> {
    await IdamLoginHelper.signInUser(page, user, config.manageCasesBaseURL);
    await CaseListPage.casesListPage(page, accessibilityTest);
  }
}
