import { StartPage } from "../../pages/edgeCases/startPage.ts";
import { TypeOfApplicationPage } from "../../pages/edgeCases/typeOfApplicationPage.ts";
import { Page } from "@playwright/test";
import { EdgeCaseApplicationType } from "../../common/types.ts";
import IdamLoginHelper from "../../common/userHelpers/idamLoginHelper.ts";
import { UserRolePage } from "../../pages/edgeCases/personalDetails/userRolePage.ts";
import { DateOfBirthPage } from "../../pages/edgeCases/personalDetails/dateOfBirthPage.ts";
import { AddressLookupPage } from "../../pages/edgeCases/personalDetails/addressLookupPage.ts";
import { AddressManualPage } from "../../pages/edgeCases/personalDetails/addressManualPage.ts";
import { FullNamePage } from "../../pages/edgeCases/personalDetails/fullNamePage.ts";
import { AddressSelectPage } from "../../pages/edgeCases/personalDetails/addressSelectPage.ts";
import { EmailAddressPage } from "../../pages/edgeCases/personalDetails/emailAddressPage.ts";
import { ContactDetailsPage } from "../../pages/edgeCases/personalDetails/contactDetailsPage.ts";
import { SelectCourtPage } from "../../pages/edgeCases/selectCourtPage.ts";
import { UploadYourDocumentsPage } from "../../pages/edgeCases/uploadApplicationDocuments/uploadYourDocumentsPage.ts";
import { UploadAdditionalDocumentsPage } from "../../pages/edgeCases/uploadApplicationDocuments/uploadAdditionalDocumentsPage.ts";
import { CheckYourAnswersPage } from "../../pages/edgeCases/submission/checkYourAnswersPage.ts";
import { StatementOfTruthPage } from "../../pages/edgeCases/submission/statementOfTruthPage.ts";
import { NeedHelpWithFeesPage } from "../../pages/edgeCases/payment/needHelpWithFeesPage.ts";
import { PayYourFeePage } from "../../pages/edgeCases/payment/payYourFeePage.ts";
import { FeesAppliedPage } from "../../pages/edgeCases/payment/feesAppliedPage.ts";
import { Helpers } from "../../common/helpers.ts";
import { PayPage } from "../../pages/edgeCases/payment/payPage.ts";
import { PaymentConfirmationPage } from "../../pages/edgeCases/payment/paymentConfirmationPage.ts";
import { ApplicationSubmitted } from "../../pages/edgeCases/submission/applicationSubmittedPage.ts";

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
  appliedHWF: boolean;
}

interface EdgeCaseParamsInitialSteps {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
}

interface EdgeCaseParamsSubmission {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
  additionalDocuments: boolean;
  dob?: { day: string; month: string; year: string };
  under18: boolean;
  userInfo: { email: string; forename: string; surname: string };
}

interface EdgeCaseParamsUploadDocs {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
  additionalDocuments: boolean;
}

interface EdgeCaseParamsAddressEmail {
  page: Page;
  accessibilityTest: boolean;
  under18: boolean;
  manualAddress: boolean;
  userInfo: { email: string; forename: string; surname: string };
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
    const { dob } = await this.completeAddressEmail({
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
      typeOfApplication,
      additionalDocuments,
      userInfo,
      dob,
      under18,
    });
    await ApplicationSubmitted.applicationSubmittedPage({
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
    appliedHWF,
  }: EdgeCaseCAParams): Promise<void> {
    const userInfo = await this.initialSteps({
      page,
      accessibilityTest,
      typeOfApplication,
    });
    const { dob } = await this.completeAddressEmail({
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
      typeOfApplication,
      helpWithFees,
    });
    if (helpWithFees) {
      await FeesAppliedPage.feesAppliedPage({
        page,
        accessibilityTest,
        appliedHWF,
      });
    }
    await this.submissionSteps({
      page,
      accessibilityTest,
      typeOfApplication,
      additionalDocuments,
      userInfo,
      dob,
      under18,
    });
    if (!helpWithFees) {
      await PayYourFeePage.payYourFeePage({
        page,
        accessibilityTest,
        typeOfApplication,
      });
      await PayPage.payPage({ page, accessibilityTest });
      await PaymentConfirmationPage.paymentConfirmationPage({
        page,
        accessibilityTest,
      });
      await ApplicationSubmitted.applicationSubmittedPage({
        page,
        accessibilityTest,
      });
    }
  }

  //sub-journey to initial steps (start page, login, type of application)
  private static async initialSteps({
    page,
    accessibilityTest,
    typeOfApplication,
  }: EdgeCaseParamsInitialSteps): Promise<{
    email: string;
    forename: string;
    surname: string;
  }> {
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
    return userInfo;
  }

  // sub-journey to complete address, email, and contact details
  private static async completeAddressEmail({
    page,
    accessibilityTest,
    under18,
    manualAddress,
    userInfo,
  }: EdgeCaseParamsAddressEmail): Promise<{
    dob?: { day: string; month: string; year: string };
  }> {
    let dob: { day: string; month: string; year: string } | undefined;
    if (under18) {
      const [day, month, year] = Helpers.generateDOB(under18);
      dob = { day, month, year };
      await DateOfBirthPage.dateOfBirth({
        page,
        accessibilityTest,
        under18,
        dob,
      });
    } else {
      await DateOfBirthPage.dateOfBirth({ page, accessibilityTest, under18 });
    }
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
    return { dob }; // dob is optional and will be returned only when under18 is true
  }

  //sub-journey to upload documents
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

  //sub-journey to complete check your answers and statement of truth
  private static async submissionSteps({
    page,
    accessibilityTest,
    typeOfApplication,
    additionalDocuments,
    userInfo,
    dob,
    under18,
  }: EdgeCaseParamsSubmission): Promise<void> {
    await CheckYourAnswersPage.checkYourAnswersPage({
      page,
      accessibilityTest,
      typeOfApplication,
      additionalDocuments,
      userInfo,
      dob,
      under18,
    });

    await StatementOfTruthPage.statementOfTruthPage({
      page,
      accessibilityTest,
    });
  }
}
