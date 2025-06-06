import { Page, expect } from "@playwright/test";
import { ReturnApplication1Page } from "../../../../pages/manageCases/caseWorker/returnApplication/returnApplication1Page.ts";
import { ReturnApplication2Page } from "../../../../pages/manageCases/caseWorker/returnApplication/returnApplication2Page.ts";
import { ReturnApplicationSubmitPage } from "../../../../pages/manageCases/caseWorker/returnApplication/returnApplicationSubmitPage.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";

interface ReturnApplicationParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  accessibilityTest: boolean;
}

export class ReturnApplication {
  public static async returnApplication({
    page,
    caseType,
    accessibilityTest,
  }: ReturnApplicationParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Return application");
    await ReturnApplication1Page.returnApplication1Page({
      page,
      caseType,
      accessibilityTest,
    });
    await ReturnApplication2Page.returnApplication2Page({
      page,
      caseType,
      accessibilityTest,
    });
    await ReturnApplicationSubmitPage.returnApplicationSubmitPage({
      page,
      caseType,
      accessibilityTest,
    });
    expect(await Helpers.getCaseEndState(page)).toBe("Returned");
  }
}
