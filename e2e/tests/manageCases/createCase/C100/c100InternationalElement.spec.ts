import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";

// TEST COMMENT
test.describe("C100 Create case - International Element Tests", () => {
  let caseRef: string;

  test.beforeEach(
    async ({ solicitor, manageCasesEventUtils, navigationUtils }) => {
      caseRef = (await manageCasesEventUtils.createBlankSolicitorCase("C100"))
        .caseRef;
      await navigationUtils.goToCase(
        solicitor.page,
        config.manageCasesBaseURLCase,
        caseRef,
        "tasks",
      );
    },
  );

  [
    {
      yesNoInternationalElement: true,
      snapshotName: "international-element-yes",
      snapshotPath: ["createCase", "C100", "internationalElement"],
    },
    {
      yesNoInternationalElement: false,
      snapshotName: "international-element-no",
      snapshotPath: ["createCase", "C100", "internationalElement"],
    },
  ].forEach(({ yesNoInternationalElement, snapshotName, snapshotPath }) => {
    const tag = yesNoInternationalElement
      ? "@nightly @regression"
      : "@regression";

    test(`Complete the C100 International Element options as : ${yesNoInternationalElement}. ${tag}`, async ({
      solicitor,
    }): Promise<void> => {
      const { c100InternationalElement, summaryPage, tasksPage } = solicitor;

      await tasksPage.chooseEventFromDropdown("International element");

      await c100InternationalElement.internationalElement1.assertPageContents();
      await c100InternationalElement.internationalElement1.fillInFields(
        yesNoInternationalElement,
      );
      await c100InternationalElement.internationalElement1.clickContinue();

      await c100InternationalElement.submitPage.assertPageContents(
        snapshotPath,
        snapshotName,
      );
      await c100InternationalElement.submitPage.verifyAccessibility();
      await c100InternationalElement.submitPage.clickSaveAndContinue();
      await summaryPage.alertBanner.assertEventAlert(
        caseRef,
        "International Element",
      );
    });
  });
});
