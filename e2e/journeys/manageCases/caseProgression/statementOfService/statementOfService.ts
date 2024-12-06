import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";

interface statementOfServiceParams {
  page: Page;
  accessibilityTest: boolean;
}

export class StatementOfService {
  public static async statementOfService({
    page,
    accessibilityTest,
  }: statementOfServiceParams): Promise<void> {
    await Helpers.waitForTask(page, "Directions on Issue");
    await Helpers.chooseEventFromDropdown(page, "Service of application");
  }
}
