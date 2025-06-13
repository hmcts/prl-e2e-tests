import { solicitorCaseCreateType } from "../../../../common/types.ts";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { DeleteApplication1Page } from "../../../../pages/manageCases/caseProgression/deleteApplication/deleteApplication1Page.ts";
import { DeleteApplicationSubmitPage } from "../../../../pages/manageCases/caseProgression/deleteApplication/deleteApplicationSubmitPage.ts";
import Config from "../../../../utils/config.utils.ts";
import { createTSSolicitorCase } from "../../../../common/caseHelpers/solicitorCaseCreatorHelper.ts";

interface DeleteApplicationParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  accessibilityTest: boolean;
  errorMessaging: boolean;
}

export class DeleteApplication {
  public static async deleteApplication({
    page,
    caseType,
    accessibilityTest,
    errorMessaging,
  }: DeleteApplicationParams): Promise<void> {
    let caseRef: string;

    switch (caseType) {
      case "C100":
        caseRef = await createTSSolicitorCase(page, caseType);
        break;

      case "FL401":
        caseRef = await createTSSolicitorCase(page, caseType);
        break;

      default:
        console.error("Invalid case type provided");
    }

    await Helpers.goToCase(
      page,
      Config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );

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
