import { Page } from "@playwright/test";
import { ManageCaseLinks1Page } from "../../../pages/manageCases/caseLinking/manageCaseLinks/manageCaseLinks1Page.ts";
import { ManageCaseLinks2Page } from "../../../pages/manageCases/caseLinking/manageCaseLinks/manageCaseLinks2Page.ts";
import { ManageCaseLinks3Page } from "../../../pages/manageCases/caseLinking/manageCaseLinks/manageCaseLinks3Page.ts";
import { ManageCaseLinksSubmitPage } from "../../../pages/manageCases/caseLinking/manageCaseLinks/manageCaseLinksSubmitPage.ts";
import { Helpers } from "../../../common/helpers.ts";
import { FL401LinkedCasesTabPage } from "../../../pages/manageCases/caseTabs/FL401/fl401LinkedCasesTabPage.ts";

interface ManageCaseLinksParams {
  page: Page;
  linkedCaseNumber: string;
  accessibilityTest: boolean;
}

export class ManageCaseLinks {
  public static async manageCaseLinks({
    page,
    linkedCaseNumber,
    accessibilityTest,
  }: ManageCaseLinksParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Manage case links");
    await ManageCaseLinks1Page.manageCaseLinks1Page({
      page,
      accessibilityTest,
    });
    await ManageCaseLinks2Page.manageCaseLinks2Page({
      page,
      linkedCaseNumber,
      accessibilityTest,
    });
    await ManageCaseLinks3Page.manageCaseLinks3Page({
      page,
      linkedCaseNumber,
      accessibilityTest,
    });
    await ManageCaseLinksSubmitPage.manageCaseLinksSubmitPage({
      page,
      accessibilityTest,
    });
    await FL401LinkedCasesTabPage.fl401LinkedCasesTabPage(
      page,
      false,
      linkedCaseNumber,
      accessibilityTest,
    );
  }
}
