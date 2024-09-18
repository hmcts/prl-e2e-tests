import { Page } from "@playwright/test";
import { ApplicantGender } from "../../../../pages/manageCases/createCase/C100/applicantDetails/applicantDetails1Page";


interface c100OtherPeopleInTheCase {
  page: Page;
  // user: userRole;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoOtherPeopleInTheCase: boolean;
  applicantGender: ApplicantGender;
}