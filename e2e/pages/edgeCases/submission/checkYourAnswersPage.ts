import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../common/helpers.ts";
import config from "../../../config.ts";
import path from "path";
import { CheckYourAnswersContent } from "../../../fixtures/edgeCases/submission/checkYourAnswersContent.ts";
import { TypeOfApplicationContent } from "../../../fixtures/edgeCases/typeOfApplicationContent.ts";
import { EdgeCaseApplicationType } from "../../../common/types.ts";
import { AddressLookupContent } from "../../../fixtures/edgeCases/personalDetails/addressLookupContent.ts";
import { ContactDetailsContent } from "../../../fixtures/edgeCases/personalDetails/contactDetailsContent.ts";
import { SelectCourtContent } from "../../../fixtures/edgeCases/selectCourtContent.ts";
import { FullNameContent } from "../../../fixtures/edgeCases/personalDetails/fullNameContent.ts";

interface CheckYourAnswersPageOptions {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
  additionalDocuments: boolean;
  userInfo: { email: string; forename: string; surname: string };
  applyMyself?: boolean;
  under18: boolean;
  dob?: { day: string; month: string; year: string };
}
interface CheckYourAnswersPageStaticContent {
  page: Page;
  accessibilityTest: boolean;
}

interface CheckYourAnswersPageDynamicContent {
  page: Page;
  typeOfApplication: EdgeCaseApplicationType;
  additionalDocuments: boolean;
  userInfo: { email: string; forename: string; surname: string };
  applyMyself?: boolean;
  under18: boolean;
  dob?: { day: string; month: string; year: string };
}

export class CheckYourAnswersPage {
  public static async checkYourAnswersPage({
    page,
    accessibilityTest,
    typeOfApplication,
    additionalDocuments,
    userInfo,
    applyMyself,
    under18,
    dob,
  }: CheckYourAnswersPageOptions): Promise<void> {
    await this.checkStaticContent({ page, accessibilityTest });
    await this.checkDynamicContent({
      page,
      typeOfApplication,
      additionalDocuments,
      userInfo,
      applyMyself,
      under18,
      dob,
    });
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkStaticContent({
    page,
    accessibilityTest,
  }: CheckYourAnswersPageStaticContent): Promise<void> {
    const h1Locator = page.locator(
      `${Selectors.h1}:text-is("${CheckYourAnswersContent.h1}")`,
    );
    await h1Locator.waitFor();

    await Promise.all([
      Helpers.checkGroup(
        page,
        4,
        CheckYourAnswersContent,
        "h2_",
        `${Selectors.h2}`,
      ),
      Helpers.checkGroup(
        page,
        6,
        CheckYourAnswersContent,
        "k",
        `${Selectors.GovukSummaryListKey}`,
      ),
    ]);

    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkDynamicContent({
    page,
    typeOfApplication,
    additionalDocuments,
    userInfo,
    applyMyself,
    under18,
    dob,
  }: CheckYourAnswersPageDynamicContent): Promise<void> {
    // check type of application. For FMPO and FGM cases, check user role and court name
    switch (typeOfApplication) {
      case "FGM":
        await Promise.all([
          expect(
            page.locator(
              `${Selectors.GovukSummaryListValue}:text-is("${TypeOfApplicationContent.formLabel1}")`,
            ),
          ).toBeVisible(),
          expect(
            page.locator(
              `${Selectors.GovukSummaryListKey}:text-is("${CheckYourAnswersContent.k_userRole}")`,
            ),
          ).toBeVisible(),
          expect(
            page.locator(
              `${Selectors.h2}:text-is("${CheckYourAnswersContent.h2_userRole}")`,
            ),
          ).toBeVisible(),
          expect(
            page.locator(
              `${Selectors.GovukSummaryListValue}:text-is("${SelectCourtContent.courtName}")`,
            ),
          ).toBeVisible(),
          expect(
            page.locator(
              `${Selectors.GovukSummaryListKey}:text-is("${CheckYourAnswersContent.k_court}")`,
            ),
          ).toBeVisible(),
        ]);
        break;
      case "FMPO":
        await Promise.all([
          expect(
            page.locator(
              `${Selectors.GovukSummaryListValue}:text-is("${TypeOfApplicationContent.formLabel2}")`,
            ),
          ).toBeVisible(),
          expect(
            page.locator(
              `${Selectors.GovukSummaryListKey}:text-is("${CheckYourAnswersContent.k_userRole}")`,
            ),
          ).toBeVisible(),
          expect(
            page.locator(
              `${Selectors.h2}:text-is("${CheckYourAnswersContent.h2_userRole}")`,
            ),
          ).toBeVisible(),
          expect(
            page.locator(
              `${Selectors.GovukSummaryListValue}:text-is("${SelectCourtContent.courtName}")`,
            ),
          ).toBeVisible(),
          expect(
            page.locator(
              `${Selectors.GovukSummaryListKey}:text-is("${CheckYourAnswersContent.k_court}")`,
            ),
          ).toBeVisible(),
        ]);
        break;
      case "SpecialGuardianship":
        await expect(
          page.locator(
            `${Selectors.GovukSummaryListValue}:text-is("${TypeOfApplicationContent.formLabel3}")`,
          ),
        ).toBeVisible();
        break;
      case "DeclarationOfParentage":
        await expect(
          page.locator(
            `${Selectors.GovukSummaryListValue}:text-is("${TypeOfApplicationContent.formLabel4}")`,
          ),
        ).toBeVisible();
        break;
      case "ParentalOrder":
        await expect(
          page.locator(
            `${Selectors.GovukSummaryListValue}:text-is("${TypeOfApplicationContent.formLabel5}")`,
          ),
        ).toBeVisible();
        break;
      case "ParentalResponsibility":
        await expect(
          page.locator(
            `${Selectors.GovukSummaryListValue}:text-is("${TypeOfApplicationContent.formLabel6}")`,
          ),
        ).toBeVisible();
        break;
      case "ParentalResponsibility_secondFemaleParent":
        await expect(
          page.locator(
            `${Selectors.GovukSummaryListValue}:text-is("${TypeOfApplicationContent.formLabel7}")`,
          ),
        ).toBeVisible();
        break;
      case "AppointingChildGuardian":
        await expect(
          page.locator(
            `${Selectors.GovukSummaryListValue}:text-is("${TypeOfApplicationContent.formLabel8}")`,
          ),
        ).toBeVisible();
        break;
      case "ChangeOfChildSurname":
        await expect(
          page.locator(
            `${Selectors.GovukSummaryListValue}:text-is("${TypeOfApplicationContent.formLabel9}")`,
          ),
        ).toBeVisible();
        break;
    }

    // check applicant details
    if (applyMyself) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${userInfo.forename + " " + userInfo.surname}")`,
        1,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${FullNameContent.firstNameInput + " " + FullNameContent.lastNameInput}")`,
        1,
      );
    }
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${AddressLookupContent.postcodeInput}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${userInfo.email}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${ContactDetailsContent.inputPhoneNumber}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${CheckYourAnswersContent.p}")`,
        1,
      ),
    ]);

    // Check uploaded documents
    const pdfCount = additionalDocuments ? 2 : 1;
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukSummaryListValue}:text-is("${path.basename(config.testPdfFile)}")`,
      pdfCount,
    );
    if (additionalDocuments) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukSummaryListValue}:text-is("${path.basename(config.testWordFile)}")`,
          1,
        ),
        expect(
          page.locator(
            `${Selectors.GovukSummaryListKey}:text-is("${CheckYourAnswersContent.k_addDocs}")`,
          ),
        ).toBeVisible(),
        expect(
          page.locator(
            `${Selectors.h2}:text-is("${CheckYourAnswersContent.h2_addDocs}")`,
          ),
        ).toBeVisible(),
      ]);
    }
    //check dob (if provided)
    if (under18 && dob) {
      const longDob: string = Helpers.dayLongMonthYear(
        dob.day,
        dob.month,
        dob.year,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukSummaryListValue}:text-is("${longDob}")`,
        1,
      );
    }
  }
}
