import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import { UploadAdditionalApplications1Page } from "../../../../pages/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications1Page.ts";
import {
  AdditionalApplicationType,
  solicitorCaseCreateType,
} from "../../../../common/types.ts";
import { UploadAdditionalApplications2Page } from "../../../../pages/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications2Page.ts";
import { UploadAdditionalApplications4Page } from "../../../../pages/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications4Page.ts";
import { UploadAdditionalApplications3Page } from "../../../../pages/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplications3Page.ts";
import { UploadAdditionalApplicationsSubmitPage } from "../../../../pages/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplicationsSubmitPage.ts";
import { UploadAdditionalApplicationsConfirmPage } from "../../../../pages/manageCases/caseProgression/uploadAdditionalApplications/uploadAdditionalApplicationsConfirmPage.ts";

interface UploadAdditionalApplicationsParams {
  page: Page;
  caseType: solicitorCaseCreateType;
  additionalApplicationType: AdditionalApplicationType;
  withNotice: boolean;
  accessibilityTest: boolean;
}

export class UploadAdditionalApplications {
  public static async uploadAdditionalApplications({
    page,
    caseType,
    additionalApplicationType,
    withNotice,
    accessibilityTest,
  }: UploadAdditionalApplicationsParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(
      page,
      "Upload additional applications",
    );
    await UploadAdditionalApplications1Page.uploadAdditionalApplications1Page(
      page,
      caseType,
      additionalApplicationType,
      withNotice,
      accessibilityTest,
    );
    if (additionalApplicationType === "c2") {
      await UploadAdditionalApplications2Page.uploadAdditionalApplications2Page(
        page,
        caseType,
        accessibilityTest,
      );
    } else {
      await UploadAdditionalApplications3Page.uploadAdditionalApplications3Page(
        page,
        caseType,
        accessibilityTest,
      );
    }
    if (caseType === "C100") {
      await UploadAdditionalApplications4Page.uploadAdditionalApplications4Page(
        page,
        additionalApplicationType,
        withNotice,
        accessibilityTest,
      );
    }
    await UploadAdditionalApplicationsSubmitPage.uploadAdditionalApplicationsSubmitPage(
      page,
      caseType,
      additionalApplicationType,
      withNotice,
      accessibilityTest,
    );
    await UploadAdditionalApplicationsConfirmPage.uploadAdditionalApplicationsConfirmPage(
      page,
      caseType,
      accessibilityTest,
    );
  }
}
