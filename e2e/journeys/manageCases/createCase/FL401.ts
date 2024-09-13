import { ApplicantGender, UserRole } from "../../../common/types";
import { Page } from "@playwright/test";
import { FL401TypeOfApplication } from "./FL401TypeOfApplication/FL401TypeOfApplication";
import { SolicitorCreateInitial } from "./solicitorCreateInitial";
import { FL401ApplicantDetails } from "./FL401ApplicantDetails/FL401ApplicantDetails";

export class FL401 {
  public static async fl401(
    page: Page,
    user: UserRole,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    isLinkedToC100: boolean,
    yesNoFL401ApplicantDetails: boolean,
    applicantGender: ApplicantGender
  ): Promise<void> {
    await SolicitorCreateInitial.createInitialCase(
      page,
      user,
      accessibilityTest,
      "FL401",
      errorMessaging,
    );
    await FL401TypeOfApplication.fl401TypeOfApplication(
      page,
      accessibilityTest,
      errorMessaging,
      isLinkedToC100,
    );
    await FL401ApplicantDetails.fl401ApplicantDetails(
      page,
      accessibilityTest,
      errorMessaging,
      yesNoFL401ApplicantDetails,
      applicantGender
    );
  }
}
