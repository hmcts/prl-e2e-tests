import { Page } from "@playwright/test";
import { LinkCases1Page } from "../../../pages/manageCases/caseLinking/linkCases/linkCases1Page.ts";
import { LinkCases2Page } from "../../../pages/manageCases/caseLinking/linkCases/linkCases2Page.ts";
import { LinkCases3Page } from "../../../pages/manageCases/caseLinking/linkCases/linkCases3Page.ts";
import { LinkCasesSubmitPage } from "../../../pages/manageCases/caseLinking/linkCases/linkCasesSubmitPage.ts";
import { Helpers } from "../../../common/helpers.ts";
import { FL401LinkedCasesTabPage } from "../../../pages/manageCases/caseTabs/FL401/fl401LinkedCasesTabPage.ts";

interface LinkCasesParams {
  page: Page;
  linkedCaseNumber: string;
  accessibilityTest: boolean;
}

export class LinkCases {
  public static async linkCases({
    page,
    linkedCaseNumber,
    accessibilityTest,
  }: LinkCasesParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Link cases");
    await LinkCases1Page.linkCases1Page({
      page,
      accessibilityTest,
    });
    await LinkCases2Page.linkCases2Page({
      page,
      linkedCaseNumber,
      accessibilityTest,
    });
    await LinkCases3Page.linkCases3Page({
      page,
      linkedCaseNumber,
      accessibilityTest,
    });
    await LinkCasesSubmitPage.linkCasesSubmitPage({
      page,
      accessibilityTest,
    });
    await FL401LinkedCasesTabPage.fl401LinkedCasesTabPage(
      page,
      true,
      linkedCaseNumber,
      accessibilityTest,
    );
  }
}
