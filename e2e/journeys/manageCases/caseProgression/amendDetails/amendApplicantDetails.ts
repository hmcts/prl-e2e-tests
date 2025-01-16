import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { AmendApplicantDetails2Page } from "../../../../pages/manageCases/caseProgression/amendDetails/amendApplicantDetails/amendApplicantDetails2Page.ts";
import { ApplicantGender } from "../../../../common/types.ts";
import { AmendApplicantDetailsSubmitPage } from "../../../../pages/manageCases/caseProgression/amendDetails/amendApplicantDetails/amendApplicantDetailsSubmitPage.ts";

interface AmendApplicantDetailsParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  nameChange: boolean;
  dobChange: boolean;
  genderChange: boolean;
  gender: ApplicantGender;
  liveInRefuge: boolean;
  changeApplicantAddress: boolean;
  keepDetailsConfidential: boolean;
  solicitorDetailsChange: boolean;
}

export class AmendApplicantDetails {
  public static async amendApplicantDetails({
    page,
    accessibilityTest,
    nameChange,
    dobChange,
    genderChange,
    gender,
    liveInRefuge,
    changeApplicantAddress,
    keepDetailsConfidential,
    solicitorDetailsChange,
  }: AmendApplicantDetailsParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Amend applicant details");
    const [dobChangeDay, dobChangeMonth, dobChangeYear] =
      Helpers.generateDOB(false);
    await AmendApplicantDetails2Page.amendApplicantDetails2Page({
      page,
      accessibilityTest,
      nameChange,
      dobChange,
      genderChange,
      gender,
      liveInRefuge,
      changeApplicantAddress,
      keepDetailsConfidential,
      solicitorDetailsChange,
      dobChangeDay,
      dobChangeMonth,
      dobChangeYear,
    });
    await AmendApplicantDetailsSubmitPage.amendApplicantDetailsSubmitPage({
      page,
      accessibilityTest,
      nameChange,
      dobChange,
      genderChange,
      gender,
      liveInRefuge,
      changeApplicantAddress,
      keepDetailsConfidential,
      solicitorDetailsChange,
      dobChangeDay,
      dobChangeMonth,
      dobChangeYear,
    });
  }
}
