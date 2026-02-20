import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import { AmendApplicantDetails2Page } from "../../../../pages/manageCases/caseProgression/amendDetails/amendApplicantDetails/amendApplicantDetails2Page";
import { ApplicantGender } from "../../../../common/types";
import { AmendApplicantDetailsSubmitPage } from "../../../../pages/manageCases/caseProgression/amendDetails/amendApplicantDetails/amendApplicantDetailsSubmitPage";
import { AmendApplicantDetails1Page } from "../../../../pages/manageCases/caseProgression/amendDetails/amendApplicantDetails/amendApplicantDetails1Page.js";
import { C100AmendApplicantDetailsSubmitPage } from "../../../../pages/manageCases/caseProgression/amendDetails/amendApplicantDetails/c100AmendApplicantDetailsSubmitPage.js";

interface FL401AmendApplicantDetailsParams {
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

interface C100AmendApplicantDetailsParams {
  page: Page;
  accessibilityTest: boolean;
  ccdRef: string;
  nameChange: boolean;
  dobChange: boolean;
  pobChange: boolean;
  genderChange: boolean;
  gender: ApplicantGender;
  liveInRefuge: boolean;
  changeApplicantAddress: boolean;
  keepDetailsConfidential: boolean;
  solicitorDetailsChange: boolean;
}

export class AmendApplicantDetails {
  public static async fl401AmendApplicantDetails({
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
  }: FL401AmendApplicantDetailsParams): Promise<void> {
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

  public static async c100AmendApplicantDetails({
    page,
    accessibilityTest,
    nameChange,
    dobChange,
    pobChange,
    genderChange,
    gender,
    liveInRefuge,
    changeApplicantAddress,
    keepDetailsConfidential,
    solicitorDetailsChange,
  }: C100AmendApplicantDetailsParams): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Amend applicant details");
    const [dobChangeDay, dobChangeMonth, dobChangeYear] =
      Helpers.generateDOB(false);
    await AmendApplicantDetails1Page.amendApplicantDetails1Page({
      page,
      accessibilityTest,
      nameChange,
      dobChange,
      pobChange,
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
    await C100AmendApplicantDetailsSubmitPage.c100AmendApplicantDetailsSubmitPage(
      {
        page,
        accessibilityTest,
        nameChange,
        dobChange,
        pobChange,
        genderChange,
        gender,
        liveInRefuge,
        changeApplicantAddress,
        keepDetailsConfidential,
        solicitorDetailsChange,
        dobChangeDay,
        dobChangeMonth,
        dobChangeYear,
      },
    );
  }
}
