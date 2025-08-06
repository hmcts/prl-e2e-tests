import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { DeleteApplication1Page } from "../../../../pages/manageCases/caseProgression/deleteApplication/deleteApplication1Page.ts";
import { DeleteApplicationSubmitPage } from "../../../../pages/manageCases/caseProgression/deleteApplication/deleteApplicationSubmitPage.ts";

interface DeleteApplicationParams {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

export class DeleteApplication {
  public static async deleteApplication({
    page,
    accessibilityTest,
    errorMessaging,
  }: DeleteApplicationParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Delete application");
    await DeleteApplication1Page.deleteApplication1Page(
      page,
      accessibilityTest,
      errorMessaging,
    );
    await DeleteApplicationSubmitPage.deleteApplicationSubmitPage(
      page,
      accessibilityTest,
    );
  }
}
