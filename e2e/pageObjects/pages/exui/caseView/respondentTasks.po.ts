import { CaseAccessViewPage } from "./caseAccessView.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";

export class RespondentTasksPage extends CaseAccessViewPage {
  private readonly headingH3: Locator = this.page.locator(
    Selectors.h3,
    {
      hasText: "Respond to the application ",
    },
  );
  private readonly textP1English = this.page.getByText(
    "This online response combines forms C7 and C8. It also allows you to make your own allegations of harm and violence(C1A) in the section of safety concerns.",
  );
  private readonly textP1Welsh = this.page.getByText(
    "Mae'r ymateb ar-lein hwn yn cyfuno ffurflenni C7 a C8. Mae hefyd yn caniatáu ichi wneud eich honiadau eich hun o niwed a thrais (C1A) yn yr adran pryderon diogelwch.",
  );
  private readonly consentToTheApplication = this.page.getByText(
    "1. Consent to the Application / Caniatâd i'r Cais",
  );
  private readonly respondentDetails = this.page.getByText(
    "2. Respondent's details / Manylion yr atebydd",
  );
  private readonly applicationDetails = this.page.getByText(
    "3. Application details / Manylion cais",
  );
  private readonly safetyConcerns = this.page.getByText(
    "4. Safety Concerns / Pryderon Diogelwch",
  );
  private readonly additionalInformation = this.page.getByText(
    "5. Additional information / Gwybodaeth ychwanegol",
  );
  private readonly viewPDFresponse = this.page.getByText(
    "6. View PDF response / Gweld ymateb PDF",
  );
  private readonly submitSection = this.page.getByText(
    "7. Submit / Cyflwyno",
  );
  private readonly optionSection1 = this.page.getByText(
    "Do you give your consent? / A ydych yn rhoi eich caniatâd?",
  );
  private readonly optionSection2a = this.page.getByText(
    "Keep details private / Cadwch y manylion yn breifat",
  );
  private readonly optionSection2b = this.page.getByText(
    "Edit contact details / Golygu manylion cyswllt",
  );
  private readonly optionSection2c = this.page.getByText(
    "Attending the court / Mynychu'r llys",
  );
  private readonly optionSection3 = this.page.getByText(
    "MIAM / MIAM",
  );
  private readonly optionSection4a = this.page.getByText(
    "Make allegations of harm / Gwneud honiadau o niwed",
  );
  private readonly optionSection4b = this.page.getByText(
    "Respond to allegations of harm / Ymateb i honiadau o niwed",
  );
  private readonly panelText = this.page.getByText(
    "Only complete if relevant / Llenwch yr adran hon dim ond os yw’n berthnasol",
  );
  private readonly optionSection5a = this.page.getByText(
    "Other proceedings / Achosion eraill",
  );
  private readonly optionSection5b = this.page.getByText(
    "International element / Elfen ryngwladol",
  );
  private readonly optionSection5c = this.page.getByText(
    "Litigation capacity / Capasiti cyfreitha",
  );
  private readonly optionSection6 = this.page.getByText(
    "View a draft of your response / Gweld drafft o'ch ymateb",
  );
  private readonly optionSection7 = this.page.getByText(
    "Submit / Cyflwyno",
  );
  private readonly expandText = this.page.getByText(
    "Why can't I submit my application?",
  );
  private readonly notStarted: Locator = this.page.getByTitle(
    "Not started / Heb ddechrau",
  );
  private readonly cannotStartYet = this.page.getByTitle(
    "Cannot start yet / Methu dechrau eto",
  );

  constructor(page: Page) {
    super(page);
  }

  async goToPage(): Promise<void> {
      await this.page.getByRole("tab", { name: "Respondent 1 tasks" }).click();
  }


  async assertPageContents(): Promise<void> {
    await expect(this.headingH3).toBeVisible();
    await expect(this.textP1English).toBeVisible();
    await expect(this.textP1Welsh).toBeVisible();
    await expect(this.consentToTheApplication).toBeVisible();
    await expect(this.respondentDetails).toBeVisible();
    await expect(this.applicationDetails).toBeVisible();
    await expect(this.safetyConcerns).toBeVisible();
    await expect(this.panelText).toBeVisible();
    await expect(this.additionalInformation).toBeVisible();
    await expect(this.viewPDFresponse).toBeVisible();
    await expect(this.submitSection).toBeVisible();
    await expect(this.expandText).toBeVisible();
    await expect(this.optionSection1).toBeVisible();
    await expect(this.optionSection2a).toBeVisible();
    await expect(this.optionSection2b).toBeVisible();
    await expect(this.optionSection2c).toBeVisible();
    await expect(this.optionSection3).toBeVisible();
    await expect(this.optionSection4a).toBeVisible();
    await expect(this.optionSection4b).toBeVisible();
    await expect(this.optionSection5a).toBeVisible();
    await expect(this.optionSection5b).toBeVisible();
    await expect(this.optionSection5c).toBeVisible();
    await expect(this.optionSection6).toBeVisible();
    await expect(this.optionSection7).toBeVisible();
    await expect(this.notStarted).toHaveCount(10);
    await expect(this.cannotStartYet).toBeVisible();
  }
}
