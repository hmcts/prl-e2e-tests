import { Page } from "@playwright/test";
import { ExamplePage } from "../../../pages/manageCases/exampleEvent/examplePage";

export class ExampleJourney {
  public static async exampleJourney(
    page: Page,
    caseNumber: string,
  ): Promise<void> {
    await ExamplePage.checkPageLoads(page, "caseWorker", caseNumber);
  }
}
