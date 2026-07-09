import { expect, Page } from "@playwright/test";
import { CitizenC100CaseUtils } from "../../../../utils/citizenC100CaseUtils.ts";
import { RespondentResponseC7Content } from "../../../../fixtures/citizen/caseView/respondToTheApplicationC7/respondentResponseContent.ts";
import { LegalRepresentation1Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/legalRepresentation1Page.ts";
import { LegalRepresentation2Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/legalRepresentation2Page.ts";
import { LegalRepresentationConfirmationPage } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/legalRepresentationConfirmationPage.ts";
import { ConsentToTheApplication1Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/consentToTheApplication1Page.ts";
import { ConsentToTheApplication2Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/consentToTheApplication2Page.ts";
import { KeepYourDetailsPrivate1Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/keepYourDetailsPrivate1Page.ts";
import { KeepYourDetailsPrivate2Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/keepYourDetailsPrivate2Page.ts";
import { KeepYourDetailsPrivateConfirmationPage } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/keepYourDetailsPrivateConfirmationPage.ts";
import { ContactPreferences1Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/contactPreferences1Page.ts";
import { ContactPreferences2Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/contactPreferences2Page.ts";
import { ContactPreferencesConfirmationPage } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/contactPreferencesConfirmationPage.ts";
import { ConfirmContactDetails1Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/confirmContactDetails1Page.ts";
import { ConfirmContactDetails2Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/confirmContactDetails2Page.ts";
import { ConfirmContactDetailsConfirmationPage } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/confirmContactDetailsConfirmationPage.ts";
import { Miam1Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/miam1Page.ts";
import { MiamConfirmationPage } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/miamConfirmationPage.ts";
import { PreviousProceedings1Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/previousProceedings1Page.ts";
import { PreviousProceedingsConfirmationPage } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/previousProceedingsConfirmationPage.ts";
import { SafetyConcerns1Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/safetyConcerns1Page.ts";
import { SafetyConcerns2Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/safetyConcers2Page.ts";
import { SafetyConcernsConfirmationPage } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/safetyConcernsConfirmationPage.ts";
import { TheAllegations1Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/theAllegations1Page.ts";
import { TheAllegationsConfirmationPage } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/theAllegationsConfirmationPage.ts";
import { InternationalElements1Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/internationalElements1Page.ts";
import { InternationalElements2Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/internationalElements2Page.ts";
import { InternationalElements3Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/internationalElements3Page.ts";
import { InternationalElements4Page } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/internationalElements4Page.ts";
import { InternationalElementsConfirmationPage } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/internationalElementsConfirmationPage.ts";
import { ResponseCYAsPage } from "../../../../pages/citizen/caseView/respondToTheApplicationC7/responseCYAsPage.ts";
import { CommonStaticText } from "../../../../common/commonStaticText.ts";

interface respondentResponseC7Params {
  page: Page;
  accessibilityTest: boolean;
  citizenC100CaseUtils: CitizenC100CaseUtils;
  caseRef: string;
}

export class RespondentResponseC7 {
  public static async respondentResponseC7({
    page,
    accessibilityTest,
  }: respondentResponseC7Params): Promise<void> {
    // It starts by clicking in each section from the C7 form screen
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link1 })
      .click();
    await LegalRepresentation1Page.legalRepresentation1Page(
      page,
      accessibilityTest,
    );
    await LegalRepresentation2Page.legalRepresentation2Page(
      page,
      accessibilityTest,
    );
    await LegalRepresentationConfirmationPage.legalRepresentationConfirmationPage(
      page,
      accessibilityTest,
    );
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link2 })
      .click();
    await ConsentToTheApplication1Page.consentToTheApplication1Page(
      page,
      accessibilityTest,
    );
    await ConsentToTheApplication2Page.consentToTheApplication2Page(
      page,
      accessibilityTest,
    );
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link3 })
      .click();
    await KeepYourDetailsPrivate1Page.keepYourDetailsPrivate1Page(
      page,
      accessibilityTest,
    );
    await KeepYourDetailsPrivate2Page.keepYourDetailsPrivate2Page(
      page,
      accessibilityTest,
    );
    await KeepYourDetailsPrivateConfirmationPage.keepYourDetailsPrivateConfirmationPage(
      page,
      accessibilityTest,
    );
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link4 })
      .click();
    await ContactPreferences1Page.contactPreferences1Page(
      page,
      accessibilityTest,
    );
    await ContactPreferences2Page.contactPreferences2Page(
      page,
      accessibilityTest,
    );
    await ContactPreferencesConfirmationPage.contactPreferencesConfirmationPage(
      page,
      accessibilityTest,
    );
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link5 })
      .click();
    await ConfirmContactDetails1Page.confirmContactDetails1Page(
      page,
      accessibilityTest,
    );
    await ConfirmContactDetails2Page.confirmContactDetails2Page(
      page,
      accessibilityTest,
    );
    await ConfirmContactDetailsConfirmationPage.confirmContactDetailsConfirmationPage(
      page,
      accessibilityTest,
    );
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link6 })
      .click();
    await Miam1Page.miam1Page(page, accessibilityTest);
    await MiamConfirmationPage.miamConfirmationPage(page, accessibilityTest);
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link7 })
      .click();
    await PreviousProceedings1Page.previousProceedings1Page(
      page,
      accessibilityTest,
    );
    await PreviousProceedingsConfirmationPage.previousProceedingsConfirmationPage(
      page,
      accessibilityTest,
    );
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link8 })
      .click();
    await SafetyConcerns1Page.safetyConcerns1Page(page, accessibilityTest);
    await SafetyConcerns2Page.safetyConcerns2Page(page, accessibilityTest);
    await SafetyConcernsConfirmationPage.safetyConcernsConfirmationPage(
      page,
      accessibilityTest,
    );
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link9 })
      .click();
    await TheAllegations1Page.theAllegations1Page(page, accessibilityTest);
    await TheAllegationsConfirmationPage.theAllegationsConfirmationPage(
      page,
      accessibilityTest,
    );
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link10 })
      .click();
    await InternationalElements1Page.internationalElements1Page(
      page,
      accessibilityTest,
    );
    await InternationalElements2Page.internationalElements2Page(
      page,
      accessibilityTest,
    );
    await InternationalElements3Page.internationalElements3Page(
      page,
      accessibilityTest,
    );
    await InternationalElements4Page.internationalElements4Page(
      page,
      accessibilityTest,
    );
    await InternationalElementsConfirmationPage.internationalElementsConfirmationPage(
      page,
      accessibilityTest,
    );
    // initial submission of the C7 form
    await page
      .getByRole("button", { name: CommonStaticText.reviewAndSubmit })
      .click();
    // following CYA's screen
    await ResponseCYAsPage.responseCYAsPage(page, accessibilityTest);
    //PCQ page
    await page
      .getByRole("button", { name: RespondentResponseC7Content.pcqButton })
      .click();
    //confirmation
    await page.getByRole("button", { name: CommonStaticText.continue }).click();
    //back to respondent dashboard
    await expect(page.locator(".theResponsePDF-status")).toHaveText(
      "Ready to view",
    );
    //final check if pdfs were generated
    await page
      .getByRole("link", { name: RespondentResponseC7Content.link1 })
      .click();
    await expect(
      page.getByRole("link", {
        name: RespondentResponseC7Content.pdfEnglish,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: RespondentResponseC7Content.pdfWelsh,
      }),
    ).toBeVisible();
  }
}
