import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { Selectors } from "../../../../common/selectors.ts";
import { ViewPDFApplication1Page } from "../../../../pages/manageCases/createCase/C100/viewPDFApplication/viewPDFApplication1Page.ts";

interface C100ViewPDFApplicationOptions {
  page: Page;
  accessibilityTest: boolean;
  c100YesNoToAll: boolean;
}

export class C100ViewPDFApplication {
  public static async c100ViewPDFApplication({
    page,
    accessibilityTest,
    c100YesNoToAll,
  }: C100ViewPDFApplicationOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "View PDF application");
    await ViewPDFApplication1Page.viewPDFApplication1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      c100YesNoToAll: c100YesNoToAll,
    });
    await page.click(`${Selectors.button}:text-is("Save and continue")`);
  }
}
