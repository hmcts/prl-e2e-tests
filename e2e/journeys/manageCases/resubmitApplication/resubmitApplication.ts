import { Page, expect } from "@playwright/test";
import { Helpers } from "../../../common/helpers.ts";
import { solicitorCaseCreateType } from "../../../common/types.ts";
import { StatementOfTruth1Page } from "../../../pages/manageCases/createCase/FL401/statementOfTruth/statementOfTruth1Page.ts";
import { StatementOfTruth2Page } from "../../../pages/manageCases/createCase/FL401/statementOfTruth/statementOfTruth2Page.ts";
import { Selectors } from "../../../common/selectors.ts";
import { Submit1Page } from "../../../pages/manageCases/createCase/C100/submit/submit1Page.ts";
import { Submit2Page } from "../../../pages/manageCases/createCase/C100/submit/submit2Page.ts";

interface ResubmitApplicationParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  accessibilityTest: boolean;
}

export class ResubmitApplication {
  public static async resubmitApplication({
    page,
    caseType,
    accessibilityTest,
  }: ResubmitApplicationParams): Promise<void> {
    await expect(
      page.locator(
        `${Selectors.strong}:has-text("Application has been returned")`,
      ),
    ).toBeVisible();
    switch (caseType) {
      case "C100":
        await this.c100Resubmit({ page, accessibilityTest });
        break;
      case "FL401":
        await this.fl401Resubmit({ page, accessibilityTest });
    }
    expect(await Helpers.getCaseStatusFromSummaryTab(page)).toBe("Submitted");
  }

  private static async c100Resubmit({
    page,
    accessibilityTest,
  }: Partial<ResubmitApplicationParams>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (accessibilityTest == undefined) {
      throw new Error("accessibilityTest is undefined");
    }
    await Helpers.handleEventBasedOnEnvironment(page, "Submit");
    await Submit1Page.submit1Page({
      page,
      accessibilityTest,
    });
    await Submit2Page.submit2Page({
      page,
      accessibilityTest,
    });
  }

  private static async fl401Resubmit({
    page,
    accessibilityTest,
  }: Partial<ResubmitApplicationParams>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    if (accessibilityTest == undefined) {
      throw new Error("accessibilityTest is undefined");
    }
    await Helpers.handleEventBasedOnEnvironment(
      page,
      "Statement of Truth and submit",
    );
    await StatementOfTruth1Page.statementOfTruth1Page({
      page: page,
      isResubmit: true,
      accessibilityTest: accessibilityTest,
      errorMessaging: false,
    });
    await StatementOfTruth2Page.statementOfTruth2Page({
      page: page,
      isResubmit: true,
      accessibilityTest: accessibilityTest,
      errorMessaging: false,
    });
  }
}
