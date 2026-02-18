import { Browser, BrowserContext, Locator, Page } from "@playwright/test";
import { UserRole } from "../common/types.js";
import Config from "./config.utils.js";

export class NavigationUtils {
  async goToCase(
    page: Page,
    baseURL: string,
    caseNumber: string,
    caseTab: string = "summary",
  ): Promise<void> {
    try {
      await page.goto(this.generateUrl(baseURL, caseNumber, caseTab), {
        waitUntil: "load",
      });
    } catch (error) {
      console.error("An error occurred while navigating to the case: ", error);
      throw error;
    }
  }

  private generateUrl(
    baseURL: string,
    caseNumber: string,
    caseTab: string,
  ): string {
    const caseNumberDigits: string = caseNumber.toString().replace(/\D/g, "");
    if (
      caseTab.toLowerCase() === "tasks" ||
      caseTab.toLowerCase() === "roles and access"
    ) {
      return `${baseURL}/case-details/${caseNumberDigits}/${caseTab}`;
    } else if (caseTab.toLowerCase() === "Draft orders") {
      return `${baseURL}/case-details/${caseNumberDigits}#Draft%20orders`;
    } else {
      return `${baseURL}/case-details/${caseNumberDigits}#${caseTab}`;
    }
  }

  async openPdfLink(page: Page, linkLocator: Locator) {
    const [pdfPage] = await Promise.all([
      page.waitForEvent("popup"),
      linkLocator.click(),
    ]);
    await pdfPage.waitForLoadState("domcontentloaded");
    return pdfPage;
  }

  async openNewBrowserWindow(browser: Browser, user: UserRole): Promise<Page> {
    const newBrowser = await browser.browserType().launch();
    const newContext: BrowserContext = await newBrowser.newContext({
      storageState: Config.sessionStoragePath + `${user}.json`,
    });
    return await newContext.newPage();
  }
}
