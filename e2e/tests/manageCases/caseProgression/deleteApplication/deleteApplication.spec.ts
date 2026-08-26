import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";
import { solicitorCaseCreateType } from "../../../../common/types.ts";

const caseTypes: solicitorCaseCreateType[] = ["C100", "FL401"];

for (const caseType of caseTypes) {
  let caseRef: string;

  test.describe(`Delete ${caseType} application tests`, (): void => {
    test.beforeEach(
      async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
        caseRef = (
          await manageCasesEventUtils.createDraftTSSolicitorCase(caseType)
        ).caseRef;
        await navigationUtils.goToCase(
          solicitor.page,
          config.manageCasesBaseURLCase,
          caseRef,
        );
      },
    );

    test("Delete drafted application as a solicitor @nightly @accessibility @regression", async ({
      solicitor,
    }): Promise<void> => {
      const { deleteApplication, tasksPage, caseListPage } = solicitor;

      await tasksPage.chooseEventFromDropdown("Delete application");

      await deleteApplication.page1.assertPageContents();
      await deleteApplication.page1.verifyAccessibility();
      await deleteApplication.page1.checkDeletionCheckBox();
      await deleteApplication.page1.clickContinue();
      await deleteApplication.submitPage.assertPageContents(
        ["caseProgression", "deleteApplication"],
        `${caseType}-delete-application`,
      );
      await deleteApplication.submitPage.verifyAccessibility();
      await deleteApplication.submitPage.clickDelete();

      await caseListPage.alertBanner.assertEventAlert(
        caseRef,
        "Delete application",
      );
    });
  });
}
