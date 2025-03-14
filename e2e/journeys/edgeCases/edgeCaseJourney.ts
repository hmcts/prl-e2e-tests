import { StartPage } from "../../pages/edgeCases/startPage.ts";
import { TypeOfApplicationPage } from "../../pages/edgeCases/typeOfApplicationPage.ts";
import { Page } from "@playwright/test";
import { EdgeCaseApplicationType } from "../../common/types.ts";
import IdamLoginHelper from "../../common/userHelpers/idamLoginHelper.ts";
import { UserRolePage } from "../../pages/edgeCases/userRolePage.ts";
import { DateOfBirthPage } from "../../pages/edgeCases/dateOfBirthPage.ts";
import { AddressLookupPage } from "../../pages/edgeCases/addressLookupPage.ts";
import { AddressManualPage } from "../../pages/edgeCases/addressManualPage.ts";
import { FullNamePage } from "../../pages/edgeCases/fullNamePage.ts";
import { AddressSelectPage } from "../../pages/edgeCases/addressSelectPage.ts";
import { EmailAddressPage } from "../../pages/edgeCases/emailAddressPage.ts";
import { ContactDetailsPage } from "../../pages/edgeCases/contactDetailsPage.ts";
import { SelectCourtPage } from "../../pages/edgeCases/selectCourtPage.ts";
import { UploadYourDocumentsPage } from "../../pages/edgeCases/uploadYourDocumentsPage.ts";
import { UploadAdditionalDocumentsPage } from "../../pages/edgeCases/uploadAdditionalDocumentsPage.ts";
import { CheckYourAnswersPage } from "../../pages/edgeCases/checkYourAnswersPage.ts";
import { StatementOfTruthPage } from "../../pages/edgeCases/statementOfTruthPage.ts";
import { NeedHelpWithFeesPage } from "../../pages/edgeCases/needHelpWithFeesPage.ts";

interface EdgeCaseDAParams {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
  applyMyself: boolean;
  under18: boolean;
  manualAddress: boolean;
  additionalDocuments: boolean;
}

interface EdgeCaseCAParams {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
  under18: boolean;
  manualAddress: boolean;
  additionalDocuments: boolean;
  helpWithFees: boolean;
}

interface EdgeCaseParams1 {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
}

interface EdgeCaseParams2 {
  page: Page;
  accessibilityTest: boolean;
}

interface EdgeCaseParamsUploadDocs {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
  additionalDocuments: boolean;
}

interface EdgeCaseParams3 {
  page: Page;
  accessibilityTest: boolean;
  under18: boolean;
  manualAddress: boolean;
  userInfo: { email: string };
}

export class EdgeCase {
  public static async createDAEdgeCase({
    page,
    accessibilityTest,
    typeOfApplication,
    applyMyself,
    under18,
    manualAddress,
    additionalDocuments,
  }: EdgeCaseDAParams): Promise<void> {
    const userInfo = await this.initialSteps({
      page,
      accessibilityTest,
      typeOfApplication,
    });

    await UserRolePage.userRole({ page, accessibilityTest, applyMyself });

    if (!applyMyself) {
      await FullNamePage.fullNamePage({ page, accessibilityTest });
    }

    await this.completeAddressEmail({
      page,
      accessibilityTest,
      under18,
      manualAddress,
      userInfo,
    });

    await SelectCourtPage.selectCourtPage({ page, accessibilityTest });
    await this.uploadDocuments({
      page,
      accessibilityTest,
      typeOfApplication,
      additionalDocuments,
    });
    await this.submissionSteps({
      page,
      accessibilityTest,
    });
  }

  public static async createCAEdgeCase({
    page,
    accessibilityTest,
    typeOfApplication,
    under18,
    manualAddress,
    additionalDocuments,
    helpWithFees,
  }: EdgeCaseCAParams): Promise<void> {
    const userInfo = await this.initialSteps({
      page,
      accessibilityTest,
      typeOfApplication,
    });

    await this.completeAddressEmail({
      page,
      accessibilityTest,
      under18,
      manualAddress,
      userInfo,
    });

    await this.uploadDocuments({
      page,
      accessibilityTest,
      typeOfApplication,
      additionalDocuments,
    });

    await NeedHelpWithFeesPage.needHelpWithFees({
      page,
      accessibilityTest,
      helpWithFees,
    });

    await this.submissionSteps({
      page,
      accessibilityTest,
    });
  }

  private static async initialSteps({
    page,
    accessibilityTest,
    typeOfApplication,
  }: EdgeCaseParams1): Promise<{ email: string }> {
    await StartPage.startPage({ page, accessibilityTest });

    const userInfo = await IdamLoginHelper.signInCitizenUser(
      page,
      page.url(),
      true,
    );

    if (!userInfo) throw new Error("Failed to retrieve user info");

    await TypeOfApplicationPage.typeOfApplication({
      page,
      accessibilityTest,
      typeOfApplication,
    });

    return userInfo; // Return userInfo object directly
  }

  private static async completeAddressEmail({
    page,
    accessibilityTest,
    under18,
    manualAddress,
    userInfo,
  }: EdgeCaseParams3): Promise<void> {
    await DateOfBirthPage.dateOfBirth({ page, accessibilityTest, under18 });

    await AddressLookupPage.addressLookup({
      page,
      accessibilityTest,
      manualAddress,
    });

    if (manualAddress) {
      await AddressManualPage.addressManual({ page, accessibilityTest });
    } else {
      await AddressSelectPage.addressSelectPage({ page, accessibilityTest });
    }

    if (userInfo) {
      await EmailAddressPage.emailAddressPage({
        page,
        accessibilityTest,
        userInfo,
      });
    }

    await ContactDetailsPage.contactDetailsPage({ page, accessibilityTest });
  }

  private static async uploadDocuments({
    page,
    accessibilityTest,
    typeOfApplication,
    additionalDocuments,
  }: EdgeCaseParamsUploadDocs): Promise<void> {
    await UploadYourDocumentsPage.uploadApplication({
      page,
      accessibilityTest,
      typeOfApplication,
    });

    await UploadAdditionalDocumentsPage.uploadAdditionalDocuments({
      page,
      accessibilityTest,
      additionalDocuments,
    });
  }

  private static async submissionSteps({
    page,
    accessibilityTest,
  }: EdgeCaseParams2): Promise<void> {
    await CheckYourAnswersPage.checkYourAnswersPage({
      page,
      accessibilityTest,
    });

    await StatementOfTruthPage.statementOfTruthPage({
      page,
      accessibilityTest,
    });
  }
}
