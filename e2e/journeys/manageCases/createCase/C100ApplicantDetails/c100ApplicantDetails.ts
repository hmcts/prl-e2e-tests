import { Page } from "@playwright/test";
import { ApplicantGender, UserRole } from "../../../../common/types.ts";
import { Helpers } from "../../../../common/helpers.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";
import { SolicitorCreateInitial } from "../solicitorCreateInitial.ts";
import {
  C100ApplicantDetails1Page,
  C100ApplicantDetailsData,
} from "../../../../pageObjects/pages/exui/createCase/applicantDetails/c100ApplicantDetails1.po.ts";
import { C100ApplicantDetailsSubmitPage } from "../../../../pageObjects/pages/exui/createCase/applicantDetails/c100ApplicantDetailsSubmit.po.ts";
import { ApplicantDetails1Content } from "../../../../fixtures/manageCases/createCase/C100/applicantDetails/applicantDetails1Content.ts";

const applicantDetails: C100ApplicantDetailsData = {
  firstName: ApplicantDetails1Content.applicantFirstName,
  lastName: ApplicantDetails1Content.applicantLastName,
  previousName: ApplicantDetails1Content.applicantPrevName,
  dateOfBirth: {
    day: ApplicantDetails1Content.day,
    month: ApplicantDetails1Content.month,
    year: ApplicantDetails1Content.year,
    displayValue: "1 Jan 2020",
  },
  otherGender: "Other",
  placeOfBirth: ApplicantDetails1Content.placeOfBirth,
  address: {
    postcode: ApplicantDetails1Content.postcode,
    selection: ApplicantDetails1Content.address,
    buildingAndStreet: ApplicantDetails1Content.buildingAndStreet,
    townOrCity: ApplicantDetails1Content.townOrCity,
    country: ApplicantDetails1Content.country,
  },
  previousAddresses: ApplicantDetails1Content.last5Years,
  email: ApplicantDetails1Content.applicantEmail,
  phoneNumber: ApplicantDetails1Content.phoneNumber,
  representative: {
    firstName: ApplicantDetails1Content.representativeFirstName,
    lastName: ApplicantDetails1Content.representativeLastName,
    email: ApplicantDetails1Content.representativeEmail,
    reference: ApplicantDetails1Content.representativeRef,
    organisationSearch: ApplicantDetails1Content.org,
    dxNumber: ApplicantDetails1Content.dxNumber,
  },
};

interface c100ApplicantDetailsOptions {
  page: Page;
  user: UserRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoApplicantDetails: boolean;
  applicantGender: ApplicantGender;
  subJourney: boolean;
}

export class C100ApplicantDetails {
  public static async C100ApplicantDetails({
    page,
    user,
    accessibilityTest,
    errorMessaging,
    yesNoApplicantDetails,
    applicantGender,
    subJourney,
  }: c100ApplicantDetailsOptions): Promise<void> {
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: user,
        accessibilityTest: false,
        solicitorCaseType: "C100",
        errorMessaging: false,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(page, "Applicant details");
    await page.waitForURL(/\/trigger\/applicantsDetails\/applicantsDetails1/, {
      timeout: 60_000,
    });
    const page1 = new C100ApplicantDetails1Page(page);
    const submitPage = new C100ApplicantDetailsSubmitPage(page);

    await page1.assertPageContents();
    if (accessibilityTest) {
      await page1.verifyAccessibility();
    }
    await page1.checkErrorMessages(errorMessaging);
    await page1.fillInFields({
      applicantDetails,
      applicantGender,
      answerYesToAll: yesNoApplicantDetails,
    });
    await page1.clickContinue();

    await submitPage.assertApplicantDetails(
      applicantDetails,
      applicantGender,
      yesNoApplicantDetails,
    );
    await submitPage.clickSaveAndContinue();
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
