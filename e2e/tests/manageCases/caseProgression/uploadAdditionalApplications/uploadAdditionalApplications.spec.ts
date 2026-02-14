import config from "../../../../utils/config.utils.ts";
import { test } from "../../../fixtures.ts";
import { SolicitorPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/solicitorPages.js";

// -------------------------------
// C100 CASE TYPE: Upload additional applications as a solicitor
// // upload additional applications is not present when the case is created via TS support
// // so we need to create the case the long way to enable the upload additional applications event
// -------------------------------
test.describe("Upload additional applications for C100 tests", () => {
  let caseNumber: string;

  test.beforeEach(async ({ solicitor, caseEventUtils, navigationUtils }) => {
    caseNumber = await caseEventUtils.createCACaseSubmitAndPayIndividualEvents(
      solicitor.page,
    );
    await navigationUtils.goToCase(
      solicitor.page,
      config.manageCasesBaseURLCase,
      caseNumber,
      "tasks",
    );
  });

  [
    {
      additionalApplicationType: "c2",
      withNotice: true,
      snapshotName: "C2-with-notice",
    },
  ].forEach((data) => {
    test(`Upload additional C2 application with notice. @regression @accessibility @nightly`, async ({
      solicitor,
    }): Promise<void> => {
      await uploadAdditionalApplications("C100", solicitor, caseNumber, data);
    });
  });
  [
    {
      additionalApplicationType: "c2",
      withNotice: false,
      snapshotName: "C2-without-notice",
    },
  ].forEach((data) => {
    test(`Upload additional C2 application without notice. @regression @accessibility`, async ({
      solicitor,
    }): Promise<void> => {
      await uploadAdditionalApplications("C100", solicitor, caseNumber, data);
    });
  });
  [
    {
      additionalApplicationType: "other",
      withNotice: true,
      snapshotName: "other-with-notice",
    },
  ].forEach((data) => {
    test(`Upload additional Other application. @regression @accessibility`, async ({
      solicitor,
    }): Promise<void> => {
      await uploadAdditionalApplications("C100", solicitor, caseNumber, data);
    });
  });
});

// -------------------------------
// FL401 CASE TYPE: Upload additional applications as a solicitor
// -------------------------------
test.describe("Upload additional applications for FL401 tests", () => {
  let caseNumber: string;

  test.beforeEach(async ({ solicitor, caseEventUtils, navigationUtils }) => {
    caseNumber = await caseEventUtils.createDACaseSubmitAndPayIndividualEvents(
      solicitor.page,
    );
    await navigationUtils.goToCase(
      solicitor.page,
      config.manageCasesBaseURLCase,
      caseNumber,
      "tasks",
    );
  });

  [
    {
      additionalApplicationType: "c2",
      withNotice: true,
      snapshotName: "C2-with-notice",
    },
  ].forEach((data) => {
    test(`Upload additional C2 application with notice. @regression @accessibility @nightly`, async ({
      solicitor,
    }): Promise<void> => {
      await uploadAdditionalApplications("FL401", solicitor, caseNumber, data);
    });
  });
  [
    {
      additionalApplicationType: "c2",
      withNotice: false,
      snapshotName: "C2-without-notice",
    },
  ].forEach((data) => {
    test(`Upload additional C2 application without notice. @regression @accessibility`, async ({
      solicitor,
    }): Promise<void> => {
      await uploadAdditionalApplications("FL401", solicitor, caseNumber, data);
    });
  });
  [
    {
      additionalApplicationType: "other",
      withNotice: true,
      snapshotName: "other-with-notice",
    },
  ].forEach((data) => {
    test(`Upload additional Other application. @regression @accessibility`, async ({
      solicitor,
    }): Promise<void> => {
      await uploadAdditionalApplications("FL401", solicitor, caseNumber, data);
    });
  });
});

async function uploadAdditionalApplications(
  caseType: string,
  solicitor: SolicitorPagesGroup,
  caseNumber: string,
  data,
): Promise<void> {
  const { summaryPage, uploadAdditionalApplications } = solicitor;

  await summaryPage.chooseEventFromDropdown("Upload additional applications");
  await uploadAdditionalApplications.uploadAdditionalApplications1Page.assertPageContents(
    caseType,
  );
  await uploadAdditionalApplications.uploadAdditionalApplications1Page.verifyAccessibility();
  await uploadAdditionalApplications.uploadAdditionalApplications1Page.selectApplicationType(
    data.additionalApplicationType,
    data.withNotice,
  );
  await uploadAdditionalApplications.uploadAdditionalApplications1Page.clickContinue();

  if (data.additionalApplicationType === "c2") {
    await uploadAdditionalApplications.uploadAdditionalApplications2Page.assertPageContents(
      caseType,
    );
    await uploadAdditionalApplications.uploadAdditionalApplications2Page.verifyAccessibility();
    await uploadAdditionalApplications.uploadAdditionalApplications2Page.fillInFields(
      caseType,
    );
    await uploadAdditionalApplications.uploadAdditionalApplications2Page.clickContinue();
  } else {
    await uploadAdditionalApplications.uploadAdditionalApplications3Page.assertPageContents(
      caseType,
    );
    await uploadAdditionalApplications.uploadAdditionalApplications3Page.verifyAccessibility();
    await uploadAdditionalApplications.uploadAdditionalApplications3Page.fillInFields(
      caseType,
    );
    await uploadAdditionalApplications.uploadAdditionalApplications3Page.clickContinue();
  }
  if (caseType === "C100") {
    await uploadAdditionalApplications.uploadAdditionalApplications4Page.assertPageContents(
      data.additionalApplicationType,
      data.withNotice,
    );
    await uploadAdditionalApplications.uploadAdditionalApplications4Page.verifyAccessibility();
    await uploadAdditionalApplications.uploadAdditionalApplications4Page.selectHWF();
    await uploadAdditionalApplications.uploadAdditionalApplications4Page.clickContinue();
  }
  await uploadAdditionalApplications.submitPage.assertPageContents(
    ["caseProgression", caseType + "UploadAdditionalApplications"],
    data.snapshotName,
  );
  await uploadAdditionalApplications.submitPage.verifyAccessibility();
  await uploadAdditionalApplications.submitPage.clickSaveAndContinue();

  await uploadAdditionalApplications.confirmPage.assertPageContents(caseType);
  await uploadAdditionalApplications.confirmPage.verifyAccessibility();
  await uploadAdditionalApplications.confirmPage.clickCloseAndReturnToCaseDetails();

  await summaryPage.alertBanner.assertEventAlert(
    caseNumber,
    "Upload additional applications",
  );
}
