import { Page } from "@playwright/test";

export class NavigationUtils {
  constructor(private page: Page) {}

  async goToCase(
    baseURL: string,
    caseNumber: string,
    caseTab: string,
  ): Promise<void> {
    try {
      await this.page.goto(this.generateUrl(baseURL, caseNumber, caseTab));
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
}
