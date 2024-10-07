import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { ViewPDFApplication1Page } from "../../../../pages/manageCases/createCase/C100/viewPDFApplication/viewPDFApplication1Page";
import { Selectors } from "../../../../common/selectors";
import { ViewPDFApplication1Content } from "../../../../fixtures/manageCases/createCase/C100/viewPDFApplication/viewPDFApplication1Content";

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
    await Helpers.selectSolicitorEvent(page, "View PDF application");
    await ViewPDFApplication1Page.viewPDFApplication1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      c100YesNoToAll: c100YesNoToAll,
    });
    await page.click(`${Selectors.button}:text-is("Save and continue")`);
  }
}
