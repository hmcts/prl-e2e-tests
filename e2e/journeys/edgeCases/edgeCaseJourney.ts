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
interface InitialCreateEdgeCaseJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
  applyMyself: boolean;
  under18: boolean;
  manualAddress: boolean;
  additionalDocuments: boolean;
}

export class EdgeCase {
  public static async createEdgeCase({
    page,
    accessibilityTest,
    typeOfApplication,
    applyMyself,
    under18,
    manualAddress,
    additionalDocuments,
  }: InitialCreateEdgeCaseJourneyParams): Promise<void> {
    await StartPage.startPage({ page, accessibilityTest });
    const currentUrl = page.url();
    const userInfo = await IdamLoginHelper.signInCitizenUser(
      page,
      currentUrl,
      true,
    );
    if (!userInfo) {
      throw new Error("Failed to retrieve user info");
    }
    await TypeOfApplicationPage.typeOfApplication({
      page,
      accessibilityTest,
      typeOfApplication,
    });
    if (typeOfApplication === "FGM" || typeOfApplication === "FMPO") {
      await UserRolePage.userRole({ page, accessibilityTest, applyMyself });
      if (!applyMyself) {
        await FullNamePage.fullNamePage({ page, accessibilityTest });
      }
    }
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
    await EmailAddressPage.emailAddressPage({
      page,
      accessibilityTest,
      userInfo: { email: userInfo.email },
    });
    await ContactDetailsPage.contactDetailsPage({ page, accessibilityTest });
    if (typeOfApplication === "FGM" || typeOfApplication === "FMPO") {
      await SelectCourtPage.selectCourtPage({page, accessibilityTest});
    }
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
