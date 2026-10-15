import { expect, Locator, Page } from "@playwright/test";
import { CommonStaticText } from "../../../../../common/commonStaticText.ts";
import { ApplicantGender } from "../../../../../common/types.ts";
import { CheckYourAnswersPage } from "../../checkYourAnswers.po.ts";
import { C100ApplicantDetailsData } from "./c100ApplicantDetails1.po.ts";

export class C100ApplicantDetailsSubmitPage extends CheckYourAnswersPage {
  private readonly answersTable: Locator = this.page.locator(".form-table");

  constructor(page: Page) {
    super(page, "Applicant details", CommonStaticText.saveAndContinue);
  }

  async assertApplicantDetails(
    applicantDetails: C100ApplicantDetailsData,
    applicantGender: ApplicantGender,
    answerYesToAll: boolean,
    snapshotPath?: string[],
    snapshotName?: string,
  ): Promise<void> {
    if (snapshotPath && snapshotName) {
      await this.assertPageContents(snapshotPath, snapshotName);
    } else {
      await this.assertPageContents();
    }

    const expectedValues = [
      applicantDetails.firstName,
      applicantDetails.lastName,
      applicantDetails.previousName,
      applicantDetails.dateOfBirth.displayValue,
      applicantGender === "other"
        ? applicantDetails.otherGender
        : `${applicantGender[0].toUpperCase()}${applicantGender.slice(1)}`,
      applicantDetails.placeOfBirth,
      applicantDetails.address.buildingAndStreet,
      applicantDetails.address.townOrCity,
      applicantDetails.address.postcode,
      applicantDetails.address.country,
      applicantDetails.phoneNumber,
      applicantDetails.representative.firstName,
      applicantDetails.representative.lastName,
      applicantDetails.representative.email,
      applicantDetails.representative.reference,
      applicantDetails.representative.dxNumber,
    ];
    for (const value of expectedValues) {
      await expect(
        this.answersTable.getByText(value, { exact: true }).first(),
      ).toBeVisible();
    }

    if (answerYesToAll) {
      await expect(
        this.answersTable.getByText(applicantDetails.previousAddresses, {
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        this.answersTable.getByText(applicantDetails.email, { exact: true }),
      ).toBeVisible();
      await expect(
        this.answersTable.getByText("Yes", { exact: true }),
      ).toHaveCount(6);
    } else {
      await expect(
        this.answersTable.getByText(applicantDetails.previousAddresses, {
          exact: true,
        }),
      ).toHaveCount(0);
      await expect(
        this.answersTable.getByText(applicantDetails.email, { exact: true }),
      ).toHaveCount(0);
      await expect(
        this.answersTable.getByText("No", { exact: true }),
      ).toHaveCount(5);
    }
  }
}
